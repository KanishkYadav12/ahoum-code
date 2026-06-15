"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

function Confetti() {
	const pieces = [
		{ color: "#4CAF82", x: 20, y: 25, size: 8, shape: "circle" },
		{ color: "#FF6B6B", x: 78, y: 20, size: 6, shape: "line" },
		{ color: "#FFD93D", x: 85, y: 55, size: 7, shape: "circle" },
		{ color: "#4D86FF", x: 15, y: 60, size: 6, shape: "circle" },
		{ color: "#FF6B6B", x: 30, y: 75, size: 5, shape: "line" },
		{ color: "#4CAF82", x: 70, y: 72, size: 8, shape: "circle" },
		{ color: "#FFD93D", x: 50, y: 15, size: 5, shape: "circle" },
		{ color: "#4D86FF", x: 60, y: 78, size: 6, shape: "line" },
		{ color: "#FF6B6B", x: 88, y: 35, size: 5, shape: "circle" },
		{ color: "#4CAF82", x: 10, y: 42, size: 6, shape: "circle" },
	];

	return (
		<div className="pointer-events-none absolute inset-0">
			{pieces.map((p, i) => (
				<div
					key={i}
					className="absolute"
					style={{ left: `${p.x}%`, top: `${p.y}%` }}
				>
					{p.shape === "circle" ? (
						<div
							style={{
								width: p.size,
								height: p.size,
								borderRadius: "50%",
								backgroundColor: p.color,
							}}
						/>
					) : (
						<div
							style={{
								width: 2,
								height: p.size * 2,
								backgroundColor: p.color,
								borderRadius: 2,
								transform: "rotate(30deg)",
							}}
						/>
					)}
				</div>
			))}
		</div>
	);
}

export default function OrderSuccess() {
	const router = useRouter();
	const hasCleared = useRef(false);

	useEffect(() => {
		if (hasCleared.current) return;
		hasCleared.current = true;
		// Clear cart after successful order
		try {
			const { useCartStore } = require("@/stores/cartStore");
			useCartStore.getState().clearCart?.();
		} catch {
			// cart clear is best-effort
		}
	}, []);

	return (
		<main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-6">
			<div className="relative flex w-full max-w-[320px] flex-col items-center py-12">
				<Confetti />

				{/* Check circle */}
				<div className="relative z-10 flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#4CAF82] shadow-lg">
					<svg
						viewBox="0 0 24 24"
						className="h-14 w-14 text-white"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path d="m5 13 4 4L19 7" />
					</svg>
				</div>

				<h1 className="mt-10 text-center font-poppins text-[26px] font-bold leading-[32px] text-[#181725]">
					Your Order has been
					<br />
					accepted
				</h1>

				<p className="mt-4 text-center font-poppins text-[16px] leading-[22px] text-[#7C7C7C]">
					Your items have been placed and is on
					<br />
					its way to being processed
				</p>

				<button
					type="button"
					onClick={() => router.push("/track-order")}
					className="mt-12 flex h-[60px] w-full items-center justify-center rounded-[19px] bg-[#4CAF82] font-poppins text-[18px] font-semibold text-white transition-transform active:scale-95"
				>
					Track Order
				</button>

				<button
					type="button"
					onClick={() => router.push("/home")}
					className="mt-4 font-poppins text-[16px] font-semibold text-[#181725]"
				>
					Back to home
				</button>
			</div>
		</main>
	);
}