"use client";

import { useEffect, type ReactNode } from "react";
import { FiX } from "react-icons/fi";
import { useFilterStore } from "@/stores/filterStore";
import { categoryFilters, brandFilters } from "@/data/filterData";
import FilterCheckboxRow from "@/components/FilterCheckboxRow";
import { ProductCategory } from "@/types";

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
									checked={selectedCategories.includes(option.id as ProductCategory)}
									onChange={() => toggleCategory(option.id as ProductCategory)}
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
