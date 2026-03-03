"use client";
import { useState } from "react";
import OriginCard from "./OriginCard";
import DestinationCard from "./DestinationCard";
import StepsCard from "./StepsCard";

interface BridgePanelProps {
  isConnected: boolean;
}

export default function BridgePanel({ isConnected }: BridgePanelProps) {
  const [swapped, setSwapped] = useState(false);

  const Left = swapped ? DestinationCard : OriginCard;
  const Right = swapped ? OriginCard : DestinationCard;

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", flexWrap: "wrap" }}>
      {/* Left card */}
      <Left />

      {/* Swap button */}
      <div style={{ display: "flex", alignItems: "center", alignSelf: "center", width: "56px", flexShrink: 0, justifyContent: "center" }}>
        <button
          onClick={() => setSwapped((s) => !s)}
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

      {/* Right card */}
      <Right />

      {/* Steps card */}
      <StepsCard isConnected={isConnected} />
    </div>
  );
}
