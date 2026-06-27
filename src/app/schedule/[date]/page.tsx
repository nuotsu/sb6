import { notFound } from 'next/navigation'
import { isValidDate } from '@/lib/temporal'

export default async function ({ params }: PageProps<'/schedule/[date]'>) {
	const { date } = await params

	if (!isValidDate(date)) notFound()

	return <div>{date}</div>
}
