"use client";
import type { Chain, Token } from "./BridgePanel";
import { ChainSelector, TokenSelector, CHAIN_COLORS, TOKEN_COLORS } from "./selectors";

interface OriginCardProps {
  chain: Chain | null;
  token: Token | null;
  amount: string;
  onChainChange: (chain: Chain) => void;
  onTokenChange: (token: Token) => void;
  onAmountChange: (amount: string) => void;
}

export default function OriginCard({ chain, token, amount, onChainChange, onTokenChange, onAmountChange }: OriginCardProps) {
  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      onAmountChange(val);
    }
  }

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
        Origin
      </div>

      {/* Chain and Token selectors */}
      <div style={{ display: "flex", gap: "8px" }}>
        <ChainSelector value={chain} onChange={onChainChange} />
        <TokenSelector value={token} onChange={onTokenChange} />
      </div>

      {/* Token icon + amount */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          padding: "8px 0",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            backgroundColor: token ? TOKEN_COLORS[token] : "var(--eco-pill-bg)",
            border: "2px solid var(--eco-step-circle-border)",
            transition: "background-color 0.2s",
          }}
        />
        <input
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={handleAmountChange}
          style={{
            fontSize: "40px",
            fontWeight: 700,
            color: amount ? "var(--eco-text-primary)" : "var(--eco-text-muted)",
            lineHeight: 1,
            background: "none",
            border: "none",
            outline: "none",
            textAlign: "center",
            width: "100%",
            padding: 0,
          }}
        />
        {token && (
          <span style={{ fontSize: "14px", color: "var(--eco-text-secondary)", fontWeight: 500 }}>
            {token}
          </span>
        )}
      </div>

      {/* Footer metadata */}
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
          ["Limit", "$250,000 USD"],
          ["Min", "$0.50 USD"],
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
