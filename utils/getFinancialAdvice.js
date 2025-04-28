import axios from 'axios';

/**
 * Get financial advice from the AI
 * @param {string | number} totalBudget
 * @param {string | number} totalIncome
 * @param {string | number} totalSpend
 * @returns {Promise<string>}
 */
const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
	try {
		const data = await axios.post('/api/get-advice', {
			totalBudget,
			totalIncome,
			totalSpend,
		});
		return data.data.advice;
	} catch (error) {
		console.error('Error fetching financial advice:', error);
		return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
	}
};

export default getFinancialAdvice;
