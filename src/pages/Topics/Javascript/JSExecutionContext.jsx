import React from "react";
import { Play, Activity } from "lucide-react";

export default function JSExecutionContext() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-4 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
          <Play className="w-4 h-4" />
          <span>Advanced JavaScript</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          The Execution Context
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The fundamental environment where your JavaScript code actually runs.
        </p>
      </header>

      <section className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">The Execution Phase</h2>
        <p className="text-muted-foreground mb-6">
          Once the code is ready, the engine starts executing it. This is where some of the most important JavaScript concepts come in: <strong>Execution Context, Call Stack, Memory Heap, Scope, Hoisting, and Closures.</strong> These are the real core of JavaScript internals.
        </p>
        <h3 className="text-xl font-bold mb-4 mt-8 pt-4 border-t border-border">What is Execution Context?</h3>
        <p className="text-muted-foreground mb-6">
          Whenever JavaScript code runs, the engine creates an environment to execute that code. That environment is called an <strong>Execution Context</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-background border border-border rounded-xl">
            <h4 className="font-bold text-lg mb-2 text-primary">Global Execution Context</h4>
            <p className="text-sm text-muted-foreground">The engine creates this first. It registers top-level variables and functions natively before anything runs.</p>
          </div>
          <div className="p-4 bg-background border border-border rounded-xl">
            <h4 className="font-bold text-lg mb-2 text-warning">Function Execution Context</h4>
            <p className="text-sm text-muted-foreground">Every single function call creates a brand new execution context entirely unique to that function invocation.</p>
          </div>
        </div>
        
        <pre className="bg-muted p-4 rounded-xl text-sm border border-border font-mono mb-8"><code>{`var name = "Mayank";

function greet() {
  var msg = "Hello";
  console.log(msg);
}

greet(); // Spawns an entirely new Function Execution Context!`}
</code></pre>

        <h3 className="text-xl font-bold mb-4">The Two Phases of Execution Context</h3>
        <p className="text-muted-foreground mb-6">Every single execution context operates universally in two completely segregated phases.</p>

        <div className="space-y-6">
          <div className="border border-border/50 bg-background p-6 rounded-xl relative overflow-hidden shadow-inner">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <h4 className="font-bold text-blue-500 mb-2">Phase 1: Memory Creation Phase</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Before running line-by-line, the engine aggressively skims the entire script and explicitly allocates memory required for variables and function definitions.
            </p>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>Variables declared with `var` are assigned the value <code>undefined</code>.</li>
              <li>Function blocks copy their true exact definitions into memory.</li>
            </ul>
          </div>

          <div className="border border-border/50 bg-background p-6 rounded-xl relative overflow-hidden shadow-inner flex flex-col">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
            <h4 className="font-bold text-green-500 mb-2">Phase 2: Code Execution Phase</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Now code runs line by line. Variables cleanly receive their assigned values, and functions trigger execution natively block-by-block.
            </p>
            <pre className="bg-muted p-3 pb-0 rounded-lg text-xs border border-border font-mono mt-auto"><code>{`console.log(a); // Phase 2 reads: undefined
var a = 10;     // Phase 2 assigns: a = 10

sayHi();        // Phase 2 executes sayHi function block

function sayHi() {
  console.log("Hi"); // Phase 2 prints 'Hi'
}`}
</code></pre>
          </div>
        </div>
      </section>
    </div>
  );
}
