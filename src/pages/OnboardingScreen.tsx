"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

function CarrotIcon() {
	return (
		<svg
			viewBox="0 0 64 64"
			className="h-10 w-10 text-white"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M43.4 8.7c2.8 1.6 4.5 4.6 4.5 7.9 0 1.5-.3 3-.9 4.3l-4.2-2.4 1.4-2.4-2.8-1.6-1.4 2.4-4.1-2.4 2.4-4.1-2.8-1.6-2.4 4.1-4.2-2.4c1.4-1 3-1.5 4.7-1.5 2 0 3.9.6 5.5 1.7l1.9-3.4 2.8 1.6-1.5 2.8c.1-.1.2-.1.3-.1z" />
			<path d="M17.1 34.8C14 39.9 11.4 46 9.2 53.4c-.3 1.1.2 2.3 1.2 2.8 1 .5 2.3.2 3-.7 4.6-6.2 9.1-11.1 13.4-14.7 3.7-3.1 7.1-4.8 10.2-5.1l-5.2-5.2c-1.2 2.3-3.4 4.4-6.5 6.1-3.3 1.9-4.8 1.5-8.2-1.8z" />
			<path d="M25.8 28.9c2.9 2.9 5.1 3.1 8.7.8 2-1.3 3.7-3 5.1-5.1l-7.2-7.2c-1.9 1.5-3.6 3.2-5 5.1-1.7 2.3-1.8 4.5-1.6 6.4z" />
		</svg>
	);
}

export default function OnboardingScreen() {
	const router = useRouter();
	const completeOnboarding = useAuthStore((state) => state.completeOnboarding);

	const handleGetStarted = () => {
		completeOnboarding();
		router.push("/sign-in");
	};

	return (
		<main className="relative h-screen w-full overflow-hidden">
			<img
				src="/images/onboarding-delivery.jpg"
				alt="Grocery Delivery"
				className="absolute inset-0 h-full w-full object-cover"
			/>

			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90" />

			<div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-12 text-center">
				<div className="mb-4">
					<CarrotIcon />
				</div>

				<h1 className="font-poppins text-[48px] font-semibold leading-[1.1] text-white">
					Welcome<br />to our store
				</h1>

				<p className="mt-3 font-poppins text-[16px] font-medium text-white/70">
					Get your groceries in as fast as one hour
				</p>

				<button
					type="button"
					onClick={handleGetStarted}
					className="mt-10 h-[67px] w-full max-w-[353px] rounded-[19px] bg-[#53B175] font-poppins text-[18px] font-semibold text-white transition-all active:scale-95"
				>
					Get Started
				</button>
			</div>
		</main>
	);
}
