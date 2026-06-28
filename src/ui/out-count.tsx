import cn from 'cnfast'

export default function ({ outs = 0 }: { outs?: number }) {
	return (
		<div className="mt-[-4px] flex items-center gap-[2px] *:inline-block *:size-[.4ch] *:rounded-full *:border-[.5px]">
			{Array.from({ length: 3 }).map((_, index) => (
				<span className={cn(index < outs && 'bg-current')} key={index} />
			))}
		</div>
	)
}
