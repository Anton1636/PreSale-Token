import '../styles/globals.css'
import { config } from '../provider/wagmiConfigs'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Web3Provider } from '../context/Web3Provider'
import { ToastProvider } from '../context/ToastContext'
import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider
					theme={darkTheme({
						accentColor: '#D345EF',
						accentColorForeground: 'white',
						borderRadius: 'small',
						fontStack: 'system',
						overlayBlur: 'small',
					})}
				>
					<ToastProvider>
						<Web3Provider>
							<Component {...pageProps} />
						</Web3Provider>
					</ToastProvider>
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	)
}
