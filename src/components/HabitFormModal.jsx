import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Brain,
  BookOpen,
  Dumbbell,
  Droplet,
  Code,
  ClipboardCheck,
} from "lucide-react";

const categories = [
  "Wellness",
  "Learning",
  "Fitness",
  "Health",
  "Productivity",
  "Other",
];
const frequencies = ["daily", "weekly", "monthly"];
const colors = [
  "#8b5cf6",
  "#3b82f6",
  "#10b981",
  "#06b6d4",
  "#f59e0b",
  "#ec4899",
];
const icons = [
  { id: "brain", Icon: Brain, label: "Brain" },
  { id: "book-open", Icon: BookOpen, label: "Book" },
  { id: "dumbbell", Icon: Dumbbell, label: "Fitness" },
  { id: "droplet", Icon: Droplet, label: "Water" },
  { id: "code", Icon: Code, label: "Code" },
  { id: "clipboard-check", Icon: ClipboardCheck, label: "Tasks" },
];

export function HabitFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [frequency, setFrequency] = useState("daily");
  const [color, setColor] = useState(colors[0]);
  const [icon, setIcon] = useState(icons[0].id);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCategory(initialData.category);
      setFrequency(initialData.frequency);
      setColor(initialData.color);
      setIcon(initialData.icon);
    } else {
      setName("");
      setCategory(categories[0]);
      setFrequency("daily");
      setColor(colors[0]);
      setIcon(icons[0].id);
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrors({ name: "Habit name is required" });
      return;
    }

    onSubmit({ name: name.trim(), category, frequency, color, icon });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[10%] z-50 mx-auto max-w-md rounded-xl border border-border bg-card shadow-xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">
                {initialData ? "Edit Habit" : "New Habit"}
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Habit Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Morning Meditation"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Frequency
                </label>
                <div className="flex gap-2">
                  {frequencies.map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => setFrequency(freq)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                        frequency === freq
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Color
                </label>
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`h-8 w-8 rounded-full transition-transform hover:scale-110 ${
                        color === c
                          ? "ring-2 ring-offset-2 ring-offset-background ring-foreground"
                          : ""
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {/* Icon */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Icon
                </label>
                <div className="flex gap-2">
                  {icons.map(({ id, Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setIcon(id)}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                        icon === id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  {initialData ? "Save Changes" : "Create Habit"}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
