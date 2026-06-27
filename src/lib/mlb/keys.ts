export const scheduleKey = (date: string) => ['mlb', 'schedule', date] as const

export const gameKey = (gamePk: number) => ['mlb', 'game', gamePk] as const

export const liveFeedKey = (gamePk: number) =>
	['mlb', 'game', gamePk, 'live'] as const
