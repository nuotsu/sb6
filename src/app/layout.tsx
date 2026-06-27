import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import { preconnect } from 'react-dom'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Scorebug 6',
	description:
		'Track MLB games, live or past, and explore stats in a beautiful UI.',
}

export const viewport: Viewport = {
	themeColor: '#000000',
}

export default function ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	preconnect('https://statsapi.mlb.com')
	// preconnect('https://www.mlbstatic.com')
	// preconnect('https://midfield.mlbstatic.com')
	// preconnect('https://img.mlbstatic.com')

	return (
		<html lang="en" className="bg-background text-foreground antialiased">
			<body>{children}</body>
		</html>
	)
}
