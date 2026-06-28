import { mlbFetch, SCHEDULE_HYDRATE } from '@/lib/mlb/core'
import type { ScheduleGame, ScheduleResponse } from '@/lib/mlb/types'

export async function fetchGame(gamePk: number): Promise<ScheduleResponse> {
	return mlbFetch<ScheduleResponse>(
		'/api/v1/schedule',
		{ sportId: 1, gamePk, hydrate: SCHEDULE_HYDRATE },
		{ revalidate: 60 },
	)
}

export function getGameFromSchedule(
	data?: ScheduleResponse,
): ScheduleGame | undefined {
	return data?.dates?.[0]?.games?.[0]
}
