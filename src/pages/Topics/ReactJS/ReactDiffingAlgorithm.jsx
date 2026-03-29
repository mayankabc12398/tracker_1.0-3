import React, { useEffect, useState } from 'react'
import reconcillationimg from '../../../assets/recomcillation.jpeg'
export default function ReactDiffingAlgorithm() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
  }, [])

  return (
    <section className={`real-dom-page ${mounted ? 'appear' : ''}`}>
      <header className="real-dom-header">
        <h1>React Diffing Algorithm</h1>
        <p className="real-dom-lead">
          Diffing Algorithm वह algorithm है जिसे React use करता है Old Virtual DOM और New Virtual DOM के बीच differences find करने के लिए।
        </p>
      </header>

      <article className="real-dom-card">
        <h2>1. Definition</h2>
        <p>
          Diffing Algorithm का purpose है Real DOM में minimal changes apply करना ताकि rendering fast हो सके।
          Simple words में: Diffing Algorithm = Virtual DOM comparison technique.
        </p>
      </article>

      <article className="real-dom-card">
        <h2>2. Why Diffing Algorithm is Needed</h2>
        <p>
          अगर React दो DOM trees को naive way में compare करे तो complexity होगी O(n³). उदाहरण के लिए अगर page में 1000 elements हों तो comparisons 1000³ = 1,000,000,000 होंगे, जो बहुत slow है।
        </p>
        <p>
          इसलिए React optimized Diffing Algorithm use करता है जिसकी complexity है O(n), जो इसे बहुत fast बनाता है।
        </p>
      </article>

      <article className="real-dom-card highlight">
        <h2>3. React Diffing Algorithm Assumptions</h2>
        <p>React ने algorithm को fast बनाने के लिए 2 assumptions लिए हैं:</p>
        <h3>Assumption 1: Different Element Types</h3>
        <p>
          अगर element type change हो जाए, React assume करता है कि <strong>entire subtree</strong> change हो गई है।
        </p>
        <p><strong>Example:</strong></p>
        <pre className="code-block">
{`Old DOM
<div>
  <h1>Hello</h1>
</div>

New DOM
<span>
  <h1>Hello</h1>
</span>

React process:
Destroy old DOM tree
Create new DOM tree

1. पुराना <div> delete करेगा
2. नया <span> create करेगा
3. उसके अंदर नया <h1>Hello</h1> बनाएगा

Note: If the root element type changes, React destroys the old tree and builds a new one from scratch.


💡 Interview Answer (Perfect)
“Why keys are important in React?”
Answer:
Keys allow React to match elements between renders and avoid unnecessary re-renders by preserving component identity
`}
        </pre>

        <h3>Assumption 2: Keys Identify Elements</h3>
        <p>
          React lists को compare करने के लिए <code>key</code> prop use करता है।
        </p>
        <pre className="code-block">
{`
OLD List:
<li key={1}>A</li>
<li key={2}>B</li>
<li key={3}>C</li>

New List:
<li key={4}>D</li>
<li key={1}>A</li>
<li key={2}>B</li>
<li key={3}>C</li>

👉 React index नहीं देखता
👉 React key से पहचानता है

`}
        </pre>
        <p>Keys help React to identify elements, track movements, detect insertions/deletions.</p>
      </article>

      <article className="real-dom-card">
        <h2>4. How Diffing Algorithm Works</h2>
        <p>
          Diffing algorithm tree comparison करता है और तीन चीज़ों को देखता है:
        </p>
        <ul>
          <li>Element type (HTML tags)</li>
          <li>Props (attributes)</li>
          <li>Children </li>
        </ul>
        <pre className="code-block">
{`Old Virtual DOM
        vs
New Virtual DOM

React jab UI update karta hai, to wo old aur new Virtual DOM ko \n compare karta hai (diffing). Isme React 3 cheeze check karta hai:\n element type, props aur children. Sabse pehle type check hota hai — \nagar type same hai (div → div), to React DOM reuse karta hai,\n aur agar type change ho gaya (div → span), to pura element replace ho jata hai.\n Phir props (jaise class, id) check hote hain, aur sirf changed props update hote hain.\n Last me children (andar ka content) compare hota hai,\n aur jaha change hota hai wahi update hota hai. Isse unnecessary \nre-render nahi hota aur performance fast rehti hai.

`}
        </pre>
      </article>

      <article className="real-dom-card">
        <h2>5. Diffing Example</h2>
        <p><strong>Initial render:</strong></p>
        <pre className="code-block">
{`<div>
  <h1>Hello</h1>
  <p>React</p>
</div>`}
        </pre>
        <p>
          Virtual DOM tree:
        </p>
        <pre className="code-block">
{`      div
     /   \
   h1     p
   |      |
 Hello   React`}
        </pre>
        <p><strong>State change:</strong></p>
        <pre className="code-block">
{`<div>
  <h1>Hello</h1>
  <p>React JS</p>
</div>`}
        </pre>
        <p>React compare करेगा:</p>
        <pre className="code-block">
{`Old: React
New: React JS

React detects: Text node changed
React updates only the text node.`}
        </pre>
      </article>

      <article className="real-dom-card">
        <h2>6. Diffing in Children Elements</h2>
        <p><strong>Old list:</strong></p>
        <pre className="code-block">
{`<ul>
  <li>A</li>
  <li>B</li>
</ul>`}
        </pre>
        <p><strong>New list:</strong></p>
        <pre className="code-block">
{`<ul>
  <li>A</li>
  <li>C</li>
</ul>`}
        </pre>
        <p>React detects B → C और updates only changed node.</p>
      </article>

      <article className="real-dom-card highlight">
        <h2>7. Problem Without Keys</h2>
        <p><strong>Old list:</strong></p>
        <pre className="code-block">
{`<ul>
  <li>A</li>
  <li>B</li>
</ul>`}
        </pre>
        <p><strong>New list:</strong></p>
        <pre className="code-block">
{`<ul>
  <li>B</li>
  <li>A</li>
</ul>`}
        </pre>
        <p>
          Without keys React सोचता है:
        </p>
        <pre className="code-block">
{`A → B
B → A`}
        </pre>
        <p>जिससे unnecessary updates होते हैं।</p>
      </article>

      <article className="real-dom-card">
        <h2>8. Diffing With Keys</h2>
        <pre className="code-block">
{`<ul>
  <li key="1">A</li>
  <li key="2">B</li>
</ul>

New list:

<ul>
  <li key="2">B</li>
  <li key="1">A</li>
</ul>`}
        </pre>
        <p>
          React now detects elements moved rather than replaced, इसलिए Real DOM recreate नहीं होता।
        </p>
      </article>

      <article className="real-dom-card">
        <h2>9. Diffing Process Flow</h2>
        <pre className="code-block">
{`Old Virtual DOM
        ↓
New Virtual DOM
        ↓
Compare root
        ↓
Same type? → update props
Different type? → replace
        ↓
Compare children (using keys)
        ↓
Apply minimal changes to Real DOM`}
        </pre>
      </article>

      <article className="real-dom-card highlight">
        <h2>10. Advantages of Diffing Algorithm</h2>
        <ul>
          <li>Fast UI updates</li>
          <li>Minimal DOM manipulation</li>
          <li>Performance optimization</li>
          <li>Efficient rendering</li>
        </ul>
      </article>

      <article className="real-dom-card">
        <h2>11. Important Interview Points</h2>
        <ul>
          <li>Diffing algorithm compares two Virtual DOM trees.</li>
          <li>React optimizes comparison from O(n³) → O(n).</li>
          <li>React assumes different element types produce different trees.</li>
          <li>Keys are essential for list diffing.</li>
          <li>Diffing is part of the Reconciliation process.</li>
        </ul>
      </article>

      <article className="real-dom-card highlight">
        <h2>12. Common Mistakes</h2>
        <p>
          ❌ Using array index as key (<code>&lt;li key={"index"}&gt;</code>) leads to incorrect re-renders, performance issues, और state bugs.
        </p>
        <p>Best practice: हमेशा unique id as key use करें।</p>
      </article>
      <article className="real-dom-card highlight">
        <h2>13. Notes</h2>

        <p>
          Diffing = the comparison step — "what changed?"
Reconciliation = the entire process — "compare + decide + update the real DOM"
Think of it like this: diffing is one part inside reconciliation. Reconciliation is the full workflow.
        </p>
        <img src={reconcillationimg} width={500}/>
      
      </article>
    </section>
  )
}
