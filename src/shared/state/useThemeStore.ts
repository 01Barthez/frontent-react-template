import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

export type ThemeState = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist<ThemeState>(
    (set, get) => ({
      theme: 'light',
      setTheme: (t: Theme) => set({ theme: t }),
      toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
    }),
    {
      name: 'frontend-starter-theme',
      // cast to any to satisfy typed PersistStorage signature in this environment
      storage:
        typeof window !== 'undefined'
          ? ({
              getItem: (name: string) => {
                const raw = window.localStorage.getItem(name);
                return raw ? (JSON.parse(raw) as ThemeState) : null;
              },
              setItem: (name: string, value: ThemeState) => {
                window.localStorage.setItem(name, JSON.stringify(value));
              },
              removeItem: (name: string) => {
                window.localStorage.removeItem(name);
              },
            } as unknown as any)
          : undefined,
    },
  ),
);
