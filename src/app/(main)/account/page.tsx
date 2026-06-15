"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import {
	FiLogOut,
	FiUser,
	FiMail,
	FiMapPin,
	FiChevronRight,
	FiEdit2,
	FiShoppingBag,
	FiCreditCard,
	FiBell,
	FiHelpCircle,
	FiInfo
} from "react-icons/fi";

interface MenuItemProps {
	icon: React.ReactNode;
	label: string;
	onClick?: () => void;
	color?: string;
}

function MenuItem({ icon, label, onClick, color = "#181725" }: MenuItemProps) {
	return (
		<button
			onClick={onClick}
			className="flex w-full items-center border-b border-[#E2E2E2] py-5 transition-colors active:bg-gray-50"
		>
			<span className="mr-4 text-[20px]" style={{ color }}>{icon}</span>
			<span className="flex-1 text-left font-poppins text-[18px] font-semibold" style={{ color }}>
				{label}
			</span>
			<FiChevronRight className="text-[#181725]" size={20} />
		</button>
	);
}

export default function AccountPage() {
	const router = useRouter();
	const { user, logout, selectedAddress } = useAuthStore();

	const handleLogout = () => {
		logout();
		router.push("/login");
	};

	if (!user) return null;

	return (
		<main className="min-h-screen bg-white pb-24">
			{/* Header / Profile Info */}
			<div className="flex items-center border-b border-[#E2E2E2] px-6 py-10">
				<div className="relative h-[64px] w-[64px] overflow-hidden rounded-[27px] bg-[#F2F3F2]">
					{user.avatar ? (
						<img src={user.avatar} alt={user.username} className="h-full w-full object-cover" />
					) : (
						<div className="flex h-full w-full items-center justify-center text-[#53B175]">
							<FiUser size={32} />
						</div>
					)}
				</div>
				<div className="ml-5 flex-1">
					<div className="flex items-center gap-2">
						<h1 className="font-poppins text-[20px] font-bold text-[#181725]">
							{user.username}
						</h1>
						<button className="text-[#53B175]">
							<FiEdit2 size={16} />
						</button>
					</div>
					<p className="font-poppins text-[16px] text-[#7C7C7C]">{user.email}</p>
				</div>
			</div>

			{/* Location Summary */}
			<div className="flex items-center border-b border-[#E2E2E2] px-6 py-4">
				<FiMapPin className="mr-4 text-[#181725]" size={20} />
				<div className="flex-1">
					<p className="font-poppins text-[14px] font-semibold text-[#181725]">
						{selectedAddress ? `${selectedAddress.zone}, ${selectedAddress.area}` : "No location selected"}
					</p>
				</div>
			</div>

			{/* Menu Items */}
			<div className="px-6">
				<MenuItem icon={<FiShoppingBag />} label="Orders" />
				<MenuItem icon={<FiUser />} label="My Details" />
				<MenuItem icon={<FiMapPin />} label="Delivery Address" />
				<MenuItem icon={<FiCreditCard />} label="Payment Methods" />
				<MenuItem icon={<FiBell />} label="Notifications" />
				<MenuItem icon={<FiHelpCircle />} label="Help" />
				<MenuItem icon={<FiInfo />} label="About" />
			</div>

			{/* Logout Button */}
			<div className="mt-12 px-6">
				<button
					onClick={handleLogout}
					className="relative flex h-[67px] w-full items-center justify-center rounded-[19px] bg-[#F2F3F2] font-poppins text-[18px] font-semibold text-[#53B175] transition-all active:scale-95"
				>
					<span className="absolute left-6">
						<FiLogOut size={22} />
					</span>
					Log Out
				</button>
			</div>
		</main>
	);
}
