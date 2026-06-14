"use client";

import { useRouter } from "next/navigation";

function ConfettiRibbon({ className, color, path }: { className: string; color: string; path: string }) {
	return (
		<svg className={className} viewBox="0 0 60 24" fill="none" aria-hidden="true">
			<path d={path} stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

export default function OrderAccepted() {
	const router = useRouter();

	return (
		<main className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-green-50 px-6 py-8">
			<div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col items-center justify-center pb-[190px] text-center md:pb-[170px]">
				<div className="relative mx-auto flex h-[240px] w-[269px] items-center justify-center">
					<div className="absolute left-[5%] top-[15%] -rotate-[20deg]">
						<ConfettiRibbon className="h-[24px] w-[60px]" color="#EF5350" path="M4 15c6-8 12 8 18 0s12-8 18 0 12 8 18 0" />
					</div>
					<div className="absolute bottom-[25%] left-0 rotate-[15deg]">
						<ConfettiRibbon className="h-[24px] w-[60px]" color="#42A5F5" path="M4 15c6-8 12 8 18 0s12-8 18 0 12 8 18 0" />
					</div>
					<div className="absolute bottom-[15%] right-[20%]">
						<svg viewBox="0 0 48 24" className="h-6 w-12" fill="none" aria-hidden="true">
							<path d="M8 14c5-10 16-10 24 0" stroke="#FDD835" strokeWidth="3" strokeLinecap="round" />
						</svg>
					</div>
					<div className="absolute right-[15%] top-[10%] h-2 w-2 rounded-full bg-red-400" />
					<div className="absolute left-[10%] top-[20%] h-[6px] w-[6px] rounded-full bg-green-400" />
					<div className="absolute bottom-[20%] right-[10%] h-2 w-2 rounded-full bg-blue-400" />
					<div className="absolute bottom-[30%] left-[20%] h-[6px] w-[6px] rounded-full bg-yellow-400" />
					<div className="absolute right-[5%] top-[35%] h-[5px] w-[5px] rounded-full bg-orange-400" />
					<div className="absolute bottom-[10%] left-[35%] h-2.5 w-2.5 rounded-full border border-yellow-400" />

					<div className="relative flex h-[130px] w-[130px] items-center justify-center rounded-full bg-[#4CAF82] shadow-[0_8px_30px_rgba(76,175,130,0.35)]">
						<span className="text-[56px] font-bold leading-none text-white">✓</span>
					</div>
				</div>

				<div className="mt-6 max-w-[265px]">
					<h1 className="font-poppins text-[28px] font-semibold leading-[28px] text-[#181725]">
						Your Order has been accepted
					</h1>
				</div>

				<div className="mt-4 max-w-[278px]">
					<p className="font-poppins text-[16px] font-normal leading-[21px] text-[#7C7C7C]">
						Your items has been placcd and is on it&apos;s way to being processed
					</p>
				</div>
			</div>

			<div className="fixed bottom-[72px] left-1/2 z-20 flex w-[calc(100vw-48px)] max-w-[364px] -translate-x-1/2 flex-col items-center gap-4 md:bottom-[64px]">
				<button
					type="button"
					onClick={() => router.push("/track-order")}
					className="flex h-[67px] w-full items-center justify-center rounded-[20px] bg-[#4CAF82] font-poppins text-[18px] font-semibold text-white shadow-[0_10px_25px_rgba(76,175,130,0.22)] transition-transform duration-200 active:scale-[0.99]"
				>
					Track Order
				</button>

				<button
					type="button"
					onClick={() => router.push("/home")}
					className="font-poppins text-[16px] font-semibold text-[#181725]"
				>
					Back to home
				</button>
			</div>
		</main>
	);
}
