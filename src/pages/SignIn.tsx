"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useAuthStore } from "@/stores/authStore";

function StatusBar() {
	return (
		<div className="absolute left-0 right-0 top-[5px] z-20 flex items-center justify-between px-6 text-[#030303]">
			<span className="text-[15px] font-medium leading-none">9:41</span>
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
	const [phone, setPhone] = useState<string>("");

	const handleLogin = (provider: "Google" | "Facebook") => {
		completeMockLogin({
			name: provider === "Google" ? "Google User" : "Facebook User",
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
					<StatusBar />
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
								onChange={(event) => setPhone(event.target.value)}
								placeholder="Phone number"
								className="min-w-0 flex-1 bg-transparent font-poppins text-[16px] text-[#030303] outline-none placeholder:text-[#828282]"
							/>
						</div>
					</div>

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
