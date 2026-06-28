import { cn } from 'cnfast'
import type { BaseRunner, RunnersOnBase } from '@/lib/mlb/types'

function Base({
	base,
	runner,
	className,
	...props
}: {
	base: string
	runner?: BaseRunner
	className: string
} & Record<string, unknown>) {
	return (
		<div
			className={cn(className, runner ? 'bg-current' : '')}
			title={[runner?.fullName, base].filter(Boolean).join(' on ')}
			{...props}
		/>
	)
}

export default function ({ first, second, third }: RunnersOnBase) {
	return (
		<div className="grid rotate-45 grid-cols-2 gap-[2px] *:size-[.3lh] *:border-[.5px]">
			<Base runner={first} className="order-2" base="first" />
			<Base runner={second} className="order-1" base="second" />
			<Base runner={third} className="order-3" base="third" />
		</div>
	)
}
