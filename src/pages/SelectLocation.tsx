"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import MapIllustration from "@/components/ui/MapIllustration";
import { useAuthStore } from "@/stores/authStore";

interface LocationState {
	zone: string;
	area: string;
}

const zones: string[] = ["Banasree", "Gulshan", "Dhanmondi", "Mirpur", "Uttara"];

const areasByZone: Record<string, string[]> = {
	Banasree: ["Block A", "Block B", "Block C", "Rampura"],
	Gulshan: ["Gulshan 1", "Gulshan 2", "Niketan"],
	Dhanmondi: ["Road 4", "Road 8", "Road 27"],
	Mirpur: ["Section 1", "Section 6", "DOHS"],
	Uttara: ["Sector 3", "Sector 7", "Sector 12"],
};


function BackArrow() {
	return (
		<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d="m15 18-6-6 6-6" />
		</svg>
	);
}

function ChevronDown() {
	return (
		<svg viewBox="0 0 24 24" className="h-4 w-4 text-[#181725]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d="m6 9 6 6 6-6" />
		</svg>
	);
}

interface SelectCardProps {
	label: string;
	value: string;
	placeholder?: string;
	options: string[];
	onChange: (value: string) => void;
	isPlaceholder?: boolean;
}

function SelectCard({ label, value, placeholder, options, onChange, isPlaceholder = false }: SelectCardProps) {
	return (
		<div className="w-full max-w-[364px] border-b border-[#E2E2E2] bg-white py-3">
			<p className="font-poppins text-[16px] font-semibold text-[#7C7C7C]">{label}</p>
			<div className="relative mt-1 flex items-center">
				<select
					value={value}
					onChange={(event) => onChange(event.target.value)}
					className={`w-full appearance-none bg-transparent pr-6 font-poppins text-[18px] outline-none ${isPlaceholder && !value ? "text-[#B1B1B1]" : "text-[#181725] font-medium"}`}
				>
					{placeholder ? (
						<option value="" disabled>
							{placeholder}
						</option>
					) : null}
					{options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
				<div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
					<ChevronDown />
				</div>
			</div>
		</div>
	);
}

export default function SelectLocation() {
	const router = useRouter();
	const { completeLocationSelection, updateLocationDraft, locationDraft } = useAuthStore();
	const [state, setState] = useState<LocationState>({
		zone: locationDraft.zone || "Banasree",
		area: locationDraft.area || "",
	});

	const areaOptions = useMemo(() => areasByZone[state.zone] ?? [], [state.zone]);

	const handleZoneChange = (zone: string): void => {
		const newState = { zone, area: "" };
		setState(newState);
		updateLocationDraft(newState);
	};

	const handleAreaChange = (area: string): void => {
		const newState = { ...state, area };
		setState(newState);
		updateLocationDraft(newState);
	};

	const handleSubmit = (): void => {
		const selectedArea = state.area || (areaOptions.length > 0 ? areaOptions[0] : "");

		const success = completeLocationSelection({
			zone: state.zone,
			area: selectedArea,
			street: selectedArea, // Using area as street for demo
			city: "Dhaka",
			state: "Dhaka",
			pincode: "1200"
		});

		if (success) {
			router.push("/home");
		}
	};

	return (
		<div className="flex min-h-screen flex-col bg-white">
			<button
				type="button"
				onClick={() => router.back()}
				className="ml-6 mt-6 w-fit text-[#181725]"
				aria-label="Go back"
			>
				<BackArrow />
			</button>

			<div className="flex flex-col px-6 pt-8">
				<div className="flex justify-center">
					<MapIllustration className="h-[170px] w-[224px]" />
				</div>

				<div className="mt-10 flex flex-col items-center text-center">
					<h1 className="font-poppins text-[26px] font-semibold text-[#181725]">
						Select Your Location
					</h1>

					<p className="mt-3 font-poppins text-[16px] leading-[22px] text-[#7C7C7C]">
						Switch on your location to stay in tune with what&apos;s happening in your area
					</p>
				</div>

				<div className="mt-12 flex flex-col gap-8">
					<SelectCard label="Your Zone" value={state.zone} options={zones} onChange={handleZoneChange} />
					<SelectCard
						label="Your Area"
						value={state.area}
						placeholder="Types of your area"
						options={areaOptions}
						onChange={handleAreaChange}
						isPlaceholder
					/>
				</div>

				<button
					type="button"
					onClick={handleSubmit}
					className="mt-12 h-[67px] w-full rounded-[19px] bg-[#53B175] font-poppins text-[18px] font-semibold text-white transition-all active:scale-95"
				>
					Submit
				</button>
			</div>
		</div>
	);
}
