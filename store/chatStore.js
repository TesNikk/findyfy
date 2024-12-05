import { create } from "zustand";

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  changeChat: (chatId, user) => set({ chatId, user }),
}));
