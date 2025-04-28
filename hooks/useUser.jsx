'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';

import { db } from '~/db';
import { Users } from '~/db/schema';
import { eq } from 'drizzle-orm';

const fetchUser = async (clerkId) => {
	const user = await db.query.Users.findFirst({
		where: eq(Users.clerkId, clerkId),
	});
	return user;
};

export const useUser = () => {
	const { userId } = useAuth();

	return useQuery({
		queryKey: ['user', userId],
		queryFn: () => fetchUser(userId),
		enabled: !!userId,
		staleTime: 1000 * 60 * 5, // Cache for 5 minutes
		cacheTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
	});
};
