import { formatTime } from '@/lib/temporal'
import type { GameStatus, ScheduleGame, ScheduleLinescore } from '@/lib/mlb/types'

export type GameSummaryDisplay = {
	kind: 'time' | 'inning' | 'status'
	label: string
	dateTime?: string
}

const DELAYED_START_CODES = new Set([
	'PR',
	'PS',
	'PG',
	'PV',
	'PF',
	'PC',
	'PD',
	'PB',
	'PI',
	'PP',
	'PY',
	'PL',
	'PE',
	'P9',
	'PA',
	'PO',
])

const INNING_PREFIX: Record<
	NonNullable<ScheduleLinescore['inningState']>,
	string
> = {
	Top: 'Top',
	Bottom: 'Bot',
	Middle: 'Mid',
	End: 'End',
}

export function formatInningOrdinal(n: number): string {
	const mod100 = n % 100
	if (mod100 >= 11 && mod100 <= 13) return `${n}th`

	const mod10 = n % 10
	if (mod10 === 1) return `${n}st`
	if (mod10 === 2) return `${n}nd`
	if (mod10 === 3) return `${n}rd`
	return `${n}th`
}

export function formatInningLabel(linescore: ScheduleLinescore): string | undefined {
	const { currentInning, inningState } = linescore
	if (!currentInning) return undefined

	const ordinal = formatInningOrdinal(currentInning)
	if (!inningState) return ordinal

	const prefix = INNING_PREFIX[inningState]
	return prefix ? `${prefix} ${ordinal}` : ordinal
}

export function formatShortStatus(detailedState: string): string {
	const [head] = detailedState.split(': ')
	return head
}

export function formatDelayedStart(detailedState: string): string {
	if (detailedState.startsWith('Delayed Start: ')) {
		return detailedState.replace('Delayed Start', 'Delayed')
	}
	return 'Delayed'
}

export function isDelayedStart(status: GameStatus): boolean {
	if (status.abstractGameState !== 'Preview') return false
	if (DELAYED_START_CODES.has(status.statusCode)) return true
	return status.detailedState.startsWith('Delayed Start')
}

export function getGameSummaryDisplay(game: ScheduleGame): GameSummaryDisplay {
	const { status, gameDate, linescore } = game
	const { abstractGameState, detailedState, statusCode } = status

	if (isDelayedStart(status)) {
		return {
			kind: 'status',
			label: formatDelayedStart(detailedState),
		}
	}

	if (abstractGameState === 'Preview') {
		return {
			kind: 'time',
			label: formatTime(gameDate),
			dateTime: gameDate,
		}
	}

	if (abstractGameState === 'Live') {
		const inningLabel = linescore ? formatInningLabel(linescore) : undefined
		if (inningLabel) {
			return { kind: 'inning', label: inningLabel }
		}

		if (statusCode === 'PW') {
			return {
				kind: 'time',
				label: formatTime(gameDate),
				dateTime: gameDate,
			}
		}

		return {
			kind: 'status',
			label: formatShortStatus(detailedState),
		}
	}

	return {
		kind: 'status',
		label: formatShortStatus(detailedState),
	}
}
