"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useAuthStore } from "@/stores/authStore";


function CarrotIcon({ className = "" }: { className?: string }) {
	return (
		<svg viewBox="0 0 64 64" className={className} fill="currentColor" aria-hidden="true">
			<path d="M43.4 8.7c2.8 1.6 4.5 4.6 4.5 7.9 0 1.5-.3 3-.9 4.3l-4.2-2.4 1.4-2.4-2.8-1.6-1.4 2.4-4.1-2.4 2.4-4.1-2.8-1.6-2.4 4.1-4.2-2.4c1.4-1 3-1.5 4.7-1.5 2 0 3.9.6 5.5 1.7l1.9-3.4 2.8 1.6-1.5 2.8c.1-.1.2-.1.3-.1z" />
			<path d="M17.1 34.8C14 39.9 11.4 46 9.2 53.4c-.3 1.1.2 2.3 1.2 2.8 1 .5 2.3.2 3-.7 4.6-6.2 9.1-11.1 13.4-14.7 3.7-3.1 7.1-4.8 10.2-5.1l-5.2-5.2c-1.2 2.3-3.4 4.4-6.5 6.1-3.3 1.9-4.8 1.5-8.2-1.8z" />
			<path d="M25.8 28.9c2.9 2.9 5.1 3.1 8.7.8 2-1.3 3.7-3 5.1-5.1l-7.2-7.2c-1.9 1.5-3.6 3.2-5 5.1-1.7 2.3-1.8 4.5-1.6 6.4z" />
		</svg>
	);
}

function SocialButton({
	icon,
	label,
	bgClassName,
	onClick,
}: {
	icon: React.ReactNode;
	label: string;
	bgClassName: string;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`relative flex h-[67px] w-full max-w-[364px] items-center justify-center rounded-[16px] ${bgClassName} px-5 font-poppins text-[16px] font-semibold text-white transition-transform duration-200 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
		>
			<span className="absolute left-5 flex items-center">{icon}</span>
			<span className="text-center">{label}</span>
		</button>
	);
}

export default function SignIn() {
	const router = useRouter();
	const completeMockLogin = useAuthStore((state) => state.completeMockLogin);
	const sendOtp = useAuthStore((state) => state.sendOtp);
	const isLoading = useAuthStore((state) => state.isLoading);
	const error = useAuthStore((state) => state.error);
	const clearError = useAuthStore((state) => state.clearError);
	const [phone, setPhone] = useState<string>("");

	const handlePhoneContinue = async (): Promise<void> => {
		clearError();
		const success = await sendOtp(phone);
		if (success) {
			router.push("/verification");
		}
	};

	const handleLogin = (provider: "Google" | "Facebook") => {
		completeMockLogin({
			username: provider === "Google" ? "Google User" : "Facebook User",
			email: `${provider.toLowerCase()}@nectar.app`,
			phone,
		});
		router.push("/home");
	};

	return (
		<div className="flex h-screen overflow-hidden flex-col md:flex-row md:h-screen md:overflow-hidden">
			<div className="hidden h-screen w-1/2 overflow-hidden bg-[#F8F8F8] md:block">
				<img src="/images/signin-hero.jpg" alt="Grocery flat lay" className="h-full w-full object-cover object-center" />
			</div>

			<div className="flex h-full w-full flex-col overflow-hidden bg-white md:w-1/2 md:justify-center">
				<div className="md:hidden relative h-[374px] w-full overflow-hidden bg-[#F8F8F8]">
					<img src="/images/signin-hero.jpg" alt="Grocery flat lay" className="h-full w-full object-cover object-top" />
				</div>

				<div className="flex-1 overflow-hidden px-6 pt-11 pb-8 md:mx-auto md:flex md:h-full md:w-full md:max-w-[400px] md:flex-col md:justify-center md:px-12 md:py-12 md:overflow-visible">
					<div className="origin-top scale-[0.9] md:origin-center md:scale-100">
					<div className="hidden md:flex items-center gap-3">
						<CarrotIcon className="h-8 w-8 text-[#4CAF82]" />
						<span className="font-poppins text-[28px] font-bold lowercase text-[#4CAF82]">nectar</span>
					</div>

					<h1 className="mt-0 font-poppins text-[26px] font-semibold leading-[29px] text-[#030303] md:mt-10 md:text-[32px]">
						Get your groceries
						<br />
						with nectar
					</h1>

					<div className="mt-10 w-full max-w-[364px] rounded-[8px] border border-[#E2E2E2] bg-transparent px-4 py-3 md:mt-8 md:h-[52px] md:px-5">
						<div className="flex items-center gap-3">
							<span className="text-[16px] leading-none text-[#030303]">🌐</span>
							<span className="text-[16px] font-normal leading-none text-[#030303]">+880</span>
							<div className="h-5 w-px bg-[#E2E2E2]" />
							<input
								type="tel"
								value={phone}
								onChange={(event) => {
									setPhone(event.target.value);
									if (error) {
										clearError();
									}
								}}
								onKeyDown={(event) => {
									if (event.key === "Enter") {
										event.preventDefault();
										void handlePhoneContinue();
									}
								}}
								placeholder="Phone number"
								className="min-w-0 flex-1 bg-transparent font-poppins text-[16px] text-[#030303] outline-none placeholder:text-[#828282]"
							/>
						</div>
					</div>

					<button
						type="button"
						onClick={() => {
							void handlePhoneContinue();
						}}
						disabled={isLoading}
						className="mt-4 flex h-[56px] w-full max-w-[364px] items-center justify-center rounded-[16px] bg-[#4CAF82] font-poppins text-[16px] font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
					>
						{isLoading ? "Sending OTP..." : "Continue with Phone"}
					</button>

					<button
						type="button"
						onClick={() => router.push("/login")}
						className="mt-3 flex h-[56px] w-full max-w-[364px] items-center justify-center rounded-[16px] border border-[#E2E2E2] bg-white font-poppins text-[16px] font-semibold text-[#181725] transition-colors hover:bg-gray-50"
					>
						Login with Email
					</button>

					<button
						type="button"
						onClick={() => router.push("/signup")}
						className="mt-3 flex h-[56px] w-full max-w-[364px] items-center justify-center rounded-[16px] border border-[#E2E2E2] bg-white font-poppins text-[16px] font-semibold text-[#181725] transition-colors hover:bg-gray-50"
					>
						Sign Up with Email
					</button>

					{error ? (
						<p className="mt-3 max-w-[364px] font-poppins text-[13px] text-[#D32F2F]">{error}</p>
					) : null}

					<div className="mt-10 flex items-center gap-3 md:mt-8">
						<div className="h-px flex-1 bg-[#E2E2E2]" />
						<span className="whitespace-nowrap text-center font-poppins text-[14px] font-semibold leading-none text-[#828282]">
							Or connect with social media
						</span>
						<div className="h-px flex-1 bg-[#E2E2E2]" />
					</div>

					<div className="mt-8 flex flex-col items-center gap-3 md:mt-8">
						<SocialButton
							icon={<FcGoogle className="h-5 w-5" />}
							label="Continue with Google"
							bgClassName="bg-[#5383EC]"
							onClick={() => handleLogin("Google")}
						/>

						<SocialButton
							icon={<FaFacebookF className="h-4 w-4 text-white" />}
							label="Continue with Facebook"
							bgClassName="bg-[#4A66AC]"
							onClick={() => handleLogin("Facebook")}
						/>
					</div>
					</div>
				</div>
			</div>
		</div>
	);
}
