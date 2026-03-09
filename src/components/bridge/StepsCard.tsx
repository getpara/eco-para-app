"use client";
import { useModal } from "@getpara/react-sdk";
import { usePermit3Bridge } from "../../hooks/usePermit3Bridge";
import type { Chain, Token } from "./BridgePanel";

interface StepsCardProps {
  isConnected: boolean;
  originChain: Chain | null;
  destChain: Chain | null;
  token: Token | null;
  amount: string;
}

const STEPS = [
  { label: "Approve Amount", subtitle: null },
  { label: "Confirm Transaction", subtitle: "Sign with Permit3" },
  { label: "Submit to Solvers", subtitle: null },
];

export default function StepsCard({
  isConnected,
  originChain,
  destChain,
  token,
  amount,
}: StepsCardProps) {
  const { openModal } = useModal();
  // Pass originChain so useViemClient initialises Para's WebSocket at render time
  const { bridge, status, reset } = usePermit3Bridge(originChain);

  const isBusy =
    status.state === "approving" ||
    status.state === "signing" ||
    status.state === "submitting";

  const activeStep =
    status.state === "approving" ? 0
    : status.state === "signing" ? 1
    : status.state === "submitting" ? 2
    : -1;

  function handleCta() {
    if (!isConnected) {
      openModal();
      return;
    }
    if (status.state === "success" || status.state === "error") {
      reset();
      return;
    }
    if (!originChain || !token || !amount) return;
    bridge(destChain ?? originChain, token, amount);
  }

  function ctaLabel() {
    if (!isConnected) return "Connect wallet to continue";
    if (status.state === "approving") return "Approving token...";
    if (status.state === "signing") return "Sign in Para wallet...";
    if (status.state === "submitting") return "Submitting...";
    if (status.state === "success") return "Done — bridge another";
    if (status.state === "error") return "Try again";
    return "Bridge";
  }

  const canBridge = isConnected && !!originChain && !!destChain && !!token && !!amount && !isBusy;

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
        Steps
      </div>

      {/* Step rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {STEPS.map((step, i) => {
          const isActive = i === activeStep;
          const isDone =
            (status.state === "signing" && i < 1) ||
            (status.state === "submitting" && i < 2) ||
            (status.state === "success" && i <= 2);
          return (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: `2px solid ${isActive ? "var(--eco-green-cta)" : isDone ? "var(--eco-green-cta)" : "var(--eco-step-circle-border)"}`,
                  backgroundColor: isDone ? "var(--eco-green-cta)" : "transparent",
                  flexShrink: 0,
                  marginTop: "1px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isDone && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "var(--eco-text-primary)" : isDone ? "var(--eco-text-secondary)" : "var(--eco-text-primary)",
                  }}
                >
                  {step.label}
                </div>
                {step.subtitle && (
                  <div style={{ fontSize: "12px", color: "var(--eco-text-muted)", marginTop: "2px" }}>
                    {step.subtitle}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
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
          ["You are sending", amount && token ? `${amount} ${token}` : "—"],
          ["Network fee", "—"],
          ["You will receive", amount && token ? `~${amount} ${token}` : "—"],
        ].map(([label, value]) => (
          <div
            key={label}
            style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}
          >
            <span style={{ color: "var(--eco-text-secondary)" }}>{label}</span>
            <span style={{ color: "var(--eco-text-primary)", fontWeight: 500 }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Fee badge */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <span
          style={{
            backgroundColor: "var(--eco-green-badge-bg)",
            color: "var(--eco-green-badge-text)",
            fontSize: "12px",
            fontWeight: 500,
            padding: "4px 12px",
            borderRadius: "999px",
          }}
        >
          You are paying 0% platform fees
        </span>
      </div>

      {/* Success / error feedback */}
      {status.state === "success" && (
        <div
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            backgroundColor: "var(--eco-green-badge-bg)",
            fontSize: "12px",
            color: "var(--eco-green-badge-text)",
            wordBreak: "break-all",
          }}
        >
          Permit submitted!{" "}
          <span style={{ fontWeight: 600 }}>
            {status.txHash.slice(0, 10)}...{status.txHash.slice(-6)}
          </span>
        </div>
      )}
      {status.state === "error" && (
        <div
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            backgroundColor: "#fff0f0",
            border: "1px solid #fecaca",
            fontSize: "12px",
            color: "#dc2626",
            wordBreak: "break-all",
          }}
        >
          {status.message}
        </div>
      )}

      {/* CTA button */}
      <button
        onClick={handleCta}
        disabled={isConnected && !canBridge && !isBusy && status.state === "idle"}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "10px",
          border: "none",
          backgroundColor:
            status.state === "error"
              ? "#dc2626"
              : status.state === "success"
              ? "var(--eco-green-cta)"
              : !isConnected || canBridge
              ? "var(--eco-green-cta)"
              : "#1a1a1a",
          color: "#ffffff",
          fontWeight: 600,
          fontSize: "14px",
          cursor: isBusy ? "not-allowed" : "pointer",
          opacity: isBusy ? 0.7 : 1,
          transition: "background-color 0.15s",
        }}
      >
        {ctaLabel()}
      </button>

      {/* Permit3 link */}
      <div style={{ textAlign: "center" }}>
        <a
          href="https://github.com/eco/permit3"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "12px", color: "var(--eco-link)", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          Powered by Permit3 &rsaquo;
        </a>
      </div>
    </div>
  );
}
