"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ParaProvider as ParaSDKProvider, Environment } from "@getpara/react-sdk";
import { useState } from "react";

const PARA_API_KEY = process.env.NEXT_PUBLIC_PARA_API_KEY ?? "";
const PARA_ENV =
  process.env.NEXT_PUBLIC_PARA_ENVIRONMENT === "PROD"
    ? Environment.PRODUCTION
    : Environment.BETA;

export default function ParaProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ParaSDKProvider
        paraClientConfig={{ apiKey: PARA_API_KEY, env: PARA_ENV }}
        config={{ appName: "EcoPortal" }}
        paraModalConfig={{ theme: { backgroundColor: "#839cd0" } }}>
        {children}
      </ParaSDKProvider>
    </QueryClientProvider>
  );
}
