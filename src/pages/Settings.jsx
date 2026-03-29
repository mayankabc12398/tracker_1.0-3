import { motion } from "framer-motion";
import { Bell, Moon, Sun, Clock, CalendarDays, Palette } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useSettings } from "../context/SettingsContext";
import { SettingsCard } from "../components/SettingsCard";
import { Toggle } from "../components/Toggle";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { settings, updateSettings } = useSettings();

  return (
    <div className="max-w-2xl space-y-6">
      {/* Appearance */}
      <SettingsCard
        icon={Palette}
        title="Appearance"
        description="Customize how the app looks"
        delay={0}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === "dark" ? (
                <Moon className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Sun className="h-5 w-5 text-muted-foreground" />
              )}
              <span className="text-sm text-foreground">Dark Mode</span>
            </div>
            <Toggle
              checked={theme === "dark"}
              onChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </div>

          {/* Theme Preview */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTheme("light")}
              className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                theme === "light"
                  ? "border-primary bg-primary/5"
                  : "border-border bg-muted/50 hover:border-muted-foreground/30"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                  <Sun className="h-4 w-4 text-amber-500" />
                </div>
                <span className="text-xs font-medium text-foreground">
                  Light
                </span>
              </div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTheme("dark")}
              className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                theme === "dark"
                  ? "border-primary bg-primary/5"
                  : "border-border bg-muted/50 hover:border-muted-foreground/30"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center">
                  <Moon className="h-4 w-4 text-slate-300" />
                </div>
                <span className="text-xs font-medium text-foreground">
                  Dark
                </span>
              </div>
            </motion.button>
          </div>
        </div>
      </SettingsCard>

      {/* Notifications */}
      <SettingsCard
        icon={Bell}
        title="Notifications"
        description="Manage your notification preferences"
        delay={0.1}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Enable Notifications</p>
              <p className="text-xs text-muted-foreground">
                Receive reminders for your habits
              </p>
            </div>
            <Toggle
              checked={settings.notifications}
              onChange={(checked) => updateSettings({ notifications: checked })}
            />
          </div>

          {settings.notifications && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between pt-2 border-t border-border"
            >
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-foreground">Reminder Time</p>
                  <p className="text-xs text-muted-foreground">
                    Daily reminder notification
                  </p>
                </div>
              </div>
              <input
                type="time"
                value={settings.reminderTime}
                onChange={(e) =>
                  updateSettings({ reminderTime: e.target.value })
                }
                className="px-3 py-1.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </motion.div>
          )}
        </div>
      </SettingsCard>

      {/* Calendar */}
      <SettingsCard
        icon={CalendarDays}
        title="Calendar"
        description="Configure calendar settings"
        delay={0.2}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground">Week Starts On</p>
            <p className="text-xs text-muted-foreground">
              Choose the first day of the week
            </p>
          </div>
          <div className="flex rounded-lg border border-input bg-background p-1">
            <button
              onClick={() => updateSettings({ weekStartsOn: "sunday" })}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                settings.weekStartsOn === "sunday"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sunday
            </button>
            <button
              onClick={() => updateSettings({ weekStartsOn: "monday" })}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                settings.weekStartsOn === "monday"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monday
            </button>
          </div>
        </div>
      </SettingsCard>

      {/* Data Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-xl border border-border bg-muted/30 p-5"
      >
        <p className="text-sm text-muted-foreground">
          Your data is stored locally in your browser. Clearing your browser
          data will remove all habits and settings.
        </p>
      </motion.div>
    </div>
  );
}
