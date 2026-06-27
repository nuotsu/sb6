'use client'

import Link from 'next/link'
import {
	getScheduleGames,
	groupScheduleGames,
	useSchedule,
	type ScheduleResponse,
} from '@/lib/mlb'
import { formatTime } from '@/lib/temporal'
import DatePicker from '@/ui/date-picker'

export function ScheduleList({
	date,
	fallback,
}: {
	date: string
	fallback?: ScheduleResponse
}) {
	const { data } = useSchedule(date, { fallback })
	const groups = groupScheduleGames(getScheduleGames(data))

	return (
		<article>
			<h1>
				<label>
					Games for <DatePicker value={date} />
				</label>
			</h1>

			{groups.map(({ state, games }) => (
				<section key={state}>
					<h2>{state}</h2>

					{games.map((game) => {
						const { away, home } = game.teams

						return (
							<details data-game-pk={game.gamePk} key={game.gamePk}>
								<summary className="flex gap-4">
									<time dateTime={game.gameDate}>
										{formatTime(game.gameDate)}
									</time>

									<div>
										<span>{away.team.abbreviation}</span>
										<strong>{away.score ?? 0}</strong>
										{'-'}
										<strong>{home.score ?? 0}</strong>
										<span>{home.team.abbreviation}</span>
									</div>
								</summary>

								<Link href={`/game/${game.gamePk}`}>Details</Link>
							</details>
						)
					})}
				</section>
			))}
		</article>
	)
}
