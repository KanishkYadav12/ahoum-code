interface MapIllustrationProps {
	className?: string;
}

export default function MapIllustration({ className = "" }: MapIllustrationProps) {
	return (
		<svg viewBox="0 0 225 171" fill="none" className={className} aria-hidden="true">
			<path d="M20 60 L120 40 L200 55 L190 140 L90 155 L15 135 Z" fill="#E8E8E8" />
			<path d="M60 80 L160 75" stroke="#F5C842" strokeWidth="8" strokeLinecap="round" />
			<path d="M80 100 L170 110" stroke="#B0BEC5" strokeWidth="4" strokeLinecap="round" />
			<path d="M190 55 L200 55 L190 140" fill="#C8C8C8" />
			<path d="M112 85 L112 55" stroke="#4A90D9" strokeWidth="3" />
			<path d="M112 20 C95 20 82 33 82 48 C82 63 112 85 112 85 C112 85 142 63 142 48 C142 33 129 20 112 20 Z" fill="#4A90D9" />
			<circle cx="112" cy="46" r="10" fill="white" />
		</svg>
	);
}
