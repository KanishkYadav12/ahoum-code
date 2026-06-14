"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/stores/appStore";

function CarrotIcon() {
	return (
		<svg
			viewBox="0 0 64 64"
			className="h-11 w-11 shrink-0 text-white"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M43.4 8.7c2.8 1.6 4.5 4.6 4.5 7.9 0 1.5-.3 3-.9 4.3l-4.2-2.4 1.4-2.4-2.8-1.6-1.4 2.4-4.1-2.4 2.4-4.1-2.8-1.6-2.4 4.1-4.2-2.4c1.4-1 3-1.5 4.7-1.5 2 0 3.9.6 5.5 1.7l1.9-3.4 2.8 1.6-1.5 2.8c.1-.1.2-.1.3-.1z" />
			<path d="M17.1 34.8C14 39.9 11.4 46 9.2 53.4c-.3 1.1.2 2.3 1.2 2.8 1 .5 2.3.2 3-.7 4.6-6.2 9.1-11.1 13.4-14.7 3.7-3.1 7.1-4.8 10.2-5.1l-5.2-5.2c-1.2 2.3-3.4 4.4-6.5 6.1-3.3 1.9-4.8 1.5-8.2-1.8z" />
			<path d="M25.8 28.9c2.9 2.9 5.1 3.1 8.7.8 2-1.3 3.7-3 5.1-5.1l-7.2-7.2c-1.9 1.5-3.6 3.2-5 5.1-1.7 2.3-1.8 4.5-1.6 6.4z" />
		</svg>
	);
}


export default function SplashScreen() {
	const router = useRouter();
	const setIsLoading = useAppStore((state) => state.setIsLoading);

	useEffect(() => {
		setIsLoading(true);
		const timeoutId = window.setTimeout(() => {
			setIsLoading(false);
			router.push("/onboarding");
		}, 2500);

		return () => window.clearTimeout(timeoutId);
	}, [router, setIsLoading]);

	return (
		<main className="flex min-h-screen w-full flex-col bg-[#4CAF82] text-white">

			<section className="flex flex-1 items-center justify-center px-6">
				<div className="flex items-center gap-4 text-white">
					<CarrotIcon />
					<div className="flex flex-col items-start">
						<h1 className="font-poppins text-[40px] font-bold leading-none tracking-[-0.5px] lowercase">
							nectar
						</h1>
						<div className="mt-1 border border-[#E91E8C] px-1.5 py-0.5 text-[11px] font-normal uppercase tracking-[0.22em] text-white">
							online groceries
						</div>
					</div>
				</div>
			</section>

			<div className="flex justify-center pb-3.5">
				<div className="h-[5px] w-[134px] rounded-[3px] border border-[#9C6FDB]" />
			</div>
		</main>
	);
}
