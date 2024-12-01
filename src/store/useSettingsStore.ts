import { create } from 'zustand';
import { ReadingSettings } from '../types';

interface SettingsStore {
  settings: ReadingSettings;
  updateSettings: (settings: Partial<ReadingSettings>) => void;
}

const defaultSettings: ReadingSettings = {
  fontSize: 16,
  lineHeight: 1.6,
  theme: 'light',
  fontFamily: 'system-ui',
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: defaultSettings,
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
}));