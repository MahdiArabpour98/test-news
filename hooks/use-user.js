import { create } from "zustand";

export const useUser = create((set) => ({
  user: {
    id: 1,
    phoneNumber: "09131993023",
    fullName: "مهدی عربپور",
  },
  setUser: (data) => set({ user: data }),
}));
