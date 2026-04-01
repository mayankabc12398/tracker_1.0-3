import React from "react";
import { Link, Eye, Code2 } from "lucide-react";

export default function JSCoreConcepts() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-4 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 text-sm font-medium">
          <Link className="w-4 h-4" />
          <span>Advanced JavaScript</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Scope, Lexical Environment & Closures
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The defining architectural pillars of JavaScript application logic.
        </p>
      </header>

      <div className="space-y-12">
        <section className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Eye className="w-6 h-6 text-primary" />
            1. What is Scope?
          </h2>
          <p className="text-muted-foreground mb-4">
            Scope explicitly defines precisely where a variable can officially be requested or accessed safely.
          </p>
          <pre className="bg-muted p-4 rounded-xl text-sm border border-border font-mono relative overflow-hidden group">
            <code>{`let globalVar = "I am global";

function test() {
  let localVar = "I am local";
  console.log(globalVar); // Success! Can reach up to global.
}

console.log(localVar); // Rejects strictly: ReferenceError!`}</code>
          </pre>
          <div className="mt-4 p-4 rounded-xl bg-background border border-border border-l-4 border-l-primary">
            <p className="text-sm font-medium">Simple line: Scope explicitly decides and enforces the strict visibility boundaries of variables.</p>
          </div>
        </section>

        <section className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Link className="w-6 h-6 text-indigo-500" />
            2. Lexical Environment (Static Scope)
          </h2>
          <p className="text-muted-foreground mb-4">
            This is an advanced engine mechanism. JavaScript operates purely on <strong>Lexical Scoping</strong>. This means when a JavaScript engine parses logic, all isolated inner functions explicitly "remember" the exact hierarchical scope they were physically <em>written</em> inside.
          </p>
          <pre className="bg-muted p-4 rounded-xl text-sm border border-border font-mono">
            <code>{`function outer() {
  let a = 10;

  function inner() { 
    console.log(a); // Look up works because inner was written inside outer statically.
  }
}`}</code>
          </pre>
        </section>

        <section className="border-2 border-primary/20 bg-card rounded-2xl p-6 md:p-8 shadow-md">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-primary" />
            3. Closures
          </h2>
          <p className="text-muted-foreground mb-6">
            Closures are the ultimate endgame of lexical mapping. When a child function is arbitrarily returned outside its parent logic, the V8 engine aggressively detects that and safely wraps the targeted memory environment—ensuring variables never face garbage collection.
          </p>
          <pre className="bg-muted text-foreground p-4 rounded-xl text-sm border border-border font-mono">
            <code>{`function outer() {
  let count = 0;

  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer(); // 'outer' fully completes and resolves...

counter(); // Outputs: 1. (The variable 'count' survived death!)`}</code>
          </pre>
          <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-sm font-medium text-foreground">
              A closure is formally triggered when a function fiercely remembers variables from its outer scope—even infinitely after the parent outer function has firmly finished its total execution cycle.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
