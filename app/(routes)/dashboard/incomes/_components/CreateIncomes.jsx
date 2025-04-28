'use client';
import React, { useState } from 'react';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/components/ui/dialog';
import EmojiPicker from 'emoji-picker-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { db } from '~/db';
import { Incomes } from '~/db/schema';
import { toast } from 'sonner';
import { useUser } from '~/hooks/useUser';

function CreateIncomes({ refreshData }) {
	const [emojiIcon, setEmojiIcon] = useState('😀');
	const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

	const [name, setName] = useState();
	const [amount, setAmount] = useState();

	const { data: userData } = useUser();

	/**
	 * Used to Create New Budget
	 */
	const onCreateIncomes = async () => {
		const result = await db
			.insert(Incomes)
			.values({
				name: name,
				amount: amount,
				userId: userData?.id,
				createdBy: userData?.email,
				icon: emojiIcon,
			})
			.returning({ insertedId: Incomes.id });

		if (result) {
			refreshData();
			toast('New Income Source Created!');
		}
	};
	return (
		<div>
			<Dialog>
				<DialogTrigger asChild>
					<div className="flex flex-col items-center p-10 border-2 border-dashed cursor-pointer bg-slate-100 rounded-2xl hover:shadow-md">
						<h2 className="text-3xl">+</h2>
						<h2>Create New Income Source</h2>
					</div>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Income Source</DialogTitle>
						<div className="mt-5">
							<Button
								variant="outline"
								className="text-lg"
								onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
							>
								{emojiIcon}
							</Button>
							<div className="absolute z-20">
								<EmojiPicker
									open={openEmojiPicker}
									onEmojiClick={(e) => {
										setEmojiIcon(e.emoji);
										setOpenEmojiPicker(false);
									}}
								/>
							</div>
							<div className="mt-2">
								<h2 className="my-1 font-medium text-black">Source Name</h2>
								<Input
									placeholder="e.g. Youtube"
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="mt-2">
								<h2 className="my-1 font-medium text-black">Montly Amount</h2>
								<Input
									type="number"
									placeholder="e.g. ₹ 5000"
									onChange={(e) => setAmount(e.target.value)}
								/>
							</div>
						</div>
					</DialogHeader>
					<DialogFooter className="sm:justify-start">
						<DialogClose asChild>
							<Button
								disabled={!(name && amount)}
								onClick={() => onCreateIncomes()}
								className="w-full mt-5 rounded-full"
							>
								Create Income Source
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default CreateIncomes;
