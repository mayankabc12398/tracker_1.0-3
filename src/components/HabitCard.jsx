import { motion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Flame,
  MoreVertical,
  Pencil,
  Trash2,
  Brain,
  BookOpen,
  Dumbbell,
  Droplet,
  Code,
  ClipboardCheck,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from "react";

const iconMap = {
  brain: Brain,
  "book-open": BookOpen,
  dumbbell: Dumbbell,
  droplet: Droplet,
  code: Code,
  "clipboard-check": ClipboardCheck,
};

export function HabitCard({ habit, onToggle, onEdit, onDelete, delay = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const IconComponent = iconMap[habit.icon] || Brain;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -2 }}
      className={cn(
        "relative rounded-xl border p-4 transition-all",
        habit.completedToday
          ? "border-success/30 bg-success/5"
          : "border-border bg-card hover:border-primary/30",
      )}
    >
      <div className="flex items-start gap-4">
        {/* Completion Toggle */}
        <button
          onClick={onToggle}
          className="flex-shrink-0 mt-0.5 transition-transform hover:scale-110"
        >
          {habit.completedToday ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <CheckCircle2 className="h-6 w-6 text-success" />
            </motion.div>
          ) : (
            <Circle className="h-6 w-6 text-muted-foreground hover:text-primary" />
          )}
        </button>

        {/* Habit Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-md"
              style={{ backgroundColor: `${habit.color}20` }}
            >
              <IconComponent
                className="h-4 w-4"
                style={{ color: habit.color }}
              />
            </div>
            <h3
              className={cn(
                "font-medium text-foreground truncate",
                habit.completedToday && "line-through text-muted-foreground",
              )}
            >
              {habit.name}
            </h3>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
              {habit.category}
            </span>
            <span className="text-muted-foreground capitalize text-xs">
              {habit.frequency}
            </span>
          </div>
        </div>

        {/* Streak & Menu */}
        <div className="flex items-center gap-2">
          {habit.streak > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-warning/10 text-warning">
              <Flame className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">{habit.streak}</span>
            </div>
          )}

          {/* Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-0 top-full mt-1 z-50 w-32 rounded-lg border border-border bg-popover shadow-lg py-1"
                >
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onEdit();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onDelete();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
