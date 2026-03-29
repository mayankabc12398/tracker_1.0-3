import React, { useEffect, useState } from 'react'

export default function ReactMemoHooks() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
  }, [])

  return (
    <section className={`real-dom-page ${mounted ? 'appear' : ''}`}>
      <header className="real-dom-header">
        <h1>React.memo / useMemo / useCallback / useRef</h1>
        <p className="real-dom-lead">
          React memoization tools की deep dive — कब use करें और common mistakes क्या हैं।
        </p>
      </header>

      <article className="real-dom-card">
        <h2>1. React.memo</h2>
        <p>
          <code>React.memo</code> एक Higher Order Component (HOC) है जो functional component को memoize करता है ताकि unnecessary re-render avoid किया जा सके।
        </p>
        <p><strong>Simple definition:</strong> React.memo prevents a component from re-rendering if its props have not changed.</p>
        <h3>Why use React.memo?</h3>
        <p>
          जब parent component re-render होता है तो उसके child components भी re-render होते हैं, भले ही props change नहीं हुए हों।
          इससे unnecessary rendering और performance issues हो सकते हैं।
        </p>
        <pre className="code-block">
{`Parent render
      ↓
Child render
      ↓
Unnecessary rendering`}
        </pre>
        <p>
          React.memo इस problem को solve करता है:
        </p>
        <pre className="code-block">
{`Parent render
Child does NOT re-render`}
        </pre>
        <h3>Syntax</h3>
        <pre className="code-block">
{`const MemoComponent = React.memo(Component);`}
        </pre>
        <h3>Example</h3>
        <pre className="code-block">
{`import React, { useState } from "react";

const Child = React.memo(({ name }) => {
  console.log("Child Rendered");
  return <h1>{name}</h1>;
});

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Child name="Mayank" />
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}
        </pre>
        <h3>How React.memo Works</h3>
        <p>
          React.memo props की shallow comparison करता है। अगर old props और new props same होते हैं, तो re-render skip कर देता है।
        </p>
        <p><strong>Use cases</strong></p>
        <ul>
          <li>Large component trees</li>
          <li>Expensive UI rendering</li>
          <li>Pure components</li>
          <li>Performance optimization</li>
        </ul>
      </article>

      <article className="real-dom-card highlight">
        <h2>2. useMemo</h2>
        <p>
          <code>useMemo</code> एक React Hook है जो expensive calculation का result memoize करता है।
        </p>
        <p><strong>Simple definition:</strong> useMemo stores the result of a calculation and recomputes it only when dependencies change.</p>
        <h3>Why use useMemo?</h3>
        <p>
          अगर component re-render होता है तो heavy calculations भी repeat हो जाते हैं, जिससे performance slow हो सकती है।
          useMemo unnecessary recalculation avoid करता है।
        </p>
        <h3>Syntax</h3>
        <pre className="code-block">
{`const memoizedValue = useMemo(() => calculation, [dependencies]);`}
        </pre>
        <h3>Example</h3>
        <pre className="code-block">
{`import React, { useState, useMemo } from "react";

function App() {
  const [count, setCount] = useState(0);

  const expensiveCalculation = useMemo(() => {
    console.log("Calculating...");
    return count * 1000;
  }, [count]);

  return (
    <div>
      <h1>{expensiveCalculation}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}
        </pre>
        <h3>How useMemo Works</h3>
        <pre className="code-block">
{`Component Render
      ↓
Check dependencies
      ↓
If changed → recompute
If same → return cached value`}
        </pre>
        <h3>Use cases</h3>
        <ul>
          <li>Large list filtering</li>
          <li>Data transformation</li>
          <li>Complex calculations</li>
        </ul>
      </article>

      <article className="real-dom-card">
        <h2>3. useCallback</h2>
        <p>
          <code>useCallback</code> एक React Hook है जो function को memoize करता है।
        </p>
        <p><strong>Simple definition:</strong> useCallback returns a memoized version of a function that only changes when dependencies change.</p>
        <h3>Why use useCallback?</h3>
        <p>
          React में हर render पर new function instance create होता है, जिससे child components को unnecessary re-render मिल सकता है जब वे function को prop के रूप में लेते हैं।
          useCallback function reference stable रखता है।
        </p>
        <h3>Syntax</h3>
        <pre className="code-block">
{`const memoizedFunction = useCallback(() => {}, [dependencies]);`}
        </pre>
        <h3>Example</h3>
        <pre className="code-block">
{`import React, { useState, useCallback } from "react";

const Child = React.memo(({ handleClick }) => {
  console.log("Child Rendered");
  return <button onClick={handleClick}>Click</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);

  return (
    <div>
      <Child handleClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}
        </pre>
        <h3>How useCallback Works</h3>
        <p>
          useCallback internally uses useMemo to return the same function reference until dependencies change.
        </p>
      </article>

      <article className="real-dom-card highlight">
        <h2>4. Difference Between useMemo and useCallback</h2>
        <table className="topic-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>useMemo</th>
              <th>useCallback</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Purpose</td>
              <td>Memoize value</td>
              <td>Memoize function</td>
            </tr>
            <tr>
              <td>Returns</td>
              <td>Cached value</td>
              <td>Cached function</td>
            </tr>
            <tr>
              <td>Use case</td>
              <td>Expensive calculations</td>
              <td>Prevent function recreation</td>
            </tr>
          </tbody>
        </table>
      </article>

      <article className="real-dom-card">
        <h2>5. React.memo vs useMemo vs useCallback</h2>
        <table className="topic-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>React.memo</th>
              <th>useMemo</th>
              <th>useCallback</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Type</td>
              <td>HOC</td>
              <td>Hook</td>
              <td>Hook</td>
            </tr>
            <tr>
              <td>Used for</td>
              <td>Prevent component re-render</td>
              <td>Memoize value</td>
              <td>Memoize function</td>
            </tr>
            <tr>
              <td>Scope</td>
              <td>Component level</td>
              <td>Value level</td>
              <td>Function level</td>
            </tr>
          </tbody>
        </table>
      </article>

      <article className="real-dom-card highlight">
        <h2>6. When to Use Each</h2>
        <ul>
          <li>
            <strong>React.memo</strong> – जब component अक्सर render होता है और props rarely change.
          </li>
          <li>
            <strong>useMemo</strong> – जब expensive calculation हो और आपके पास dependencies हों जो अक्सर नहीं बदलते।
          </li>
          <li>
            <strong>useCallback</strong> – जब आप function को child component में pass कर रहे हों और want to avoid unnecessary re-renders.
          </li>
        </ul>
      </article>

      <article className="real-dom-card">
        <h2>7. Important Interview Points</h2>
        <ul>
          <li>React.memo prevents unnecessary component re-renders.</li>
          <li>useMemo memoizes a value.</li>
          <li>useCallback memoizes a function.</li>
          <li>React.memo uses shallow comparison.</li>
          <li>useCallback is internally implemented using useMemo.</li>
        </ul>
      </article>

      <article className="real-dom-card highlight">
        <h2>8. Common Mistakes</h2>
        <p><strong>1. Overusing memoization</strong></p>
        <p>
          Unnecessary useMemo/useCallback can reduce performance because memoization itself has a cost.
        </p>
        <p><strong>2. Missing dependencies</strong></p>
        <pre className="code-block">
{`useCallback(() => {
  console.log(count);
}, []);

// Correct:
useCallback(() => {
  console.log(count);
}, [count]);`}
        </pre>
      </article>
    </section>
  )
}
