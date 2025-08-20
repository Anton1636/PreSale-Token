import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { HeaderHome, HeroSection } from '@/components/home/index'

const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME

export default function Home() {
	const [isDarkMode, setIsDarkMode] = useState(false)

	useEffect(() => {
		if (typeof window === 'undefined') return

		try {
			const saveMode = localStorage.getItem('darkMode')
			let systemPrefersDark = false

			try {
				systemPrefersDark = window.matchMedia(
					'(prefers-color-scheme: dark)'
				).matches
			} catch (error) {
				systemPrefersDark = false
			}

			const shouldUseDarkMode = saveMode === 'false' ? false : true
			setIsDarkMode(shouldUseDarkMode)

			if (shouldUseDarkMode) {
				document.documentElement.classList.add('dark')
			} else {
				document.documentElement.classList.remove('dark')
			}
		} catch (error) {
			console.error('Error reading dark mode preference:', error)
			setIsDarkMode(true)
			document.documentElement.classList.add('dark')
		}
	}, [])

	const toggleDarkMode = () => {
		const newDarkMode = !isDarkMode
		setIsDarkMode(newDarkMode)
		applyTheme(newDarkMode)

		try {
			localStorage.setItem('darkMode', newDarkMode.toString())
		} catch (error) {
			console.error('Error saving dark mode preference:', error)
		}
	}

	const applyTheme = dark => {
		if (typeof document === 'undefined') return

		if (dark) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}

	return (
		<div
			className={`min-h-screen ${
				isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-800'
			} transition-colors duration-300`}
		>
			<Head>
				<title>{TOKEN_NAME} Some phrase</title>
				<meta name='description' content='Initial sale MyToken' />
				<link rel='icon' href='/public/logo.png' />
			</Head>

			<HeaderHome isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

			<main>
				<HeroSection isDarkMode={isDarkMode} />
			</main>
		</div>
	)
}
