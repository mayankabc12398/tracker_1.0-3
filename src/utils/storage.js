// localStorage utility functions

export function getItem(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
}

// Storage keys
export const STORAGE_KEYS = {
  HABITS: "habit-tracker-habits",
  SETTINGS: "habit-tracker-settings",
  THEME: "habit-tracker-theme",
  COMPLETION_HISTORY: "habit-tracker-history",
};
