import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
	{ label: "Home", href: "/home" },
	{ label: "Explore", href: "/explore" },
	{ label: "Cart", href: "/cart" },
	{ label: "Favourites", href: "/favourites" },
	{ label: "Account", href: "/home" },
];

export default function Sidebar() {
	const pathname = usePathname();

	const isActive = (href: string): boolean =>
		pathname === href || (href === "/home" && (pathname === "/" || pathname.startsWith("/category"))) || (href === "/explore" && pathname === "/search");

	return (
		<aside className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-[240px] md:flex-col md:border-r md:border-[#E2E2E2] md:bg-white md:px-6 md:py-8">
			<div className="mb-8">
				<p className="font-poppins text-[14px] uppercase tracking-[0.28em] text-[#4CAF82]">Nectar</p>
			</div>
			<nav className="flex flex-col gap-2">
				{navItems.map((item) => (
					<Link
						key={item.label}
						href={item.href}
						aria-current={isActive(item.href) ? "page" : undefined}
						className={`rounded-xl px-4 py-3 font-poppins text-[15px] font-semibold transition-colors hover:bg-[#F8F8F8] ${isActive(item.href) ? "bg-[#EBF9F4] text-[#4CAF82]" : "text-[#181725]"}`}
					>
						{item.label}
					</Link>
				))}
			</nav>
		</aside>
	);
}
