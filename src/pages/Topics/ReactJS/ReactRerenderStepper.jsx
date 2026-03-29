import { useState } from "react";

const steps = [
  {
    label: "You call setState",
    pill: "blue",
    pillText: "trigger",
    code: `// You call the state setter
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  )
}`,
    highlights: ["() => setCount(count + 1)"],
    explanation:
      "You call setCount(count + 1). React does NOT update the DOM immediately. Instead, it schedules an update.",
    detail:
      "React batches updates — if you call setState 3 times in a row inside one event handler, React only re-renders once. This is called batching.",
    detailType: "info",
  },
  {
    label: "React queues the update",
    pill: "amber",
    pillText: "queue",
    code: `// React's internal update queue
updateQueue = [
  {
    component: Counter,
    newState:  { count: 1 },
    priority:  "normal"
  }
]

// NOT applied yet — just queued!`,
    highlights: ["1"],
    explanation:
      "React adds the state change to an internal update queue. It doesn't re-render yet — it waits until the current JS event finishes.",
    detail:
      "React 18 uses a scheduler with priorities. User interactions (like clicks) are high priority. Background updates can be deferred.",
    detailType: "info",
  },
  {
    label: "Re-render is triggered",
    pill: "amber",
    pillText: "render",
    code: `// React calls your component function again
function Counter() {
  const [count, setCount] = useState(0)
  // ↑ count is now 1 (new state applied)

  return (
    <button>
      1   // ← new output!
    </button>
  )
}`,
    highlights: ["1   // ← new output!"],
    explanation:
      "React calls your component function again from scratch. This produces a brand new Virtual DOM tree — entirely in JavaScript memory.",
    detail:
      "Your component function runs top-to-bottom every re-render. That's why hooks like useState must be called in the same order every time.",
    detailType: "info",
  },
  {
    label: "Diffing (compare VDOMs)",
    pill: "purple",
    pillText: "diff",
    code: `// OLD virtual DOM (count = 0)
{ type: "button", children: ["0"] }

// NEW virtual DOM (count = 1)
{ type: "button", children: ["1"] }

// Diff result:
// type → same ✓
// children → CHANGED ✗`,
    highlights: ['"1"'],
    explanation:
      'React compares the old and new Virtual DOM trees node by node. It finds that only the button\'s text content changed from "0" to "1".',
    detail:
      'React uses a fast O(n) heuristic algorithm — not an exact diff. It assumes elements of different types produce different trees, and uses key props to track list items.',
    detailType: "warn",
  },
  {
    label: "Commit to real DOM",
    pill: "teal",
    pillText: "commit",
    code: `// React applies ONLY what changed

button.textContent = "1"

// Everything else → untouched
// No new elements created
// No layout recalculation for other nodes`,
    highlights: ['"1"'],
    explanation:
      "React applies the minimal set of changes directly to the real DOM. Only the button's text node is touched — nothing else.",
    detail:
      "This phase has two sub-steps: before mutation (e.g. getSnapshotBeforeUpdate) and after mutation (e.g. useEffect fires here).",
    detailType: "success",
  },
  {
    label: "Browser paints",
    pill: "teal",
    pillText: "paint",
    code: `// Browser sees the DOM change
// and repaints only the affected region

Screen: [  Button showing "1"  ]

// useEffect() fires after paint
useEffect(() => {
  console.log("count is now:", count) // 1
}, [count])`,
    highlights: ['"1"', '"count is now:"'],
    explanation:
      "The browser repaints only the changed pixel region on screen. Then React fires any useEffect hooks that depend on the changed state.",
    detail:
      "This is why effects run after the screen updates — they never block the paint. Use useLayoutEffect if you need to run code before the browser paints.",
    detailType: "success",
  },
];

const pillColors = {
  blue:   { bg: "#dbeafe", color: "#1e40af" },
  amber:  { bg: "#fef3c7", color: "#92400e" },
  teal:   { bg: "#d1fae5", color: "#065f46" },
  purple: { bg: "#ede9fe", color: "#4c1d95" },
  red:    { bg: "#fee2e2", color: "#991b1b" },
};

const detailColors = {
  info:    { bg: "#eff6ff", border: "#bfdbfe", color: "#1e40af" },
  warn:    { bg: "#fffbeb", border: "#fde68a", color: "#92400e" },
  success: { bg: "#f0fdf4", border: "#bbf7d0", color: "#166534" },
};

