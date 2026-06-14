"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import MapIllustration from "@/components/ui/MapIllustration";

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

function StatusBar() {
	return (
		<div className="relative z-10 flex h-11 items-center justify-between px-6 pt-[4.83px] text-[#181725] md:hidden">
			<span className="text-sm font-medium leading-none">9:41</span>
			<div className="flex items-center gap-1.5">
				<svg viewBox="0 0 18 12" className="h-3 w-[18px] fill-current" aria-hidden="true">
					<path d="M1 9h2v2H1V9zm3-3h2v5H4V6zm3-3h2v8H7V3zm3-2h2v10h-2V1zm3 3h2v7h-2V4z" />
				</svg>
				<svg viewBox="0 0 16 12" className="h-3 w-4 fill-current" aria-hidden="true">
					<path d="M8 10.5 6.6 9.1c1.6-1.6 4.2-1.6 5.8 0L11 10.5c-1-1-2.6-1-3.6 0zm-2.4-2.5L4.2 6.6c3-3 7.9-3 10.8 0l-1.4 1.4c-2.2-2.2-5.8-2.2-8 0zM1.5 5.1.1 3.7c4.3-4.2 11.3-4.2 15.6 0l-1.4 1.4c-3.5-3.4-9.3-3.4-12.8 0zM7.8 11.4a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z" />
				</svg>
				<svg viewBox="0 0 24 12" className="h-3 w-6 fill-current" aria-hidden="true">
					<path d="M2 2h16v8H2V2zm18 3-2-1v4l2-1V5z" />
					<rect x="3.5" y="3.5" width="12.5" height="5" rx="1" />
				</svg>
			</div>
		</div>
	);
}

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
		<div className="w-full max-w-[364px] rounded-[12px] border border-[#E2E2E2] bg-white p-3">
			<p className="font-poppins text-[14px] font-semibold text-[#7C7C7C]">{label}</p>
			<div className="relative mt-1 flex items-center">
				<select
					value={value}
					onChange={(event) => onChange(event.target.value)}
					className={`w-full appearance-none bg-transparent pr-6 font-poppins text-[16px] outline-none ${isPlaceholder && !value ? "text-[#C4C4C4]" : "text-[#181725] font-semibold"}`}
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
	const [state, setState] = useState<LocationState>({
		zone: "Banasree",
		area: "",
	});

	const areaOptions = useMemo(() => areasByZone[state.zone] ?? [], [state.zone]);

	const handleZoneChange = (zone: string): void => {
		setState({ zone, area: "" });
	};

	const handleAreaChange = (area: string): void => {
		setState((current) => ({ ...current, area }));
	};

	const handleSubmit = (): void => {
		const selectedArea = state.area || (areaOptions.length > 0 ? areaOptions[0] : "");
		const locationValue = selectedArea ? `${state.zone}, ${selectedArea}` : state.zone;

		document.cookie = `nectar_location=${encodeURIComponent(locationValue)}; path=/; max-age=604800`;
		window.location.assign("/home");
	};

	return (
		<div className="flex min-h-screen flex-col md:flex-row">
			<div className="relative hidden h-screen w-1/2 flex-col items-center justify-center gap-6 overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-teal-50 md:flex">
				<div className="absolute right-10 top-20 h-64 w-64 rounded-full bg-pink-200 opacity-30 blur-3xl" />
				<div className="absolute bottom-20 left-10 h-56 w-56 rounded-full bg-teal-200 opacity-30 blur-3xl" />

				<div className="z-10 h-[300px] w-[300px]">
					<MapIllustration className="h-full w-full" />
				</div>

				<div className="z-10 px-12 text-center">
					<h2 className="font-poppins text-[28px] font-semibold text-[#181725]">Find your area</h2>
					<p className="mt-3 font-poppins text-base text-[#7C7C7C]">
						Select your zone and area to get fresh groceries delivered to your door
					</p>
				</div>
			</div>

			<div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-white md:w-1/2">
				<div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-pink-200 opacity-30 blur-3xl md:hidden" />
				<div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-purple-200 opacity-20 blur-3xl md:hidden" />

				<StatusBar />

				<button
					type="button"
					onClick={() => router.push("/verification")}
					className="relative z-10 ml-6 mt-4 w-fit text-[#181725] md:ml-12 md:mt-8"
					aria-label="Go back"
				>
					<BackArrow />
				</button>

				<div className="relative z-10 mt-4 flex justify-center md:hidden">
					<MapIllustration className="h-[170px] w-[224px]" />
				</div>

				<div className="relative z-10 mt-6 flex flex-col px-6 md:mt-0 md:flex-1 md:justify-center md:px-12">
					<h1 className="text-center font-poppins text-[26px] font-semibold text-[#181725] md:text-left md:text-[32px]">
						Select Your Location
					</h1>

					<p className="mt-3 text-center font-poppins text-[16px] leading-[22px] text-[#7C7C7C] md:text-left">
						Switch on your location to stay in tune with what&apos;s happening in your area
					</p>

					<div className="mx-auto mt-10 w-full md:mx-0">
						<SelectCard label="Your Zone" value={state.zone} options={zones} onChange={handleZoneChange} />
					</div>

					<div className="mx-auto mt-5 w-full md:mx-0">
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
						className="mx-auto mt-10 h-[67px] w-full max-w-[364px] rounded-[20px] bg-[#4CAF82] font-poppins text-[18px] font-semibold text-white transition-colors duration-200 hover:brightness-105 md:mx-0 md:h-[56px] md:rounded-2xl"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}
