import { create } from 'zustand';
import type { ChatMessage } from '../types/chat.types';
import { initialChatMessages } from '../data/mockData';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  addMessage: (msg: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
  updateLastMessage: (content: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: initialChatMessages,
  isLoading: false,
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  setLoading: (loading) => set({ isLoading: loading }),
  updateLastMessage: (content) =>
    set((state) => {
      const messages = [...state.messages];
      if (messages.length > 0) {
        messages[messages.length - 1] = {
          ...messages[messages.length - 1],
          content,
          isStreaming: false,
        };
      }
      return { messages };
    }),
}));
