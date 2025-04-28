import formatNumber from '~/utils';
import getFinancialAdvice from '~/utils/getFinancialAdvice';
import {
	IndianRupee,
	PiggyBank,
	ReceiptText,
	Sparkles,
	Wallet,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

function CardInfo({ budgetList, incomeList }) {
	const [totalBudget, setTotalBudget] = useState(0);
	const [totalSpend, setTotalSpend] = useState(0);
	const [totalIncome, setTotalIncome] = useState(0);
	const [financialAdvice, setFinancialAdvice] = useState('');

	useEffect(() => {
		if (budgetList.length > 0 || incomeList.length > 0) {
			CalculateCardInfo();
		}
	}, [budgetList, incomeList]);

	useEffect(() => {
		if (totalBudget > 0 || totalIncome > 0 || totalSpend > 0) {
			const fetchFinancialAdvice = async () => {
				const advice = await getFinancialAdvice(
					totalBudget,
					totalIncome,
					totalSpend
				);
				setFinancialAdvice(advice);
			};

			fetchFinancialAdvice();
		}
	}, [totalBudget, totalIncome, totalSpend]);

	const CalculateCardInfo = () => {
		let totalBudget_ = 0;
		let totalSpend_ = 0;
		let totalIncome_ = 0;

		budgetList.forEach((element) => {
			totalBudget_ = totalBudget_ + Number(element.amount);
			totalSpend_ = totalSpend_ + element.totalSpend;
		});

		incomeList.forEach((element) => {
			totalIncome_ = totalIncome_ + element.totalAmount;
		});

		setTotalIncome(totalIncome_);
		setTotalBudget(totalBudget_);
		setTotalSpend(totalSpend_);
	};

	return (
		<div>
			{budgetList?.length > 0 ? (
				<div>
					<div className="flex items-center justify-between mt-4 -mb-1 border p-7 rounded-2xl">
						<div className="">
							<div className="flex flex-row items-center mb-2 space-x-1 ">
								<h2 className="text-md ">Finance Smart AI</h2>
								<Sparkles className="w-10 h-10 p-2 text-white rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate" />
							</div>
							<h2 className="font-light text-md">
								{financialAdvice || 'Loading financial advice...'}
							</h2>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-5 mt-7 md:grid-cols-2 lg:grid-cols-3">
						<div className="flex items-center justify-between border p-7 rounded-2xl">
							<div>
								<h2 className="text-sm">Total Budget</h2>
								<h2 className="text-2xl font-bold">
									₹{formatNumber(totalBudget)}
								</h2>
							</div>
							<PiggyBank className="w-12 h-12 p-3 text-white bg-blue-800 rounded-full" />
						</div>
						<div className="flex items-center justify-between border p-7 rounded-2xl">
							<div>
								<h2 className="text-sm">Total Spend</h2>
								<h2 className="text-2xl font-bold">
									₹{formatNumber(totalSpend)}
								</h2>
							</div>
							<ReceiptText className="w-12 h-12 p-3 text-white bg-blue-800 rounded-full" />
						</div>
						<div className="flex items-center justify-between border p-7 rounded-2xl">
							<div>
								<h2 className="text-sm">No. Of Budget</h2>
								<h2 className="text-2xl font-bold">{budgetList?.length}</h2>
							</div>
							<Wallet className="w-12 h-12 p-3 text-white bg-blue-800 rounded-full" />
						</div>
						<div className="flex items-center justify-between border p-7 rounded-2xl">
							<div>
								<h2 className="text-sm">Sum of Income Streams</h2>
								<h2 className="text-2xl font-bold">
									₹{formatNumber(totalIncome)}
								</h2>
							</div>
							<IndianRupee className="w-12 h-12 p-3 text-white bg-blue-800 rounded-full" />
						</div>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-5 mt-7 md:grid-cols-2 lg:grid-cols-3">
					{[1, 2, 3].map((item) => (
						<div
							className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"
							key={item}
						></div>
					))}
				</div>
			)}
		</div>
	);
}

export default CardInfo;
