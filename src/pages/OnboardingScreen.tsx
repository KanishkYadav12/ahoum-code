"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

function CarrotIcon() {
	return (
		<svg
			viewBox="0 0 64 64"
			className="h-8 w-8 text-white"
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
		router.push("/login");
	};

	return (
		<main className="relative h-screen overflow-hidden bg-[#FCFCFC] md:min-h-screen md:h-auto md:overflow-visible">
			<div className="flex h-screen flex-col md:min-h-screen md:h-auto md:flex-row">
				<div className="relative h-screen w-full overflow-hidden bg-[#FCFCFC] md:h-screen md:w-1/2">
					<img
						src="/images/onboarding-delivery.jpg"
						alt="Delivery partner holding groceries"
						className="absolute inset-0 h-full w-full object-cover object-top md:object-center"
					/>

					<div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_30%,rgba(0,0,0,0.5)_60%,rgba(0,0,0,0.9)_100%)] md:hidden" />

					<div className="absolute bottom-0 left-0 right-0 z-10 flex w-full flex-col items-center px-6 pb-10 md:hidden">
						<div className="mb-3">
							<CarrotIcon />
						</div>
						<h1 className="w-[253px] text-center font-poppins text-[48px] font-semibold leading-[29px] text-white">
							Welcome
							<br />
							to our store
						</h1>
						<p className="mt-2 w-[295px] text-center font-poppins text-[16px] font-normal leading-[15px] text-[#FCFCFC]/70">
							Ger your groceries in as fast as one hour
						</p>
						<button
							type="button"
							onClick={handleGetStarted}
							className="mt-6 h-14 w-full max-w-[353px] rounded-[20px] bg-[#4CAF82] font-poppins text-[18px] font-semibold text-white transition-all duration-200 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
						>
							Get Started
						</button>
					</div>
				</div>

				<div className="hidden w-1/2 flex-col justify-center bg-[#FCFCFC] px-12 md:flex">
					<div className="w-full max-w-[430px]">
						<div className="flex items-center gap-3">
							<svg
								viewBox="0 0 64 64"
								className="h-8 w-8 text-[#4CAF82]"
								fill="currentColor"
								aria-hidden="true"
							>
								<path d="M43.4 8.7c2.8 1.6 4.5 4.6 4.5 7.9 0 1.5-.3 3-.9 4.3l-4.2-2.4 1.4-2.4-2.8-1.6-1.4 2.4-4.1-2.4 2.4-4.1-2.8-1.6-2.4 4.1-4.2-2.4c1.4-1 3-1.5 4.7-1.5 2 0 3.9.6 5.5 1.7l1.9-3.4 2.8 1.6-1.5 2.8c.1-.1.2-.1.3-.1z" />
								<path d="M17.1 34.8C14 39.9 11.4 46 9.2 53.4c-.3 1.1.2 2.3 1.2 2.8 1 .5 2.3.2 3-.7 4.6-6.2 9.1-11.1 13.4-14.7 3.7-3.1 7.1-4.8 10.2-5.1l-5.2-5.2c-1.2 2.3-3.4 4.4-6.5 6.1-3.3 1.9-4.8 1.5-8.2-1.8z" />
								<path d="M25.8 28.9c2.9 2.9 5.1 3.1 8.7.8 2-1.3 3.7-3 5.1-5.1l-7.2-7.2c-1.9 1.5-3.6 3.2-5 5.1-1.7 2.3-1.8 4.5-1.6 6.4z" />
							</svg>
							<span className="font-poppins text-[28px] font-bold lowercase text-[#4CAF82]">nectar</span>
						</div>

						<h2 className="mt-12 max-w-[12ch] font-poppins text-[40px] font-semibold leading-[1.08] text-[#1E1E1E]">
							Welcome to our store
						</h2>
						<p className="mt-4 max-w-[28ch] font-poppins text-[18px] font-normal leading-7 text-[#7C7C7C]">
							Ger your groceries in as fast as one hour
						</p>

						<button
							type="button"
							onClick={handleGetStarted}
							className="mt-10 h-14 w-full max-w-[353px] rounded-[16px] bg-[#4CAF82] font-poppins text-[16px] font-semibold text-white transition-all duration-200 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF82]/40"
						>
							Get Started
						</button>

						<p className="mt-5 font-poppins text-[14px] text-[#7C7C7C]">
							Already have an account?{" "}
							<Link href="/login" className="font-semibold text-[#4CAF82]">
								Sign In
							</Link>
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
