export type AbstractGameState = 'Preview' | 'Live' | 'Final'

export type GameStatus = {
	abstractGameState: AbstractGameState
	codedGameState: string
	detailedState: string
	statusCode: string
}

export type ProbablePitcher = {
	id: number
	fullName: string
}

export type ScheduleGameTeam = {
	team: {
		abbreviation: string
	}
	score?: number
	probablePitcher?: ProbablePitcher
}

export type ScheduleGameTeams = {
	away: ScheduleGameTeam
	home: ScheduleGameTeam
}

export type ScheduleLinescore = {
	currentInning?: number
	inningState?: 'Top' | 'Middle' | 'Bottom' | 'End'
	inningHalf?: string
}

export type ScheduleGame = {
	gamePk: number
	gameDate: string
	status: GameStatus
	teams: ScheduleGameTeams
	linescore?: ScheduleLinescore
	[key: string]: unknown
}

export type ScheduleResponse = {
	dates: {
		date: string
		games: ScheduleGame[]
	}[]
}

export type BaseRunner = {
	id: number
	fullName: string
}

export type RunnersOnBase = {
	first?: BaseRunner
	second?: BaseRunner
	third?: BaseRunner
}

export type LiveFeedLinescore = {
	inningState?: ScheduleLinescore['inningState']
	outs?: number
	offense?: RunnersOnBase & Record<string, unknown>
}

export type LiveFeedResponse = {
	gameData: {
		status: GameStatus
		[key: string]: unknown
	}
	liveData: {
		linescore?: LiveFeedLinescore
		[key: string]: unknown
	}
}
