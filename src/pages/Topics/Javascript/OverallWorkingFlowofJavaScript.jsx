import React from "react";
import { Terminal, Layers, Cpu, Box, Zap, Trash2, Activity, Play, Code } from "lucide-react";

// Helper components to keep the main code clean
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
  <pre className="bg-muted/50 p-4 rounded-xl overflow-x-auto text-sm md:text-base my-4 border border-border text-foreground font-mono">
    <code>{code.trim()}</code>
  </pre>
);

const ImportantBox = ({ title, children }) => (
  <div className="p-5 bg-warning/10 border-l-4 border-warning rounded-r-xl my-6">
    {title && <h4 className="font-bold text-warning-foreground mb-2 flex items-center gap-2"><Zap className="w-5 h-5"/>{title}</h4>}
    <div className="text-warning-foreground/90">{children}</div>
  </div>
);

export default function OverallWorkingFlowofJavaScript() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <header className="space-y-4 border-b border-border pb-8 mb-10 text-center animate-in fade-in zoom-in-95 duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
          <Terminal className="w-4 h-4" />
          <span>Under The Hood</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
          JavaScript Engine Internals
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          From human-readable code to machine execution. The ultimate guide to how JS actually works.
        </p>
      </header>

      {/* Intro */}
      <Section title="What is a JavaScript Engine?" icon={Cpu}>
        <p>
          A JavaScript Engine is a program that reads, understands, compiles, and executes JavaScript code.
          Its job is to convert the JavaScript written by developers into something the computer can understand and run.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-background border border-border rounded-xl text-center">
            <h4 className="font-bold text-foreground text-lg">V8</h4>
            <p className="text-sm border-t border-border/50 pt-2 mt-2">Chrome & Node.js</p>
          </div>
          <div className="p-4 bg-background border border-border rounded-xl text-center">
            <h4 className="font-bold text-foreground text-lg">SpiderMonkey</h4>
            <p className="text-sm border-t border-border/50 pt-2 mt-2">Firefox</p>
          </div>
          <div className="p-4 bg-background border border-border rounded-xl text-center">
            <h4 className="font-bold text-foreground text-lg">JavaScriptCore</h4>
            <p className="text-sm border-t border-border/50 pt-2 mt-2">Safari</p>
          </div>
        </div>
        <p className="font-medium text-foreground mt-4 text-center">
          In simple words: JavaScript Engine is the brain that runs JavaScript code.
        </p>
      </Section>

      {/* Working Flow */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 mb-10 shadow-sm animate-in fade-in duration-700">
        <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
          <Activity className="w-6 h-6" />
          Overall Working Flow of JavaScript Engine
        </h3>
        <div className="flex flex-wrap gap-3">
          {["Parsing", "Compilation", "Execution", "Memory Management", "Garbage Collection", "Optimization"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="px-4 py-2 bg-background border border-border rounded-lg text-foreground font-medium shadow-sm">
                {i + 1}. {step}
              </span>
              {i < 5 && <span className="text-muted-foreground">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* 1. Parsing */}
      <Section number="1" title="Parsing">
        <p>Parsing means the engine reads your JavaScript code and tries to understand its structure.</p>
        <CodeBlock code={`let a = 10;`} />
        <p>The engine first checks: Is the syntax valid? Is <code>let</code> used correctly? Is the variable name valid?</p>
        <p>If the syntax is wrong (e.g., <code>let = 10;</code>), the engine throws a <span className="text-destructive font-bold px-2 py-1 bg-destructive/10 rounded">SyntaxError</span>.</p>
        
        <h4 className="text-lg font-bold text-foreground mt-6 mb-3">Parsing has 2 Important Parts:</h4>
        <div className="space-y-6">
          <div className="bg-background p-5 rounded-xl border border-border">
            <h5 className="font-bold text-foreground mb-2 flex items-center gap-2"><Code className="w-4 h-4"/> 1. Tokenization / Lexical Analysis</h5>
            <p>The code is broken into small pieces called tokens.</p>
            <CodeBlock code={`// Tokens for "let a = 10;"\nlet\na\n=\n10\n;`} />
          </div>
          <div className="bg-background p-5 rounded-xl border border-border">
            <h5 className="font-bold text-foreground mb-2 flex items-center gap-2"><Layers className="w-4 h-4"/> 2. AST (Abstract Syntax Tree)</h5>
            <p>After tokenization, the engine creates a tree-like structure called AST. It helps the engine understand that this is a variable declaration, the name is 'a', etc.</p>
          </div>
        </div>
      </Section>

      {/* 2 & 3. Compilation & JIT */}
      <Section number="2" title="Compilation & JIT (Just-In-Time)">
        <p>After parsing, the engine prepares the code for execution. Modern JavaScript is <strong>both interpreted and compiled</strong>.</p>
        <ImportantBox title="The JIT Compilation Paradigm">
          <p className="mb-2"><strong>JIT means:</strong> JavaScript code is compiled while the program is running.</p>
          <p>Instead of compiling everything before execution like traditional languages, JS engines compile and optimize code during runtime. This makes JavaScript faster, smarter, and highly optimized.</p>
        </ImportantBox>

        <h4 className="text-lg font-bold text-foreground mt-8 mb-4">Internal Flow of Modern JS Engine</h4>
        <div className="flex flex-col items-center bg-background p-6 rounded-xl border border-border text-center font-mono text-sm max-w-sm mx-auto shadow-inner">
          <div className="px-4 py-2 border border-border bg-card rounded">JavaScript Code</div>
          <div className="my-1.5 text-muted-foreground">↓</div>
          <div className="px-4 py-2 border border-border bg-card rounded">Parser</div>
          <div className="my-1.5 text-muted-foreground">↓</div>
          <div className="px-4 py-2 border border-border bg-card rounded">AST</div>
          <div className="my-1.5 text-muted-foreground">↓</div>
          <div className="px-4 py-2 border border-primary/50 bg-primary/10 text-primary font-bold rounded">Bytecode / Intermediate Code</div>
          <div className="my-1.5 text-muted-foreground">↓</div>
          <div className="px-4 py-2 border border-border bg-card rounded">Execution</div>
          <div className="my-1.5 text-muted-foreground">↓</div>
          <div className="px-4 py-2 border border-warning/50 bg-warning/10 text-warning font-bold rounded">Hot Code Detection</div>
          <div className="my-1.5 text-muted-foreground">↓</div>
          <div className="px-4 py-2 border border-success/50 bg-success/10 text-success font-bold rounded">Optimized Machine Code</div>
        </div>

        <h4 className="text-lg font-bold text-foreground mt-10 mb-2">What is Bytecode?</h4>
        <p>Bytecode is an intermediate low-level instruction format. It is the middle layer between JavaScript code and machine code.</p>
        <CodeBlock code={`let x = 2 + 3;\n\n// Engine internally thinks:\nload number 2\nload number 3\nadd them\nstore result in x`} />
      </Section>

      {/* Execution Context & Scope */}
      <Section number="3" title="Execution Phase & Context">
        <h4 className="text-2xl font-bold mb-4">The Execution Phase</h4>
        <p className="text-muted-foreground mb-6">
          Once the code is ready, the engine starts executing it. This is where some of the most important JavaScript concepts come in: <strong>Execution Context, Call Stack, Memory Heap, Scope, Hoisting, and Closures.</strong> These are the real core of JavaScript internals.
        </p>

        <h4 className="text-xl font-bold text-foreground mt-8 mb-4">What is Execution Context?</h4>
        <p>Whenever JavaScript code runs, the engine creates an environment to execute that code. That environment is called an <strong>Execution Context</strong>. There are two main types:</p>
        <ul className="list-disc list-inside space-y-2 mb-6 bg-background border border-border p-4 rounded-lg inline-block">
          <li><strong>Global Execution Context</strong> (created first)</li>
          <li><strong>Function Execution Context</strong> (created on function call)</li>
        </ul>
        <CodeBlock code={`var name = "Mayank";\n\nfunction greet() {\n  var msg = "Hello";\n  console.log(msg);\n}\n\ngreet();`} />
        
        <h4 className="text-xl font-bold text-foreground mt-10 mb-4 flex items-center gap-2"><Play className="w-5 h-5"/>Two Phases of Execution Context</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-background border border-border p-6 rounded-xl relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <h5 className="font-bold text-primary mb-2">Phase 1: Memory Creation Phase</h5>
            <p className="text-sm">Before executing line by line, the engine allocates memory. Variables are set to <code>undefined</code>, and functions get full memory references.</p>
          </div>
          <div className="bg-background border border-border p-6 rounded-xl relative overflow-hidden flex flex-col">
             <div className="absolute top-0 left-0 w-1 h-full bg-success"></div>
            <h5 className="font-bold text-success mb-2">Phase 2: Code Execution Phase</h5>
            <p className="text-sm mb-4">Now code runs line by line. Variables cleanly receive their assigned values.</p>
            <CodeBlock code={`console.log(a); // Output: undefined\nvar a = 10;     // Now a = 10\n\nsayHi();        // Output: Hi\n\nfunction sayHi() {\n  console.log("Hi");\n}`} />
          </div>
        </div>
      </Section>

      {/* Hoisting & variables */}
      <Section number="4" title="Hoisting & Variables (var vs let vs const)">
        <p><strong>Hoisting</strong> is highly misunderstood. The correct explanation: During the memory creation phase, JavaScript allocates memory for variables and functions before code execution starts.</p>
        
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4 bg-background p-5 rounded-xl border border-border h-full flex flex-col">
            <h4 className="font-bold text-foreground text-lg border-b border-border pb-2">var</h4>
            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Gets memory allocated</li>
              <li>Initialized with <code className="bg-muted px-1.5 py-0.5 rounded text-primary">undefined</code></li>
              <li>Can be accessed before declaration</li>
            </ul>
            <CodeBlock code={`console.log(x); // Output: undefined\nvar x = 5;`} />
            <p className="text-sm text-muted-foreground mt-auto">Why? Because internally during memory phase: <code>x = undefined</code></p>
          </div>
          <div className="space-y-4 bg-background p-5 rounded-xl border border-border h-full flex flex-col">
            <h4 className="font-bold text-foreground text-lg border-b border-border pb-2">let and const</h4>
            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Memory is allocated</li>
              <li>NOT initialized immediately</li>
              <li>Stay inside <strong>Temporal Dead Zone (TDZ)</strong></li>
            </ul>
            <CodeBlock code={`console.log(a); // ReferenceError\nlet a = 10;`} />
            <p className="text-sm text-muted-foreground mt-auto">Why? Because <code>a</code> exists in memory, but is not initialized yet.</p>
          </div>
        </div>
      </Section>

      {/* Call Stack & Heap */}
      <Section number="5" title="Call Stack & Memory Heap">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <h4 className="text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-primary" />
              Call Stack
            </h4>
            <p className="mb-4">The Call Stack keeps track of which function is currently executing. It follows LIFO (Last In, First Out).</p>
            <CodeBlock code={`function one() { two(); }\nfunction two() { three(); }\nfunction three() { console.log("Done"); }\n\none();`} />
            <p className="text-sm mt-3 p-3 bg-destructive/10 text-destructive-foreground rounded-lg border border-destructive/20 mt-auto">
              <strong>Stack Overflow:</strong> If functions keep calling each other without stopping, the stack becomes full. (e.g., <code>RangeError: Maximum call stack size exceeded</code>).
            </p>
          </div>
          
          <div className="flex flex-col">
            <h4 className="text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <Box className="w-5 h-5 text-primary" />
              Memory Heap
            </h4>
            <p className="mb-4">Heap is a large memory area where JavaScript stores objects, arrays, and functions (complex data).</p>
            <CodeBlock code={`const user = {\n  name: "Mayank",\n  age: 25\n};`} />
            <p className="text-sm mt-3 p-3 bg-muted rounded-lg border border-border text-foreground mt-auto">
              <strong>Stack vs Heap:</strong> Stack holds primitives and references. Heap holds the actual objects/arrays dynamically.
            </p>
          </div>
        </div>
      </Section>

      {/* Advanced Scope */}
      <Section number="6" title="Scope, Lexical Environment & Closures">
        <div className="space-y-8">
          <div className="bg-background p-6 rounded-xl border border-border">
            <h4 className="text-xl font-bold text-foreground mb-3">Scope & Lexical Environment</h4>
            <p><strong>Scope</strong> decides where a variable can be accessed.</p>
            <CodeBlock code={`let globalVar = "I am global";\n\nfunction test() {\n  let localVar = "I am local";\n  console.log(globalVar);\n  console.log(localVar);\n}\n\ntest();\nconsole.log(localVar); // ReferenceError`} />
            
            <p className="mt-6 border-t border-border pt-4"><strong>Lexical Environment</strong> means JavaScript functions remember the place where they were created.</p>
            <CodeBlock code={`function outer() {\n  let a = 10;\n  function inner() {\n    console.log(a);\n  }\n  inner();\n}\n\nouter(); // Outputs 10`} />
          </div>

          <div className="bg-background p-6 rounded-xl border border-border border-l-4 border-l-primary">
            <h4 className="text-xl font-bold text-foreground mb-3">Closures</h4>
            <p>A closure is created when a function remembers variables from its outer scope even after the outer function has finished execution.</p>
            <CodeBlock code={`function outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    console.log(count);\n  };\n}\n\nconst counter = outer();\ncounter(); // 1\ncounter(); // 2`} />
            <p className="mt-4 text-sm text-foreground/80 p-4 bg-muted/50 rounded-lg">
              Normally <code>outer()</code> should finish and its memory should be removed. But because the returned <code>inner()</code> function is still using <code>count</code>, JS keeps that variable alive!
            </p>
          </div>
        </div>
      </Section>

      {/* Garbage Collection */}
      <Section number="7" title="Garbage Collection & Optimization" icon={Trash2}>
        <p className="mb-6">JavaScript automatically cleans unused memory. This is Garbage Collection, mostly running on a <strong>Mark and Sweep</strong> algorithm.</p>
        
        <div className="bg-background rounded-xl p-6 border border-border mb-8 shadow-sm">
          <h4 className="font-bold text-foreground mb-4 border-b border-border pb-2">Mark and Sweep</h4>
          <ol className="list-decimal list-inside space-y-3 mb-4">
            <li><strong className="text-primary">Mark:</strong> Engine checks which objects are still reachable.</li>
            <li><strong className="text-destructive">Sweep:</strong> Engine removes everything that is unreachable.</li>
          </ol>
          <CodeBlock code={`let a = { name: "test" };\na = null; \n// Now the object has no reference, so it can be garbage collected.`} />
        </div>

        <h4 className="text-xl font-bold text-foreground mb-4">Optimization & De-optimization</h4>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-5 bg-success/10 border border-success/20 rounded-xl flex flex-col">
            <h5 className="font-bold text-success mb-2 flex items-center gap-2"><Zap className="w-4 h-4"/>Optimization (Inline Caching)</h5>
            <p className="text-sm text-success-foreground mb-4">Frequently used predictable code gets highly optimized.</p>
            <CodeBlock code={`function add(a, b) {\n  return a + b;\n}\n\nadd(1, 2);\nadd(5, 10);\nadd(100, 200);\n// Engine optimizes this for numbers!`} />
            <p className="text-sm text-success-foreground mt-auto">Keeping object structures (Hidden Classes) consistent also helps.</p>
          </div>
          <div className="p-5 bg-destructive/10 border border-destructive/20 rounded-xl flex flex-col">
            <h5 className="font-bold text-destructive mb-2 flex items-center gap-2"><Trash2 className="w-4 h-4"/>De-optimization</h5>
            <p className="text-sm text-destructive-foreground mb-4">If code becomes unpredictable, engines throw away the optimized code.</p>
            <CodeBlock code={`add("Hi", 2); // Sudden string breaks optimization!`} />
            <p className="text-sm text-destructive-foreground mt-4 mb-2">Changing object shapes also hurts:</p>
            <CodeBlock code={`const user = {};\nuser.name = "A";\nuser.age = 20;\ndelete user.age; // Bad pattern!`} />
          </div>
        </div>
      </Section>

      {/* Engine vs Runtime */}
      <Section number="8" title="Engine vs Runtime">
        <ImportantBox title="This is very important to understand">
          <div className="grid sm:grid-cols-2 gap-8 mt-4">
            <div className="bg-background/50 p-4 rounded-xl border border-border">
              <h5 className="font-bold text-lg border-b border-foreground/20 pb-2 mb-3">⚙️ JavaScript Engine</h5>
              <ul className="list-disc list-inside text-sm space-y-2 opacity-90">
                <li>Parsing & Compilation</li>
                <li>Execution</li>
                <li>Memory Allocation & Garbage Collection</li>
              </ul>
            </div>
            <div className="bg-background/50 p-4 rounded-xl border border-border">
              <h5 className="font-bold text-lg border-b border-foreground/20 pb-2 mb-3">🌐 Runtime Environment</h5>
              <p className="text-sm mb-3">Provides extra features like:</p>
              <ul className="list-disc list-inside text-sm space-y-2 opacity-90">
                <li><code>setTimeout</code>, <code>fetch</code></li>
                <li>DOM</li>
                <li>Web APIs & Event Loop</li>
              </ul>
            </div>
          </div>
        </ImportantBox>
        <CodeBlock code={`setTimeout(() => {\n  console.log("Hi");\n}, 1000);\n\n// setTimeout is NOT part of JS engine! It's provided by browser runtime.`} />
        <p className="text-center font-bold text-primary mt-6 text-xl bg-primary/10 py-4 rounded-xl">
          Engine runs JavaScript.<br/>Runtime provides extra tools around it.
        </p>
      </Section>

    </div>
  );
}
