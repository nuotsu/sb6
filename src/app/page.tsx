import Link from 'next/link'
import { getToday } from '@/lib/temporal'

export default function () {
	return (
		<>
			<h1>Scorebug 6</h1>

			<Link href={`/schedule/${getToday()}`}>Today</Link>
		</>
	)
}
