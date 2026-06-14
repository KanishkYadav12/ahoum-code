import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export function useAuth() {
	const router = useRouter();
	const { isAuthenticated, user, isLoading } = useAuthStore();

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			router.replace("/login");
		}
	}, [isAuthenticated, isLoading, router]);

	return { isAuthenticated, user, isLoading };
}
