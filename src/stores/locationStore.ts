import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocationStore {
	selectedLocation: string | null;
	availableLocations: string[];
	
	setLocation: (location: string) => void;
	clearLocation: () => void;
}

const AVAILABLE_LOCATIONS = [
	"Dhaka, Bangladesh",
	"New York, USA",
	"London, UK",
	"Dubai, UAE",
	"Mumbai, India",
	"Toronto, Canada",
	"Sydney, Australia",
	"Singapore",
];

export const useLocationStore = create<LocationStore>()(
	persist(
		(set) => ({
			selectedLocation: null,
			availableLocations: AVAILABLE_LOCATIONS,
			
			setLocation: (location: string) => {
				set({ selectedLocation: location });
				if (typeof document !== "undefined") {
					document.cookie = `nectar_location=${encodeURIComponent(location)}; path=/; max-age=604800`;
				}
			},
			
			clearLocation: () => {
				set({ selectedLocation: null });
				if (typeof document !== "undefined") {
					document.cookie = "nectar_location=; path=/; max-age=0";
				}
			},
		}),
		{ name: "nectar_location" }
	)
);
