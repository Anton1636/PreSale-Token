import React, { createContext, useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const ToastContext = createContext()

const MAIN_COLOR = '#13101A'
const TOAST_STYLE = {
	common: {
		background: MAIN_COLOR,
		color: 'white',
		padding: '16px',
		borderRadius: '6px',
		boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
	},
	processing: {
		borderLeft: `4px solid $facc15`,
	},
	approve: {
		borderLeft: `4px solid #22c55e`,
	},
	complete: {
		borderLeft: `4px solid #22c55e`,
	},
	reject: {
		borderLeft: `4px solid #ef4444`,
	},
	failed: {
		borderLeft: `4px solid #f97316`,
	},
	info: {
		borderLeft: `4px solid #2ed3c0`,
	},
}

export const ToastProvider = ({ children }) => {
	const showProcessing = message => {
		return toast.loading(message, {
			style: {
				...TOAST_STYLE.common,
				...TOAST_STYLE.processing,
			},
		})
	}

	const showApprove = message => {
		return toast.success(message, {
			style: {
				...TOAST_STYLE.common,
				...TOAST_STYLE.processing,
			},
			duration: 5000,
		})
	}

	const showComplete = message => {
		return toast.success(message, {
			style: {
				...TOAST_STYLE.common,
				...TOAST_STYLE.complete,
			},
			icon: '✅',
			duration: 5000,
		})
	}

	const showReject = message => {
		return toast.error(message, {
			style: {
				...TOAST_STYLE.common,
				...TOAST_STYLE.reject,
			},
			duration: 5000,
		})
	}

	const showFailed = message => {
		return toast.error(message, {
			style: {
				...TOAST_STYLE.common,
				...TOAST_STYLE.failed,
			},
			icon: '❌',
			duration: 5000,
		})
	}

	const showInfo = message => {
		return toast.error(message, {
			style: {
				...TOAST_STYLE.common,
				...TOAST_STYLE.info,
			},
			duration: 4000,
		})
	}

	const updateToast = (id, state, message) => {
		if (!id) return

		toast.dismiss(id)

		switch (state) {
			case 'processing':
				return showProcessing(message)
			case 'approve':
				return showApprove(message)
			case 'complete':
				return showComplete(message)
			case 'reject':
				return showReject(message)
			case 'failed':
				return showFailed(message)
			case 'info':
				return showInfo(message)
			default:
				return showInfo(message)
		}
	}

	const notify = {
		start: (message = 'Processing transaction...') => {
			return showProcessing(message)
		},

		update: (id, state, message) => {
			return updateToast(id, state, message)
		},

		approve: (id, message = 'Transaction approved') => {
			return updateToast(id, 'approve', message)
		},

		complete: (id, message = 'Transaction completed') => {
			return updateToast(id, 'complete', message)
		},

		reject: (id, message = 'Transaction rejected') => {
			return updateToast(id, 'reject', message)
		},

		fail: (id, message = 'Transaction failed') => {
			return updateToast(id, 'failed', message)
		},
	}

	return (
		<ToastContext.Provider
			value={{
				showProcessing,
				showApprove,
				showComplete,
				showReject,
				showFailed,
				showInfo,
				updateToast,
				notify,
				toast,
			}}
		>
			<Toaster
				position='bottom-right'
				toastOptions={{
					success: {
						iconTheme: {
							primary: '#22c55e',
							secondary: '#ffffff',
						},
					},
					error: {
						iconTheme: {
							primary: '#ef4444',
							secondary: '#ffffff',
						},
					},
				}}
			/>
			{children}
		</ToastContext.Provider>
	)
}

export const useToast = () => {
	const context = useContext(ToastContext)

	if (context === undefined) {
		throw new Error('useToast must be used within a ToastProvider')
	}
	return context
}
