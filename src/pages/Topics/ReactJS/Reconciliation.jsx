import React, { useEffect, useState } from 'react'

export default function Reconciliation() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
  }, [])

  return (
    <section className={`real-dom-page ${mounted ? 'appear' : ''}`}>
      <header className="real-dom-header">
        <h1>React Reconciliation</h1>
        <p className="real-dom-lead">
          Reconciliation वह process है जिसमें React Virtual DOM trees के बीच difference पता करके Real DOM में केवल जरूरी changes apply करता है।
        </p>
      </header>

      <article className="real-dom-card">
        <h2>1. Definition</h2>
        <p>
          Reconciliation वह process है जिसमें React Old Virtual DOM और New Virtual DOM को compare करता है और determine करता है कि Real DOM में कौन-कौन से changes करने हैं।
        </p>
        <p>
          Simple words में: Reconciliation is the process React uses to compare two Virtual DOM trees and update the Real DOM efficiently.
        </p>
      </article>

      <article className="real-dom-card">
        <h2>2. Why Reconciliation is Needed</h2>
        <p>
          जब React application में state या props change होते हैं, तब UI update होना चाहिए। अगर React हर बार पूरा DOM update करे तो performance slow हो जाएगी, और browser बार-बार re-render करेगा।
        </p>
        <p>
          इसलिए React Old Virtual DOM और New Virtual DOM compare करता है और सिर्फ required changes Real DOM में करता है।
        </p>
      </article>

      <article className="real-dom-card highlight">
        <h2>3. How Reconciliation Works</h2>
        <p>
          React reconciliation process को Diffing Algorithm handle करता है। Process flow:
        </p>
        <pre className="code-block">
{`State Change
     ↓
Create New Virtual DOM
     ↓
Compare Old vs New Virtual DOM
     ↓
Find Differences
     ↓
Update Real DOM`}
        </pre>
      </article>

      <article className="real-dom-card">
        <h2>4. Step-by-Step Working</h2>
        <p><strong>Step 1: Initial Render</strong></p>
        <pre className="code-block">
{`function App() {
  return <h1>Hello</h1>;
}`}
        </pre>
        <p>Virtual DOM tree:</p>
        <pre className="code-block">{`h1
 |
Hello`}</pre>

        <p><strong>Step 2: State Change</strong></p>
        <p>Example: <code>setText("Hello React")</code></p>
        <p>New Virtual DOM tree:</p>
        <pre className="code-block">{`h1
 |
Hello React`}</pre>

        <p><strong>Step 3: Comparison</strong></p>
        <p>
          React compare करेगा: Old: <code>Hello</code> vs New: <code>Hello React</code> और detect करेगा कि केवल text changed है।
        </p>

        <p><strong>Step 4: Real DOM Update</strong></p>
        <p>React केवल changed part update करेगा: <code>textNode.nodeValue = "Hello React"</code></p>
      </article>

      <article className="real-dom-card highlight">
        <h2>5. Reconciliation Rules</h2>
        <p>React के diffing algorithm के मुख्य assumptions हैं:</p>
        <h3>Rule 1: Different Element Types</h3>
        <p>
          अगर element type change हो जाए (e.g. <code>&lt;div&gt;</code> → <code>&lt;span&gt;</code>), React old DOM destroy कर new DOM create करता है।
        </p>
        <h3>Rule 2: Same Element Type</h3>
        <p>
          अगर element type same है, बस attribute update होगा (जैसे <code>className</code> बदलना)।
        </p>
        <h3>Rule 3: Children Comparison</h3>
        <p>React children को top-to-bottom compare करता है और केवल changed nodes update करता है।</p>
      </article>

      <article className="real-dom-card">
        <h2>6. Importance of Keys</h2>
        <p>
          Lists में React <code>key</code> prop use करता है ताकि elements को uniquely identify किया जा सके, moves/del/insert detect हो सकें, और efficient comparison हो।
        </p>
        <pre className="code-block">
{`{
  items.map(item => (
    <li key={item.id}>{item.name}</li>
  ))
}`}
        </pre>
      </article>

      <article className="real-dom-card highlight">
        <h2>7. Example with List</h2>
        <p><strong>Old List</strong></p>
        <pre className="code-block">
{`<ul>
  <li>A</li>
  <li>B</li>
</ul>`}
        </pre>
        <p><strong>New List</strong></p>
        <pre className="code-block">
{`<ul>
  <li>B</li>
  <li>A</li>
</ul>`}
        </pre>
        <p>
          बिना keys React सोच सकता है कि दोनों elements बदल गए हैं। लेकिन keys होने पर React समझेगा कि elements swap हुए हैं।
        </p>
      </article>

      <article className="real-dom-card">
        <h2>8. Reconciliation Flow Diagram</h2>
        <pre className="code-block">
{`Component Render
       ↓
Create Virtual DOM
       ↓
State / Props Change
       ↓
Create New Virtual DOM
       ↓
Diffing Algorithm
       ↓
Reconciliation
       ↓
Minimal DOM Update`}
        </pre>
      </article>

      <article className="real-dom-card highlight">
        <h2>9. Advantages of Reconciliation</h2>
        <ul>
          <li>Efficient UI updates</li>
          <li>Performance optimization</li>
          <li>Avoid unnecessary DOM operations</li>
          <li>Fast rendering</li>
        </ul>
      </article>

      <article className="real-dom-card">
        <h2>10. Important Interview Points</h2>
        <ul>
          <li>Reconciliation is the process of comparing Virtual DOM trees.</li>
          <li>React uses Diffing Algorithm for reconciliation.</li>
          <li>React updates only changed nodes in the Real DOM.</li>
          <li>Keys are critical for list reconciliation.</li>
          <li>React assumes different element types produce different trees.</li>
        </ul>
      </article>
    </section>
  )
}
