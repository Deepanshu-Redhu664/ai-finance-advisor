'use client';
import React, { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';

import { db } from '~/db';
import { Budgets } from '~/db/schema';
import DashboardHeader from '../dashboard/_components/DashboardHeader';
import SideNav from '../dashboard/_components/SideNav';
import ChatComponent from '~/components/chat';

function DashboardLayout({ children }) {
	const { user } = useUser();
	const router = useRouter();
	useEffect(() => {
		user && checkUserBudgets();
	}, [user]);

	const checkUserBudgets = async () => {
		const result = await db
			.select()
			.from(Budgets)
			.where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
		if (result?.length == 0) {
			router.replace('/dashboard/budgets');
		}
	};

	return (
		<div>
			<div className="fixed hidden md:w-64 md:block ">
				<SideNav />
			</div>
			<div className="md:ml-64 ">
				<DashboardHeader />
				{children}
			</div>
			<ChatComponent />
		</div>
	);
}

export default DashboardLayout;
