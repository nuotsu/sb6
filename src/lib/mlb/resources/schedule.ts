import { mlbFetch, SCHEDULE_HYDRATE } from '@/lib/mlb/core'
import { datePolicy, getScheduleGames } from '@/lib/mlb/policies'
import type { AbstractGameState, ScheduleGame, ScheduleResponse } from '@/lib/mlb/types'

export async function fetchSchedule(date: string): Promise<ScheduleResponse> {
	return mlbFetch<ScheduleResponse>(
		'/api/v1/schedule',
		{ sportId: 1, date, hydrate: SCHEDULE_HYDRATE },
		{ revalidate: datePolicy(date).server },
	)
}

export { getScheduleGames }

const STATUS_ORDER: AbstractGameState[] = ['Live', 'Preview', 'Final']

export function groupScheduleGames(games: ScheduleGame[]) {
	const groups = new Map<AbstractGameState, ScheduleGame[]>()

	for (const state of STATUS_ORDER) {
		groups.set(state, [])
	}

	for (const game of games) {
		const state = game.status.abstractGameState
		const group = groups.get(state)
		if (group) group.push(game)
	}

	return STATUS_ORDER.map((state) => ({
		state,
		games: (groups.get(state) ?? []).sort(
			(a, b) =>
				new Date(a.gameDate).getTime() - new Date(b.gameDate).getTime(),
		),
	})).filter((group) => group.games.length > 0)
}
