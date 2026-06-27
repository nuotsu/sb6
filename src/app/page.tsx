import { getToday } from '@/lib/temporal'
import { ScheduleList } from '@/ui/schedule-list'

export default function () {
	return (
		<>
			<ScheduleList date={getToday()} />
		</>
	)
}
