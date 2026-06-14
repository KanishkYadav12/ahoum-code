"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CarrotIcon from "@/components/CarrotIcon";

interface SignUpForm {
	username: string;
	email: string;
	password: string;
	showPassword: boolean;
	isEmailValid: boolean;
}

function validateEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function StatusBar() {
	return (
		<div className="relative z-10 flex h-11 items-center justify-between px-6 pt-[4.83px] text-[#181725] md:hidden">
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

function CheckIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-5 w-5 text-[#4CAF82]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d="m5 13 4 4L19 7" />
		</svg>
	);
}

function EyeIcon({ closed }: { closed: boolean }) {
	if (!closed) {
		return (
			<svg viewBox="0 0 24 24" className="h-5 w-5 text-[#C4C4C4]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
				<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
				<circle cx="12" cy="12" r="3" />
			</svg>
		);
	}

	return (
		<svg viewBox="0 0 24 24" className="h-5 w-5 text-[#C4C4C4]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d="m3 3 18 18" />
			<path d="M10.585 10.587a2 2 0 1 0 2.827 2.829" />
			<path d="M9.879 5.092A10.75 10.75 0 0 1 21.938 12a10.75 10.75 0 0 1-2.166 3.19M6.228 6.228A10.75 10.75 0 0 0 2.062 12a10.75 10.75 0 0 0 13.595 6.444" />
		</svg>
	);
}

export default function SignUp() {
	const router = useRouter();
	const [form, setForm] = useState<SignUpForm>({
		username: "Afsar Hossen Shuvo",
		email: "imshuvo97@gmail.com",
		password: "12345678",
		showPassword: false,
		isEmailValid: true,
	});

	const togglePassword = (): void => {
		setForm((current) => ({ ...current, showPassword: !current.showPassword }));
	};

	const handleSignUp = (): void => {
		router.push("/home");
	};

	return (
		<div className="flex min-h-screen flex-col md:flex-row">
			<div className="relative hidden h-screen w-1/2 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-orange-50 to-green-50 md:flex">
				<div className="absolute right-10 top-20 h-64 w-64 rounded-full bg-pink-200 opacity-30 blur-3xl" />
				<div className="absolute bottom-20 left-10 h-56 w-56 rounded-full bg-green-200 opacity-20 blur-3xl" />

				<div className="z-10 flex flex-col items-center">
					<div className="rounded-lg border-2 border-[#B566E8] p-3">
						<CarrotIcon width={80} height={80} />
					</div>
					<h1 className="mt-4 font-poppins text-[36px] font-bold lowercase text-[#4CAF82]">nectar</h1>
					<span className="mt-2 border border-[#E91E8C] px-2 py-0.5 font-poppins text-[16px] text-[#7C7C7C]">online groceries</span>
				</div>
			</div>

			<div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-white md:w-1/2">
				<div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-pink-100 opacity-40 blur-3xl md:hidden" />
				<div className="absolute bottom-10 left-0 h-44 w-44 rounded-full bg-purple-100 opacity-30 blur-3xl md:hidden" />

				<StatusBar />

				<div className="relative z-10 mt-4 flex justify-center md:hidden">
					<div className="rounded-lg border-[1.5px] border-[#B566E8] p-2">
						<CarrotIcon width={48} height={48} />
					</div>
				</div>

				<div className="relative z-10 mt-8 flex flex-col px-6 md:mt-0 md:flex-1 md:justify-center md:px-12">
					<h1 className="font-poppins text-[26px] font-semibold text-[#181725] md:text-[32px]">Sign Up</h1>
					<p className="mt-2 font-poppins text-[16px] text-[#7C7C7C]">Enter your credentials to continue</p>

					<div className="mt-10 w-full max-w-[364px] rounded-xl border border-[#E2E2E2] p-3">
						<label className="font-poppins text-[14px] font-semibold text-[#7C7C7C]">Username</label>
						<input
							type="text"
							value={form.username}
							onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
							className="mt-1 w-full bg-transparent font-poppins text-[16px] font-semibold text-[#181725] outline-none"
						/>
					</div>

					<div className="mt-5 w-full max-w-[364px] rounded-xl border border-[#E2E2E2] p-3">
						<label className="font-poppins text-[14px] font-semibold text-[#7C7C7C]">Email</label>
						<div className="mt-1 flex items-center">
							<input
								type="email"
								value={form.email}
								onChange={(event) => {
									const email = event.target.value;
									setForm((current) => ({
										...current,
										email,
										isEmailValid: validateEmail(email),
									}));
								}}
								className="w-full bg-transparent font-poppins text-[16px] font-semibold text-[#181725] outline-none"
							/>
							{form.isEmailValid ? (
								<span className="ml-2">
									<CheckIcon />
								</span>
							) : null}
						</div>
					</div>

					<div className="mt-5 w-full max-w-[364px] rounded-xl border border-[#E2E2E2] p-3">
						<label className="font-poppins text-[14px] font-semibold text-[#7C7C7C]">Password</label>
						<div className="mt-1 flex items-center">
							<input
								type={form.showPassword ? "text" : "password"}
								value={form.password}
								onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
								className="w-full bg-transparent font-poppins text-[16px] font-semibold text-[#181725] outline-none"
							/>
							<button type="button" onClick={togglePassword} className="ml-2" aria-label="Toggle password visibility">
								<EyeIcon closed={!form.showPassword} />
							</button>
						</div>
					</div>

					<p className="mt-4 max-w-[364px] font-poppins text-[14px] leading-[110%] tracking-[0.05em] text-[#181725]">
						By continuing you agree to our{" "}
						<button type="button" onClick={() => router.push("/terms")} className="cursor-pointer text-[#4CAF82]">
							Terms of Service
						</button>
						<br />
						and{" "}
						<button type="button" onClick={() => router.push("/privacy")} className="cursor-pointer text-[#4CAF82]">
							Privacy Policy.
						</button>
					</p>

					<button
						type="button"
						onClick={handleSignUp}
						className="mt-8 h-[67px] w-full max-w-[364px] rounded-[20px] bg-[#4CAF82] font-poppins text-[18px] font-semibold text-white transition-colors duration-200 hover:brightness-105 md:h-[56px] md:rounded-2xl"
					>
						Sing Up
					</button>

					<p className="mt-6 max-w-[364px] text-center font-poppins text-[14px] font-semibold tracking-[0.05em] text-[#181725]">
						Already have an account?{" "}
						<button type="button" onClick={() => router.push("/login")} className="cursor-pointer text-[#4CAF82]">
							Singup
						</button>
					</p>
				</div>

				<div className="mt-auto flex justify-center pb-2 md:hidden">
					<div className="h-[5px] w-[134px] rounded-full bg-black/15" />
				</div>
			</div>
		</div>
	);
}
