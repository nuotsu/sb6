export const getToday = () => new Date().toISOString().split('T')[0]

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
