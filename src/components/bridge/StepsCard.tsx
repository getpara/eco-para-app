"use client";
import { useModal } from "@getpara/react-sdk";

interface StepsCardProps {
  isConnected: boolean;
}

const STEPS = [
  { label: "Approve Amount", subtitle: null },
  { label: "Confirm Transaction", subtitle: "Initiate funds" },
  { label: "Deposit Funds", subtitle: null },
];

export default function StepsCard({ isConnected }: StepsCardProps) {
  const { openModal } = useModal();

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
        {STEPS.map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            {/* Radio circle */}
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                border: "2px solid var(--eco-step-circle-border)",
                flexShrink: 0,
                marginTop: "1px",
              }}
            />
            <div>
              <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--eco-text-primary)" }}>
                {step.label}
              </div>
              {step.subtitle && (
                <div style={{ fontSize: "12px", color: "var(--eco-text-muted)", marginTop: "2px" }}>
                  {step.subtitle}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary section */}
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
          ["You are sending", "—"],
          ["Network fee", "—"],
          ["You will receive", "—"],
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

      {/* CTA button */}
      <button
        onClick={() => openModal()}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: isConnected ? "#1a1a1a" : "var(--eco-green-cta)",
          color: "#ffffff",
          fontWeight: 600,
          fontSize: "14px",
          cursor: "pointer",
          transition: "background-color 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isConnected
            ? "#333"
            : "var(--eco-green-cta-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isConnected ? "#1a1a1a" : "var(--eco-green-cta)";
        }}
      >
        {isConnected ? "Review Transaction" : "Connect wallet to continue"}
      </button>

      {/* Permit3 link */}
      <div style={{ textAlign: "center" }}>
        <a
          href="#"
          style={{
            fontSize: "12px",
            color: "var(--eco-link)",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          Make transfers faster with permit3 &rsaquo;
        </a>
      </div>
    </div>
  );
}
