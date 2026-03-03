"use client";

export default function OriginCard() {
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
        <button
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
            flex: 1,
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "var(--eco-step-circle-border)",
              flexShrink: 0,
            }}
          />
          Select Chain
          <svg style={{ marginLeft: "auto" }} width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
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
            flex: 1,
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "var(--eco-step-circle-border)",
              flexShrink: 0,
            }}
          />
          Select Token
          <svg style={{ marginLeft: "auto" }} width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
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
            backgroundColor: "var(--eco-pill-bg)",
            border: "2px solid var(--eco-step-circle-border)",
          }}
        />
        <span
          style={{
            fontSize: "40px",
            fontWeight: 700,
            color: "var(--eco-text-muted)",
            lineHeight: 1,
          }}
        >
          0.00
        </span>
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
          ["Address", "—"],
          ["Balance", "—"],
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
            <span style={{ color: "var(--eco-text-primary)", fontWeight: 500 }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
