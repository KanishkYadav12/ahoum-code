"use client";

import { useRouter } from "next/navigation";
import { FiGrid, FiHeart, FiUser, FiLogOut, FiChevronRight, FiShoppingBag, FiMapPin, FiCreditCard, FiBell, FiHelpCircle, FiInfo, FiSettings, FiEdit3 } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";
import { useAuthStore } from "@/stores/authStore";
import Sidebar from "@/components/layout/Sidebar";
import { type ReactNode } from "react";

function BottomNavIcon({ active, children }: { active: boolean; children: ReactNode }) {
	return <span className={active ? "text-[#53B175]" : "text-[#7C7C7C]"}>{children}</span>;
}

interface AccountItemProps {
	icon: ReactNode;
	label: string;
	onClick?: () => void;
}

function AccountItem({ icon, label, onClick }: AccountItemProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex w-full items-center border-b border-[#E2E2E2] py-5 px-6 transition-colors hover:bg-gray-50 active:bg-gray-100"
		>
			<span className="text-[20px] text-[#181725]">{icon}</span>
			<span className="ml-5 flex-1 text-left font-poppins text-[18px] font-semibold text-[#181725]">
				{label}
			</span>
			<FiChevronRight className="text-[20px] text-[#181725]" />
		</button>
	);
}

export default function Account() {
	const router = useRouter();
	const { user, logout, selectedAddress } = useAuthStore();

	const handleLogout = () => {
		logout();
		router.push("/login");
	};

	return (
		<div className="min-h-screen bg-white pb-[92px] md:flex md:bg-[#F8F8F8] md:pb-0">
			<Sidebar />

			<main className="flex-1 md:ml-[240px]">
				{/* User Profile Header */}
				<header className="flex items-center gap-5 border-b border-[#E2E2E2] bg-white px-6 py-8 md:px-10">
					<div className="h-[64px] w-[64px] overflow-hidden rounded-[27px] bg-[#F2F3F2]">
						{user?.avatar ? (
							<img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
						) : (
							<div className="flex h-full w-full items-center justify-center text-[24px] text-[#53B175]">
								<FiUser />
							</div>
						)}
					</div>
					<div className="flex flex-col">
						<div className="flex items-center gap-2">
							<h1 className="font-poppins text-[20px] font-bold text-[#181725]">{user?.name || "Guest"}</h1>
							<button type="button" className="text-[#53B175]">
								<FiSettings size={18} />
							</button>
						</div>
						<p className="font-poppins text-[16px] text-[#7C7C7C]">{user?.email || "No email provided"}</p>
						{selectedAddress && (
							<p className="mt-1 flex items-center gap-1 font-poppins text-[12px] text-[#7C7C7C]">
								<FiMapPin size={12} />
								{selectedAddress.street}, {selectedAddress.city}
							</p>
						)}
					</div>
				</header>

				{/* Account List */}
				<div className="bg-white">
					<AccountItem icon={<FiShoppingBag />} label="Orders" />
					<AccountItem icon={<FiEdit3 />} label="Edit Profile" />
					<AccountItem icon={<FiMapPin />} label="Delivery Address" />
					<AccountItem icon={<FiCreditCard />} label="Payment Methods" />
					<AccountItem icon={<FiGrid />} label="Promo Code" />
					<AccountItem icon={<FiBell />} label="Notifications" />
					<AccountItem icon={<FiHelpCircle />} label="Help" />
					<AccountItem icon={<FiInfo />} label="About" />
				</div>

				<div className="mt-10 px-6 pb-10">
					<button
						type="button"
						onClick={handleLogout}
						className="relative flex h-[67px] w-full items-center justify-center rounded-[19px] bg-[#F2F3F2] font-poppins text-[18px] font-semibold text-[#53B175] transition-transform active:scale-95"
					>
						<FiLogOut className="absolute left-6" />
						Log Out
					</button>
				</div>
			</main>

			{/* Mobile Nav */}
			<nav className="fixed bottom-0 left-0 right-0 z-50 h-[92px] border-t border-[#E2E2E2] bg-white md:hidden">
				<div className="flex h-full items-center justify-around px-4">
					<button
						type="button"
						onClick={() => router.push("/home")}
						className="flex flex-col items-center gap-1"
					>
						<BottomNavIcon active={false}>
							<FiGrid className="h-6 w-6" />
						</BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Shop</span>
					</button>
					<button
						type="button"
						onClick={() => router.push("/explore")}
						className="flex flex-col items-center gap-1"
					>
						<BottomNavIcon active={false}>
							<TbSearch className="h-6 w-6" />
						</BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Explore</span>
					</button>
					<button
						type="button"
						onClick={() => router.push("/cart")}
						className="flex flex-col items-center gap-1"
					>
						<BottomNavIcon active={false}>
							<IoCartOutline className="h-6 w-6" />
						</BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Cart</span>
					</button>
					<button
						type="button"
						onClick={() => router.push("/favourites")}
						className="flex flex-col items-center gap-1"
					>
						<BottomNavIcon active={false}>
							<FiHeart className="h-6 w-6" />
						</BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Favorite</span>
					</button>
					<button type="button" className="flex flex-col items-center gap-1">
						<BottomNavIcon active={true}>
							<FiUser className="h-6 w-6" />
						</BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#53B175]">Account</span>
					</button>
				</div>
			</nav>
		</div>
	);
}
