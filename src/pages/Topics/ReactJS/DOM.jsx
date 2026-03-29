import React, { useEffect, useState } from 'react'

export default function DOM() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
  }, [])

  return (
    <section className={`real-dom-page ${mounted ? 'appear' : ''}`}>
      <header className="real-dom-header">
        <h1>Real DOM & Virtual DOM Overview</h1>
        <p className="real-dom-lead">
          इस पेज में हम <strong>Real DOM</strong> और <strong>Virtual DOM</strong> के बीच अंतर, काम करने का तरीका और React में क्यों Virtual DOM उपयोग किया जाता है, समझेंगे।
        </p>
      </header>

      <article className="real-dom-card">
        <h2>1. Definition</h2>
        <p>
          जब भी HTML page load होता है, browser उस HTML को DOM tree में convert कर देता है। DOM tree में हर HTML element एक node के रूप में होता है, और ये nodes parent-child relationships में organized होते हैं।
          DOM का main purpose है webpage को interactive बनाना, जिससे JavaScript के माध्यम से elements को manipulate किया जा सके।
        </p>
      </article>

      <article className="real-dom-card">
        <h2>2. Structure of Real DOM</h2>
        <p><strong>Example HTML</strong></p>
        <pre className="code-block">
          {`<div>
  <h1>Hello</h1>
  <p>Welcome</p>
</div>`}
        </pre>
        <p><strong>Browser इसे DOM tree में convert करता है:</strong></p>
        <pre className="code-block">
          {`        div
       /   \
     h1     p
     |      |
   Hello  Welcome`}
        </pre>
      </article>

      <article className="real-dom-card highlight">
        <h2>3. How Real DOM Works</h2>
        <p>Real DOM directly browser के साथ interact करता है। जब कोई change होता है:</p>
        <ol>
          <li>JavaScript DOM को modify करता है</li>
          <li>Browser layout calculate करता है</li>
          <li>Browser reflow करता है</li>
          <li>Browser repaint करता है</li>
        </ol>
        <pre className="code-block">
          {`DOM Change
   ↓
Reflow (layout calculation)
   ↓
Repaint (UI redraw)`}
        </pre>
        <p className="important">
          अगर DOM में बहुत ज्यादा updates हों तो performance slow हो सकती है।
        </p>
      </article>

      <article className="real-dom-card">
        <h2>4. Example of Real DOM Manipulation</h2>
        <pre className="code-block">
          {`const element = document.getElementById("title");
element.innerText = "Hello React";`}
        </pre>
        <p>यह code directly Real DOM को update करता है।</p>
      </article>

      <article className="real-dom-card highlight">
        <h2>5. Problems with Real DOM</h2>
        <ul>
          <li>DOM manipulation expensive होता है</li>
          <li>Frequent updates slow होते हैं</li>
          <li>Large UI में performance issues</li>
          <li>Browser को बार-बार reflow और repaint करना पड़ता है</li>
        </ul>
        <p className="important">
          इसी समस्या को solve करने के लिए React ने <strong>Virtual DOM</strong> introduce किया।
        </p>
      </article>

      <article className="real-dom-card">
        <h2>Virtual DOM क्या है?</h2>
        <p>
          Virtual DOM Real DOM का एक lightweight JavaScript representation होता है।
          React पहले UI का Virtual DOM tree बनाता है और state change होने पर Virtual DOM compare करके minimal changes Real DOM में apply करता है।
        </p>
      </article>

      <article className="real-dom-card">
        <h2>Virtual DOM की Structure</h2>
        <p><strong>Example React code</strong></p>
        <pre className="code-block">
          {`function App() {
  return <h1>Hello React</h1>;
}`}
        </pre>
        <p><strong>React internally इसे object में convert करता है:</strong></p>
        <pre className="code-block">
          {`{
  type: "h1",
  props: {
    children: "Hello React"
  }
}`}
        </pre>
        <p>
          यह JavaScript object ही Virtual DOM node होता है।
        </p>
      </article>

      <article className="real-dom-card">
        <h2>Virtual DOM Tree Example</h2>
        <p><strong>React JSX</strong>:</p>
        <pre className="code-block">
          {`<div>
  <h1>Hello</h1>
  <p>React</p>
</div>`}
        </pre>
        <p><strong>Virtual DOM tree:</strong></p>
        <pre className="code-block">
          {`        div
       /   \
     h1     p
     |      |
   Hello   React`}
        </pre>
        <p>
          यह browser DOM नहीं है बल्कि JavaScript object tree है।
        </p>
      </article>

      <article className="real-dom-card highlight">
        <h2>How Virtual DOM Works</h2>
        <p>जब React component render होता है:</p>
        <ol>
          <li>React Virtual DOM tree create करता है।</li>
          <li>जब state change होती है, React new Virtual DOM tree create करता है।</li>
          <li>React Old Virtual DOM और New Virtual DOM compare करता है। इसे <strong>Diffing Algorithm</strong> कहते हैं।</li>
          <li>React minimal changes calculate करता है।</li>
          <li>React केवल changed nodes को Real DOM में update करता है।</li>
        </ol>
        <p className="important">
          यह process React को high performance updates देने में मदद करता है।
        </p>
      </article>

      <article className="real-dom-card">
        <h2>Virtual DOM Flow</h2>
        <pre className="code-block">
          {`State Change
      ↓
New Virtual DOM
      ↓
Diffing Algorithm
      ↓
Minimal Changes Detected
      ↓
Update Real DOM`}
        </pre>
      </article>

      <article className="real-dom-card">
        <h2>Example: React Update</h2>
        <pre className="code-block">
          {`function Counter() {
  const [count, setCount] = React.useState(0);

  return <h1>{count}</h1>;
}`}
        </pre>
        <p><strong>Initial Render:</strong></p>
        <pre className="code-block">{`<h1>0</h1>`}</pre>
        <p><strong>User Click:</strong> <code>setCount(1)</code></p>
        <p><strong>React Process:</strong></p>
        <pre className="code-block">
          {`Old Virtual DOM → <h1>0</h1>
New Virtual DOM → <h1>1</h1>

React detects: Only text changed
React updates only the text in the Real DOM.`}
        </pre>
      </article>

      <article className="real-dom-card highlight">
        <h2>Advantages of Virtual DOM</h2>
        <ul>
          <li>Performance improve करता है</li>
          <li>Unnecessary DOM updates avoid करता है</li>
          <li>Efficient UI rendering</li>
          <li>Faster updates</li>
          <li>Better developer experience</li>
        </ul>
      </article>

      <article className="real-dom-card">
        <h2>Real DOM vs Virtual DOM</h2>
        <div className="code-block">
          <strong>Feature</strong>
          <br />
          Real DOM - Browser DOM structure
          <br />
          Virtual DOM - JavaScript copy of Real DOM
          <br />
          Update Speed - Slow / Fast
          <br />
          Manipulation - Direct / React computes minimal changes
          <br />
          Performance - Less efficient / Highly optimized
          <br />
          Rendering - Full re-render possible / Only changed parts update
        </div>
      </article>

      <article className="real-dom-card highlight">
        <h2>Important Interview Points</h2>
        <ul>
          <li>Virtual DOM Real DOM की copy नहीं बल्कि JavaScript representation है।</li>
          <li>React Virtual DOM compare करके minimal updates करता है।</li>
          <li>Comparison process को <strong>Reconciliation</strong> कहते हैं।</li>
          <li>React का Diffing Algorithm O(n) complexity में काम करता है।</li>
          <li>Virtual DOM performance improve करता है क्योंकि DOM manipulation expensive operation होता है।</li>
        </ul>
      </article>
      <article className="real-dom-card highlight">
        <h2>Other Best examples</h2>

        Simple analogy 🏠
        Imagine you want to repaint one wall in your house. Two approaches:
        <br />

       <strong> Real DOM approach:</strong> Tear down and rebuild the entire house every time
        <strong>React's approach:</strong> Take a photo of the house (Virtual DOM), mark only the one wall that changed, then go fix just that wall in the real house
      </article>
    </section>
  )
}
