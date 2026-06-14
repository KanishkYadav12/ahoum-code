"use client";

import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/stores/checkoutStore";

function BagIllustration() {
	return (
		<div className="relative flex h-[222px] w-[222px] items-center justify-center rounded-full bg-[#EEF8F2]">
			<div className="absolute bottom-[41px] h-[130px] w-[110px] overflow-hidden rounded-t-[4px] rounded-b-[8px] bg-[#C8A882]">
				<div className="absolute right-0 top-0 h-full w-[30px] bg-[#B8966E]" />
				<svg viewBox="0 0 110 130" className="absolute inset-0 h-full w-full" aria-hidden="true">
					<path d="M0 18h110v112H0z" fill="#C8A882" />
					<path d="M0 18l14 14h82l14-14v12H0z" fill="#C8A882" />
				</svg>
				<div className="absolute left-[-6px] top-[-52px] h-[60px] w-[10px] rounded-full bg-[#4CAF82] rotate-[10deg]" />
				<div className="absolute left-[18px] top-[-36px] h-[36px] w-[18px] rounded-full bg-[#4CAF82] rotate-[-6deg]" />
				<div className="absolute right-[18px] top-[-42px] h-[40px] w-[26px] rounded-full bg-[#E76F51]" />
				<div className="absolute right-[40px] top-[-44px] h-[32px] w-[18px] rounded-[5px] bg-[#E9C46A]" />
				<div className="absolute left-[45px] top-[-52px] h-[60px] w-[18px] rounded-full bg-[#8ECAE6]" />
				<div className="absolute left-[70px] top-[-30px] h-[44px] w-[20px] rounded-[10px] bg-[#9D4EDD]" />
			</div>
		</div>
	);
}

export default function OrderFailedModal() {
	const router = useRouter();
	const isOrderFailed = useCheckoutStore((state) => state.isOrderFailed);
	const setOrderFailed = useCheckoutStore((state) => state.setOrderFailed);
	const retryOrder = useCheckoutStore((state) => state.retryOrder);

	if (!isOrderFailed) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-[60]">
			<div className="absolute inset-0 bg-black/40" />

			<div className="fixed left-1/2 top-1/2 z-[60] flex w-[calc(100vw-32px)] max-w-[364px] -translate-x-1/2 -translate-y-1/2 justify-center md:w-[420px] md:max-w-none">
				<div className="relative flex h-[calc(100vh-32px)] max-h-[601.93px] w-full flex-col overflow-hidden rounded-[18px] bg-white px-6 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.12)] md:h-auto md:min-h-[601px] md:px-8 md:py-8">
					<button type="button" aria-label="Close order failed modal" onClick={() => setOrderFailed(false)} className="absolute left-4 top-4 flex h-5 w-5 items-center justify-center text-[20px] leading-none text-[#181725]">
						✕
					</button>

					<div className="flex flex-1 flex-col items-center justify-center overflow-y-auto pt-6 text-center">
						<BagIllustration />

						<h2 className="mt-6 font-poppins text-[28px] font-semibold leading-[28px] text-[#181725]">
							Oops! Order Failed
						</h2>

						<p className="mt-4 font-poppins text-[16px] font-normal leading-[21px] text-[#7C7C7C]">
							Something went terribly wrong.
						</p>
					</div>

					<div className="mt-6 flex flex-col items-center gap-2 pb-1">
						<button type="button" onClick={retryOrder} className="flex h-[67px] w-full max-w-[313px] items-center justify-center rounded-[20px] bg-[#4CAF82] font-poppins text-[18px] font-semibold text-white transition-transform duration-200 active:scale-[0.99]">
							Please Try Again
						</button>

						<button type="button" onClick={() => router.push("/home")} className="flex h-[67px] w-full max-w-[313px] items-center justify-center rounded-[20px] bg-white font-poppins text-[16px] font-semibold text-[#181725]">
							Back to home
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
