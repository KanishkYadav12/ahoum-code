"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/appStore";

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

function StatusBar() {
	return (
		<div className="flex items-start justify-between px-7 pt-4 text-white">
			<div className="text-[15px] font-medium leading-none tracking-[-0.02em]">9:41</div>
			<div className="mt-0.5 flex items-center gap-1.5">
				<svg viewBox="0 0 18 12" className="h-3 w-[18px] fill-white" aria-hidden="true">
					<path d="M1 9h2v2H1V9zm3-3h2v5H4V6zm3-3h2v8H7V3zm3-2h2v10h-2V1zm3 3h2v7h-2V4z" />
				</svg>
				<svg viewBox="0 0 16 12" className="h-3 w-4 fill-white" aria-hidden="true">
					<path d="M8 10.5 6.6 9.1c1.6-1.6 4.2-1.6 5.8 0L11 10.5c-1-1-2.6-1-3.6 0zm-2.4-2.5L4.2 6.6c3-3 7.9-3 10.8 0l-1.4 1.4c-2.2-2.2-5.8-2.2-8 0zM1.5 5.1.1 3.7c4.3-4.2 11.3-4.2 15.6 0l-1.4 1.4c-3.5-3.4-9.3-3.4-12.8 0zM7.8 11.4a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z" />
				</svg>
				<svg viewBox="0 0 24 12" className="h-3 w-6 fill-white" aria-hidden="true">
					<path d="M2 2h16v8H2V2zm18 3-2-1v4l2-1V5z" />
					<rect x="3.5" y="3.5" width="12.5" height="5" rx="1" />
				</svg>
			</div>
		</div>
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
			<StatusBar />

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
