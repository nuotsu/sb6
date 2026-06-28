'use client'

import Link from 'next/link'
import {
	getGameSummaryDisplay,
	getScheduleGames,
	groupScheduleGames,
	playerHeadshotUrl,
	useSchedule,
	type ScheduleResponse,
} from '@/lib/mlb'
import DatePicker from '@/ui/date-picker'
import LiveDiamond from '@/ui/live-diamond'

export default function ({
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
						const summary = getGameSummaryDisplay(game)
						const showScore =
							game.status.abstractGameState === 'Live' ||
							game.status.abstractGameState === 'Final'
						const isLive = game.status.abstractGameState === 'Live'

						return (
							<details data-game-pk={game.gamePk} key={game.gamePk}>
								<summary className="flex gap-4">
									{summary.kind === 'time' ? (
										<time dateTime={summary.dateTime}>{summary.label}</time>
									) : (
										<span>{summary.label}</span>
									)}

									<div className="flex text-center">
										<span>{away.team.abbreviation}</span>

										{showScore ? (
											<>
												<strong className="inline-block w-[2ch]">
													{away.score ?? 0}
												</strong>

												{isLive ? <LiveDiamond gamePk={game.gamePk} /> : '-'}

												<strong className="inline-block w-[2ch]">
													{home.score ?? 0}
												</strong>
											</>
										) : (
											<>
												<img
													className="size-lh"
													src={playerHeadshotUrl(away.probablePitcher?.id)}
													alt={away.probablePitcher?.fullName ?? ''}
												/>
												<img
													className="size-lh"
													src={playerHeadshotUrl(home.probablePitcher?.id)}
													alt={home.probablePitcher?.fullName ?? ''}
												/>
											</>
										)}

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
