'use client';
import * as React from 'react';
import wargmiConfig from './config/wagmi';
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const queryClient = new QueryClient()
  return (
    <WagmiProvider config={wargmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
        {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider >
  );
}
