"use client";
import type { Chain, Token } from "./BridgePanel";
import { ChainSelector, TokenSelector, CHAIN_COLORS, TOKEN_COLORS } from "./selectors";

interface DestinationCardProps {
  chain: Chain | null;
  token: Token | null;
  onChainChange: (chain: Chain) => void;
  onTokenChange: (token: Token) => void;
}

export default function DestinationCard({ chain, token, onChainChange, onTokenChange }: DestinationCardProps) {
  return (
    <div
      style={{
        backgroundColor: "var(--eco-bg-card)",
        borderRadius: "16px",
        border: "1px solid var(--eco-border)",
        padding: "24px",
        width: "320px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignSelf: "stretch",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--eco-text-secondary)",
        }}
      >
        Destination
      </div>

      {/* Chain and Token selectors */}
      <div style={{ display: "flex", gap: "8px" }}>
        <ChainSelector value={chain} onChange={onChainChange} />
        <TokenSelector value={token} onChange={onTokenChange} />
      </div>

      {/* Token icon + receive amount (matches OriginCard layout) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          padding: "8px 0",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "40px",
            fontWeight: 700,
            color: "var(--eco-text-muted)",
            lineHeight: 1,
          }}
        >
          —
        </span>
        {token && (
          <span style={{ fontSize: "14px", color: "var(--eco-text-secondary)", fontWeight: 500 }}>
            {token}
          </span>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid var(--eco-border)",
          paddingTop: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {[
          ["Chain", chain ?? "—"],
          ["Token", token ?? "—"],
          ["Destination Address", "—"],
        ].map(([label, value]) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
            }}
          >
            <span style={{ color: "var(--eco-text-secondary)" }}>{label}</span>
            <span
              style={{
                color: label === "Chain" && chain
                  ? CHAIN_COLORS[chain]
                  : label === "Token" && token
                  ? TOKEN_COLORS[token]
                  : "var(--eco-text-primary)",
                fontWeight: 500,
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
