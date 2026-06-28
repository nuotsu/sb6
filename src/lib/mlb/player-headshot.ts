const HEADSHOT_BASE =
	'https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:silo:current.png/w_64,q_auto:best/v1/people'

export function playerHeadshotUrl(playerId?: number): string {
	return `${HEADSHOT_BASE}/${playerId ?? 0}/headshot/silo/current`
}
