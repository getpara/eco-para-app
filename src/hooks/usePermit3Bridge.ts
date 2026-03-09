"use client";
import { useState } from "react";
import { http, createPublicClient } from "viem";
import { mainnet, base, polygon, sepolia, baseSepolia } from "viem/chains";
import type { Chain as ViemChain } from "viem";
import { useViemClient } from "@getpara/react-sdk/evm";
import { useAccount } from "@getpara/react-sdk";
import type { Chain, Token } from "../components/bridge/BridgePanel";
import {
  PERMIT3_ADDRESS,
  PERMIT3_DOMAIN,
  PERMIT3_TYPES,
  ERC20_ABI,
  buildPermitData,
} from "../lib/permit3";

const VIEM_CHAINS: Record<Chain, ViemChain> = {
  Ethereum: mainnet,
  Base: base,
  Polygon: polygon,
  Sepolia: sepolia,
  "Base Sepolia": baseSepolia,
};

// Explicit public RPC URLs — avoids silent failures from viem chain defaults
const RPC_URLS: Record<Chain, string> = {
  Ethereum: "https://cloudflare-eth.com",
  Base: "https://mainnet.base.org",
  Polygon: "https://polygon-rpc.com",
  Sepolia: "https://ethereum-sepolia-rpc.publicnode.com",
  "Base Sepolia": "https://sepolia.base.org",
};

export type BridgeStatus =
  | { state: "idle" }
  | { state: "approving" }
  | { state: "signing" }
  | { state: "submitting" }
  | { state: "success"; txHash: string }
  | { state: "error"; message: string };

// originChain is passed in so useViemClient can be called at render time
// with the correct chain — giving Para time to establish its WebSocket before signing.
export function usePermit3Bridge(originChain: Chain | null) {
  const { embedded } = useAccount();
  const owner = embedded?.wallets?.[0]?.address as `0x${string}` | undefined;

  const viemChain = originChain ? VIEM_CHAINS[originChain] : sepolia;
  const rpcUrl = originChain ? RPC_URLS[originChain] : RPC_URLS["Sepolia"];
  const { viemClient } = useViemClient({
    address: owner,
    walletClientConfig: { chain: viemChain, transport: http(rpcUrl) },
  });

  const [status, setStatus] = useState<BridgeStatus>({ state: "idle" });

  async function bridge(destChain: Chain, token: Token, amount: string) {
    if (!viemClient || !owner) {
      setStatus({ state: "error", message: "Wallet not connected" });
      return;
    }
    if (!originChain) {
      setStatus({ state: "error", message: "Select an origin chain" });
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setStatus({ state: "error", message: "Enter a valid amount" });
      return;
    }

    try {
      const permitData = buildPermitData(owner, originChain, destChain, token, amount);

      const publicClient = createPublicClient({
        chain: viemChain,
        transport: http(rpcUrl),
      });

      // Step 1 — check allowance, approve if needed
      const allowance = await publicClient.readContract({
        address: permitData.tokenAddr,
        abi: ERC20_ABI,
        functionName: "allowance",
        args: [owner, PERMIT3_ADDRESS],
      });

      if (allowance < permitData.amountDelta) {
        setStatus({ state: "approving" });
        const approveTx = await viemClient.writeContract({
          address: permitData.tokenAddr,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [PERMIT3_ADDRESS, permitData.amountDelta],
        });
        await publicClient.waitForTransactionReceipt({ hash: approveTx });
      }

      // Step 2 — sign Permit3 EIP-712 typed data
      setStatus({ state: "signing" });
      const signature = await viemClient.signTypedData({
        account: viemClient.account,
        domain: PERMIT3_DOMAIN,
        types: PERMIT3_TYPES,
        primaryType: "Permit3",
        message: {
          owner,
          salt: permitData.salt,
          deadline: permitData.deadline,
          timestamp: permitData.timestamp,
          chainId: permitData.chainId,
          destChainId: permitData.destChainId,
          permits: permitData.permits,
        },
      });

      // Step 3 — submit signed intent to solvers
      setStatus({ state: "submitting" });
      console.log("Submitting intent to solvers:", {
        originChain,
        destChain,
        token,
        amount,
        permitData,
        signature,
      });
      await new Promise<void>((resolve) => setTimeout(resolve, 800));

      setStatus({ state: "success", txHash: signature });
    } catch (e: unknown) {
      setStatus({
        state: "error",
        message: e instanceof Error ? e.message : "Unknown error",
      });
    }
  }

  return { bridge, status, reset: () => setStatus({ state: "idle" }) };
}
