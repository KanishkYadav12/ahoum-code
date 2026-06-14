"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

export function useDebouncedSearch(initialValue: string = "", delay: number = 300) {
	const [searchQuery, setSearchQuery] = useState(initialValue);
	const debouncedQuery = useDebounce(searchQuery, delay);

	return {
		searchQuery,
		setSearchQuery,
		debouncedQuery,
	};
}
