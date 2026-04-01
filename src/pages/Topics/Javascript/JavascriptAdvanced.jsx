import React from "react";
import { Link2, Trash2, Zap, AlertTriangle, Combine, Workflow, ChefHat, Play, CheckCircle2 } from "lucide-react";

// Helper components consistent with our premium UI/UX standard
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

const ImportantBox = ({ title, type = "primary", icon: Icon = Play, children }) => {
  const colors = {
    warning: "bg-warning/10 border-warning text-warning-foreground",
    primary: "bg-primary/10 border-primary cursor-default text-foreground",
    success: "bg-success/10 border-success text-success-foreground",
    destructive: "bg-destructive/10 border-destructive text-destructive-foreground"
  };
  
  return (
    <div className={`p-5 border-l-4 rounded-r-xl my-6 ${colors[type]}`}>
      {title && <h4 className="font-bold flex items-center gap-2 mb-2"><Icon className="w-4 h-4"/>{title}</h4>}
      <div className="opacity-90">{children}</div>
    </div>
  );
};

export default function JavascriptAdvanced() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <header className="space-y-4 border-b border-border pb-8 mb-10 text-center animate-in fade-in zoom-in-95 duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
          <Workflow className="w-4 h-4" />
          <span>Advanced Engine Architecture</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
          JavaScript Advanced & Flow
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Closures, Garbage Collection, V8 Optimizations, and the Full Mental Model.
        </p>
      </header>

      {/* 1. Closures */}
      <Section title="Closures" icon={Link2}>
        <p>Closures are securely built on top of <strong>Lexical Scope</strong>.</p>
        
        <CodeBlock code={`function outer() {\n  let count = 0;\n\n  return function inner() {\n    count++;\n    console.log(count);\n  };\n}\n\nconst counter = outer();\n\ncounter(); // Output: 1\ncounter(); // Output: 2`} />
        
        <ImportantBox title="What happened internally?" type="primary" icon={CheckCircle2}>
          <p className="mb-2">Normally <code>outer()</code> should finish and its memory should be removed natively via GC.</p>
          <p>But because the returned <code>inner()</code> function is heavily still using <code>count</code>, JavaScript intentionally keeps that specific variable alive inside memory.</p>
          <p className="mt-2 font-bold text-primary">This is explicitly called a closure.</p>
        </ImportantBox>
        
        <div className="border border-primary/20 bg-primary/5 p-5 rounded-xl shadow-sm">
          <h4 className="font-bold border-b border-primary/20 pb-2 mb-2 text-foreground">Closure Definition:</h4>
          <p className="text-sm">A closure is natively created when a function comprehensively remembers variables from its outer scope <strong>even after</strong> the outer function has fundamentally finished execution.</p>
        </div>
      </Section>

      {/* 2. Garbage Collection */}
      <Section title="Garbage Collection & Mark/Sweep" icon={Trash2}>
        <p>JavaScript automatically cleans heavily unused memory allocations. This automated process is firmly called <strong>Garbage Collection (GC)</strong>. Its strict job: Remove memory that is no longer needed.</p>

        <CodeBlock code={`let user = { name: "Mayank" };\nuser = null;\n\n// Now the object is firmly no longer being referenced.\n// So the engine can completely remove it from memory later.`} />

        <h4 className="text-xl font-bold mt-8 mb-4">The Mark and Sweep Algorithm</h4>
        <p className="mb-4">Most modern JS engines conceptually use the <strong>Mark and Sweep</strong> pipeline.</p>
        
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-background border border-border p-5 rounded-xl">
            <h5 className="font-bold text-primary flex items-center gap-2 mb-2"><CheckCircle2 className="w-4 h-4"/> Step 1 → Mark</h5>
            <p className="text-sm">The engine heavily checks which objects are still structurally reachable, and which variables are actually still accessible from the global root.</p>
          </div>
          <div className="bg-background border border-border p-5 rounded-xl">
             <h5 className="font-bold text-destructive flex items-center gap-2 mb-2"><Trash2 className="w-4 h-4"/> Step 2 → Sweep</h5>
            <p className="text-sm">The engine natively removes everything that is logically unreachable. It literally sweeps the heap clean.</p>
          </div>
        </div>

        <ImportantBox title="Simple Concept:" type="success" icon={Zap}>
          Reachable memory stays. Unreachable memory gets cleaned.
        </ImportantBox>
      </Section>

      {/* 3. Optimization */}
      <Section title="V8 Optimization Details" icon={Zap}>
        <p>Modern JavaScript engines do not just cleanly execute code — they aggressively <strong>optimize</strong> it natively.</p>

        <div className="space-y-8">
          {/* General Optimization */}
          <div>
            <h5 className="font-bold text-lg mb-2 text-foreground">1. Predictive Optimization</h5>
            <CodeBlock code={`function add(a, b) {\n  return a + b;\n}\n\nadd(1, 2);\nadd(5, 10);\nadd(100, 200);`} />
            <p className="bg-muted p-4 rounded-xl text-sm border border-border">
              If the engine notices that this specific function is repeatedly called strictly with numbers, it dynamically optimizes it natively for immensely faster hardware execution. <br/>
              <strong>Simple line:</strong> Frequently used predictable code gets optimized.
            </p>
          </div>

          {/* Hidden Classes */}
          <div>
            <h5 className="font-bold text-lg mb-2 text-foreground">2. Hidden Classes / Inline Caching</h5>
            <p className="mb-2">This is a deeper V8 optimization concept targeting Objects specifically.</p>
            <CodeBlock code={`const user1 = { name: "A", age: 20 };\nconst user2 = { name: "B", age: 25 };`} />
            <p className="text-sm mb-4">Both objects share the heavily exact shape (<code>name</code>, <code>age</code>), so the engine aggressively optimizes pointer access.</p>
            
            <ImportantBox title="Bad Pattern Example:" type="destructive" icon={AlertTriangle}>
              <CodeBlock code={`const user = {};\nuser.name = "A";\nuser.age = 20;\ndelete user.age;\nuser.city = "Delhi";`} />
              <p className="mt-2 text-sm font-bold">This kind of changing object shape massively hurts execution optimization!</p>
              <p className="text-sm mt-1 border-t border-destructive/20 pt-2 text-foreground"><strong>Best Practice:</strong> Keep object structure strictly consistent for better optimization.</p>
            </ImportantBox>
          </div>

          {/* De-optimization */}
          <div>
             <h5 className="font-bold text-lg mb-2 text-foreground">3. De-optimization</h5>
             <p className="mb-2">Sometimes the engine securely optimizes code, but automatically destroys that optimization if the parameter payloads become unpredictable.</p>
             <CodeBlock code={`function add(a, b) {\n  return a + b;\n}\n\nadd(1, 2);\nadd(5, 10);\nadd("Hi", 2); // Suddenly a string!`} />
             <p className="bg-destructive/10 text-destructive-foreground p-4 rounded-xl text-sm border border-destructive/20">
              At first the engine rigorously thinks: "This is a number addition function". But later it natively receives a String. So the optimization algorithm permanently breaks and falls back to slow execution. <br/>
              <strong>Simple line:</strong> Unpredictable data types heavily reduce optimization routines.
            </p>
          </div>
        </div>
      </Section>

      {/* 4. Engine vs Runtime */}
      <Section title="Engine vs Runtime" icon={Combine}>
        <p className="font-bold text-lg mb-6">This is fundamentally very important to completely understand.</p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border border-border bg-background p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform">
            <h4 className="text-xl font-bold mb-4 text-primary pb-2 border-b border-border/50">JavaScript Engine</h4>
            <p className="text-sm text-muted-foreground mb-4">The core compiler specifically handles:</p>
            <ul className="space-y-2 text-sm font-medium">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/>Parsing</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/>Compilation</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/>Execution</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/>Memory Management</li>
            </ul>
          </div>
          
          <div className="border border-border bg-background p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform">
            <h4 className="text-xl font-bold mb-4 text-success pb-2 border-b border-border/50">Runtime Environment</h4>
            <p className="text-sm text-muted-foreground mb-4">The wrapper provides extra network features like:</p>
             <ul className="space-y-2 text-sm font-medium">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-success"/><code>setTimeout</code></li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-success"/><code>fetch</code></li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-success"/>DOM Manipulations</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-success"/>Web APIs & Event Loop</li>
            </ul>
          </div>
        </div>

        <CodeBlock code={`setTimeout(() => {\n  console.log("Hi");\n}, 1000);`} />
        
        <ImportantBox title="Important:" type="primary" icon={AlertTriangle}>
          <p className="mb-2"><code>setTimeout</code> is absolutely <strong>not</strong> directly part of the JS engine itself.</p>
          <p>It is exclusively provided by the <strong>browser runtime</strong> or <strong>Node.js runtime</strong> wrappers.</p>
          <p className="mt-4 font-bold p-3 bg-background border border-border rounded-lg text-center text-foreground">
            Engine severely runs JavaScript.<br/>Runtime broadly provides extra tools natively around it.
          </p>
        </ImportantBox>
      </Section>

      {/* 5. The Full Mental Model Pipeline */}
      <Section title="Full Mental Model — How JavaScript Really Works" icon={Workflow}>
        <p className="mb-8 text-lg">When JavaScript natively runs, this is the heavily detailed full internal journey.</p>
        
        <div className="relative border-l-2 border-primary/30 ml-4 md:ml-8 pl-6 md:pl-10 space-y-10">
          
          {[
            { step: "1", title: "JavaScript code enters the engine" },
            { step: "2", title: "The engine parses the code", sub: "tokenization → AST creation" },
            { step: "3", title: "The engine compiles the code", sub: "bytecode → intermediate instructions" },
            { step: "4", title: "Global Execution Context is dynamically created" },
            { step: "5", title: "Memory Creation Phase natively runs", sub: "variables are allocated → functions are stored → scope is heavily prepared" },
            { step: "6", title: "Code Execution Phase rigidly starts", sub: "code runs line by line → function calls happen → call stack is aggressively used" },
            { step: "7", title: "Objects and arrays are definitively stored in heap memory" },
            { step: "8", title: "Unused memory is cleanly swept by garbage collection" },
            { step: "9", title: "Frequently used code is inherently optimized by the engine logic" }
          ].map((item, idx) => (
             <div key={idx} className="relative">
              <span className="absolute -left-[45px] md:-left-[61px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-md ring-4 ring-background">
                {item.step}
              </span>
              <h4 className="font-bold text-lg text-foreground mb-1">{item.title}</h4>
              {item.sub && <p className="text-sm text-muted-foreground bg-muted inline-block px-3 py-1 rounded-full">{item.sub}</p>}
            </div>
          ))}
        </div>

        {/* The Kitchen Analogy */}
        <div className="mt-16 bg-gradient-to-br from-primary/10 via-background to-warning/5 border border-border rounded-2xl p-6 md:p-8 shadow-md">
           <h4 className="text-2xl font-bold flex items-center gap-3 mb-6 text-foreground pb-4 border-b border-border/50">
             <ChefHat className="w-8 h-8 text-warning" />
             Super Simple Analogy
           </h4>
           <p className="text-lg font-medium mb-6">Imagine the JavaScript Engine is precisely like a smart commercial kitchen 🍽️</p>
           
           <div className="bg-background rounded-xl border border-border p-5 mb-6">
             <p className="font-mono text-sm mb-4"><code>JavaScript code === Order slip</code><br/><code>makeTea();</code></p>
             <h5 className="font-bold text-muted-foreground mb-3 text-sm tracking-wider uppercase">Engine’s Core Work Pipeline:</h5>
             <ul className="space-y-3">
               <li className="flex items-center justify-between border-b border-border pb-2">
                 <span>📝 Read the order</span> <span className="font-bold text-primary">Parsing</span>
               </li>
               <li className="flex items-center justify-between border-b border-border pb-2">
                 <span>🥘 Prepare ingredients</span> <span className="font-bold text-success">Memory Creation</span>
               </li>
               <li className="flex items-center justify-between border-b border-border pb-2">
                 <span>🔥 Cook the item</span> <span className="font-bold text-warning">Execution</span>
               </li>
               <li className="flex items-center justify-between border-b border-border pb-2">
                 <span>⚡ Speed up repeated dishes</span> <span className="font-bold text-purple-500">Optimization</span>
               </li>
               <li className="flex items-center justify-between">
                 <span>🧼 Clean unused cooking items</span> <span className="font-bold text-destructive">Garbage Collection</span>
               </li>
             </ul>
           </div>
           
           <h5 className="text-center font-bold text-lg">Simple Understanding:</h5>
           <p className="text-center text-muted-foreground text-lg">
             JavaScript engine fundamentally reads, prepares, runs, optimizes, and cleans your code perfectly execution by execution.
           </p>
        </div>

      </Section>
    </div>
  );
}
