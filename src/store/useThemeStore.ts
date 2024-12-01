import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeSettings, ThemeMode } from '../themes/types';

interface ThemeStore {
  settings: ThemeSettings;
  syncWithSystem: boolean;
  updateSettings: (settings: Partial<ThemeSettings>) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setSyncWithSystem: (sync: boolean) => void;
}

const defaultSettings: ThemeSettings = {
  mode: 'light',
  fontSize: 16,
  lineHeight: 1.6,
  fontFamily: 'Roboto, sans-serif',
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      syncWithSystem: true,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      setThemeMode: (mode) =>
        set((state) => ({
          settings: { ...state.settings, mode },
          syncWithSystem: false,
        })),
      setSyncWithSystem: (sync) =>
        set({ syncWithSystem: sync }),
    }),
    {
      name: 'theme-settings',
    }
  )
);