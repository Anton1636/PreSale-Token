import React, { useState, useEffect, useRef, useMemo } from 'react'
import { FaEthereum } from 'react-icons/fa'
import { SiTether } from 'react-icons/si'
import { IoWalletOutline } from 'react-icons/io5'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { BsFillInfoCircleFill, BsCurrencyDollar } from 'react-icons/bs'
import { RiUsdCircleFill } from 'react-icons/ri'
import { CustomConnectButton } from '../index'
import { useWeb3 } from '@/context/Web3Provider'
import { ethers } from 'ethers'

const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME
const TOKEN_SYMBOL = process.env.NEXT_PUBLIC_TOKEN_SYMBOL
const TOKEN_SUPPLY = process.env.NEXT_PUBLIC_TOKEN_SUPPLY
const PER_TOKEN_USD_PRICE = process.env.NEXT_PUBLIC_PER_TOKEN_USD_PRICE
const NEXT_PER_TOKEN_USD_PRICE =
	process.env.NEXT_PUBLIC_NEXT_PER_TOKEN_USD_PRICE
const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY
const BLOCKCHAIN = process.env.NEXT_PUBLIC_BLOCKCHAIN

const HeroSection = ({ isDarkMode, setIsReferralPopupOpen }) => {
	const {
		account,
		isConnected,
		contractInfo,
		tokenBalances,
		buyToken,
		addTokenToMetaMask,
	} = useWeb3()

	const [selectedToken, setSelectedToken] = useState('POL')
	const [inputAmount, setInputAmount] = useState('0')
	const [tokenAmount, setTokenAmount] = useState('0')
	const [hasSufficientBalance, setHasSufficientBalance] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [hasAttemptedRegistration, setHasAttemptedRegistration] =
		useState(false)

	const canvasRef = useRef(null)
	const particlesRef = useRef([])
	const animationRef = useRef(null)

	return <div>HeroSection</div>
}

export default HeroSection
