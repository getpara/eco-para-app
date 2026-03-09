"use client";
import { useState } from "react";
import OriginCard from "./OriginCard";
import DestinationCard from "./DestinationCard";
import StepsCard from "./StepsCard";

export type Chain = "Ethereum" | "Base" | "Polygon" | "Sepolia" | "Base Sepolia";
export type Token = "ETH" | "USDC";

interface BridgePanelProps {
  isConnected: boolean;
}

export default function BridgePanel({ isConnected }: BridgePanelProps) {
  const [originChain, setOriginChain] = useState<Chain | null>(null);
  const [originToken, setOriginToken] = useState<Token | null>(null);
  const [destChain, setDestChain] = useState<Chain | null>(null);
  const [destToken, setDestToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState("");

  function handleSwap() {
    const tmpChain = originChain;
    const tmpToken = originToken;
    setOriginChain(destChain);
    setOriginToken(destToken);
    setDestChain(tmpChain);
    setDestToken(tmpToken);
  }

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", flexWrap: "wrap" }}>
      {/* Cards + swap in a stretch row so both cards match height */}
      <div style={{ display: "flex", alignItems: "stretch", gap: "0" }}>
        <OriginCard
          chain={originChain}
          token={originToken}
          amount={amount}
          onChainChange={setOriginChain}
          onTokenChange={setOriginToken}
          onAmountChange={setAmount}
        />

        {/* Swap button */}
        <div style={{ display: "flex", alignItems: "center", width: "56px", flexShrink: 0, justifyContent: "center" }}>
          <button
            onClick={handleSwap}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "var(--eco-swap-bg)",
              border: "1px solid var(--eco-swap-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              cursor: "pointer",
              color: "var(--eco-text-secondary)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              transition: "background-color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--eco-pill-bg)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--eco-swap-bg)")}
            aria-label="Swap origin and destination"
          >
            ⇄
          </button>
        </div>

        <DestinationCard
          chain={destChain}
          token={destToken}
          onChainChange={setDestChain}
          onTokenChange={setDestToken}
        />
      </div>

      <StepsCard
        isConnected={isConnected}
        originChain={originChain}
        destChain={destChain}
        token={originToken}
        amount={amount}
      />
    </div>
  );
}
