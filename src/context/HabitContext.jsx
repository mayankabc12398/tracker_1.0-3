import { createContext, useContext, useState } from "react";
import { getItem, setItem, STORAGE_KEYS } from "../utils/storage";
import { seedHabits } from "../data/seedData";

const HabitContext = createContext(undefined);

export function HabitProvider({ children }) {
  const [habits, setHabits] = useState(() => {
    const saved = getItem(STORAGE_KEYS.HABITS, []);
    if (saved.length === 0) {
      setItem(STORAGE_KEYS.HABITS, seedHabits);
      return seedHabits;
    }
    return saved;
  });

  const saveHabits = (newHabits) => {
    setHabits(newHabits);
    setItem(STORAGE_KEYS.HABITS, newHabits);
  };

  const addHabit = (habitData) => {
    const newHabit = {
      ...habitData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      completedDates: [],
      completedToday: false,
      streak: 0,
    };
    saveHabits([...habits, newHabit]);
  };

  const updateHabit = (id, updates) => {
    saveHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, ...updates } : habit,
      ),
    );
  };

  const deleteHabit = (id) => {
    saveHabits(habits.filter((habit) => habit.id !== id));
  };

  const toggleHabitCompletion = (id) => {
    const today = new Date().toISOString().split("T")[0];
    saveHabits(
      habits.map((habit) => {
        if (habit.id !== id) return habit;
        const isCompleting = !habit.completedToday;
        let newCompletedDates = [...habit.completedDates];
        let newStreak = habit.streak;

        if (isCompleting) {
          if (!newCompletedDates.includes(today)) {
            newCompletedDates.push(today);
          }
          newStreak = habit.streak + 1;
        } else {
          newCompletedDates = newCompletedDates.filter((d) => d !== today);
          newStreak = Math.max(0, habit.streak - 1);
        }

        return {
          ...habit,
          completedToday: isCompleting,
          completedDates: newCompletedDates,
          streak: newStreak,
        };
      }),
    );
  };

  const getCompletedToday = () => {
    return habits.filter((h) => h.completedToday).length;
  };

  const getTotalHabits = () => {
    return habits.length;
  };

  const getCompletionPercentage = () => {
    if (habits.length === 0) return 0;
    return Math.round((getCompletedToday() / habits.length) * 100);
  };

  const getLongestStreak = () => {
    if (habits.length === 0) return 0;
    return Math.max(...habits.map((h) => h.streak));
  };

  const getWeeklyData = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const data = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const dayName = days[date.getDay()];

      const completed = habits.filter((h) =>
        h.completedDates.includes(dateStr),
      ).length;

      data.push({
        day: dayName,
        completed,
        total: habits.length,
      });
    }

    return data;
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        updateHabit,
        deleteHabit,
        toggleHabitCompletion,
        getCompletedToday,
        getTotalHabits,
        getCompletionPercentage,
        getLongestStreak,
        getWeeklyData,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
}
