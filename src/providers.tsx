import * as React from 'react';
import wargmiConfig from './config/wagmi';
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitAuthenticationProvider, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import authenticationAdapter from './config/authenticationAdapter'
export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const queryClient = new QueryClient()
  return (
    <WagmiProvider config={wargmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitAuthenticationProvider
          adapter={authenticationAdapter}
          status='unauthenticated'
        >
          <RainbowKitProvider>
            {mounted && children}
          </RainbowKitProvider>
        </RainbowKitAuthenticationProvider>
      </QueryClientProvider>
    </WagmiProvider >
  );
}
