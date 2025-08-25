import React from 'react'
import Link from 'next/link'
import { useForm, ValidationError } from '@formspree/react'
import {
	FaTwitter,
	FaTelegram,
	FaDiscord,
	FaMedium,
	FaGithub,
	FaPaperPlane,
	FaCheck,
} from 'react-icons/fa'

const FROMSPREE_API_KEY = process.env.NEXT_PUBLIC_FORMSPREE_API_KEY

const Footer = ({ isDarkMode }) => {
	const [state, handleSubmit] = useForm(FROMSPREE_API_KEY)
	const bgGradient = isDarkMode
		? 'bg-gradient-to-b from-[#0E0B12] to-[#080610]'
		: 'bg-gradient-to-b from-[#f3f3f7] to-[#e8e8f0]'
	const headingColor =
		'bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600'
	const linkHoverColor =
		'hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-purple-600'
	const borderColor = isDarkMode ? 'border-gray-800/40' : 'border-gray-300/40'
	const textColor = isDarkMode ? 'text-gray-300' : 'text-gray-700'
	const textColorSecondary = isDarkMode ? 'text-gray-400' : 'text-gray-600'
	const textColorTertiary = isDarkMode ? 'text-gray-500' : 'text-gray-500'

	return (
		<footer
			className={`py-20 ${bgGradient} ${textColor} transition-colors duration-300 relative overflow-hidden`}
		>
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute -top-40 -right-40 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl'></div>

				<div className='absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl'></div>
			</div>

			<div className='container mx-auto px-4 md:px-6 relative z-10'>
				<div className='grid grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12'>
					<div className='lg:col-span-2'>
						<div className='mb-6'>
							<div className='inline-flex items-center space-x-2'>
								<div className='w-10 h-10 rounded-full flex items-center justify-center'>
									<img src='/logo.png' alt='' />
								</div>
								<h3 className={`text-xl font-bold ${headingColor}`}>MyToken</h3>
							</div>
						</div>

						<p
							className={`text-sm ${textColorSecondary} max-w-md mb-6 leading-relaxed`}
						>
							Your Description
						</p>
						<div className='flex flex-wrap space-x-5 mt-6'>
							<a
								href='#'
								className='w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-teal-400/10 to-indigo-500/10 hover:from-fuchsia-500 hover:to-purple-600 transition-all duration-300 group'
								aria-label='Twitter'
							>
								<FaTwitter
									size={18}
									className={`${textColorSecondary} group-hover:text-white transition-colors`}
								/>
							</a>
							<a
								href='#'
								className='w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-teal-400/10 to-indigo-500/10 hover:from-fuchsia-500 hover:to-purple-600 transition-all duration-300 group'
								aria-label='Telegram'
							>
								<FaTelegram
									size={18}
									className={`${textColorSecondary} group-hover:text-white transition-colors`}
								/>
							</a>
							<a
								href='#'
								className='w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-teal-400/10 to-indigo-500/10 hover:from-fuchsia-500 hover:to-purple-600 transition-all duration-300 group'
								aria-label='Discord'
							>
								<FaDiscord
									size={18}
									className={`${textColorSecondary} group-hover:text-white transition-colors`}
								/>
							</a>
						</div>

						<div className='mt-8 p-4 rounded-xl bg-gradient-to-r from-teal-400/5 to-indigo-500/5 backdrop-blur-sm'>
							<h4 className='text-sm font-semibold mb-2'>
								Stay updated with our latest news
							</h4>
							<form onSubmit={handleSubmit}>
								{state.succeeded && (
									<div className={`mb-4 p-3 rounded-lg flex items-start gap-2`}>
										<FaCheck className='mt-1 flex-shrink-0' />
										<span>Your message was sent successfully.</span>
									</div>
								)}

								<div className='flex'>
									<input
										type='email'
										name='email'
										id='email'
										placeholder='Enter your email'
										className={`flex-grow px-4 py-2 text-sm rounded-l-lg focus:outline-none ${
											isDarkMode
												? 'bg-gray-800 border-gray-700'
												: 'bg-white border-gray-200'
										} border`}
									/>
									<ValidationError
										prefix='Email'
										field='email'
										errors={state.errors}
									/>

									<button
										disabled={state.submitting}
										className='px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white rounded-r-lg text-sm whitespace-nowrap hover:from-fuchsia-500 hover:to-purple-600 transition-all duration-300'
									>
										{state.submitting ? (
											<>
												<span className='inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
												Subscribing ...
											</>
										) : (
											<>Subscribe</>
										)}
									</button>
								</div>
							</form>
						</div>
					</div>

					<div>
						<h3 className='text-lg font-semibold mb-5'>Resources</h3>
						<ul className='space-y-3'>
							{['Roadmap', 'Docs'].map((item, index) => (
								<li key={`resource-${index}`}>
									<Link
										href='/dashboard'
										className={`text-sm ${textColorSecondary} ${linkHoverColor} transition-all duration-300 flex items-center group`}
									>
										<span className='w-1.5 h-1.5 rounded-full bg-purple-600 mr-2 opacity-0 group-hover:opacity-100 transition-opacity'></span>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className='text-lg font-semibold mb-5'>Community</h3>
						<ul className='space-y-3'>
							{['Events', 'Partners', 'Bounty Program'].map((item, index) => (
								<li key={`community-${index}`}>
									<Link
										href='/dashboard'
										className={`text-sm ${textColorSecondary} ${linkHoverColor} transition-all duration-300 flex items-center group`}
									>
										<span className='w-1.5 h-1.5 rounded-full bg-purple-600 mr-2 opacity-0 group-hover:opacity-100 transition-opacity'></span>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className='text-lg font-semibold mb-5'>Contact</h3>
						<ul className='space-y-3'>
							{['Support', 'Contact Us'].map((item, index) => (
								<li key={`contact-${index}`}>
									<Link
										href='/dashboard'
										className={`text-sm ${textColorSecondary} ${linkHoverColor} transition-all duration-300 flex items-center group`}
									>
										<span className='w-1.5 h-1.5 rounded-full bg-purple-600 mr-2 opacity-0 group-hover:opacity-100 transition-opacity'></span>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div
					className={`mt-16 pt-8 border-t ${borderColor} flex flex-col md:flex-row justify-between items-center`}
				>
					<p className={`text-sm ${textColorSecondary} mb-4 mb:mb-0`}>
						&copy; {new Date().getFullYear()} All rights reserved.
					</p>

					<div className='flex flex-wrap justify-center gap-6'>
						{['Terms of Service', 'Privacy Policy'].map((item, index) => (
							<Link
								target='_blank'
								key={`legal-${index}`}
								href={`/`}
								className={`text-sm ${textColorSecondary} ${linkHoverColor} transition-all duration-300`}
							>
								{item}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
