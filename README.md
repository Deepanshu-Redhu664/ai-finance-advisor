
## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Assets & Code](#snippets)



## <a name="introduction">🤖 Introduction</a>

Built with the latest Next.js and TypeScript, Finan Smart is an advanced AI financial advice tool. It allows users to input their income, expenses, and budgets, and receive personalized financial advice based on their financial data. This project is perfect for those looking to learn how to integrate AI-driven insights and financial management into a Next.js application.


## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- TypeScript
- OpenAI API
- Tailwind CSS

## <a name="features">🔋 Features</a>

👉 **Income and Expense Input**: Allows users to input their income and expenses.

👉 **Budget Management**: Enables users to manage their budgets effectively.

👉 **Personalized Financial Advice**: Provides detailed financial advice based on user-specific financial data using Gemini model.

👉 **Responsive Design**: Ensures a seamless experience across different devices.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)



**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=p
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_OPENAI_API_KEY=

NEXT_PUBLIC_DATABASE_URL=

```

Replace the placeholder values with your actual OpenAI credentials. You can obtain these credentials by signing up on the [Gemini](https://ai.google.dev/).

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="snippets">🕸️ Assets & Code</a>

The repository includes all the assets and code you need to get started with Finance Advisor.