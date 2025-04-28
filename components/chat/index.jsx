'use client';

import { MessageCircleIcon } from 'lucide-react';
import { useState } from 'react';

import { useUser } from '~/hooks/useUser';
import { useChat } from '~/hooks/useChat';
import ChatBox from './chat-box';

const ChatComponent = () => {
	const { data: userData } = useUser();
	const { isChatOpen, handleChatOpen } = useChat();

	const [width, setWidth] = useState(340);
	const [height, setHeight] = useState(520);

	if (!(userData?.plan === 'pro')) {
		return null;
	}

	return (
		<>
			<button
				onClick={handleChatOpen}
				className="fixed bottom-4 right-4 rounded-full bg-primary p-4"
			>
				<MessageCircleIcon className="h-6 w-6 text-white" />
			</button>
			{isChatOpen && (
				<ChatBox
					width={width}
					height={height}
					setWidth={setWidth}
					setHeight={setHeight}
				/>
			)}
		</>
	);
};

export default ChatComponent;
