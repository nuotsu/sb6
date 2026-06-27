export { mlbFetch, mlbFetcher, mlbUrl, MLB_ORIGIN } from '@/lib/mlb/core'
export { scheduleKey, gameKey, liveFeedKey } from '@/lib/mlb/keys'
export {
	policies,
	datePolicy,
	getScheduleGames,
	scheduleRefreshInterval,
	gameStatusRefreshInterval,
	liveFeedRefreshInterval,
} from '@/lib/mlb/policies'
export type {
	AbstractGameState,
	GameStatus,
	ScheduleGame,
	ScheduleResponse,
	LiveFeedResponse,
} from '@/lib/mlb/types'

export {
	fetchSchedule,
	groupScheduleGames,
} from '@/lib/mlb/resources/schedule'

export { fetchGame, getGameFromSchedule } from '@/lib/mlb/resources/game/status'

export { fetchLiveFeed } from '@/lib/mlb/resources/game/live-feed'

export { useSchedule, useGameStatus, useGameLiveFeed } from '@/lib/mlb/hooks'
