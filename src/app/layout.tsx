import type { Metadata } from "next";
import "./globals.css";
import "@getpara/react-sdk/styles.css";
import ParaProvider from "@/components/para/ParaProvider";

export const metadata: Metadata = {
  title: "Eco Portal — Bridge",
  description: "Cross-chain bridge powered by Para",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><ParaProvider>{children}</ParaProvider></body>
    </html>
  );
}
