export const handleTransactionError = (
	error,
	context = 'transaction',
	logToConsole = true
) => {
	if (logToConsole) {
		console.error(`Error in ${context}:`, error)
	}

	let errorMessage = 'Transaction failed'
	let errorCode = 'UNKNOWN_ERROR'

	const code =
		error?.code ||
		(error?.error && error.error.code) ||
		(error.data && error.data.code)

	const isRejected =
		(error?.message && error.message.includes('user rejected')) ||
		error.message.includes('rejected transaction') ||
		error.message.includes('User denied') ||
		error.message.includes('ACTION_REJECTED')

	if (isRejected || code === 'ACTION_REJECTED' || code === 4001) {
		errorMessage = 'Transaction rejected by user'
		errorCode = 'ACTION_REJECTED'
	} else if (code === 'INSUFFICIENT_FUNDS' || code === -32000) {
		errorMessage = 'Insufficient funds'
		errorCode = 'INSUFFICIENT_FUNDS'
	} else if (error.reason) {
		errorMessage = error.reason
		errorCode = 'CONTRACT_ERROR'
	} else if (error.message) {
		const message = error.message

		if (message.includes('gas required exceeds allowance')) {
			errorMessage = 'Insufficient gas limit'
			errorCode = 'INSUFFICIENT_FUNDS'
		} else if (message.includes('nonce too low')) {
			errorMessage = 'Transaction with same nonce already sent'
			errorCode = 'NONCE_ERROR'
		} else if (message.includes('replacement transaction underpriced')) {
			errorMessage = 'Gas price too low for replacement transaction'
			errorCode = 'GAS_PRICE_ERROR'
		} else {
			errorMessage = message
		}
	}

	return {
		message: errorMessage,
		code: errorCode,
	}
}

// ABI for ERC20 token standard
export const erc20Abi = [
	'function totalSupply() view returns (uint256)',
	'function decimals() view returns (uint8)',
	'function symbol() view returns (string)',
	'function name() view returns (string)',
	'function balanceOf(address account) view returns (uint256)',
	'function allowance(address owner, address spender) view returns (uint256)',
	'function transfer(address recipient, uint256 amount) returns (bool)',
	'function approve(address spender, uint256 amount) returns (bool)',
	'function transferFrom(address spender, address recipient, uint256 amount) returns (bool)',
]

// Utility function to generate a unique transaction ID
export const generateId = () =>
	`transaction-${Date.now()}-${math.toString(36).substr(2, 5)}`
