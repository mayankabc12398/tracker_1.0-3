import { useLocation } from "react-router-dom";
import { Menu, Moon, Sun, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useSettings } from "../context/SettingsContext";
import { cn } from "../lib/utils";

const pageTitles = {
  "/": "Dashboard",
  "/habits": "Habits",
  "/settings": "Settings",
  "/topics": "Topics",
};

export function Header({ onMenuClick }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { settings } = useSettings();
  const pageTitle = pageTitles[location.pathname] || "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-accent text-foreground"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1">
        <motion.h1
          key={pageTitle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold text-foreground"
        >
          {pageTitle}
        </motion.h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button
          className={cn(
            "relative p-2 rounded-lg transition-colors",
            settings.notifications
              ? "hover:bg-accent text-foreground"
              : "text-muted-foreground",
          )}
        >
          <Bell className="h-5 w-5" />
          {settings.notifications && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-accent text-foreground transition-colors"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === "dark" ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {theme === "dark" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </motion.div>
        </button>

        {/* User Avatar */}
        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
          U
        </div>
      </div>
    </header>
  );
}
