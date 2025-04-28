import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

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

	const res = await ai.models.generateContent({
		model: 'gemini-2.0-flash-001',
		contents: userPrompt,
	});

	const advice = res.text;

	return Response.json({ advice });
}
