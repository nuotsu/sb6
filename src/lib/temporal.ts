export const getToday = () => new Date().toISOString().split('T')[0]

export const isToday = (date: string) => date === getToday()

export const isPastDate = (date: string) => date < getToday()

export const formatTime = (iso: string) =>
	new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	}).format(new Date(iso))

export const isValidDate = (value: string) => {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false

	const [y, m, d] = value.split('-').map(Number)
	const date = new Date(y, m - 1, d)
	return (
		date.getFullYear() === y &&
		date.getMonth() === m - 1 &&
		date.getDate() === d
	)
}
