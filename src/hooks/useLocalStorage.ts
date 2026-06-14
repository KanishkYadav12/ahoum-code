import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
	const [storedValue, setStoredValue] = useState<T>(initialValue);
	const [isReady, setIsReady] = useState(false);

	// Get value from localStorage on mount
	useEffect(() => {
		if (typeof window === "undefined") return;

		try {
			const item = window.localStorage.getItem(key);
			if (item) {
				setStoredValue(JSON.parse(item));
			}
		} catch (error) {
			console.error(`Error reading localStorage key "${key}":`, error);
		}

		setIsReady(true);
	}, [key]);

	// Set value in localStorage
	const setValue = (value: T) => {
		try {
			setStoredValue(value);
			if (typeof window !== "undefined") {
				window.localStorage.setItem(key, JSON.stringify(value));
			}
		} catch (error) {
			console.error(`Error writing to localStorage key "${key}":`, error);
		}
	};

	return [storedValue, setValue];
}
