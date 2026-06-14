"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import CarrotIcon from "@/components/CarrotIcon";

export default function Login() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		// Mock login success
		router.push("/home");
	};

	return (
		<main className="flex min-h-screen flex-col bg-white px-6 pt-12 md:items-center md:justify-center md:bg-[#F8F8F8]">
			<div className="flex w-full flex-col md:max-w-[400px] md:rounded-[20px] md:bg-white md:p-10 md:shadow-lg">
				<div className="flex justify-center">
					<CarrotIcon className="h-[55px] w-[47px] text-[#53B175]" />
				</div>

				<h1 className="mt-24 font-poppins text-[26px] font-semibold text-[#181725] md:mt-10">
					Login
				</h1>
				<p className="mt-3 font-poppins text-[16px] font-medium text-[#7C7C7C]">
					Enter your email and password
				</p>

				<form onSubmit={handleLogin} className="mt-10 flex flex-col md:mt-8">
					<div className="flex flex-col border-b border-[#E2E2E2] pb-3">
						<label className="font-poppins text-[16px] font-semibold text-[#7C7C7C]">Email</label>
						<input
							type="email"
							required
							className="mt-2 bg-transparent font-poppins text-[18px] text-[#181725] outline-none"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="mt-8 flex flex-col border-b border-[#E2E2E2] pb-3">
						<label className="font-poppins text-[16px] font-semibold text-[#7C7C7C]">Password</label>
						<div className="relative flex items-center">
							<input
								type={showPassword ? "text" : "password"}
								required
								className="mt-2 w-full bg-transparent font-poppins text-[18px] text-[#181725] outline-none"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
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

					<div className="mt-5 flex justify-end">
						<button
							type="button"
							className="font-poppins text-[14px] font-medium text-[#181725]"
						>
							Forgot Password?
						</button>
					</div>

					<button
						type="submit"
						className="mt-8 flex h-[67px] w-full items-center justify-center rounded-[19px] bg-[#53B175] font-poppins text-[18px] font-semibold text-white transition-transform active:scale-95"
					>
						Log In
					</button>

					<p className="mt-6 text-center font-poppins text-[14px] font-semibold text-[#181725]">
						Don&apos;t have an account?{" "}
						<button
							type="button"
							onClick={() => router.push("/signup")}
							className="text-[#53B175]"
						>
							Signup
						</button>
					</p>
				</form>
			</div>
		</main>
	);
}
