"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import MapIllustration from "@/components/ui/MapIllustration";

interface LocationState {
	zone: string;
	area: string;
}

const zones = ["Banasree", "Gulshan", "Dhanmondi", "Mirpur", "Uttara"];

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

function SelectCard({ label, value, placeholder, options, onChange, isPlaceholder = false }: {
	label: string;
	value: string;
	placeholder?: string;
	options: string[];
	onChange: (value: string) => void;
	isPlaceholder?: boolean;
}) {
	return (
		<div className="w-full rounded-[12px] border border-[#E2E2E2] bg-white p-3">
			<p className="font-poppins text-[14px] font-semibold text-[#7C7C7C]">{label}</p>
			<div className="relative mt-1 flex items-center">
				<select
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className={`w-full appearance-none bg-transparent pr-6 font-poppins text-[16px] outline-none ${isPlaceholder && !value ? "text-[#C4C4C4]" : "font-semibold text-[#181725]"}`}
				>
					{placeholder && <option value="" disabled>{placeholder}</option>}
					{options.map((o) => <option key={o} value={o}>{o}</option>)}
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
	const [state, setState] = useState<LocationState>({ zone: "Banasree", area: "" });
	const areaOptions = useMemo(() => areasByZone[state.zone] ?? [], [state.zone]);

	return (
		<div className="relative flex min-h-screen flex-col overflow-hidden bg-white">
			{/* Background blobs */}
			<div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-pink-200 opacity-30 blur-3xl" />
			<div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-purple-200 opacity-20 blur-3xl" />

			{/* Back button */}
			<button
				type="button"
				onClick={() => router.push("/verification")}
				className="relative z-10 ml-6 mt-4 w-fit text-[#181725]"
				aria-label="Go back"
			>
				<BackArrow />
			</button>

			{/* Map illustration */}
			<div className="relative z-10 mt-4 flex justify-center">
				<MapIllustration className="h-[170px] w-[224px]" />
			</div>

			<div className="relative z-10 mt-6 flex flex-col px-6 pb-10">
				<h1 className="text-center font-poppins text-[26px] font-semibold text-[#181725]">
					Select Your Location
				</h1>
				<p className="mt-3 text-center font-poppins text-[16px] leading-[22px] text-[#7C7C7C]">
					Switch on your location to stay in tune with what's happening in your area
				</p>

				<div className="mt-10">
					<SelectCard
						label="Your Zone"
						value={state.zone}
						options={zones}
						onChange={(zone) => setState({ zone, area: "" })}
					/>
				</div>

				<div className="mt-5">
					<SelectCard
						label="Your Area"
						value={state.area}
						placeholder="Types of your area"
						options={areaOptions}
						onChange={(area) => setState((s) => ({ ...s, area }))}
						isPlaceholder
					/>
				</div>

				{/* Submit → goes to real Login */}
				<button
					type="button"
					onClick={() => router.push("/login")}
					className="mt-10 h-[67px] w-full rounded-[20px] bg-[#4CAF82] font-poppins text-[18px] font-semibold text-white"
				>
					Submit
				</button>
			</div>
		</div>
	);
}