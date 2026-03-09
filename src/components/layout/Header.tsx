"use client";
import { useModal, useWallet } from "@getpara/react-sdk";

interface HeaderProps {
  isConnected: boolean;
}

export default function Header({ isConnected }: HeaderProps) {
  const { openModal } = useModal();
  const { data: wallet } = useWallet();

  const address = wallet?.address;
  const truncated = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "var(--eco-bg-header)",
        borderBottom: "1px solid var(--eco-border)",
        height: "64px",
        display: "flex",
        alignItems: "center",
        padding: "0 32px",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src="/eco-logo.svg"
          alt="Eco"
          width={32}
          height={32}
          style={{ flexShrink: 0 }}
        />
        <span
          style={{
            fontSize: "14px",
            color: "var(--eco-text-secondary)",
            fontWeight: 500,
          }}
        >
          Portal
        </span>
      </div>

      {/* Right side controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          onClick={() => openModal()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid var(--eco-border)",
            backgroundColor: "#fff",
            color: "var(--eco-text-primary)",
            fontWeight: 500,
            fontSize: "14px",
            cursor: "pointer",
            transition: "background-color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--eco-pill-bg)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
            <circle cx="17" cy="15" r="1" fill="currentColor" />
          </svg>
          {isConnected && truncated ? truncated : "Connect Wallet"}
        </button>

        <button
          onClick={() => openModal({ step: "ACCOUNT_PROFILE" })}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            border: "1px solid var(--eco-border)",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--eco-text-secondary)",
            cursor: "pointer",
            flexShrink: 0,
            transition: "background-color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--eco-pill-bg)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
          aria-label="Profile"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
