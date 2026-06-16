"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import CarrotIcon from "@/components/CarrotIcon";
import { useAuthStore } from "@/stores/authStore";

export default function Login() {
	const router = useRouter();
	const { loginForm, updateLoginForm, login, completeMockLogin, error, clearError, isLoading, hasCompletedAuthFlow } = useAuthStore();
	const [showPassword, setShowPassword] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login();
    if (success) {
        const { selectedAddress } = useAuthStore.getState();
        if (selectedAddress) {
            router.push("/home");
        } else {
            router.push("/select-location");
        }
    }
};

	const handleSocialLogin = (provider: "Google" | "Facebook") => {
    completeMockLogin({
        name: `${provider} User`,
        email: `${provider.toLowerCase()}@example.com`,
    });
    const { selectedAddress } = useAuthStore.getState();
    if (selectedAddress) {
        router.push("/home");
    } else {
        router.push("/select-location");
    }
};

	return (
		<main className="flex min-h-screen flex-col bg-white px-6 pt-12 md:items-center md:justify-center md:bg-[#F8F8F8]">
			<div className="flex w-full flex-col md:max-w-[420px] md:rounded-[20px] md:bg-white md:p-10 md:shadow-lg">
				<div className="flex justify-center">
					<CarrotIcon className="h-[55px] w-[47px]" />
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
							value={loginForm.email}
							onChange={(e) => {
								updateLoginForm({ email: e.target.value });
								if (error) clearError();
							}}
						/>
					</div>

					<div className="mt-8 flex flex-col border-b border-[#E2E2E2] pb-3">
						<label className="font-poppins text-[16px] font-semibold text-[#7C7C7C]">Password</label>
						<div className="relative flex items-center">
							<input
								type={showPassword ? "text" : "password"}
								required
								className="mt-2 w-full bg-transparent font-poppins text-[18px] text-[#181725] outline-none"
								value={loginForm.password}
								onChange={(e) => {
									updateLoginForm({ password: e.target.value });
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

					{error && <p className="mt-4 font-poppins text-[14px] text-red-500">{error}</p>}

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
						disabled={isLoading}
						className="mt-8 flex h-[67px] w-full items-center justify-center rounded-[19px] bg-[#53B175] font-poppins text-[18px] font-semibold text-white transition-transform active:scale-95 disabled:opacity-70"
					>
						{isLoading ? "Logging in..." : "Log In"}
					</button>

					<div className="mt-8 flex flex-col gap-3">
						<button
							type="button"
							onClick={() => handleSocialLogin("Google")}
							className="relative flex h-[67px] w-full items-center justify-center rounded-[19px] bg-[#5383EC] font-poppins text-[18px] font-semibold text-white transition-transform active:scale-95"
						>
							<span className="absolute left-6 flex h-6 w-6 items-center justify-center rounded-full bg-white">
								<FcGoogle size={16} />
							</span>
							Continue with Google
						</button>

						<button
							type="button"
							onClick={() => handleSocialLogin("Facebook")}
							className="relative flex h-[67px] w-full items-center justify-center rounded-[19px] bg-[#4A66AC] font-poppins text-[18px] font-semibold text-white transition-transform active:scale-95"
						>
							<span className="absolute left-6">
								<FaFacebookF size={20} />
							</span>
							Continue with Facebook
						</button>
					</div>

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
