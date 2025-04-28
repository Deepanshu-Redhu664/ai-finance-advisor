'use client';
import { db } from '~/db';
import { Expenses, Incomes } from '~/db/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import CreateIncomes from './CreateIncomes';
import IncomeItem from './IncomeItem';

function IncomeList() {
	const [incomelist, setIncomelist] = useState([]);
	const { user } = useUser();
	useEffect(() => {
		user && getIncomelist();
	}, [user]);

	const getIncomelist = async () => {
		const result = await db
			.select({
				...getTableColumns(Incomes),
				totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
				totalItem: sql`count(${Expenses.id})`.mapWith(Number),
			})
			.from(Incomes)
			.leftJoin(Expenses, eq(Incomes.id, Expenses.budgetId))
			.where(eq(Incomes.createdBy, user?.primaryEmailAddress?.emailAddress))
			.groupBy(Incomes.id)
			.orderBy(desc(Incomes.id));
		setIncomelist(result);
	};

	return (
		<div className="mt-7">
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
				<CreateIncomes refreshData={() => getIncomelist()} />
				{incomelist?.length > 0
					? incomelist.map((budget) => (
							<IncomeItem
								budget={budget}
								key={budget.id}
								refreshData={getIncomelist}
							/>
					  ))
					: [1, 2, 3, 4, 5].map((item) => (
							<div
								key={item}
								className="w-full bg-slate-200 rounded-lg
        h-[150px] animate-pulse"
							></div>
					  ))}
			</div>
		</div>
	);
}

export default IncomeList;
