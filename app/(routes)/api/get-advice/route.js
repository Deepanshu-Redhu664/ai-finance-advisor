const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function POST(req) {
	const data = await req.json();
	const totalBudget = data?.totalBudget;
	const totalIncome = data?.totalIncome;
	const totalSpend = data?.totalSpend;

	const userPrompt = `
      Based on the following financial data:
      - Total Budget: ${totalBudget} INR 
      - Expenses: ${totalSpend} INR 
      - Incomes: ${totalIncome} INR
      Provide detailed financial advice in 2 sentence to help the user manage their finances more effectively.
    `;

	const res = await model.generateContent(userPrompt);

	// Process and return the response
	const advice = res.response.text();

	return Response.json({ advice });
}
