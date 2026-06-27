export type AbstractGameState = 'Preview' | 'Live' | 'Final'

export type GameStatus = {
	abstractGameState: AbstractGameState
	codedGameState: string
	detailedState: string
	statusCode: string
}

export type ScheduleGameTeam = {
	team: {
		abbreviation: string
	}
	score?: number
}

export type ScheduleGameTeams = {
	away: ScheduleGameTeam
	home: ScheduleGameTeam
}

export type ScheduleGame = {
	gamePk: number
	gameDate: string
	status: GameStatus
	teams: ScheduleGameTeams
	[key: string]: unknown
}

export type ScheduleResponse = {
	dates: {
		date: string
		games: ScheduleGame[]
	}[]
}

export type LiveFeedResponse = {
	gameData: {
		status: GameStatus
		[key: string]: unknown
	}
	liveData: unknown
	[key: string]: unknown
}
