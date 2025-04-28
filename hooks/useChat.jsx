'use client';

import { useMutation } from '@tanstack/react-query';
import { atom, useAtom } from 'jotai';

const initialMessages = [
	{
		id: 1,
		content: 'Hello, how can I help you today?',
		role: 'model',
	},
];

const messagesState = atom(initialMessages);

const isChatOpenState = atom(false);

export function useChat() {
	const getAIChat = useMutation({
		mutationFn: async (messages) => {
			const res = await fetch('/api/get-ai-chat', {
				method: 'POST',
				body: JSON.stringify(messages),
			});
			return res.json();
		},
	});

	const [messages, setMessages] = useAtom(messagesState);
	const [isChatOpen, setIsChatOpen] = useAtom(isChatOpenState);

	const handleChatOpen = () => {
		setIsChatOpen(!isChatOpen);
	};

	const resetChat = () => {
		setMessages(initialMessages);
	};

	/**
	 * Handle sending a message to the chat
	 * @param {string} message - The message to send
	 * @param {string} role - The role of the message sender
	 */
	function handleMessageSend(message, role) {
		setMessages([
			...messages,
			{ id: messages.length + 1, content: message, role },
		]);
	}

	return {
		messages,
		isChatOpen,
		handleChatOpen,
		handleMessageSend,
		setMessages,
		resetChat,
		getAIChat,
	};
}
