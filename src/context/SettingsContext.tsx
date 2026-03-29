import { createContext, useContext, useState, type ReactNode } from 'react'
import { getItem, setItem, STORAGE_KEYS } from '../utils/storage'
import { defaultSettings } from '../data/seedData'
import type { Settings } from '../types'

interface SettingsContextType {
  settings: Settings
  updateSettings: (updates: Partial<Settings>) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    return getItem<Settings>(STORAGE_KEYS.SETTINGS, defaultSettings)
  })

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings((prev) => {
      const newSettings = { ...prev, ...updates }
      setItem(STORAGE_KEYS.SETTINGS, newSettings)
      return newSettings
    })
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