function highlightCode(code, highlights) {
  if (!highlights || highlights.length === 0) return code;
  let result = code;
  highlights.forEach((hl) => {
    const escaped = hl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result.replace(
      new RegExp(escaped, "g"),
      `<mark style="background:#fef08a;border-radius:3px;padding:0 2px;color:#713f12;font-style:normal">${hl}</mark>`
    );
  });
  return result;
}

const styles = {
  wrapper: {
    fontFamily: "'Geist', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    maxWidth: 860,
    margin: "0 auto",
    padding: "24px 16px 32px",
    background: "#ffffff",
    minHeight: "100vh",
    color: "#111827",
  },
  progressRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  chip: (state) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    padding: "5px 12px",
    borderRadius: 9999,
    cursor: "pointer",
    border: "1.5px solid",
    fontWeight: 500,
    transition: "all 0.15s ease",
    userSelect: "none",
    whiteSpace: "nowrap",
    ...(state === "active"
      ? { background: "#eff6ff", borderColor: "#93c5fd", color: "#1d4ed8" }
      : state === "done"
      ? { background: "#f0fdf4", borderColor: "#86efac", color: "#15803d" }
      : { background: "#f9fafb", borderColor: "#e5e7eb", color: "#9ca3af" }),
  }),
  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: "20px 24px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  pill: (color) => ({
    display: "inline-block",
    fontSize: 11,
    padding: "3px 10px",
    borderRadius: 9999,
    fontWeight: 600,
    letterSpacing: "0.02em",
    background: pillColors[color]?.bg || "#f3f4f6",
    color: pillColors[color]?.color || "#374151",
  }),
  cardTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#111827",
    margin: 0,
  },
  codeBlock: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    padding: "14px 18px",
    marginBottom: 14,
    overflow: "auto",
  },
  code: {
    margin: 0,
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
    fontSize: 13,
    lineHeight: 1.75,
    color: "#334155",
    whiteSpace: "pre",
  },
  explanation: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 1.65,
    margin: "0 0 10px",
  },
  detailBox: (type) => ({
    background: detailColors[type]?.bg || "#f9fafb",
    border: `1px solid ${detailColors[type]?.border || "#e5e7eb"}`,
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 13,
    color: detailColors[type]?.color || "#374151",
    lineHeight: 1.6,
  }),
  navRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  navBtn: (disabled) => ({
    padding: "8px 22px",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    background: disabled ? "#f9fafb" : "#ffffff",
    color: disabled ? "#d1d5db" : "#374151",
    cursor: disabled ? "default" : "pointer",
    fontSize: 13,
    fontWeight: 500,
    transition: "all 0.12s",
    pointerEvents: disabled ? "none" : "auto",
  }),
  counter: {
    fontSize: 13,
    color: "#9ca3af",
  },
  arrowDown: {
    display: "flex",
    justifyContent: "center",
    marginTop: 14,
    color: "#9ca3af",
    fontSize: 18,
  },
};

export default function ReactRerenderStepper() {
  const [current, setCurrent] = useState(0);
  const step = steps[current];

  const go = (dir) => {
    setCurrent((c) => Math.max(0, Math.min(steps.length - 1, c + dir)));
  };

  return (
    <div style={styles.wrapper}>
      {/* Progress chips */}
      <div style={styles.progressRow}>
        {steps.map((s, i) => {
          const state = i === current ? "active" : i < current ? "done" : "idle";
          return (
            <span
              key={i}
              style={styles.chip(state)}
              onClick={() => setCurrent(i)}
            >
              {i + 1}. {s.label}
            </span>
          );
        })}
      </div>

      {/* Card */}
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.cardHeader}>
          <span style={styles.pill(step.pill)}>{step.pillText}</span>
          <h2 style={styles.cardTitle}>{step.label}</h2>
        </div>

        {/* Code block */}
        <div style={styles.codeBlock}>
          <pre
            style={styles.code}
            dangerouslySetInnerHTML={{
              __html: highlightCode(step.code, step.highlights),
            }}
          />
        </div>

        {/* Explanation */}
        <p style={styles.explanation}>{step.explanation}</p>

        {/* Detail box */}
        <div style={styles.detailBox(step.detailType)}>{step.detail}</div>

        {/* Down arrow */}
        <div style={styles.arrowDown}>↓</div>
      </div>

      {/* Navigation */}
      <div style={styles.navRow}>
        <button style={styles.navBtn(current === 0)} onClick={() => go(-1)}>
          ← Prev
        </button>
        <span style={styles.counter}>
          {current + 1} of {steps.length}
        </span>
        <button
          style={styles.navBtn(current === steps.length - 1)}
          onClick={() => go(1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}