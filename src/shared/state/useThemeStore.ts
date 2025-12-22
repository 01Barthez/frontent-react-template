import create from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

type ThemeState = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      setTheme: (t: Theme) => set({ theme: t }),
      toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
    }),
    {
      name: 'frontend-starter-theme',
      getStorage: () => (typeof window !== 'undefined' ? window.localStorage : undefined),
    },
  ),
);
