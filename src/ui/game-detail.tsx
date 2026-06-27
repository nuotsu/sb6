'use client'

import {
	getGameFromSchedule,
	useGameLiveFeed,
	useGameStatus,
	type LiveFeedResponse,
	type ScheduleResponse,
} from '@/lib/mlb'

export function GameDetail({
	gamePk,
	scheduleFallback,
	liveFeedFallback,
}: {
	gamePk: number
	scheduleFallback?: ScheduleResponse
	liveFeedFallback?: LiveFeedResponse
}) {
	const { data: scheduleData } = useGameStatus(gamePk, {
		fallback: scheduleFallback,
	})
	const { data: liveData } = useGameLiveFeed(gamePk, {
		fallback: liveFeedFallback,
	})

	const game = getGameFromSchedule(scheduleData)

	return (
		<article>
			<h1>Game {gamePk}</h1>
			<h2>Schedule</h2>
			<pre>{JSON.stringify(game ?? scheduleData, null, 2)}</pre>
			<h2>Live feed</h2>
			<pre>{JSON.stringify(liveData, null, 2)}</pre>
		</article>
	)
}
