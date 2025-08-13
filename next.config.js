/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: false, // Keep this false for pages directory
		esmExternals: 'loose', // This helps with ESM/CommonJS compatibility
	},
	transpilePackages: [
		'@vanilla-extract/sprinkles',
		'@rainbow-me/rainbowkit',
		'@reown/appkit',
		'@walletconnect/ethereum-provider',
		'@walletconnect/universal-provider',
	],
	webpack: (config, { isServer }) => {
		// Handle module resolution issues
		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false,
			net: false,
			tls: false,
			crypto: false,
			stream: false,
			http: false,
			https: false,
			zlib: false,
			path: false,
			os: false,
		}

		// Fix for ESM/CommonJS compatibility
		config.externals.push({
			'utf-8-validate': 'commonjs utf-8-validate',
			bufferutil: 'commonjs bufferutil',
		})

		config.module.rules.push({
			test: /\.js$/,
			include: /node_modules\/@base-org\/account/,
			type: 'javascript/auto',
			resolve: {
				fullySpecified: false,
			},
		})

		return config
	},
	// If you're using static export
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
}

module.exports = nextConfig
