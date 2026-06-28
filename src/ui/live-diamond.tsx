'use client'

import cn from 'cnfast'
import { getRunnersOnBase, useGameLiveFeed } from '@/lib/mlb'
import Bases from '@/ui/bases'
import OutCount from './out-count'

export default function ({ gamePk }: { gamePk: number }) {
	const { data } = useGameLiveFeed(gamePk)
	const { first, second, third } = getRunnersOnBase(data)
	const inningState = data?.liveData?.linescore?.inningState
	const isBetweenHalfInnings = inningState === 'Middle' || inningState === 'End'

	return (
		<div
			className={cn(
				'relative grid w-[1.25lh] place-items-center',
				isBetweenHalfInnings && 'opacity-40',
			)}
		>
			<Bases first={first} second={second} third={third} />
			<OutCount
				outs={
					isBetweenHalfInnings ? 0 : (data?.liveData?.linescore?.outs ?? 0)
				}
			/>
		</div>
	)
}
