"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NumericDialer from "@/components/ui/NumericDialer";

function BackArrow() {
	return (
		<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d="m15 18-6-6 6-6" />
		</svg>
	);
}

function ForwardArrow() {
	return (
		<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d="m9 18 6-6-6-6" />
		</svg>
	);
}

export default function Verification() {
	const router = useRouter();
	const [code, setCode] = useState("");

	const handleDialerPress = (value: string) => {
		if (value === "backspace") {
			setCode((c) => c.slice(0, -1));
		} else if (code.length < 4) {
			setCode((c) => `${c}${value}`);
		}
	};

	const displayChars = [0, 1, 2, 3].map((i) => code[i] ?? "-");

	return (
		<div className="relative flex h-screen flex-col overflow-hidden bg-white">
			{/* Background blobs */}
			<div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-pink-200 opacity-40 blur-3xl" />
			<div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-orange-100 opacity-50 blur-2xl" />

			<div className="relative z-10 flex flex-1 flex-col px-6 pt-4">
				{/* Back button */}
				<button
					type="button"
					onClick={() => router.push("/enter-number")}
					className="flex h-6 w-6 items-center justify-center text-[#181725]"
					aria-label="Go back"
				>
					<BackArrow />
				</button>

				<h1 className="mt-10 max-w-[278px] font-poppins text-[26px] font-semibold leading-[29px] text-[#181725]">
					Enter your 4-digit code
				</h1>

				<p className="mt-3 font-poppins text-[14px] text-[#7C7C7C]">
					Code sent to your number
				</p>

				<label className="mt-8 font-poppins text-[16px] font-semibold text-[#7C7C7C]">
					Code
				</label>

				<div className="mt-2 h-[40px] w-full rounded-[8px] border border-[#E2E2E2] px-4">
					<div className="flex h-full items-center gap-3 font-poppins text-[18px] text-[#181725]">
						<span className="animate-pulse">|</span>
						{displayChars.map((char, idx) => (
							<span key={idx} className={char === "-" ? "text-[#7C7C7C]" : "text-[#181725]"}>
								{char}
							</span>
						))}
					</div>
				</div>

				{/* Resend + Forward */}
				<div className="mt-[200px] flex items-center justify-between">
					<button
						type="button"
						className="font-poppins text-[18px] font-normal text-[#53B175]"
					>
						Resend Code
					</button>
					<button
						type="button"
						onClick={() => router.push("/select-location")}
						className="flex h-[67px] w-[67px] items-center justify-center rounded-full bg-[#4CAF82] text-white"
						aria-label="Continue"
					>
						<ForwardArrow />
					</button>
				</div>
			</div>

			{/* Numeric Dialer */}
			<div className="absolute bottom-0 left-0 right-0">
				<NumericDialer onKeyPress={handleDialerPress} className="mix-blend-multiply" />
			</div>
		</div>
	);
}