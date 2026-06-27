import { mlbFetch } from '@/lib/mlb/core'
import { liveFeedRefreshInterval } from '@/lib/mlb/policies'
import type { LiveFeedResponse } from '@/lib/mlb/types'

export async function fetchLiveFeed(gamePk: number): Promise<LiveFeedResponse> {
	return mlbFetch<LiveFeedResponse>(`/api/v1.1/game/${gamePk}/feed/live`)
}

export { liveFeedRefreshInterval }
