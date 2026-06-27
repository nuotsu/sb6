import useSWR from 'swr'

const fetcher = async (endpoint: string, options: RequestInit = {}) => {
	const url = new URL(endpoint, 'https://statsapi.mlb.com')
	const request = new Request(url, options)

	return fetch(request).then((res) => res.json())
}

export async function fetchMLB(endpoint: string, options: RequestInit = {}) {
	const data = await fetcher(endpoint, options)
	return { data }
}

export function fetchMLBLive(endpoint: string, options: RequestInit = {}) {
	return useSWR(endpoint, (endpoint) => fetcher(endpoint, options))
}
