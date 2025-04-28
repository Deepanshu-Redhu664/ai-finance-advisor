'use client';
import { Loader2, PlusIcon, SendIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { useChat } from '~/hooks/useChat';
import { cn } from '~/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Resizable } from 're-resizable';
import { toast } from 'sonner';

const ChatBox = ({ width, height, setWidth, setHeight }) => {
	const { messages, setMessages, resetChat, getAIChat } = useChat();

	const { mutateAsync: getAIChatMutation, isPending } = getAIChat;

	const [message, setMessage] = useState('');
	const bottomRef = useRef(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages, isPending]);

	const handleSendMessage = async () => {
		if (message.trim() === '') {
			toast.error('Message cannot be empty');
			return;
		}
		const newMessages = [
			...messages,
			{ id: messages.length + 1, content: message, role: 'user' },
		];
		setMessages(newMessages);
		setMessage('');
		const res = await getAIChatMutation(newMessages);
		setMessages([
			...newMessages,
			{ id: newMessages.length + 1, content: res.message, role: 'model' },
		]);
	};

	return (
		<div className="fixed bottom-20 right-4 ">
			<Resizable
				size={{
					width,
					height,
				}}
				onResizeStop={(e, direction, ref, d) => {
					setWidth(width + d.width);
					setHeight(height + d.height);
				}}
				minWidth={340}
				minHeight={520}
				maxWidth={800}
				maxHeight={800}
				className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border pt-6 shadow-sm"
			>
				<CardHeader className="px-4 flex justify-between items-center">
					<CardTitle>Chat with AI</CardTitle>
					<Button variant="outline" size="icon" onClick={resetChat}>
						<PlusIcon />
					</Button>
				</CardHeader>
				<ScrollArea className="h-[calc(100%-9rem)]">
					<div className="py-2">
						<CardContent className="flex flex-col gap-2 px-4">
							{messages.map((message) => (
								<Message key={message.id} message={message} />
							))}
							{isPending && (
								<div className="h-10">
									<Loader2 className="animate-spin" />
								</div>
							)}
							<div ref={bottomRef} />
						</CardContent>
					</div>
				</ScrollArea>
				<CardFooter className="mt-auto">
					<div className="flex gap-2 w-full">
						<Input
							type="text"
							placeholder="Message"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleSendMessage();
								}
							}}
						/>
						<Button
							variant="outline"
							size="icon"
							onClick={handleSendMessage}
							isLoading={isPending}
						>
							<SendIcon />
						</Button>
					</div>
				</CardFooter>
			</Resizable>
		</div>
	);
};

const Message = ({ message, className }) => {
	const { content, role, hidden } = message;

	if (hidden) {
		return null;
	}

	return (
		<div
			className={cn(
				'border rounded-md p-2 w-fit max-w-[80%]',
				role === 'model'
					? 'text-left bg-blue-600 text-white mr-auto'
					: 'text-right bg-white text-black ml-auto',
				className
			)}
		>
			<Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
		</div>
	);
};

export default ChatBox;
