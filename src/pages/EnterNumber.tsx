"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import NumericDialer from "@/components/ui/NumericDialer";

interface PhoneInputState {
	phoneNumber: string;
}


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

export default function EnterNumber() {
	const router = useRouter();
	const sendOtp = useAuthStore((state) => state.sendOtp);
	const [state, setState] = useState<PhoneInputState>({ phoneNumber: "" });

	const handleKeyPress = (key: string): void => {
		setState((current) => ({
			phoneNumber: `${current.phoneNumber}${key}`,
		}));
	};

	const handleBackspace = (): void => {
		setState((current) => ({
			phoneNumber: current.phoneNumber.slice(0, -1),
		}));
	};

	const handleDialerPress = (value: string): void => {
		if (value === "backspace") {
			handleBackspace();
			return;
		}

		handleKeyPress(value);
	};

	const handleContinue = async (): Promise<void> => {
		const success = await sendOtp(state.phoneNumber);
		if (success) {
			router.push("/verification");
		}
	};

	return (
		<div className="flex min-h-screen flex-col overflow-hidden bg-white md:flex-row">
			<div className="hidden h-screen w-1/2 overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 md:flex md:items-center md:justify-center md:relative">
				<div className="absolute right-20 top-20 h-64 w-64 rounded-full bg-pink-300 opacity-30 blur-3xl" />
				<div className="absolute bottom-20 left-10 h-48 w-48 rounded-full bg-purple-300 opacity-30 blur-3xl" />
				<div className="absolute left-1/2 top-1/2 z-10 max-w-md -translate-x-1/2 -translate-y-1/2 px-12 text-center">
					<h2 className="font-poppins text-[32px] font-semibold text-[#181725]">Verify your number</h2>
					<p className="mt-4 font-poppins text-lg text-[#7C7C7C]">Enter your mobile number to get started</p>
				</div>
			</div>

			<div className="relative flex h-screen w-full flex-col overflow-hidden bg-white md:w-1/2">
				<div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-pink-200 opacity-40 blur-3xl md:hidden" />
				<div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-purple-200 opacity-30 blur-2xl md:hidden" />

				<div className="md:hidden">
				</div>

				<div className="relative z-10 flex flex-1 flex-col px-6 pt-4 md:mx-auto md:h-full md:w-full md:max-w-[400px] md:justify-center md:px-12 md:pt-0">
					<button
						type="button"
						onClick={() => router.push("/login")}
						className="flex h-6 w-6 items-center justify-center text-[#181725] md:mb-0"
						aria-label="Go back"
					>
						<BackArrow />
					</button>

					<h1 className="mt-[40px] max-w-[308px] font-poppins text-[26px] font-semibold leading-[29px] text-[#181725] md:text-[32px]">
						Enter your mobile number
					</h1>

					<label className="mt-[32px] font-poppins text-[16px] font-semibold leading-[29px] text-[#7C7C7C]">
						Mobile Number
					</label>

					<div className="mt-2 h-[52px] w-full max-w-[364px] rounded-[8px] border border-[#E2E2E2] bg-transparent px-3 md:mt-2">
						<div className="flex h-full items-center gap-2">
							<span className="text-[16px] leading-none">🇧🇩</span>
							<span className="text-[16px] font-normal leading-none text-[#181725]">+880</span>
							<div className="h-5 w-px bg-[#E2E2E2]" />
							<input
								type="tel"
								value={state.phoneNumber}
								onChange={(event) => setState({ phoneNumber: event.target.value })}
								placeholder=""
								className="min-w-0 flex-1 bg-transparent font-poppins text-[16px] text-[#181725] outline-none placeholder:text-[#7C7C7C]"
							/>
						</div>
					</div>

					<div className="mt-10 flex items-center gap-3 md:mt-12">
						<div className="h-px flex-1 bg-[#E2E2E2]" />
						<span className="whitespace-nowrap text-center font-poppins text-[14px] font-semibold leading-none text-[#828282]">
							Or connect with social media
						</span>
						<div className="h-px flex-1 bg-[#E2E2E2]" />
					</div>

					<div className="mt-8 flex flex-col items-center gap-3 md:mt-8 md:hidden">
						<button
							type="button"
							onClick={handleContinue}
							className="absolute right-6 top-[497px] flex h-[67px] w-[67px] items-center justify-center rounded-full bg-[#4CAF82] text-white shadow-[0_12px_28px_rgba(76,175,130,0.35)]"
							aria-label="Continue"
						>
							<ForwardArrow />
						</button>
					</div>

					<div className="hidden md:block">
						<button
							type="button"
							onClick={handleContinue}
							className="mt-10 h-14 w-full max-w-[364px] rounded-2xl bg-[#4CAF82] font-poppins text-[16px] font-semibold text-white transition-colors duration-200 hover:brightness-105"
						>
							Continue
						</button>
					</div>
				</div>

				<div className="mt-auto hidden md:hidden">
					{/* intentionally hidden for desktop only; mobile dialer appears below */}
				</div>

				<div className="absolute bottom-0 left-0 right-0 md:hidden">
					<NumericDialer onKeyPress={handleDialerPress} className="mix-blend-multiply" />
				</div>
			</div>
		</div>
	);
}
