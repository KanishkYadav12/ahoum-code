"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import NumericDialer from "@/components/ui/NumericDialer";
import { useAuthStore } from "@/stores/authStore";

interface VerificationState {
	code: string;
}

function StatusBar() {
	return (
		<div className="flex h-11 items-center justify-between px-6 pt-[4.83px] text-[#181725]">
			<span className="text-sm font-medium leading-none">9:41</span>
			<div className="flex items-center gap-1.5">
				<svg viewBox="0 0 18 12" className="h-3 w-[18px] fill-current" aria-hidden="true">
					<path d="M1 9h2v2H1V9zm3-3h2v5H4V6zm3-3h2v8H7V3zm3-2h2v10h-2V1zm3 3h2v7h-2V4z" />
				</svg>
				<svg viewBox="0 0 16 12" className="h-3 w-4 fill-current" aria-hidden="true">
					<path d="M8 10.5 6.6 9.1c1.6-1.6 4.2-1.6 5.8 0L11 10.5c-1-1-2.6-1-3.6 0zm-2.4-2.5L4.2 6.6c3-3 7.9-3 10.8 0l-1.4 1.4c-2.2-2.2-5.8-2.2-8 0zM1.5 5.1.1 3.7c4.3-4.2 11.3-4.2 15.6 0l-1.4 1.4c-3.5-3.4-9.3-3.4-12.8 0zM7.8 11.4a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z" />
				</svg>
				<svg viewBox="0 0 24 12" className="h-3 w-6 fill-current" aria-hidden="true">
					<path d="M2 2h16v8H2V2zm18 3-2-1v4l2-1V5z" />
					<rect x="3.5" y="3.5" width="12.5" height="5" rx="1" />
				</svg>
			</div>
		</div>
	);
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

export default function Verification() {
	const router = useRouter();
	const isDev = process.env.NODE_ENV === "development";
	const verifyOtp = useAuthStore((state) => state.verifyOtp);
	const sendOtp = useAuthStore((state) => state.sendOtp);
	const pendingPhone = useAuthStore((state) => state.pendingPhone);
	const isLoading = useAuthStore((state) => state.isLoading);
	const error = useAuthStore((state) => state.error);
	const clearError = useAuthStore((state) => state.clearError);
	const [state, setState] = useState<VerificationState>({ code: "" });
	const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

	const handleKeyPress = (key: string): void => {
		if (!/^\d$/.test(key)) {
			return;
		}

		setState((current) => {
			if (current.code.length >= 4) {
				return current;
			}
			return { code: `${current.code}${key}` };
		});
	};

	const handleBackspace = (): void => {
		setState((current) => ({ code: current.code.slice(0, -1) }));
	};

	const handleDialerPress = (value: string): void => {
		if (value === "backspace") {
			handleBackspace();
			return;
		}

		handleKeyPress(value);
	};

	const handleVerify = async (): Promise<void> => {
		clearError();
		const success = await verifyOtp(state.code);
		if (success) {
			router.push("/select-location");
		}
	};

	const handleResend = async (): Promise<void> => {
		if (!pendingPhone) {
			return;
		}
		clearError();
		await sendOtp(pendingPhone);
	};

	const handleDesktopOtpChange = (index: number, value: string): void => {
		const clean = value.replace(/\D/g, "").slice(-1);

		setState((current) => {
			const chars = current.code.split("");
			chars[index] = clean;
			const joined = chars.join("").slice(0, 4);
			return { code: joined };
		});

		if (clean && index < 3) {
			otpRefs.current[index + 1]?.focus();
		}
	};

	const handleDesktopOtpKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key === "Backspace" && !state.code[index] && index > 0) {
			otpRefs.current[index - 1]?.focus();
		}
	};

	const mobileDisplayChars = [0, 1, 2, 3].map((idx) => state.code[idx] ?? "-");

	return (
		<div className="flex min-h-screen flex-col md:flex-row">
			<div className="relative hidden h-screen w-1/2 overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 md:flex md:items-center md:justify-center">
				<div className="absolute right-20 top-20 h-64 w-64 rounded-full bg-pink-300 opacity-30 blur-3xl" />
				<div className="absolute bottom-20 left-10 h-48 w-48 rounded-full bg-purple-300 opacity-30 blur-3xl" />
				<div className="z-10 px-12 text-center">
					<h2 className="font-poppins text-[32px] font-semibold text-[#181725]">OTP Verification</h2>
					<p className="mt-4 font-poppins text-lg text-[#7C7C7C]">We sent a 4-digit code to your number</p>
				</div>
			</div>

			<div className="relative flex h-screen w-full flex-col overflow-hidden bg-white md:w-1/2">
				<div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-pink-200 opacity-40 blur-3xl md:hidden" />
				<div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-orange-100 opacity-50 blur-2xl md:hidden" />

				<div className="md:hidden">
					<StatusBar />
				</div>

				<div className="relative z-10 flex flex-1 flex-col px-6 pt-4 md:mx-auto md:h-full md:w-full md:max-w-[400px] md:justify-center md:px-12 md:pt-0">
					<button
						type="button"
						onClick={() => router.push("/enter-number")}
						className="flex h-6 w-6 items-center justify-center text-[#181725]"
						aria-label="Go back"
					>
						<BackArrow />
					</button>

					<h1 className="mt-[40px] max-w-[278px] font-poppins text-[26px] font-semibold leading-[29px] text-[#181725] md:text-[32px]">
						Enter your 4-digit code
					</h1>

					{pendingPhone ? (
						<p className="mt-3 font-poppins text-[14px] text-[#7C7C7C]">Code sent to {pendingPhone}</p>
					) : null}

					<label className="mt-[32px] font-poppins text-[16px] font-semibold leading-[29px] text-[#7C7C7C]">Code</label>

					<div className="mt-2 h-[40px] w-full max-w-[364px] rounded-[8px] border border-[#E2E2E2] bg-transparent px-4 md:hidden">
						<div className="flex h-full items-center gap-3 font-poppins text-[18px] text-[#181725]">
							<span className="animate-pulse">|</span>
							{mobileDisplayChars.map((char, idx) => (
								<span key={idx.toString()} className={char === "-" ? "text-[#7C7C7C]" : "text-[#181725]"}>
									{char}
								</span>
							))}
						</div>
					</div>

					<div className="hidden gap-3 mt-4 md:flex">
						{[0, 1, 2, 3].map((index) => {
							const value = state.code[index] ?? "";
							const isFilled = value.length > 0;

							return (
								<input
									key={index.toString()}
									ref={(node) => {
										otpRefs.current[index] = node;
									}}
									type="text"
									inputMode="numeric"
									maxLength={1}
									value={value}
									onChange={(event) => handleDesktopOtpChange(index, event.target.value)}
									onKeyDown={(event) => handleDesktopOtpKeyDown(index, event)}
									className={`h-16 w-16 rounded-[12px] border-2 text-center font-poppins text-[24px] font-semibold text-[#181725] outline-none ${
										isFilled ? "border-[#4CAF82]" : "border-[#E2E2E2]"
									}`}
								/>
							);
						})}
					</div>

					<div className="mt-[200px] flex items-center justify-between md:hidden">
						<button
							type="button"
							onClick={() => {
								void handleResend();
							}}
							disabled={isLoading || !pendingPhone}
							className="font-poppins text-[18px] font-normal leading-[29px] text-[#53B175]"
						>
							Resend Code
						</button>

						<button
							type="button"
							onClick={() => {
								void handleVerify();
							}}
							disabled={isLoading}
							className="flex h-[67px] w-[67px] items-center justify-center rounded-full bg-[#4CAF82] text-white"
							aria-label="Verify"
						>
							<ForwardArrow />
						</button>
					</div>

					<button
						type="button"
						onClick={() => {
							void handleResend();
						}}
						disabled={isLoading || !pendingPhone}
						className="hidden cursor-pointer font-poppins text-[16px] font-normal text-[#53B175] mt-6 text-left disabled:cursor-not-allowed disabled:opacity-50 md:block"
					>
						Resend Code
					</button>

					<button
						type="button"
						onClick={() => {
							void handleVerify();
						}}
						disabled={isLoading}
						className="hidden h-14 w-full max-w-[364px] rounded-2xl bg-[#4CAF82] font-poppins text-white font-semibold mt-8 disabled:cursor-not-allowed disabled:opacity-60 md:block"
					>
						{isLoading ? "Verifying..." : "Verify Code"}
					</button>

					{error ? <p className="mt-4 font-poppins text-[13px] text-[#D32F2F]">{error}</p> : null}
					{isDev ? <p className="mt-2 font-poppins text-[12px] text-[#7C7C7C]">Demo OTP: 1234</p> : null}
				</div>

				<div className="absolute bottom-0 left-0 right-0 md:hidden">
					<NumericDialer onKeyPress={handleDialerPress} className="mix-blend-multiply" />
				</div>
			</div>
		</div>
	);
}
