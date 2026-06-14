interface FilterCheckboxRowProps {
	label: string;
	checked: boolean;
	onChange: () => void;
}

export default function FilterCheckboxRow({ label, checked, onChange }: FilterCheckboxRowProps) {
	return (
		<button
			type="button"
			onClick={onChange}
			className="flex h-12 w-full items-center gap-3 text-left"
			aria-pressed={checked}
		>
			<span
				className={`flex h-[22px] w-[22px] items-center justify-center rounded-[4px] border ${checked ? "border-transparent bg-[#4CAF82]" : "border-[#B8B8B8] bg-white"}`}
			>
				{checked ? <span className="text-[12px] font-bold leading-none text-white">✓</span> : null}
			</span>
			<span className={`font-poppins text-[16px] ${checked ? "font-semibold text-[#4CAF82]" : "font-normal text-[#181725]"}`}>{label}</span>
		</button>
	);
}
