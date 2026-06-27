'use client'

import { useRouter } from 'next/navigation'

export default function ({
	value,
	redirect = (date: string) => `/schedule/${date}`,
	...props
}: {
	redirect?: (date: string) => string
} & React.InputHTMLAttributes<HTMLInputElement>) {
	const router = useRouter()

	return (
		<input
			type="date"
			value={value}
			onChange={(e) => {
				const selected = e.target.value
				if (selected && selected !== value) {
					router.push(redirect(selected))
				}
			}}
			{...props}
		/>
	)
}
