"use client";

import { useRouter } from "next/navigation";
import CarrotIcon from "@/components/CarrotIcon";

export default function OnboardingScreen() {
	const router = useRouter();

	return (
		<main className="relative flex h-screen w-full flex-col items-center justify-end overflow-hidden px-6 pb-20">
			{/* Hero Image */}
			<div className="absolute inset-0 -z-10">
				<img
					src="/images/onboarding-delivery.jpg"
					alt="Welcome to Nectar"
					className="h-full w-full object-cover"
				/>
				{/* Dark Gradient Overlay */}
				<div className="absolute inset-0 bg-black/40" />
				<div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
			</div>

			<div className="flex w-full flex-col items-center text-center">
				<CarrotIcon className="mb-8 text-white" width={48} height={56} leafClassName="text-white" bodyClassName="text-white" />

				<h1 className="font-poppins text-[48px] font-semibold leading-[56px] text-white">
					Welcome
					<br />
					to our store
				</h1>

				<p className="mt-4 font-poppins text-[16px] font-medium text-white/70">
					Get your groceries in as fast as one hour
				</p>

				<button
					type="button"
					onClick={() => router.push("/signin")}
					className="mt-10 flex h-[67px] w-full max-w-[364px] items-center justify-center rounded-[19px] bg-[#53B175] font-poppins text-[18px] font-semibold text-white transition-transform active:scale-95"
				>
					Get Started
				</button>
			</div>
		</main>
	);
}
