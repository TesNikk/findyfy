import { db } from "@/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.error("Fetch User Error:", err.message);
      return set({ currentUser: null, isLoading: false });
    }
  },
}));
