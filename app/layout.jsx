import { Inter, Outfit } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '~/components/ui/sonner';
import Providers from './providers';

import './globals.css';

const outfit = Outfit({ subsets: ['latin'] });

/** @type {import('next').Metadata} */
export const metadata = {
	title: 'Finance Advisor',
	description: 'Manage your money with AI-Driven Personal Finance Advisor',
	icons: {
		icon: '/logosmall.svg',
	},
};

export default function RootLayout({ children }) {
	return (
		<ClerkProvider
			publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
		>
			<html lang="en">
				<body className={outfit.className}>
					<Providers>
						{children}
						<Toaster />
					</Providers>
				</body>
			</html>
		</ClerkProvider>
	);
}
