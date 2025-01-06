'use client';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { ArrowLeft, Pen, PenBox, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import EditBudget from '../_components/EditBudget';
import ExpenseListTable from '../_components/ExpenseListTable';

function ExpensesScreen({ params }) {
	const { user } = useUser();
	const [budgetInfo, setbudgetInfo] = useState();
	const [expensesList, setExpensesList] = useState([]);
	const route = useRouter();
	useEffect(() => {
		user && getBudgetInfo();
	}, [user]);

	/**
	 * Get Budget Information
	 */
	const getBudgetInfo = async () => {
		const result = await db
			.select({
				...getTableColumns(Budgets),
				totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
				totalItem: sql`count(${Expenses.id})`.mapWith(Number),
			})
			.from(Budgets)
			.leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
			.where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
			.where(eq(Budgets.id, params.id))
			.groupBy(Budgets.id);

		setbudgetInfo(result[0]);
		getExpensesList();
	};

	/**
	 * Get Latest Expenses
	 */
	const getExpensesList = async () => {
		const result = await db
			.select()
			.from(Expenses)
			.where(eq(Expenses.budgetId, params.id))
			.orderBy(desc(Expenses.id));
		setExpensesList(result);
	};

	/**
	 * Used to Delete budget
	 */
	const deleteBudget = async () => {
		const deleteExpenseResult = await db
			.delete(Expenses)
			.where(eq(Expenses.budgetId, params.id))
			.returning();

		if (deleteExpenseResult) {
			const result = await db
				.delete(Budgets)
				.where(eq(Budgets.id, params.id))
				.returning();
		}
		toast('Budget Deleted !');
		route.replace('/dashboard/budgets');
	};

	return (
		<div className="p-10">
			<h2 className="flex items-center justify-between gap-2 text-2xl font-bold">
				<span className="flex items-center gap-2">
					<ArrowLeft onClick={() => route.back()} className="cursor-pointer" />
					My Expenses
				</span>
				<div className="flex items-center gap-2">
					<EditBudget
						budgetInfo={budgetInfo}
						refreshData={() => getBudgetInfo()}
					/>

					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button className="flex gap-2 rounded-full" variant="destructive">
								<Trash className="w-4" /> Delete
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently delete
									your current budget along with expenses and remove your data
									from our servers.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={() => deleteBudget()}>
									Continue
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</h2>
			<div className="grid grid-cols-1 gap-5 mt-6 md:grid-cols-2">
				{budgetInfo ? (
					<BudgetItem budget={budgetInfo} />
				) : (
					<div
						className="h-[150px] w-full bg-slate-200 
            rounded-lg animate-pulse"
					></div>
				)}
				<AddExpense
					budgetId={params.id}
					user={user}
					refreshData={() => getBudgetInfo()}
				/>
			</div>
			<div className="mt-4">
				<ExpenseListTable
					expensesList={expensesList}
					refreshData={() => getBudgetInfo()}
				/>
			</div>
		</div>
	);
}

export default ExpensesScreen;
