import React, { useEffect, useState } from 'react'

export default function ReactuseEffect() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
  }, [])

  return (
    <section className={`real-dom-page ${mounted ? 'appear' : ''}`}>
      <header className="real-dom-header">
        <h1>useEffect</h1>
        <p className="real-dom-lead">
          <strong>useEffect</strong> एक React Hook है जिसका उपयोग side effects handle करने के लिए किया जाता है।
        </p>
      </header>

      <article className="real-dom-card">
        <h2>1. Definition</h2>
        <p>
          Side effects वे operations होते हैं जो component rendering के बाहर होते हैं।
          Simple definition: <strong>useEffect</strong> is a React Hook used to perform side effects in functional components.
        </p>
      </article>

      <article className="real-dom-card highlight">
        <h2>2. What are Side Effects?</h2>
        <p>
          Side effects वे operations हैं जो component render के अलावा external systems से interact करते हैं।
        </p>
        <p><strong>Examples:</strong></p>
        <ul>
          <li>API calls</li>
          <li>Event listeners</li>
          <li>Timers</li>
          <li>Subscriptions</li>
          <li>DOM manipulation</li>
          <li>Logging</li>
        </ul>
        <p><strong>Example:</strong></p>
        <pre className="code-block">
{`useEffect(() => {
  fetch("/api/users")
    .then(res => res.json())
    .then(data => setUsers(data));
}, []);`}
        </pre>
      </article>

      <article className="real-dom-card">
        <h2>3. Basic Syntax</h2>
        <p><strong>useEffect(effectFunction, dependencyArray)</strong></p>
        <p>Explanation:</p>
        <ul>
          <li><strong>effectFunction</strong> → Side effect code</li>
          <li><strong>dependencyArray</strong> → When effect should run</li>
        </ul>
        <p><strong>Example:</strong></p>
        <pre className="code-block">
{`useEffect(() => {
  console.log("Component rendered");
});`}
        </pre>
      </article>

      <article className="real-dom-card highlight">
        <h2>4. How useEffect Works Internally</h2>
        <p>React rendering process:</p>
        <ol>
          <li>Render phase</li>
          <li>Commit phase</li>
        </ol>
        <p>Important: <strong>useEffect runs after the DOM update</strong></p>
        <pre className="code-block">
{`Component Render
      ↓
Virtual DOM Created
      ↓
Real DOM Updated
      ↓
useEffect Executes`}
        </pre>
      </article>

      <article className="real-dom-card">
        <h2>5. useEffect Execution Cases</h2>
        <p>useEffect तीन तरह से run हो सकता है:</p>
        <ol>
          <li>On every render</li>
          <li>On mount only</li>
          <li>On dependency change</li>
        </ol>

        <h3>Case 1: Run on Every Render</h3>
        <pre className="code-block">
{`useEffect(() => {
  console.log("Runs after every render");
});`}
        </pre>
        <p>Explanation: No dependency array → runs on mount और हर update पर।</p>

        <h3>Case 2: Run Only Once (Mount)</h3>
        <pre className="code-block">
{`useEffect(() => {
  console.log("Run only once");
}, []);`}
        </pre>
        <p>
          Empty dependency array → React runs effect after first render only. Equivalent to <code>componentDidMount</code>.
        </p>
        <p><strong>Example:</strong></p>
        <pre className="code-block">
{`useEffect(() => {
  fetchUsers();
}, []);`}
        </pre>

        <h3>Case 3: Run on Dependency Change</h3>
        <pre className="code-block">
{`useEffect(() => {
  console.log("Runs when count changes");
}, [count]);`}
        </pre>
        <p>Explanation: runs when dependency changes – यह <code>componentDidUpdate</code> equivalent है।</p>
      </article>

      <article className="real-dom-card highlight">
        <h2>6. Cleanup Function</h2>
        <p>
          useEffect return function को cleanup function कहा जाता है। यह run होता है:
        </p>
        <ol>
          <li>Before component unmount</li>
          <li>Before effect runs again</li>
        </ol>
        <p><strong>Syntax:</strong></p>
        <pre className="code-block">
{`useEffect(() => {
  // effect code

  return () => {
    // cleanup code
  };
}, []);`}
        </pre>
      </article>

      <article className="real-dom-card">
        <h2>7. Cleanup Example</h2>
        <pre className="code-block">
{`useEffect(() => {
  const interval = setInterval(() => {
    console.log("Running...");
  }, 1000);

  return () => {
    clearInterval(interval);
  };
}, []);`}
        </pre>
        <p>Explanation: Interval starts on mount and stops on unmount.</p>
      </article>

      <article className="real-dom-card highlight">
        <h2>8. Real World Example</h2>
        <pre className="code-block">
{`useEffect(() => {
  const handleResize = () => {
    console.log(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);`}
        </pre>
        <p>Purpose: prevent memory leaks and avoid duplicate event listeners.</p>
      </article>

      <article className="real-dom-card">
        <h2>9. useEffect Dependency Array Algorithm</h2>
        <p>
          React dependency array को shallow comparison से check करता है।
          अगर dependencies में कोई value change होती है, तो effect फिर run होता है।
        </p>
        <pre className="code-block">
{`// Old dependency
[count = 1]
// New dependency
[count = 2]

// React detects dependency changed and runs effect again.`}
        </pre>
      </article>

      <article className="real-dom-card highlight">
        <h2>10. Infinite Loop Problem</h2>
        <p><strong>Common mistake:</strong></p>
        <pre className="code-block">
{`useEffect(() => {
  setCount(count + 1);
});`}
        </pre>
        <p>Result: render → setState → render → setState → infinite loop.</p>
        <p><strong>Correct way:</strong></p>
        <pre className="code-block">
{`useEffect(() => {
  setCount(count + 1);
}, []);`}
        </pre>
      </article>

      <article className="real-dom-card">
        <h2>11. Multiple useEffect</h2>
        <p>React में multiple effects use करना best practice है।</p>
        <pre className="code-block">
{`useEffect(() => {
  console.log("API call");
}, []);

useEffect(() => {
  console.log("Title update");
}, [count]);`}
        </pre>
        <p>
          Benefits: better separation of concerns और cleaner code.
        </p>
      </article>

      <article className="real-dom-card highlight">
        <h2>12. useEffect Lifecycle Mapping</h2>
        <table className="topic-table">
          <thead>
            <tr>
              <th>Lifecycle</th>
              <th>useEffect Equivalent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>componentDidMount</td>
              <td><code>{"useEffect(() =&gt; {}, [])"}</code></td>
            </tr>
            <tr>
              <td>componentDidUpdate</td>
              <td><code>{"useEffect(() =&gt; {}, [deps])"}</code></td>
            </tr>
            <tr>
              <td>componentWillUnmount</td>
              <td><code>cleanup function</code></td>
            </tr>
          </tbody>
        </table>
      </article>

      <article className="real-dom-card">
        <h2>13. Important Rules of useEffect</h2>
        <ul>
          <li>Hooks must be called at top level.</li>
          <li>Hooks cannot be called inside loops or conditions.</li>
          <li>Always include dependencies properly.</li>
          <li>Always cleanup subscriptions and listeners.</li>
        </ul>
      </article>

      <article className="real-dom-card highlight">
        <h2>14. Performance Optimization</h2>
        <p>Avoid unnecessary effects.</p>
        <pre className="code-block">
{`// Wrong
useEffect(() => {
 console.log("Runs every render");
});

// Correct
useEffect(() => {
 console.log("Runs only when needed");
}, [count]);`}
        </pre>
      </article>

      <article className="real-dom-card">
        <h2>15. Important Interview Points</h2>
        <ul>
          <li>useEffect runs after DOM updates.</li>
          <li>It is used for side effects.</li>
          <li>Dependency array controls execution.</li>
          <li>Cleanup function prevents memory leaks.</li>
          <li>Multiple useEffect hooks are recommended for separation of logic.</li>
        </ul>
      </article>

      <article className="real-dom-card highlight">
        <h2>16. Common Interview Question</h2>
        <p><strong>Q: When does useEffect run?</strong></p>
        <p>
          Best Answer: useEffect runs after the component renders and the DOM is updated. It is used to handle side effects such as API calls, event listeners, and subscriptions. The dependency array controls when the effect should re-run.
        </p>
      </article>

      <article className="real-dom-card">
        <h2>17. Common Mistakes</h2>
        <ul>
          <li>Missing dependency array</li>
          <li>Infinite loops</li>
          <li>Not cleaning event listeners</li>
          <li>Heavy logic inside useEffect</li>
        </ul>
      </article>
    </section>
  )
}
