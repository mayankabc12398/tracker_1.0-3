import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  ListChecks,
  Settings,
  BookOpen,
  X,
  Sparkles,
} from 'lucide-react'
import { cn } from '../lib/utils'

interface SidebarProps {
  onClose?: () => void
}

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/habits', icon: ListChecks, label: 'Habits' },
  { to: '/topics', icon: BookOpen, label: 'Topics' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export function Sidebar({ onClose }: SidebarProps) {
  return (
    <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
            <Sparkles className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">
            HabitFlow
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-sidebar-primary-foreground"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="rounded-lg bg-sidebar-accent/50 p-4">
          <p className="text-xs text-sidebar-foreground/60 mb-2">
            Track your habits
          </p>
          <p className="text-sm font-medium text-sidebar-foreground">
            Build better routines
          </p>
        </div>
      </div>
    </div>
  )
}
