"use client";

import { useEffect, type ReactNode } from "react";
import { FiX } from "react-icons/fi";
import { useFilterStore } from "@/stores/filterStore";
import { categoryFilters, brandFilters } from "@/data/filterData";
import FilterCheckboxRow from "@/components/FilterCheckboxRow";

function StatusBar() {
	return (
		<div className="flex h-11 items-center justify-between bg-white px-6 pt-[4.83px] text-[#181725] md:hidden">
			<span className="text-sm font-medium leading-none">9:41</span>
			<div className="flex items-center gap-1.5">
				<svg viewBox="0 0 18 12" className="h-3 w-[18px] fill-current" aria-hidden="true"><path d="M1 9h2v2H1V9zm3-3h2v5H4V6zm3-3h2v8H7V3zm3-2h2v10h-2V1zm3 3h2v7h-2V4z" /></svg>
				<svg viewBox="0 0 16 12" className="h-3 w-4 fill-current" aria-hidden="true"><path d="M8 10.5 6.6 9.1c1.6-1.6 4.2-1.6 5.8 0L11 10.5c-1-1-2.6-1-3.6 0zm-2.4-2.5L4.2 6.6c3-3 7.9-3 10.8 0l-1.4 1.4c-2.2-2.2-5.8-2.2-8 0zM1.5 5.1.1 3.7c4.3-4.2 11.3-4.2 15.6 0l-1.4 1.4c-3.5-3.4-9.3-3.4-12.8 0zM7.8 11.4a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z" /></svg>
				<svg viewBox="0 0 24 12" className="h-3 w-6 fill-current" aria-hidden="true"><path d="M2 2h16v8H2V2zm18 3-2-1v4l2-1V5z" /><rect x="3.5" y="3.5" width="12.5" height="5" rx="1" /></svg>
			</div>
		</div>
	);
}

function SheetShell({ children }: { children: ReactNode }) {
	return (
		<div className="fixed inset-x-0 bottom-0 z-[60] h-[calc(100vh-105px)] rounded-t-[30px] bg-[#F2F3F2] px-[25px] pt-6 pb-[100px] shadow-[0_-12px_40px_rgba(0,0,0,0.18)] md:inset-y-1/2 md:left-1/2 md:bottom-auto md:h-[720px] md:w-[420px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[30px] md:px-6 md:pb-[100px]">
			{children}
		</div>
	);
	}

export default function FilterSheet() {
	const isFilterOpen = useFilterStore((state) => state.isFilterOpen);
	const closeFilter = useFilterStore((state) => state.closeFilter);
	const selectedCategories = useFilterStore((state) => state.categories);
	const selectedBrands = useFilterStore((state) => state.brands);
	const toggleCategory = useFilterStore((state) => state.toggleCategory);
	const toggleBrand = useFilterStore((state) => state.toggleBrand);
	const resetFilters = useFilterStore((state) => state.resetFilters);

	useEffect(() => {
		if (!isFilterOpen) {
			return;
		}

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [isFilterOpen]);

	if (!isFilterOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-[60]">
			<button type="button" aria-label="Close filter sheet" onClick={closeFilter} className="absolute inset-0 bg-[#181725]/70" />
			<StatusBar />
			<SheetShell>
				<div className="mb-6 flex items-center justify-between">
					<button type="button" onClick={closeFilter} aria-label="Close filters" className="flex h-6 w-6 items-center justify-center text-[#181725]">
						<FiX className="h-[15.53px] w-[15.71px]" />
					</button>
					<h2 className="absolute left-1/2 -translate-x-1/2 font-poppins text-[20px] font-normal text-[#181725]">Filters</h2>
					<span className="h-6 w-6" aria-hidden="true" />
				</div>

				<div className="h-[calc(100%-72px)] overflow-y-auto pb-[100px]">
					<section>
						<h3 className="mb-4 font-poppins text-[20px] font-bold text-[#181725]">Categories</h3>
						<div className="flex flex-col gap-1">
							{categoryFilters.map((option) => (
								<FilterCheckboxRow
									key={option.id}
									label={option.label}
									checked={selectedCategories.includes(option.id)}
									onChange={() => toggleCategory(option.id)}
								/>
							))}
						</div>
					</section>

					<section className="mt-6">
						<h3 className="mb-4 font-poppins text-[20px] font-bold text-[#181725]">Brand</h3>
						<div className="flex flex-col gap-1">
							{brandFilters.map((option) => (
								<FilterCheckboxRow
									key={option.id}
									label={option.label}
									checked={selectedBrands.includes(option.id)}
									onChange={() => toggleBrand(option.id)}
								/>
							))}
						</div>
					</section>
				</div>

				<button
					type="button"
					onClick={() => {
						closeFilter();
					}}
					className="absolute bottom-6 left-1/2 h-[67px] w-[calc(100%-50px)] -translate-x-1/2 rounded-[20px] bg-[#4CAF82] font-poppins text-[18px] font-semibold text-white md:w-[364px]"
				>
					Apply Filter
				</button>
			</SheetShell>
		</div>
	);
}
