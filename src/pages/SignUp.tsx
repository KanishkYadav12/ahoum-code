"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiCheck } from "react-icons/fi";
import CarrotIcon from "@/components/CarrotIcon";
import { useAuthStore } from "@/stores/authStore";
import { isValidEmail } from "@/lib/utils";

export default function SignUp() {
	const router = useRouter();
	const { signupForm, updateSignupForm, signup, error, clearError, isLoading } = useAuthStore();
	const [showPassword, setShowPassword] = useState(false);

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		const success = await signup();
		if (success) {
			router.push("/select-location");
		}
	};

	const isEmailValid = isValidEmail(signupForm.email);

	return (
		<main className="flex min-h-screen flex-col bg-white px-6 pt-12 md:items-center md:justify-center md:bg-[#F8F8F8]">
			<div className="flex w-full flex-col md:max-w-[420px] md:rounded-[20px] md:bg-white md:p-10 md:shadow-lg">
				<div className="flex justify-center">
					<CarrotIcon className="h-[55px] w-[47px]" />
				</div>

				<h1 className="mt-24 font-poppins text-[26px] font-semibold text-[#181725] md:mt-10">
					Sign Up
				</h1>
				<p className="mt-3 font-poppins text-[16px] font-medium text-[#7C7C7C]">
					Enter your credentials to continue
				</p>

				<form onSubmit={handleSignup} className="mt-10 flex flex-col md:mt-8">
					<div className="flex flex-col border-b border-[#E2E2E2] pb-3">
						<label className="font-poppins text-[16px] font-semibold text-[#7C7C7C]">Username</label>
						<input
							type="text"
							required
							className="mt-2 bg-transparent font-poppins text-[18px] text-[#181725] outline-none"
							value={signupForm.name}
							onChange={(e) => {
								updateSignupForm({ name: e.target.value });
								if (error) clearError();
							}}
						/>
					</div>

					<div className="mt-8 flex flex-col border-b border-[#E2E2E2] pb-3">
						<label className="font-poppins text-[16px] font-semibold text-[#7C7C7C]">Email</label>
						<div className="relative flex items-center">
							<input
								type="email"
								required
								className="mt-2 w-full bg-transparent font-poppins text-[18px] text-[#181725] outline-none"
								value={signupForm.email}
								onChange={(e) => {
									updateSignupForm({ email: e.target.value });
									if (error) clearError();
								}}
							/>
							{isEmailValid && (
								<FiCheck className="absolute right-0 top-1/2 -translate-y-1/2 text-[#53B175]" size={20} />
							)}
						</div>
					</div>

					<div className="mt-8 flex flex-col border-b border-[#E2E2E2] pb-3">
						<label className="font-poppins text-[16px] font-semibold text-[#7C7C7C]">Password</label>
						<div className="relative flex items-center">
							<input
								type={showPassword ? "text" : "password"}
								required
								className="mt-2 w-full bg-transparent font-poppins text-[18px] text-[#181725] outline-none"
								value={signupForm.password}
								onChange={(e) => {
									updateSignupForm({ password: e.target.value });
									if (error) clearError();
								}}
							/>
							<button
								type="button"
								className="absolute right-0 top-1/2 -translate-y-1/2 text-[#7C7C7C]"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
							</button>
						</div>
					</div>

					<p className="mt-4 font-poppins text-[14px] font-medium leading-[22px] text-[#7C7C7C]">
						By continuing you agree to our{" "}
						<button type="button" className="text-[#53B175]">
							Terms of Service
						</button>{" "}
						and{" "}
						<button type="button" className="text-[#53B175]">
							Privacy Policy
						</button>
						.
					</p>

					{error && <p className="mt-4 font-poppins text-[14px] text-red-500">{error}</p>}

					<button
						type="submit"
						disabled={isLoading}
						className="mt-8 flex h-[67px] w-full items-center justify-center rounded-[19px] bg-[#53B175] font-poppins text-[18px] font-semibold text-white transition-transform active:scale-95 disabled:opacity-70"
					>
						{isLoading ? "Signing up..." : "Sign Up"}
					</button>

					<p className="mt-6 text-center font-poppins text-[14px] font-semibold text-[#181725]">
						Already have an account?{" "}
						<button
							type="button"
							onClick={() => router.push("/login")}
							className="text-[#53B175]"
						>
							Login
						</button>
					</p>
				</form>
			</div>
		</main>
	);
}
