# AI Finance Advisor

## 📋 Table of Contents

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🔧 [Installation & Setup](#installation--setup)
5. 🛠️ [Database & Migrations](#database--migrations)
6. 🔑 [Environment Variables](#environment-variables)
7. 🚀 [Running the App](#running-the-app)
8. 📦 [API Endpoints](#api-endpoints)
9. 🔍 [Assets & Code](#assets--code)

---

## 🤖 Introduction

**AI Finance Advisor** is a modern financial management tool built with Next.js (App Router) and TypeScript. It lets users authenticate, manage budgets, track incomes and expenses, and receive personalized AI-driven advice using Google Gemini.

---

## ⚙️ Tech Stack

- **Framework:** Next.js v15.3.1 (App Router)
- **Language:** JavaScript (React/JSX)
- **Styling:** Tailwind CSS + tailwind-merge
- **Authentication:** Clerk (OAuth & session management)
- **Database:** PostgreSQL on Neon
- **ORM & Migrations:** Drizzle ORM
- **Database Driver:** pg (node-postgres)
- **AI:** @google/genai (Gemini API)
- **State Management:** Jotai
- **Data Fetching:** React Query, Axios
- **Data Visualization:** Recharts
- **UI & Components:** Radix UI, Shadcn UI (implied by components.json), Framer Motion, Lucide React
- **Notifications:** Sonner
- **Theming:** next-themes
- **Markdown:** react-markdown

---

## 🔋 Features

- **User Authentication:** Secure sign-up/sign-in with Clerk
- **Budget Management:** Create, update, and delete budgets
- **Income & Expense Tracking:** Link incomes and expenses to budgets
- **Analytics:** Real-time charts and summaries with Recharts
- **AI Advice:** Generate personalized financial recommendations via Google Gemini
- **AI Chat:** Interactive AI chat for financial queries
- **Responsive & Themed UI:** Light/dark mode support via `next-themes`
- **Toast Notifications:** User feedback via `Sonner`

---

## 🔧 Installation & Setup

### Prerequisites

- Node.js >= 18
- npm or yarn
- Git

### Clone the Repository

```bash
git clone https://github.com/yourusername/ai-finance-advisor.git
cd ai-finance-advisor
```

---

## 🛠️ Database & Migrations

This project uses Drizzle ORM with a Neon PostgreSQL database.

- **Push schema to your database** (Ensure your `.env` file has `NEXT_PUBLIC_DATABASE_URL`)

  ```bash
  npm run db:push
  ```

- **Explore via Drizzle Studio**

  ```bash
  npm run db:studio
  ```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and add:

```dotenv
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/"
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/"
NEXT_PUBLIC_DATABASE_URL=postgresql://user:password@host:port/dbname
GEMINI_API_KEY="gemini_api_key"
```

Replace placeholder values with your own Clerk and database credentials, and your Gemini API key. **Note:** The `NEXT_PUBLIC_DATABASE_URL` is used by Drizzle Kit during schema push.

---

## 🚀 Running the App

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Open your browser at `http://localhost:3000`

---

## 📦 API Endpoints

- **GET** `/api/get-advice`  
  Returns AI-generated financial advice based on the user's budgets, incomes, and expenses.
- **GET** `/api/get-ai-chat`  
  Handles interactive AI chat sessions for financial queries.

---

## 🔍 Assets & Code

- **App Directory:** `app/` (Next.js App Router structure)
- **Components:** `components/` (Includes `ui/` for Shadcn/Radix components and `chat/` for chat interface)
- **API Routes:** `app/(routes)/api/`
- **Database Schema:** `db/schema.js` (or similar within `db/`)
- **Drizzle Config:** `drizzle.config.js`
- **Hooks:** `hooks/`
- **Utilities:** `lib/` and `utils/`
- **Middleware:** `middleware.js` (Clerk auth handling)
- **Styling:** `app/globals.css`, `tailwind.config.js`, `postcss.config.mjs`
