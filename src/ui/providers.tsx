'use client'

import { SWRConfig } from 'swr'
import { mlbFetcher } from '@/lib/mlb'

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SWRConfig value={{ fetcher: mlbFetcher, dedupingInterval: 5000 }}>
			{children}
		</SWRConfig>
	)
}
