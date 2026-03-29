import React, { useEffect, useState } from 'react'

export default function ReactFiberArchitecture() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
  }, [])

  return (
    <section className={`real-dom-page ${mounted ? 'appear' : ''}`}>
      <header className="real-dom-header">
        <h1>React Fiber Architecture</h1>
        <p className="real-dom-lead">
          React Fiber React का नया reconciliation engine है जो rendering को interruptible, incremental और efficient बनाता है।
        </p>
      </header>

      <article className="real-dom-card">
        <h2>1. Definition</h2>
        <p>
          React Fiber React का नया reconciliation engine है जो React 16 में introduce किया गया था।
          Fiber का purpose है rendering process को interruptible, incremental और efficient बनाना।
        </p>
        <p>Simple words में: React Fiber = React का internal system जो UI rendering को manage करता है।</p>
      </article>

      <article className="real-dom-card">
        <h2>2. Why React Fiber Was Introduced</h2>
        <p>
          React के पुराने version (React 15) में rendering synchronous था। जब rendering start होता था, वह रोक नहीं सकता था।
          अगर UI बहुत बड़ा होता (जैसे 5000 components), तो browser block हो जाता, UI freeze होता, और animations slow हो जातीं।
        </p>
      </article>

      <article className="real-dom-card highlight">
        <h2>3. Fiber Solution</h2>
        <p>
          React Fiber rendering process को छोटे tasks में divide करता है। यह large tasks को छोटे work units में तोड़ता है, ताकि browser को block न करे।
        </p>
        <pre className="code-block">
{`Large task
     ↓
Small units of work

Task 1
Task 2
Task 3
Pause
Resume
Continue`}
        </pre>
      </article>

      <article className="real-dom-card">
        <h2>4. Fiber Tree</h2>
        <p>
          React Virtual DOM को internally Fiber Tree में convert करता है। हर component एक Fiber node होता है।
        </p>
        <p><strong>Example component tree:</strong></p>
        <pre className="code-block">
{`<App>
  <Header />
  <Main />
  <Footer />
</App>`}
        </pre>
        <p><strong>Fiber tree:</strong></p>
        <pre className="code-block">
{`App
├── Header
├── Main
└── Footer`}
        </pre>
      </article>

      <article className="real-dom-card highlight">
        <h2>5. Structure of Fiber Node</h2>
        <p>Fiber node एक JavaScript object होता है।</p>
        <pre className="code-block">
{`{
  type: "div",
  stateNode: DOMElement,
  child: FiberNode,
  sibling: FiberNode,
  return: FiberNode,
}`}
        </pre>
        <p><strong>Important properties:</strong></p>
        <ul>
          <li><strong>type</strong> – Component type</li>
          <li><strong>stateNode</strong> – Actual DOM node</li>
          <li><strong>child</strong> – First child</li>
          <li><strong>sibling</strong> – Next sibling</li>
          <li><strong>return</strong> – Parent</li>
        </ul>
      </article>

      <article className="real-dom-card">
        <h2>6. Fiber Rendering Phases</h2>
        <p>React Fiber rendering दो phases में काम करता है:</p>
        <h3>Phase 1: Render Phase</h3>
        <p>
          इस phase में React Fiber tree build करता है, Virtual DOM compare करता है, और changes calculate करता है।
          यह phase interruptible होता है (pause/resume possible)।
        </p>
        <h3>Phase 2: Commit Phase</h3>
        <p>
          इस phase में React calculated changes को Real DOM में apply करता है। यह phase synchronous होता है और interruption नहीं होता।
        </p>
      </article>

      <article className="real-dom-card highlight">
        <h2>7. Fiber Rendering Flow</h2>
        <pre className="code-block">
{`State Update
      ↓
Create Work Units
      ↓
Build Fiber Tree
      ↓
Reconciliation
      ↓
Render Phase
      ↓
Commit Phase
      ↓
Update Real DOM`}
        </pre>
      </article>

      <article className="real-dom-card">
        <h2>8. Advantages of React Fiber</h2>
        <ul>
          <li>Smooth UI rendering</li>
          <li>Non-blocking rendering</li>
          <li>Better animations</li>
          <li>Prioritized updates</li>
          <li>Concurrent rendering support</li>
        </ul>
      </article>

      <article className="real-dom-card highlight">
        <h2>9. Priority Scheduling</h2>
        <p>Fiber different updates को priority देता है।</p>
        <p><strong>High priority tasks:</strong></p>
        <ul>
          <li>User input</li>
          <li>Button click</li>
          <li>Animation</li>
        </ul>
        <p><strong>Low priority tasks:</strong></p>
        <ul>
          <li>Data loading</li>
          <li>Background rendering</li>
        </ul>
        <p>React पहले high priority updates process करता है।</p>
      </article>

      <article className="real-dom-card">
        <h2>10. Example Scenario</h2>
        <p><strong>Imagine a large UI:</strong></p>
        <pre className="code-block">
{`Dashboard
 ├── Charts
 ├── Table
 ├── Sidebar
 └── Notifications`}
        </pre>
        <p>
          User button click करता है। Fiber scheduling करेगा:
        </p>
        <ol>
          <li>Button update</li>
          <li>Sidebar update</li>
          <li>Charts later</li>
        </ol>
        <p>इससे UI responsive रहता है।</p>
      </article>

      <article className="real-dom-card highlight">
        <h2>11. Important Interview Points</h2>
        <ul>
          <li>React Fiber React 16 में introduce हुआ।</li>
          <li>Fiber React का reconciliation engine है।</li>
          <li>Fiber rendering को interruptible बनाता है।</li>
          <li>Rendering दो phases में होती है: Render Phase और Commit Phase.</li>
          <li>Fiber enables concurrent rendering और priority scheduling.</li>
        </ul>
      </article>

      <article className="real-dom-card">
        <h2>12. Common Interview Question</h2>
        <p><strong>Q: What is React Fiber?</strong></p>
        <p>
          <strong>Best Answer:</strong> React Fiber is the new reconciliation engine introduced in React 16 that allows React to break rendering work into smaller units. This makes rendering interruptible and enables features like concurrent rendering, priority scheduling, and smoother UI updates.
        </p>
      </article>

      <article className="real-dom-card highlight">
        <h2>✅ Your React Advanced Notes</h2>
        <ul>
          <li>Real DOM</li>
          <li>Virtual DOM</li>
          <li>Reconciliation</li>
          <li>Diffing Algorithm</li>
          <li>React Fiber Architecture</li>
        </ul>
      </article>
    </section>
  )
}
