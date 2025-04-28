import {
	clerkClient,
	clerkMiddleware,
	createRouteMatcher,
} from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import { db } from './db';
import { Users } from './db/schema';

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, req) => {
	if (!isPublicRoute(req)) {
		await auth.protect();
	}
	const { userId } = await auth();
	if (!userId) {
		return;
	}
	const clerk = await clerkClient();
	const user = await clerk.users.getUser(userId);
	const clerkId = user.id;
	const userEmail = user.emailAddresses[0].emailAddress;

	const userExists = await db.query.Users.findFirst({
		where: eq(Users.clerkId, clerkId),
	});
	if (!userExists) {
		await db.insert(Users).values({
			clerkId,
			email: userEmail,
			createdAt: new Date().toISOString(),
			plan: 'starter',
			name: user.fullName.trim(),
		});
	}
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
};
