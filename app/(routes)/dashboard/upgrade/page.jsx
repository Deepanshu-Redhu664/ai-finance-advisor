'use client';
import React from 'react';
import { useClerk } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';

import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { db } from '~/db';
import { Users } from '~/db/schema';
import { useUser } from '~/hooks/useUser';

const plans = [
	{
		planId: 'starter',
		name: 'Starter',
		price: 'Free',
		features: ['Finance AI Advice', 'Budget Customization', 'Email support'],
	},
	{
		planId: 'pro',
		name: 'Pro',
		price: '₹ 300',
		features: [
			'One on one chat with Expert',
			'Personalized Finance AI Advice',
			'Budget Customization',
			'Email support',
			'Chat Support',
		],
	},
];

function Upgrade() {
	return (
		<div className="max-w-3xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
				{plans.map((plan) => (
					<PlanCard key={plan.planId} {...plan} />
				))}
			</div>
		</div>
	);
}

const PlanCard = ({ planId, planName, price, features }) => {
	const { data: userData, refetch: refetchUser } = useUser();

	const isCurrent = userData?.plan === planId;
	const upgradeAvailable = !isCurrent && planId !== 'starter';
	const { user } = useClerk();

	const handlePlanChange = async () => {
		if (!user) return;
		const userId = user.id;
		await db
			.update(Users)
			.set({ plan: planId })
			.where(eq(Users.clerkId, userId));
		refetchUser();
	};

	return (
		<div
			className={cn(
				'p-6 border shadow-sm rounded-2xl sm:px-8 lg:p-12',
				isCurrent ? 'border-indigo-600 border-2' : 'border-gray-200'
			)}
		>
			<div className="text-center">
				<h2 className="text-lg font-medium text-gray-900">
					{planName}
					<span className="sr-only">Plan</span>
				</h2>

				<p className="mt-2 sm:mt-4">
					<strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
						{price} {price === 'Free' ? '' : '/month'}
					</strong>
				</p>
			</div>

			<ul className="mt-6 space-y-2">
				{features.map((feature, index) => (
					<li className="flex items-center gap-1" key={index}>
						<TickIcon />
						<span className="text-gray-700"> {feature} </span>
					</li>
				))}
			</ul>

			<div className="flex justify-center">
				<Button
					variant={isCurrent ? 'outline' : 'default'}
					className="mt-8 rounded-full"
					size="lg"
					disabled={isCurrent}
					onClick={() => {
						handlePlanChange();
					}}
				>
					{isCurrent
						? 'Current Plan'
						: upgradeAvailable
						? 'Upgrade'
						: 'Go Back'}
				</Button>
			</div>
		</div>
	);
};

const TickIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className="text-indigo-700 size-5"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M4.5 12.75l6 6 9-13.5"
			/>
		</svg>
	);
};

export default Upgrade;
