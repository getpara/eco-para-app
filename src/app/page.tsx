"use client";
import { useAccount } from "@getpara/react-sdk";
import Header from "@/components/layout/Header";
import BridgePanel from "@/components/bridge/BridgePanel";

export default function HomePage() {
  const { isConnected } = useAccount();
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--eco-bg-page)" }}>
      <Header isConnected={isConnected} />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 32px 64px" }}>
        <BridgePanel isConnected={isConnected} />
      </main>
    </div>
  );
}
