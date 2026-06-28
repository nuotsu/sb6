import { notFound } from 'next/navigation'
import { fetchSchedule } from '@/lib/mlb'
import { isValidDate } from '@/lib/temporal'
import ScheduleList from '@/ui/schedule-list'

export default async function ({ params }: PageProps<'/schedule/[date]'>) {
	const { date } = await params

	if (!isValidDate(date)) notFound()

	const initial = await fetchSchedule(date)

	return <ScheduleList date={date} fallback={initial} />
}
