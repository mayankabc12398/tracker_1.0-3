import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Tag, BarChart3, Calendar } from "lucide-react";
import { cn } from "../lib/utils";

const difficultyColors = {
  Beginner: "bg-success/10 text-success",
  Intermediate: "bg-warning/10 text-warning",
  Advanced: "bg-destructive/10 text-destructive",
};

const statusColors = {
  Active: "bg-success/10 text-success",
  Archived: "bg-muted text-muted-foreground",
  Draft: "bg-info/10 text-info",
};

export function TopicDetailModal({ isOpen, onClose, topic }) {
  if (!topic) return null;

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
            className="fixed inset-x-4 top-[5%] bottom-[5%] z-50 mx-auto max-w-2xl rounded-xl border border-border bg-card shadow-xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-border">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {topic.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {topic.description}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 px-5 py-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Category:</span>
                <span className="text-sm font-medium text-foreground">
                  {topic.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Difficulty:
                </span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium",
                    difficultyColors[topic.difficulty],
                  )}
                >
                  {topic.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Updated:</span>
                <span className="text-sm font-medium text-foreground">
                  {topic.updatedAt}
                </span>
              </div>
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium",
                  statusColors[topic.status],
                )}
              >
                {topic.status}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {topic.content.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-foreground leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <button
                onClick={onClose}
                className="w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
