"use client";

import { useEffect } from "react";
import { useToastStore } from "@/stores/toastStore";

export default function Toast() {
	const toasts = useToastStore((state) => state.toasts);

	return (
		<div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] space-y-2 max-w-sm">
			{toasts.map((toast) => (
				<div
					key={toast.id}
					className={`px-4 py-3 rounded-lg text-white font-poppins text-sm animate-slideIn ${
						toast.type === "success"
							? "bg-green-500"
							: toast.type === "error"
								? "bg-red-500"
								: toast.type === "warning"
									? "bg-yellow-500"
									: "bg-blue-500"
					}`}
				>
					{toast.message}
				</div>
			))}
		</div>
	);
}
