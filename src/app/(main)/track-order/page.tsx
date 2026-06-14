import Link from "next/link";

export default function TrackOrderPage() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-white px-6 text-center">
			<div className="max-w-sm">
				<h1 className="font-poppins text-[30px] font-semibold text-[#181725]">Track Order</h1>
				<p className="mt-3 font-poppins text-[15px] text-[#7C7C7C]">Track order page placeholder.</p>
				<Link href="/home" className="mt-6 inline-flex h-[56px] items-center justify-center rounded-[18px] bg-[#4CAF82] px-6 font-poppins text-[16px] font-semibold text-white">
					Back to Home
				</Link>
			</div>
		</main>
	);
}
