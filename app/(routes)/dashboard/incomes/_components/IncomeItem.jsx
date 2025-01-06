import { db } from '@/utils/dbConfig';
import { Incomes } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

function IncomeItem({ budget, refreshData }) {
	// const calculateProgressPerc = () => {
	// 	const perc = (budget.totalSpend / budget.amount) * 100;
	// 	return perc > 100 ? 100 : perc.toFixed(2);
	// };
	const deleteIncome = async () => {
		const result = await db
			.delete(Incomes)
			.where(eq(Incomes.id, budget.id))
			.returning();

		if (result) {
			toast('Income Deleted!');
			refreshData();
		}
	};
	return (
		<div className="p-5 border rounded-2xl hover:shadow-md cursor-pointer h-[170px] flex flex-col justify-between">
			<div className="flex items-center justify-between gap-2">
				<div className="flex items-center gap-2">
					<h2 className="p-3 px-4 text-2xl rounded-full bg-slate-100 ">
						{budget?.icon}
					</h2>
					<div>
						<h2 className="font-bold">{budget.name}</h2>
						{/* <h2 className="text-sm text-gray-500">{budget.totalItem} Item</h2> */}
					</div>
				</div>
				<h2 className="text-lg font-bold text-primary"> ₹{budget.amount}</h2>
			</div>
			<div
				className="ml-auto cursor-pointer text-destructive hover:underline"
				onClick={deleteIncome}
			>
				Delete
			</div>
		</div>
	);
}

export default IncomeItem;
