import React, { useEffect, useState } from 'react'

export default function ReactRenderingProcess() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
  }, [])

  return (
    <section className={`real-dom-page ${mounted ? 'appear' : ''}`}>
      <header className="real-dom-header">
        <h1>React Rendering Process</h1>
        <p className="real-dom-lead">
          React rendering process वह lifecycle process है जिसमें components mount, update और unmount होते हैं।
        </p>
      </header>

      <article className="real-dom-card">
        <h2>1. Definition</h2>
        <p>
          React Rendering Process वह lifecycle process है जिसमें React components:
        </p>
        <ul>
          <li>Mount होते हैं (component create और DOM में add होता है)</li>
          <li>Update होते हैं (state/props change होने पर re-render)</li>
          <li>Unmount होते हैं (component DOM से remove होता है)</li>
        </ul>
        <p>
          Class components में lifecycle methods होते हैं जैसे <code>componentDidMount</code>, <code>componentDidUpdate</code>, और <code>componentWillUnmount</code>.
          Functional components में इन behaviors को React Hooks (mainly <code>useEffect</code>) से handle किया जाता है।
        </p>
      </article>

      <article className="real-dom-card highlight">
        <h2>2. Three Phases of React Rendering</h2>
        <p>React component lifecycle तीन main phases में divide होता है:</p>
        <ol>
          <li>Mounting</li>
          <li>Updating</li>
          <li>Unmounting</li>
        </ol>
      </article>

      <article className="real-dom-card">
        <h2>3. Mounting Phase</h2>
        <p>
          Mounting phase वह phase है जब component पहली बार create होता है और DOM में insert होता है।
          Simple words: When a component appears on the screen for the first time.
        </p>
        <p><strong>Mounting Flow</strong></p>
        <pre className="code-block">
{`Component Function Executes
        ↓
Virtual DOM Created
        ↓
Reconciliation
        ↓
Real DOM Created
        ↓
Component Appears on Screen`}
        </pre>
        <p><strong>Mounting Example</strong></p>
        <pre className="code-block">
{`import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("Component Mounted");
  }, []);

  return <h1>Hello React</h1>;
}

export default App;`}
        </pre>
        <p>
          <code>{"useEffect(() => {}, [])"}</code> का मतलब है run only once after first render — यह <code>componentDidMount</code> equivalent है।
        </p>
        <p><strong>Real World Mounting Use Cases</strong></p>
        <ul>
          <li>API calls</li>
          <li>Initial data fetch</li>
          <li>Subscriptions</li>
          <li>Event listeners</li>
          <li>Analytics tracking</li>
        </ul>
      </article>

      <article className="real-dom-card highlight">
        <h2>4. Updating Phase</h2>
        <p>Updating phase तब होती है जब component re-render होता है। यह re-render तब होता है जब:</p>
        <ul>
          <li>State change</li>
          <li>Props change</li>
          <li>Context change</li>
          <li>Parent re-render</li>
        </ul>
        <p><strong>Updating Flow</strong></p>
        <pre className="code-block">
{`State / Props Change
        ↓
Component Function Executes Again
        ↓
New Virtual DOM Created
        ↓
Diffing Algorithm
        ↓
Reconciliation
        ↓
Update Real DOM`}
        </pre>
        <p><strong>Updating Example</strong></p>
        <pre className="code-block">
{`import React, { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component Updated");
  }, [count]);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;`}
        </pre>
        <p>
          <code>[count]</code> का मतलब है run effect when count changes — यह <code>componentDidUpdate</code> equivalent है।
        </p>
      </article>

      <article className="real-dom-card">
        <h2>5. Unmounting Phase</h2>
        <p>
          Unmounting phase तब होती है जब component DOM से remove हो जाता है। Simple words: when a component is removed from the UI.
        </p>
        <p><strong>Unmounting Example</strong></p>
        <pre className="code-block">
{`function Timer() {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Running...");
    }, 1000);

    return () => {
      clearInterval(interval);
      console.log("Component Unmounted");
    };
  }, []);

  return <h1>Timer</h1>;
}`}
        </pre>
        <p>
          <code>return () =&gt; {}</code> cleanup function है। यह run होता है before component unmount.
        </p>
        <p><strong>Real World Unmounting Use Cases</strong></p>
        <ul>
          <li>Clear intervals</li>
          <li>Remove event listeners</li>
          <li>Cancel API requests</li>
          <li>Close WebSocket connections</li>
          <li>Stop subscriptions</li>
        </ul>
      </article>

      <article className="real-dom-card highlight">
        <h2>6. Complete Lifecycle Flow</h2>
        <pre className="code-block">
{`Mounting Phase
   ↓
Component Render
   ↓
useEffect (runs)

----------------------

Updating Phase
   ↓
State / Props Change
   ↓
Component Re-render
   ↓
useEffect runs again

----------------------

Unmounting Phase
   ↓
Cleanup Function Executes`}
        </pre>
      </article>

      <article className="real-dom-card">
        <h2>7. Lifecycle Equivalent Table</h2>
        <table className="topic-table">
          <thead>
            <tr>
              <th>Class Component</th>
              <th>Functional Component</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>componentDidMount</code></td>
              <td><code>useEffect(() =&gt; {}, [])</code></td>
            </tr>
            <tr>
              <td><code>componentDidUpdate</code></td>
              <td><code>useEffect(() =&gt; {}, [dependencies])</code></td>
            </tr>
            <tr>
              <td><code>componentWillUnmount</code></td>
              <td><code>cleanup function in useEffect</code></td>
            </tr>
          </tbody>
        </table>
      </article>

      <article className="real-dom-card highlight">
        <h2>8. Important Interview Points</h2>
        <ul>
          <li>Functional components do not have lifecycle methods.</li>
          <li>Lifecycle behavior is handled using React Hooks.</li>
          <li><code>useEffect</code> handles mounting, updating, and unmounting.</li>
          <li>Empty dependency array means run once on mount.</li>
          <li>Cleanup function runs before unmounting.</li>
        </ul>
      </article>

      <article className="real-dom-card">
        <h2>9. Common Mistakes</h2>
        <p><strong>1. Missing dependency array</strong></p>
        <pre className="code-block">
{`useEffect(() => {
 console.log("Runs every render");
});`}
        </pre>
        <p>यह हर render पर run होगा।</p>
        <p><strong>2. Not cleaning event listeners</strong></p>
        <p>Wrong: Memory leak, duplicate events. Always cleanup:</p>
        <pre className="code-block">
{`return () => cleanup`}
        </pre>
      </article>

      <article className="real-dom-card highlight">
        <h2>10. Best Interview Answer (Short)</h2>
        <p>
          In functional components, React lifecycle phases are handled using hooks. Mounting happens when a component first renders, updating occurs when state or props change, and unmounting happens when the component is removed from the DOM. The <code>useEffect</code> hook is used to manage these lifecycle behaviors, including side effects and cleanup.
        </p>
      </article>
    </section>
  )
}
