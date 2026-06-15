"use client";

import { useRouter } from "next/navigation";

function GroceryBagIllustration() {
	return (
		<svg viewBox="0 0 200 200" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
			{/* Background circle */}
			<circle cx="100" cy="100" r="90" fill="#F0F7F0" />

			{/* Bag body */}
			<path d="M65 95 L70 160 L130 160 L135 95 Z" fill="#E8A857" />
			<path d="M65 95 L135 95 L132 105 L68 105 Z" fill="#D4943F" />

			{/* Bag top fold */}
			<path d="M72 85 Q100 78 128 85 L135 95 L65 95 Z" fill="#C8832E" />

			{/* Bag handles */}
			<path d="M82 85 Q82 65 92 65 Q102 65 102 75" stroke="#C8832E" strokeWidth="5" strokeLinecap="round" fill="none" />
			<path d="M118 85 Q118 65 108 65 Q98 65 98 75" stroke="#C8832E" strokeWidth="5" strokeLinecap="round" fill="none" />

			{/* Baguette sticking out */}
			<rect x="115" y="55" width="12" height="55" rx="6" fill="#D4943F" transform="rotate(15 121 82)" />
			<rect x="116" y="56" width="10" height="30" rx="5" fill="#E8B870" transform="rotate(15 121 82)" />

			{/* Leafy green */}
			<ellipse cx="88" cy="68" rx="14" ry="8" fill="#4CAF82" transform="rotate(-20 88 68)" />
			<ellipse cx="80" cy="72" rx="12" ry="7" fill="#3D9E6E" transform="rotate(-35 80 72)" />
			<line x1="88" y1="75" x2="88" y2="62" stroke="#2E7D55" strokeWidth="2" />

			{/* Tomato */}
			<circle cx="95" cy="80" r="10" fill="#FF5252" />
			<path d="M92 70 Q95 66 98 70" stroke="#4CAF82" strokeWidth="2.5" strokeLinecap="round" fill="none" />

			{/* Carrot top */}
			<path d="M75 78 L80 95" stroke="#FF8C42" strokeWidth="5" strokeLinecap="round" />
			<path d="M72 74 Q75 70 78 74" stroke="#4CAF82" strokeWidth="2" strokeLinecap="round" fill="none" />
			<path d="M75 72 Q78 68 81 72" stroke="#4CAF82" strokeWidth="2" strokeLinecap="round" fill="none" />

			{/* Eggplant */}
			<ellipse cx="110" cy="82" rx="7" ry="11" fill="#7B5EA7" />
			<path d="M108 71 Q110 67 112 71" stroke="#4CAF82" strokeWidth="2.5" strokeLinecap="round" fill="none" />
		</svg>
	);
}

export default function OrderFailure() {
	const router = useRouter();

	return (
		<main className="flex min-h-screen items-center justify-center bg-black/30 px-6">
			<div className="relative w-full max-w-[320px] rounded-[24px] bg-white px-6 py-8">
				{/* Close */}
				<button
					type="button"
					onClick={() => router.push("/home")}
					aria-label="Close"
					className="absolute left-5 top-5 flex h-7 w-7 items-center justify-center rounded-full text-[#181725]"
				>
					<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
						<path d="M18 6 6 18M6 6l12 12" />
					</svg>
				</button>

				{/* Illustration */}
				<div className="mx-auto mt-6 h-[160px] w-[160px]">
					<GroceryBagIllustration />
				</div>

				{/* Text */}
				<h1 className="mt-6 text-center font-poppins text-[24px] font-bold text-[#181725]">
					Oops! Order Failed
				</h1>
				<p className="mt-3 text-center font-poppins text-[15px] leading-[22px] text-[#7C7C7C]">
					Something went terribly wrong.
				</p>

				{/* Actions */}
				<button
					type="button"
					onClick={() => router.back()}
					className="mt-8 flex h-[60px] w-full items-center justify-center rounded-[19px] bg-[#4CAF82] font-poppins text-[18px] font-semibold text-white transition-transform active:scale-95"
				>
					Please Try Again
				</button>

				<button
					type="button"
					onClick={() => router.push("/home")}
					className="mt-4 w-full text-center font-poppins text-[16px] font-semibold text-[#181725]"
				>
					Back to home
				</button>
			</div>
		</main>
	);
}