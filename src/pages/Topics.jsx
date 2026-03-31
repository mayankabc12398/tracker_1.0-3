import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Eye, BookOpen } from "lucide-react";
import { seedTopics } from "../data/seedData";
import { SearchInput } from "../components/SearchInput";
import { CustomSelect } from "../components/CustomSelect";
import { EmptyState } from "../components/EmptyState";
import { TopicDetailModal } from "../components/TopicDetailModal";
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

export default function Topics() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ReactJS");
  const [selectedTopic, setSelectedTopic] = useState(null);

  const categories = useMemo(() => {
    const cats = new Set(seedTopics.map(t => t.category));
    return ["All", ...Array.from(cats)].sort();
  }, []);

  const filteredTopics = useMemo(() => {
    return seedTopics.filter((topic) => {
      const matchesSearch =
        topic.name.toLowerCase().includes(search.toLowerCase()) ||
        topic.category.toLowerCase().includes(search.toLowerCase()) ||
        topic.difficulty.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = selectedCategory === "All" || topic.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-muted-foreground">
            {filteredTopics.length} topic{filteredTopics.length !== 1 ? "s" : ""}{" "}
            available
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2 sm:mt-0">
          <CustomSelect
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categories.map((cat) => ({
              label: cat === "All" ? "All Categories" : cat,
              value: cat
            }))}
          />
          <div className="w-full sm:w-72">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search topics..."
            />
          </div>
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
          <div className="hidden md:block overflow-auto max-h-[calc(100vh-240px)] custom-scrollbar">
            <table className="w-full border-collapse relative">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-border bg-card/95 backdrop-blur-sm shadow-sm">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Topic
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Updated
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {topic.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px] lg:max-w-xs">
                            {topic.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground">
                        {topic.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-medium",
                          difficultyColors[topic.difficulty],
                        )}
                      >
                        {topic.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-medium",
                          statusColors[topic.status],
                        )}
                      >
                        {topic.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-muted-foreground">
                        {topic.updatedAt}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedTopic(topic)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
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
                      <p className="font-medium text-foreground">
                        {topic.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {topic.category}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            difficultyColors[topic.difficulty],
                          )}
                        >
                          {topic.difficulty}
                        </span>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            statusColors[topic.status],
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
  );
}
