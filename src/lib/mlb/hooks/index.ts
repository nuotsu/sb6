'use client'

import useSWR from 'swr'
import { gameKey, liveFeedKey, scheduleKey } from '@/lib/mlb/keys'
import {
	gameStatusRefreshInterval,
	liveFeedRefreshInterval,
	scheduleRefreshInterval,
} from '@/lib/mlb/policies'
import type { LiveFeedResponse, ScheduleResponse } from '@/lib/mlb/types'

const swrDefaults = {
	revalidateOnFocus: true,
	isPaused: () => typeof document !== 'undefined' && document.hidden,
	dedupingInterval: 5000,
}

export function useSchedule(
	date: string,
	{ fallback }: { fallback?: ScheduleResponse } = {},
) {
	return useSWR(scheduleKey(date), {
		...swrDefaults,
		fallbackData: fallback,
		refreshInterval: scheduleRefreshInterval,
	})
}

export function useGameStatus(
	gamePk: number,
	{ fallback }: { fallback?: ScheduleResponse } = {},
) {
	return useSWR(gameKey(gamePk), {
		...swrDefaults,
		fallbackData: fallback,
		refreshInterval: gameStatusRefreshInterval,
	})
}

export function useGameLiveFeed(
	gamePk: number,
	{
		fallback,
		enabled = true,
	}: { fallback?: LiveFeedResponse; enabled?: boolean } = {},
) {
	return useSWR(enabled ? liveFeedKey(gamePk) : null, {
		...swrDefaults,
		fallbackData: fallback,
		refreshInterval: liveFeedRefreshInterval,
	})
}
