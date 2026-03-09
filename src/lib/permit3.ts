import { parseUnits } from "viem";
import type { Address, Hex } from "viem";
import type { Chain, Token } from "../components/bridge/BridgePanel";

export const PERMIT3_ADDRESS =
  "0xEc00030C0000245E27d1521Cc2EE88F071c2Ae34" as const satisfies Address;

export const CHAIN_IDS: Record<Chain, number> = {
  Ethereum: 1,
  Base: 8453,
  Polygon: 137,
  Sepolia: 11155111,
  "Base Sepolia": 84532,
};

// ERC-20 token addresses per chain. ETH is represented as WETH.
export const TOKEN_ADDRESSES: Record<Token, Partial<Record<Chain, Address>>> = {
  USDC: {
    Ethereum: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    Base: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    Polygon: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    Sepolia: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    "Base Sepolia": "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  },
  ETH: {
    // WETH — required since Permit3 operates on ERC-20s
    Ethereum: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    Base: "0x4200000000000000000000000000000000000006",
    Polygon: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    Sepolia: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
    "Base Sepolia": "0x4200000000000000000000000000000000000006",
  },
};

export const TOKEN_DECIMALS: Record<Token, number> = {
  USDC: 6,
  ETH: 18,
};

// Permit3 EIP-712 domain — chainId is ALWAYS 1 so one sig works across chains
export const PERMIT3_DOMAIN = {
  name: "Permit3",
  version: "1",
  chainId: 1,
  verifyingContract: PERMIT3_ADDRESS,
} as const;

export const PERMIT3_TYPES = {
  Permit3: [
    { name: "owner", type: "address" },
    { name: "salt", type: "bytes32" },
    { name: "deadline", type: "uint48" },
    { name: "timestamp", type: "uint48" },
    { name: "chainId", type: "uint64" },
    { name: "permits", type: "AllowanceOrTransfer[]" },
  ],
  AllowanceOrTransfer: [
    { name: "modeOrExpiration", type: "uint48" },
    { name: "token", type: "address" },
    { name: "account", type: "address" },
    { name: "amountDelta", type: "uint160" },
  ],
} as const;

// Minimal ABI for the cross-chain permit() overload
export const PERMIT3_ABI = [
  {
    name: "permit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "owner", type: "address" },
      { name: "salt", type: "bytes32" },
      { name: "deadline", type: "uint48" },
      { name: "timestamp", type: "uint48" },
      {
        name: "chainPermits",
        type: "tuple",
        components: [
          { name: "chainId", type: "uint64" },
          {
            name: "permits",
            type: "tuple[]",
            components: [
              { name: "modeOrExpiration", type: "uint48" },
              { name: "token", type: "address" },
              { name: "account", type: "address" },
              { name: "amountDelta", type: "uint160" },
            ],
          },
        ],
      },
      { name: "proof", type: "bytes32[]" },
      { name: "signature", type: "bytes" },
    ],
    outputs: [],
  },
] as const;

export const ERC20_ABI = [
  {
    name: "allowance",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

export function buildPermitData(
  owner: Address,
  chain: Chain,
  token: Token,
  amount: string,
) {
  const tokenAddr = TOKEN_ADDRESSES[token][chain];
  if (!tokenAddr) throw new Error(`No ${token} address for ${chain}`);

  const amountDelta = parseUnits(amount, TOKEN_DECIMALS[token]);
  const salt = ("0x" +
    Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")) as Hex;
  const now = Math.floor(Date.now() / 1000);

  return {
    tokenAddr,
    amountDelta,                     // bigint (uint160)
    salt,
    deadline: now + 3600,            // number (uint48)
    timestamp: now,                  // number (uint48)
    chainId: BigInt(CHAIN_IDS[chain]), // bigint (uint64)
    permits: [
      {
        modeOrExpiration: 0,         // number (uint48) — 0 = TransferERC20
        token: tokenAddr,
        account: owner,              // self — in production this is the bridge/intent contract
        amountDelta,
      },
    ],
  };
}
