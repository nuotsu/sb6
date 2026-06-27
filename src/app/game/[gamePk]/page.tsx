import { notFound } from 'next/navigation'
import { fetchGame, fetchLiveFeed, getGameFromSchedule } from '@/lib/mlb'
import { GameDetail } from '@/ui/game-detail'

function parseGamePk(value: string) {
	const gamePk = Number(value)
	if (!Number.isInteger(gamePk) || gamePk <= 0) return null
	return gamePk
}

export default async function ({ params }: PageProps<'/game/[gamePk]'>) {
	const { gamePk: gamePkParam } = await params
	const gamePk = parseGamePk(gamePkParam)
	if (!gamePk) notFound()

	const scheduleFallback = await fetchGame(gamePk)
	if (!getGameFromSchedule(scheduleFallback)) notFound()

	const liveFeedFallback = await fetchLiveFeed(gamePk)

	return (
		<GameDetail
			gamePk={gamePk}
			scheduleFallback={scheduleFallback}
			liveFeedFallback={liveFeedFallback}
		/>
	)
}
