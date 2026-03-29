import React, { useEffect, useState } from 'react'

export default function ConverdTopic() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
  }, [])

  const coveredTopics = [
    "Real DOM",
    "Virtual DOM",
    "Reconciliation",
    "Diffing Algorithm",
    "React Fiber",
    "Rendering Process",
    "useEffect Deep Dive",
    "useMemo Deep Dive",
    "useCallback Deep Dive",
    "React.memo",
  ]

  const upcomingTopics = [
    "useRef Deep Dive",
    "Controlled vs Uncontrolled Components",
    "Custom Hooks",
    "Context API",
    "useReducer",
    "React Performance Optimization",
  ]

  return (
    <section className={`real-dom-page ${mounted ? 'appear' : ''}`}>
      <header className="real-dom-header">
        <h1>Topics Covered</h1>
        <p className="real-dom-lead">
          ये पेज बताता है कि इस series में किन React concepts को गहराई से cover किया जाएगा।
        </p>
      </header>

      <article className="real-dom-card">
        <h2>Covered Topics</h2>
        <p>
          नीचे दी गई list में React के core concepts हैं जिन पर हमने focus किया है। हर topic के लिए एक separate page है जिसमें theory, examples और interview pointers दिए गए हैं।
        </p>
        <ul>
          {coveredTopics.map((topic) => (
            <li key={topic} style={{ marginBottom: '0.35rem' }}>
              <strong>{topic}</strong>
            </li>
          ))}
        </ul>
      </article>

      <article className="real-dom-card highlight">
        <h2>Upcoming Topics</h2>
        <p>
          आने वाले topics जिन पर आगे cover करेंगे:
        </p>
        <ul>
          {upcomingTopics.map((topic) => (
            <li key={topic} style={{ marginBottom: '0.35rem' }}>
              <strong>{topic}</strong>
            </li>
          ))}
        </ul>
      </article>

      <article className="real-dom-card highlight">
        <h2>How to use this guide</h2>
        <p>
          हर topic के साथ आपको एक dedicated page मिलेगा जो:
        </p>
        <ul>
          <li>Concept को सरल भाषा में समझाता है</li>
          <li>Key differences और trade-offs highlight करता है</li>
          <li>Code snippets और edge-cases cover करता है</li>
        </ul>
        <p>
          आप इस guide को interview preparation या React internals समझने के लिए use कर सकते हैं।
        </p>
      </article>
    </section>
  )
}
