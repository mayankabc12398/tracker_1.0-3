import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  Target,
  CheckCircle2,
  TrendingUp,
  Flame,
  Activity,
  Calendar,
} from 'lucide-react'
import { useHabits } from '../context/HabitContext'
import { StatCard } from '../components/StatCard'
import { ProgressRing } from '../components/ProgressRing'
import { ChartCard } from '../components/ChartCard'

export default function Dashboard() {
  const {
    habits,
    getCompletedToday,
    getTotalHabits,
    getCompletionPercentage,
    getLongestStreak,
    getWeeklyData,
  } = useHabits()

  const weeklyData = getWeeklyData()
  const completionPercentage = getCompletionPercentage()
  const completedToday = getCompletedToday()
  const totalHabits = getTotalHabits()
  const longestStreak = getLongestStreak()

  // Category breakdown data
  const categoryData = habits.reduce((acc, habit) => {
    const existing = acc.find((item) => item.name === habit.category)
    if (existing) {
      existing.value++
    } else {
      acc.push({ name: habit.category, value: 1 })
    }
    return acc
  }, [] as { name: string; value: number }[])

  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899']

  // Recent activity
  const recentActivity = habits
    .filter((h) => h.completedToday)
    .slice(0, 5)
    .map((h) => ({
      name: h.name,
      category: h.category,
      streak: h.streak,
    }))

  // Monthly trend data (simulated)
  const monthlyTrend = [
    { week: 'Week 1', completion: 65 },
    { week: 'Week 2', completion: 72 },
    { week: 'Week 3', completion: 68 },
    { week: 'Week 4', completion: completionPercentage || 75 },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Habits"
          value={totalHabits}
          subtitle="Active habits"
          icon={Target}
          variant="primary"
          delay={0}
        />
        <StatCard
          title="Completed Today"
          value={completedToday}
          subtitle={`of ${totalHabits} habits`}
          icon={CheckCircle2}
          variant="success"
          trend={{ value: 12, isPositive: true }}
          delay={0.1}
        />
        <StatCard
          title="Completion Rate"
          value={`${completionPercentage}%`}
          subtitle="Today's progress"
          icon={TrendingUp}
          variant="info"
          delay={0.2}
        />
        <StatCard
          title="Best Streak"
          value={longestStreak}
          subtitle="days in a row"
          icon={Flame}
          variant="warning"
          delay={0.3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity Chart */}
        <ChartCard
          title="Weekly Activity"
          subtitle="Habits completed per day"
          delay={0.4}
        >
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="day"
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  className="text-muted-foreground"
                  axisLine={{ stroke: 'currentColor' }}
                  tickLine={{ stroke: 'currentColor' }}
                />
                <YAxis
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  className="text-muted-foreground"
                  axisLine={{ stroke: 'currentColor' }}
                  tickLine={{ stroke: 'currentColor' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))',
                  }}
                />
                <Bar
                  dataKey="completed"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Progress Ring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="rounded-xl border border-border bg-card p-5 flex flex-col items-center justify-center"
        >
          <h3 className="text-base font-semibold text-foreground mb-4">
            Today's Progress
          </h3>
          <ProgressRing progress={completionPercentage} size={160} strokeWidth={12} />
          <p className="mt-4 text-sm text-muted-foreground">
            {completedToday} of {totalHabits} habits completed
          </p>
        </motion.div>

        {/* Category Breakdown */}
        <ChartCard
          title="Category Breakdown"
          subtitle="Habits by category"
          delay={0.6}
        >
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {categoryData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <ChartCard
          title="Monthly Trend"
          subtitle="Completion rate over time"
          delay={0.7}
        >
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="week"
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  className="text-muted-foreground"
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="completion"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#colorCompletion)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Recent Activity
              </h3>
              <p className="text-sm text-muted-foreground">
                Habits completed today
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10">
              <Activity className="h-5 w-5 text-success" />
            </div>
          </div>

          {recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/20">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {activity.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-warning">
                    <Flame className="h-4 w-4" />
                    <span className="text-sm font-medium">{activity.streak}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground">
                No habits completed yet today
              </p>
              <p className="text-xs text-muted-foreground/70">
                Start checking off your habits!
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
