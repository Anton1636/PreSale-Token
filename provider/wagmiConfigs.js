import { holesky } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

export const config = getDefaultConfig({
	appName: 'PreSale Token',
	projectId: projectId,
	chains: [holesky],
	ssr: true,
})
