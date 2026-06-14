import React from "react";

type KeypadKey = {
	label: string;
	sublabel?: string;
	value: string;
	isSpecial?: boolean;
};

interface NumericDialerProps {
	onKeyPress: (value: string) => void;
	className?: string;
}

function BackspaceIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d="M21 6H9l-6 6 6 6h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z" />
			<path d="m13 9 4 6M17 9l-4 6" />
		</svg>
	);
}

function KeypadButton({ keyData, onPress }: { keyData: KeypadKey; onPress: (value: string) => void }) {
	const isSpecial = keyData.isSpecial === true;

	return (
		<button
			type="button"
			onClick={() => onPress(keyData.value)}
			className="flex h-[68px] w-full flex-col items-center justify-center border border-[#F0F0F0] bg-white text-[#181725] shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-colors duration-150 active:bg-[#f7f7f7]"
		>
			{isSpecial ? (
				<BackspaceIcon />
			) : (
				<>
					<span className="text-[24px] font-medium leading-none">{keyData.label}</span>
					{keyData.sublabel ? (
						<span className="mt-1 text-[9px] font-medium uppercase tracking-[1px] text-[#7C7C7C]">{keyData.sublabel}</span>
					) : null}
				</>
			)}
		</button>
	);
}

const keypadRows: KeypadKey[][] = [
	[
		{ label: "1", value: "1" },
		{ label: "2", sublabel: "ABC", value: "2" },
		{ label: "3", sublabel: "DEF", value: "3" },
	],
	[
		{ label: "4", sublabel: "GHI", value: "4" },
		{ label: "5", sublabel: "JKL", value: "5" },
		{ label: "6", sublabel: "MNO", value: "6" },
	],
	[
		{ label: "7", sublabel: "PQRS", value: "7" },
		{ label: "8", sublabel: "TUV", value: "8" },
		{ label: "9", sublabel: "WXYZ", value: "9" },
	],
	[
		{ label: "+*#", value: "+*#" },
		{ label: "0", value: "0" },
		{ label: "⌫", value: "backspace", isSpecial: true },
	],
];

export default function NumericDialer({ onKeyPress, className = "" }: NumericDialerProps) {
	return (
		<div className={className}>
			<div className="grid grid-cols-3 gap-0">
				{keypadRows.flatMap((row) => row).map((keyData) => (
					<KeypadButton key={keyData.label + (keyData.sublabel ?? "")} keyData={keyData} onPress={onKeyPress} />
				))}
			</div>
		</div>
	);
}
