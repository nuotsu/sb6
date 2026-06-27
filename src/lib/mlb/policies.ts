import { isPastDate, isToday } from '@/lib/temporal'
import type { LiveFeedResponse, ScheduleGame, ScheduleResponse } from '@/lib/mlb/types'

export const policies = {
	immutable: { server: false as const, client: false as const },
	static: { server: 86400, client: false as const },
	daily: { server: 3600, client: 5 * 60_000 },
	nearLive: { server: 60, client: 60_000 },
	live: { server: 0, client: 10_000 },
}

export function datePolicy(date: string) {
	if (isPastDate(date)) return policies.immutable
	if (isToday(date)) return policies.nearLive
	return policies.daily
}

const NEAR_START_MS = 30 * 60 * 1000
const PAST_START_MS = 15 * 60 * 1000

export function getScheduleGames(data?: ScheduleResponse): ScheduleGame[] {
	return data?.dates?.[0]?.games ?? []
}

export function scheduleRefreshInterval(
	data?: ScheduleResponse,
): number {
	const games = getScheduleGames(data)
	if (games.length === 0) return 0

	const states = games.map((g) => g.status.abstractGameState)

	if (states.every((s) => s === 'Final')) return 0
	if (states.some((s) => s === 'Live')) return policies.live.client

	const now = Date.now()
	const nearStart = games.some((g) => {
		if (g.status.abstractGameState !== 'Preview') return false
		const msUntilStart = new Date(g.gameDate).getTime() - now
		return msUntilStart < NEAR_START_MS && msUntilStart > -PAST_START_MS
	})
	if (nearStart) return policies.nearLive.client

	if (states.every((s) => s === 'Preview')) return policies.daily.client

	return 30_000
}

export function gameStatusRefreshInterval(
	data?: ScheduleResponse,
): number {
	const game = getScheduleGames(data)[0]
	if (!game) return 0

	const state = game.status.abstractGameState
	if (state === 'Final') return 0
	if (state === 'Live') return policies.live.client
	return policies.nearLive.client
}

export function liveFeedRefreshInterval(
	data?: LiveFeedResponse,
): number {
	const state = data?.gameData?.status?.abstractGameState
	if (state === 'Live') return policies.live.client
	return 0
}
