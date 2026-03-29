import { createContext, useContext, useState } from "react";
import { getItem, setItem, STORAGE_KEYS } from "../utils/storage";
import { defaultSettings } from "../data/seedData";

const SettingsContext = createContext(undefined);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    return getItem(STORAGE_KEYS.SETTINGS, defaultSettings);
  });

  const updateSettings = (updates) => {
    setSettings((prev) => {
      const newSettings = { ...prev, ...updates };
      setItem(STORAGE_KEYS.SETTINGS, newSettings);
      return newSettings;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
