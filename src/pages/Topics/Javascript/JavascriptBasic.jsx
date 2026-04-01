import React from "react";
import { ArrowUpCircle, Layers, Database, Target, Maximize, AlertTriangle, Play, BookOpen } from "lucide-react";

// Helper components to keep the main code clean and maintain consistent UX
const Section = ({ number, title, icon: Icon, children }) => (
  <section className="mb-10 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border/50">
      {number && (
        <span className="flex shrink-0 items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold text-lg">
          {number}
        </span>
      )}
      {Icon && !number && <Icon className="w-8 h-8 text-primary" />}
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
    </div>
    <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
      {children}
    </div>
  </section>
);

const CodeBlock = ({ code }) => (
  <pre className="bg-muted/50 p-4 rounded-xl overflow-x-auto text-sm md:text-base my-4 border border-border text-foreground font-mono shadow-inner">
    <code>{code.trim()}</code>
  </pre>
);

const ImportantBox = ({ title, type = "primary", children }) => {
  const colors = {
    warning: "bg-warning/10 border-warning text-warning-foreground",
    primary: "bg-primary/10 border-primary cursor-default",
    destructive: "bg-destructive/10 border-destructive text-destructive-foreground"
  };
  
  return (
    <div className={`p-5 border-l-4 rounded-r-xl my-6 ${colors[type]}`}>
      {title && <h4 className="font-bold flex items-center gap-2 mb-2"><Play className="w-4 h-4"/>{title}</h4>}
      <div className="opacity-90">{children}</div>
    </div>
  );
};

