import { auth } from '@clerk/nextjs/server';
import { GoogleGenAI } from '@google/genai';
import { eq } from 'drizzle-orm';
import { db } from '~/db';
import { Budgets, Users, Incomes, Expenses } from '~/db/schema';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function POST(req) {
	const { userId } = await auth();

	const [user] = await db.select().from(Users).where(eq(Users.clerkId, userId));

	if (!user) {
		return Response.json({ message: 'User not found' }, { status: 404 });
	}

	if (user.plan === 'starter') {
		return Response.json(
			{ message: 'You are on starter plan, upgrade to pro to use AI' },
			{ status: 403 }
		);
	}

	const [userBudgets, userIncomes, userExpenses] = await Promise.all([
		db.select().from(Budgets).where(eq(Budgets.userId, user.id)),
		db.select().from(Incomes).where(eq(Incomes.userId, user.id)),
		db
			.select()
			.from(Expenses)
			.where(eq(Expenses.userId, user.id))
			.innerJoin(Budgets, eq(Expenses.budgetId, Budgets.id)),
	]);

	let budgetsString = '';
	userBudgets.forEach((budget) => {
		budgetsString += `Budget Name: ${budget.name} - Budget Amount: ${budget.amount}\n`;
	});

	let incomesString = '';
	userIncomes.forEach((income) => {
		incomesString += `Income Name: ${income.name} - Income Amount: ${income.amount}\n`;
	});

	let expensesString = '';
	userExpenses.forEach((expense) => {
		expensesString += `Expense Name: ${expense.expenses.name} - Expense Amount: ${expense.expenses.amount} - For Budget: ${expense.budgets.name}\n`;
	});

	const messages = await req.json();
	const filteredMessages = messages.slice(0, -1);

	const lastMessage = messages[messages.length - 1];

	const chat = ai.chats.create({
		model: 'gemini-2.5-flash-preview-04-17',
		history: [
			{
				role: 'user',
				parts: [
					{
						text: `You are a finance-only AI assistant for a financial management app. You must only answer questions related to finance and money management. If the user asks about any other topic, reply with "I can only answer finance-related questions. Please ask a finance or money management question.".

You are helpful and friendly with vast knowledge about finance and money management. Help the user manage their finances more effectively. This is the user's data, based on the user's data, you should help the user to manage their money better; all spendings based on budgets will be in the expense table data:
User's Name: ${user.name}
User's Email: ${user.email}
User's Budgets: ${budgetsString}
User Plan: ${user.plan}
User's Incomes: ${incomesString}
User's Expenses: ${expensesString}
If user wants to add a budget, ask the user to click on the Budgets button in the left sidebar with the piggy bank icon and then click on the Add Budget button. If user wants to add income, ask the user to click on the Incomes button in the left sidebar with the rupee icon and then click on the Add Income Source button. If user wants to add an expense, ask the user to click on the Budgets button in the left sidebar with the piggy bank icon, then click on a budget and add an expense. If the user is not on the pro plan, give advice about upgrading to pro plan and only provide information about the app and how to use it. If on the pro plan, give advice about managing money better, how to save money and invest money, and customize the advice based on the user's data. Don't repeat users plan again and again.`,
					},
				],
			},
			...filteredMessages.map((message) => ({
				role: message.role,
				parts: [
					{
						text: message.content,
					},
				],
			})),
		],
	});

	const res = await chat.sendMessage({
		message: {
			text: lastMessage.content,
		},
	});

	const message = res.text;

	return Response.json({ message });
}
