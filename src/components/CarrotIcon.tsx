interface CarrotIconProps {
	className?: string;
	bodyClassName?: string;
	leafClassName?: string;
	width?: number;
	height?: number;
}

export default function CarrotIcon({
	className = "",
	bodyClassName = "text-[#F4762A]",
	leafClassName = "text-[#4CAF82]",
	width = 64,
	height = 64,
}: CarrotIconProps) {
	return (
		<svg
			viewBox="0 0 64 64"
			width={width}
			height={height}
			className={className}
			fill="none"
			aria-hidden="true"
		>
			<g className={leafClassName} fill="currentColor">
				<path d="M44.3 11.4c2.9 1.5 4.8 4.4 5 7.7.1 1.5-.2 3-.8 4.4l-4.3-2.2 1.3-2.5-2.9-1.5-1.3 2.5-4.2-2.2 2.2-4.2-2.9-1.5-2.2 4.2-4.3-2.2c1.3-1.1 2.9-1.7 4.7-1.8 2 0 4 .5 5.6 1.5l1.8-3.5 2.9 1.5-1.4 2.8c.1 0 .2 0 .4 0Z" />
			</g>
			<g className={bodyClassName} fill="currentColor">
				<path d="M18.3 36.1c-3 5.2-5.4 11.4-7.3 18.9-.3 1.1.2 2.3 1.3 2.8 1 .5 2.3.1 3-.8 4.4-6.4 8.7-11.4 12.9-15.1 3.6-3.2 6.9-5 10-5.5l-5.4-5c-1.1 2.4-3.2 4.5-6.2 6.4-3.2 2-4.8 1.7-8.3-1.7Z" />
				<path d="M26.8 30c3 2.8 5.2 2.9 8.8.5 2-1.4 3.6-3.2 4.9-5.4l-7.4-6.9c-1.8 1.6-3.4 3.4-4.8 5.4-1.6 2.4-1.7 4.6-1.5 6.4Z" />
			</g>
		</svg>
	);
}
