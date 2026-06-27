import { gameKey, liveFeedKey, scheduleKey } from '@/lib/mlb/keys'

export const MLB_ORIGIN = 'https://statsapi.mlb.com'

type CacheOptions = {
	revalidate?: number | false
}

export function mlbUrl(
	path: string,
	params?: Record<string, string | number>,
) {
	const url = new URL(path, MLB_ORIGIN)
	if (params) {
		for (const [key, value] of Object.entries(params)) {
			url.searchParams.set(key, String(value))
		}
	}
	return url.pathname + url.search
}

export async function mlbFetch<T>(
	path: string,
	params?: Record<string, string | number>,
	cache?: CacheOptions,
): Promise<T> {
	const url = new URL(mlbUrl(path, params), MLB_ORIGIN)
	const init: RequestInit & { next?: { revalidate?: number | false } } = {}

	if (cache?.revalidate !== undefined) {
		init.next = { revalidate: cache.revalidate }
	}

	const res = await fetch(url, init)
	if (!res.ok) throw new Error(`MLB API error: ${res.status} ${url}`)
	return res.json() as Promise<T>
}

const keyToPath = (key: readonly unknown[]) => {
	const [namespace, resource, ...rest] = key
	if (namespace !== 'mlb') throw new Error(`Unknown key: ${key}`)

	if (resource === 'schedule') {
		const [date] = rest as [string]
		return mlbUrl('/api/v1/schedule', {
			sportId: 1,
			date,
			hydrate: 'team,linescore',
		})
	}

	if (resource === 'game') {
		const [gamePk, type] = rest as [number, string?]
		if (type === 'live') {
			return `/api/v1.1/game/${gamePk}/feed/live`
		}
		return mlbUrl('/api/v1/schedule', {
			sportId: 1,
			gamePk,
			hydrate: 'team,linescore',
		})
	}

	throw new Error(`Unknown key: ${key}`)
}

export async function mlbFetcher<T>(key: readonly unknown[]): Promise<T> {
	return mlbFetch<T>(keyToPath(key))
}

export { scheduleKey, gameKey, liveFeedKey }
