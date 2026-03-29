import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ListChecks, Filter } from "lucide-react";
import { useHabits } from "../context/HabitContext";
import { HabitCard } from "../components/HabitCard";
import { HabitFormModal } from "../components/HabitFormModal";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { SearchInput } from "../components/SearchInput";
import { EmptyState } from "../components/EmptyState";

const filterOptions = ["All", "Completed", "Pending"];

export default function Habits() {
  const { habits, addHabit, updateHabit, deleteHabit, toggleHabitCompletion } =
    useHabits();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [deletingHabit, setDeletingHabit] = useState(null);

  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      const matchesSearch =
        habit.name.toLowerCase().includes(search.toLowerCase()) ||
        habit.category.toLowerCase().includes(search.toLowerCase());
      if (filter === "Completed") return matchesSearch && habit.completedToday;
      if (filter === "Pending") return matchesSearch && !habit.completedToday;
      return matchesSearch;
    });
  }, [habits, search, filter]);

  const handleSubmit = (habitData) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, habitData);
    } else {
      addHabit(habitData);
    }
    setEditingHabit(null);
  };

  const handleEdit = (habit) => {
    setEditingHabit(habit);
    setIsFormOpen(true);
  };

  const handleDelete = (habit) => {
    setDeletingHabit(habit);
  };

  const confirmDelete = () => {
    if (deletingHabit) {
      deleteHabit(deletingHabit.id);
      setDeletingHabit(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-muted-foreground">
            {habits.length} habit{habits.length !== 1 ? "s" : ""} tracked
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setEditingHabit(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Habit
        </motion.button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search habits..."
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex rounded-lg border border-input bg-background p-1">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filter === option
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Habits List */}
      {habits.length === 0 ? (
        <EmptyState
          icon={ListChecks}
          title="No habits yet"
          description="Start building better routines by creating your first habit."
          action={{
            label: "Create your first habit",
            onClick: () => setIsFormOpen(true),
          }}
        />
      ) : filteredHabits.length === 0 ? (
        <EmptyState
          icon={ListChecks}
          title="No habits found"
          description="Try adjusting your search or filter to find what you're looking for."
        />
      ) : (
        <motion.div layout className="grid gap-3">
          <AnimatePresence mode="popLayout">
            {filteredHabits.map((habit, index) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={() => toggleHabitCompletion(habit.id)}
                onEdit={() => handleEdit(habit)}
                onDelete={() => handleDelete(habit)}
                delay={index * 0.05}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Modals */}
      <HabitFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingHabit(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingHabit}
      />

      <ConfirmDialog
        isOpen={!!deletingHabit}
        onClose={() => setDeletingHabit(null)}
        onConfirm={confirmDelete}
        title="Delete Habit"
        description={`Are you sure you want to delete "${deletingHabit?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