export default function JavascriptBasic() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <header className="space-y-4 border-b border-border pb-8 mb-10 text-center animate-in fade-in zoom-in-95 duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
          <BookOpen className="w-4 h-4" />
          <span>Core Concepts</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
          JavaScript Basics & Memory
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Deep-dive into Hoisting, Call Stack limits, Heaps, and Lexical Environments.
        </p>
      </header>

      {/* Hoisting Section */}
      <Section title="Hoisting & TDZ" icon={ArrowUpCircle}>
        <p>
          Hoisting is one of the most misunderstood concepts in JavaScript. The common line people say is "Variables and functions move to the top", but that is <strong>not technically correct</strong>.
        </p>
        <ImportantBox title="Correct Explanation:" type="primary">
          During the memory creation phase, JavaScript allocates memory for variables and functions <em>before</em> code execution starts. This behavior is called hoisting.
        </ImportantBox>
        
        <CodeBlock code={`console.log(x); // Output: undefined\nvar x = 5;`} />
        <p><strong>Why?</strong> Because internally during the memory phase, <code>x = undefined</code>. So the variable exists before execution, but its value is not assigned yet.</p>

        <h4 className="text-xl font-bold text-foreground mt-8 mb-4 border-b border-border pb-2">var vs let vs const</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-background border border-border p-5 rounded-xl shadow-sm flex flex-col">
            <h5 className="font-bold text-lg text-primary mb-3">var</h5>
            <ul className="list-disc list-inside space-y-2 text-sm mb-4">
              <li>Gets memory allocated</li>
              <li>Initialized with <code>undefined</code></li>
              <li>Can be accessed before declaration</li>
            </ul>
            <CodeBlock code={`console.log(a); // Output: undefined\nvar a = 10;`} />
          </div>

          <div className="bg-background border border-border p-5 rounded-xl shadow-sm flex flex-col">
            <h5 className="font-bold text-lg text-warning mb-3">let and const</h5>
            <ul className="list-disc list-inside space-y-2 text-sm mb-4">
              <li>Memory is allocated</li>
              <li>But <strong>not</strong> initialized immediately</li>
              <li>They stay inside the <strong>Temporal Dead Zone (TDZ)</strong> until execution reaches their line</li>
            </ul>
            <CodeBlock code={`console.log(a); // ReferenceError\nlet a = 10;`} />
            <p className="text-xs text-muted-foreground mt-auto">Why? Because <code>a</code> exists in memory, but is not initialized yet.</p>
          </div>
        </div>
      </Section>

      {/* Call Stack Section */}
      <Section title="The Call Stack" icon={Layers}>
        <p>
          Call Stack is a stack data structure used by the JavaScript engine to keep track of which function is currently executing. It purely follows standard <strong>LIFO (Last In, First Out)</strong>.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mt-6">
          <div>
            <CodeBlock code={`function one() {\n  two();\n}\n\nfunction two() {\n  three();\n}\n\nfunction three() {\n  console.log("Done");\n}\n\none();`} />
          </div>
          <div className="bg-muted p-5 rounded-xl border border-border h-full">
            <h5 className="font-bold text-foreground mb-4">Internal Stack Flow Trace:</h5>
            <div className="space-y-3 font-mono text-sm">
              <div className="p-2 border border-border rounded bg-background shadow-sm">Global() → one() → two() → three()</div>
              <p className="text-xs text-muted-foreground">After three() finishes:</p>
              <div className="p-2 border border-border rounded bg-background shadow-sm">Global() → one() → two()</div>
              <p className="text-xs text-muted-foreground">Then:</p>
              <div className="p-2 border border-border rounded bg-background shadow-sm">Global() → one()</div>
              <p className="text-xs text-muted-foreground">Finally:</p>
              <div className="p-2 border border-border rounded bg-background shadow-sm">Global()</div>
            </div>
          </div>
        </div>

        <ImportantBox title="Stack Overflow" type="destructive">
          <div className="flex flex-col md:flex-row gap-6 mt-3">
            <div className="flex-1">
              <p className="mb-2">If functions keep calling each other forever without stopping, the call stack becomes full.</p>
              <div className="bg-black/20 p-2 rounded text-xs font-mono">RangeError: Maximum call stack size exceeded</div>
              <p className="text-sm mt-3 opacity-80">Because every function call creates a brand new execution context and blindly pushes it into the stack.</p>
            </div>
            <div className="flex-1">
              <CodeBlock code={`function test() {\n  test();\n}\n\ntest();`} />
            </div>
          </div>
        </ImportantBox>
      </Section>

      {/* Memory Heap Section */}
      <Section title="Memory Heap" icon={Database}>
        <p>Heap is a large memory area where JavaScript securely stores <strong>objects, arrays, functions (internally via references), and complex data</strong>.</p>
        
        <CodeBlock code={`const user = {\n  name: "Mayank",\n  age: 25\n};`} />
        
        <p className="mt-4 mb-2 font-medium">Internally how it maps:</p>
        <ul className="list-disc list-inside space-y-2 mb-8 bg-background border border-border p-4 rounded-lg inline-block text-sm">
          <li>The <code>user</code> variable securely stores an explicit reference identifier.</li>
          <li>The actual object block itself is stored fully in the heap memory.</li>
        </ul>

        <h4 className="text-2xl font-bold text-foreground mb-4 mt-8 flex items-center gap-2 border-t border-border pt-8">
          <Maximize className="w-6 h-6 text-primary"/>
          Stack vs Heap Breakdown
        </h4>
        <div className="grid sm:grid-cols-2 gap-6 pb-2">
          <div className="border border-border/50 bg-background rounded-xl p-5 shadow-inner">
            <h5 className="font-bold text-primary mb-3 text-lg border-b border-border pb-2">The Stack</h5>
            <p className="text-sm text-muted-foreground mb-3">Conceptually simpler storage. Used exclusively for:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Execution contexts</li>
              <li>Function calls</li>
              <li>Primitive values (<code>let a = 10;</code>)</li>
              <li>References (Pointers to the heap)</li>
            </ul>
          </div>
          <div className="border border-border/50 bg-background rounded-xl p-5 shadow-inner">
             <h5 className="font-bold text-success mb-3 text-lg border-b border-border pb-2">The Heap</h5>
            <p className="text-sm text-muted-foreground mb-3">Dynamic memory allocation pool. Used specifically for:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Objects (<code>let obj = {'{'} name: "JS" {'}'};</code>)</li>
              <li>Arrays</li>
              <li>Dynamic payload allocation</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Scope & Lexical Env */}
      <Section title="Scope & Lexical Environment" icon={Target}>
        <h4 className="text-xl font-bold text-foreground mb-2">1. What is Scope?</h4>
        <p className="mb-4">Scope universally defines structurally where a variable can be natively accessed.</p>
        <CodeBlock code={`let globalVar = "I am global";\n\nfunction test() {\n  let localVar = "I am local";\n  console.log(globalVar);\n  console.log(localVar);\n}\n\ntest();\nconsole.log(localVar); // Output: ReferenceError!`} />
        <p className="text-sm bg-primary/10 text-primary-foreground p-3 rounded-lg border border-primary/20">
          <strong>Why?</strong> Because <code>localVar</code> only exists explicitly inside the boundaries of the <code>test()</code> function. Scope strictly decides the visibility of variables.
        </p>

        <h4 className="text-xl font-bold text-foreground mb-2 mt-8 pt-6 border-t border-border">2. Lexical Environment</h4>
        <p className="mb-4">This is an advanced but highly important foundational concept. It strictly dictates that <strong>JavaScript functions remember the place where they were legally written.</strong></p>
        
        <div className="bg-background border border-border p-6 rounded-xl shadow-sm">
          <CodeBlock code={`function outer() {\n  let a = 10;\n\n  function inner() {\n    console.log(a);\n  }\n\n  inner();\n}\n\nouter(); // Output: 10`} />
          <div className="mt-4 p-4 bg-muted border border-border rounded-lg text-sm">
            <span className="font-bold text-foreground">Why? </span> 
            Because <code>inner()</code> was explicitly written totally inside <code>outer()</code>, so it natively retains internal access to <code>a</code>. This is deeply defined as Lexical Scope configuration.
          </div>
        </div>
      </Section>

    </div>
  );
}
