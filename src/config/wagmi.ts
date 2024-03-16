import '@rainbow-me/rainbowkit/styles.css'
import { http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
})
export default config