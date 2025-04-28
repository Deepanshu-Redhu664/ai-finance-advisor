import { UserButton } from '@clerk/nextjs';
import {
	IndianRupee,
	LayoutGrid,
	PiggyBank,
	ReceiptText,
	ShieldCheck,
	TrendingDownIcon,
	TrendingUp,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
function SideNav() {
	const menuList = [
		{
			id: 1,
			name: 'Dashboard',
			icon: LayoutGrid,
			path: '/dashboard',
		},
		{
			id: 2,
			name: 'Incomes',
			icon: IndianRupee,
			path: '/dashboard/incomes',
		},
		{
			id: 2,
			name: 'Budgets',
			icon: PiggyBank,
			path: '/dashboard/budgets',
		},
		{
			id: 3,
			name: 'Expenses',
			icon: ReceiptText,
			path: '/dashboard/expenses',
		},
		// {
		//   id: 2,
		//   name: "Investments",
		//   icon: TrendingUp,
		//   path: "/dashboard/investments",
		// },
		// {
		//   id: 2,
		//   name: "Debts",
		//   icon: TrendingDownIcon,
		//   path: "/dashboard/debts",
		// },
		{
			id: 4,
			name: 'Upgrade',
			icon: ShieldCheck,
			path: '/dashboard/upgrade',
		},
	];
	const path = usePathname();

	return (
		<div className="h-screen p-5 border shadow-sm">
			<div className="flex flex-row items-center">
				<Image
					src="/logo.svg"
					alt="logo"
					width={180}
					height={25}
					className="w-auto"
					priority
				/>
			</div>
			<div className="mt-5">
				{menuList.map((menu, index) => (
					<Link href={menu.path} key={index}>
						<h2
							className={`flex gap-2 items-center
                    text-gray-500 font-medium
                    mb-2
                    p-4 cursor-pointer rounded-full
                    hover:text-primary hover:bg-blue-100
                    ${path == menu.path && 'text-primary bg-blue-100'}
                    `}
						>
							<menu.icon />
							{menu.name}
						</h2>
					</Link>
				))}
			</div>
			<div className="fixed flex items-center gap-2 p-5 bottom-10">
				<UserButton />
				Profile
			</div>
		</div>
	);
}

export default SideNav;
