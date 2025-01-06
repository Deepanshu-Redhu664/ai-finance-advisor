'use client';
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
function Header() {
	const { user, isSignedIn } = useUser();
	return (
		<div className="flex items-center justify-between p-5 border shadow-sm">
			<div className="flex flex-row items-center">
				<Image src={'./logo.svg'} alt="logo" width={180} height={25} />
			</div>
			{isSignedIn ? (
				<div className="flex items-center gap-3">
					<Link href={'/dashboard'}>
						<Button variant="outline" className="rounded-full">
							Dashboard
						</Button>
					</Link>
					<UserButton />
				</div>
			) : (
				<Link href={'/sign-in'}>
					<Button className="rounded-full">Get Started</Button>
				</Link>
			)}
		</div>
	);
}

export default Header;
