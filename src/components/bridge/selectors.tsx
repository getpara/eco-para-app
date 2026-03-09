"use client";
import { useState, useRef, useEffect } from "react";
import type { Chain, Token } from "./BridgePanel";

const CHAIN_COLORS: Record<Chain, string> = {
  Ethereum: "#627EEA",
  Base: "#0052FF",
  Polygon: "#8247E5",
  Sepolia: "#F59E0B",
  "Base Sepolia": "#60A5FA",
};

const TOKEN_COLORS: Record<Token, string> = {
  ETH: "#627EEA",
  USDC: "#2775CA",
};

function TokenIcon({ token, size = 20 }: { token: Token; size?: number }) {
  if (token === "ETH") {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <path d="M10 1.5L3.5 10.5L10 13.5L16.5 10.5L10 1.5Z" fill="#627EEA" />
        <path d="M10 1.5L10 13.5L16.5 10.5L10 1.5Z" fill="#3C59DB" />
        <path d="M3.5 12L10 19L16.5 12L10 15L3.5 12Z" fill="#627EEA" />
        <path d="M10 15L16.5 12L10 19L10 15Z" fill="#3C59DB" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9.5" fill="#2775CA" />
      <text x="10" y="14.5" textAnchor="middle" fill="white" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="700">$</text>
    </svg>
  );
}

const CHAINS: Chain[] = ["Ethereum", "Base", "Polygon", "Sepolia", "Base Sepolia"];
const TOKENS: Token[] = ["ETH", "USDC"];

interface ChainSelectorProps {
  value: Chain | null;
  onChange: (chain: Chain) => void;
}

export function ChainSelector({ value, onChange }: ChainSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", flex: 1 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 14px",
          borderRadius: "999px",
          border: "1px solid var(--eco-border)",
          backgroundColor: "var(--eco-pill-bg)",
          color: "var(--eco-text-primary)",
          fontWeight: 500,
          fontSize: "13px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: value ? CHAIN_COLORS[value] : "var(--eco-step-circle-border)",
            flexShrink: 0,
          }}
        />
        <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "left" }}>
          {value ?? "Chain"}
        </span>
        <svg style={{ flexShrink: 0 }} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            backgroundColor: "var(--eco-bg-card)",
            border: "1px solid var(--eco-border)",
            borderRadius: "12px",
            overflow: "hidden",
            zIndex: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          }}
        >
          {CHAINS.map((chain) => (
            <button
              key={chain}
              onClick={() => { onChange(chain); setOpen(false); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "10px 14px",
                border: "none",
                backgroundColor: value === chain ? "var(--eco-pill-bg)" : "transparent",
                color: "var(--eco-text-primary)",
                fontSize: "13px",
                fontWeight: value === chain ? 600 : 400,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: CHAIN_COLORS[chain],
                  flexShrink: 0,
                }}
              />
              {chain}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface TokenSelectorProps {
  value: Token | null;
  onChange: (token: Token) => void;
}

export function TokenSelector({ value, onChange }: TokenSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", flex: 1 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 14px",
          borderRadius: "999px",
          border: "1px solid var(--eco-border)",
          backgroundColor: "var(--eco-pill-bg)",
          color: "var(--eco-text-primary)",
          fontWeight: 500,
          fontSize: "13px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        {value
          ? <TokenIcon token={value} size={20} />
          : <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "var(--eco-step-circle-border)", flexShrink: 0 }} />
        }
        <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "left" }}>
          {value ?? "Token"}
        </span>
        <svg style={{ flexShrink: 0 }} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            backgroundColor: "var(--eco-bg-card)",
            border: "1px solid var(--eco-border)",
            borderRadius: "12px",
            overflow: "hidden",
            zIndex: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          }}
        >
          {TOKENS.map((token) => (
            <button
              key={token}
              onClick={() => { onChange(token); setOpen(false); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "10px 14px",
                border: "none",
                backgroundColor: value === token ? "var(--eco-pill-bg)" : "transparent",
                color: "var(--eco-text-primary)",
                fontSize: "13px",
                fontWeight: value === token ? 600 : 400,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <TokenIcon token={token} size={16} />
              {token}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export { CHAIN_COLORS, TOKEN_COLORS };
