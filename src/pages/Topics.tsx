import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Eye, BookOpen } from 'lucide-react'
import { seedTopics } from '../data/seedData'
import { SearchInput } from '../components/SearchInput'
import { EmptyState } from '../components/EmptyState'
import { TopicDetailModal } from '../components/TopicDetailModal'
import type { Topic } from '../types'
import { cn } from '../lib/utils'

const difficultyColors = {
  Beginner: 'bg-success/10 text-success',
  Intermediate: 'bg-warning/10 text-warning',
  Advanced: 'bg-destructive/10 text-destructive',
}

const statusColors = {
  Active: 'bg-success/10 text-success',
  Archived: 'bg-muted text-muted-foreground',
  Draft: 'bg-info/10 text-info',
}

export default function Topics() {
  const [search, setSearch] = useState('')
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)

  const filteredTopics = useMemo(() => {
    return seedTopics.filter(
      (topic) =>
        topic.name.toLowerCase().includes(search.toLowerCase()) ||
        topic.category.toLowerCase().includes(search.toLowerCase()) ||
        topic.difficulty.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-muted-foreground">
            {seedTopics.length} topic{seedTopics.length !== 1 ? 's' : ''} available
          </p>
        </div>
        <div className="w-full sm:w-72">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search topics..."
          />
        </div>
      </div>

      {/* Table */}
      {filteredTopics.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No topics found"
          description="Try adjusting your search to find what you're looking for."
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border bg-card overflow-hidden"
        >
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Topic
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Updated
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTopics.map((topic, index) => (
                  <motion.tr
                    key={topic.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{topic.name}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-xs">
                            {topic.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-foreground">{topic.category}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          'px-2.5 py-1 rounded-full text-xs font-medium',
                          difficultyColors[topic.difficulty]
                        )}
                      >
                        {topic.difficulty}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          'px-2.5 py-1 rounded-full text-xs font-medium',
                          statusColors[topic.status]
                        )}
                      >
                        {topic.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-muted-foreground">
                        {topic.updatedAt}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedTopic(topic)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-border">
            {filteredTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{topic.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {topic.category}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={cn(
                            'px-2 py-0.5 rounded-full text-xs font-medium',
                            difficultyColors[topic.difficulty]
                          )}
                        >
                          {topic.difficulty}
                        </span>
                        <span
                          className={cn(
                            'px-2 py-0.5 rounded-full text-xs font-medium',
                            statusColors[topic.status]
                          )}
                        >
                          {topic.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTopic(topic)}
                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Topic Detail Modal */}
      <TopicDetailModal
        isOpen={!!selectedTopic}
        onClose={() => setSelectedTopic(null)}
        topic={selectedTopic}
      />
    </div>
  )
}
