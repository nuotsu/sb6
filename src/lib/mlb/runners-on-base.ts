import type { LiveFeedResponse, RunnersOnBase } from '@/lib/mlb/types'

export function getRunnersOnBase(data?: LiveFeedResponse): RunnersOnBase {
	const offense = data?.liveData?.linescore?.offense
	if (!offense) return {}

	return {
		first: offense.first,
		second: offense.second,
		third: offense.third,
	}
}
