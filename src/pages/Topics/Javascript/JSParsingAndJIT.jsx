import React from "react";
import { Zap, Code, Layers } from "lucide-react";

export default function JSParsingAndJIT() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-4 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Layers className="w-4 h-4" />
          <span>Engine Internals</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Parsing, AST, and JIT Compilation
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          How modern engines process source code and compile it on the fly.
        </p>
      </header>

      {/* Parsing Segment */}
      <section className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Code className="w-6 h-6 text-primary" />
          1. Parsing & Tokenization
        </h2>
        <p className="text-muted-foreground mb-4">
          Parsing is when the engine reads your JavaScript code and attempts to structure and understand it. If it spots a syntax error (like `let = 10;`), it instantly throws a <strong>SyntaxError</strong>.
        </p>
        <div className="space-y-4 mt-6">
          <div className="p-4 bg-background border border-border rounded-xl">
            <h4 className="font-bold mb-2">Tokenization (Lexical Analysis)</h4>
            <p className="text-sm text-muted-foreground mb-3">The code is broken down into small, digestible pieces called tokens.</p>
            <pre className="bg-muted p-3 rounded-lg text-sm border border-border"><code>{`// Tokens for: let a = 10;
let
a
=
10
;`}</code></pre>
          </div>
          <div className="p-4 bg-background border border-border rounded-xl">
            <h4 className="font-bold mb-2">AST (Abstract Syntax Tree)</h4>
            <p className="text-sm text-muted-foreground">
              Following tokenization, the engine creates a highly-structured tree mapping out the code's logical flow. It helps the engine definitively know: "this is a variable declaration", "the name is a", etc.
            </p>
          </div>
        </div>
      </section>

      {/* JIT Compilation */}
      <section className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-warning" />
          2. Compilation & JIT
        </h2>
        <div className="p-4 bg-warning/10 border-l-4 border-warning rounded-r-xl mb-6 text-warning-foreground">
          <p><strong>Is JS interpreted or compiled?</strong> Modern JavaScript is <em>both</em> interpreted and compiled.</p>
        </div>
        <p className="text-muted-foreground mb-6">
          Older models were purely interpreted. But modern engines like V8 use <strong>Just-In-Time (JIT) Compilation</strong>. This means code is compiled and optimized dynamically while the program is actually running, making JavaScript exceptionally fast.
        </p>

        <h3 className="font-bold text-lg mb-3">The JIT Pipeline</h3>
        <div className="flex flex-col items-center bg-background p-6 rounded-xl border border-border text-center font-mono text-sm max-w-sm mx-auto shadow-inner">
          <div className="px-4 py-2 border border-border bg-card rounded">JavaScript Code</div>
          <div className="my-1 text-muted-foreground">↓</div>
          <div className="px-4 py-2 border border-border bg-card rounded">Parser → AST</div>
          <div className="my-1 text-muted-foreground">↓</div>
          <div className="px-4 py-2 border border-primary/50 bg-primary/10 text-primary font-bold rounded">Bytecode / Intermediate Code</div>
          <div className="my-1 text-muted-foreground">↓</div>
          <div className="px-4 py-2 border border-border bg-card rounded">Execution Phase</div>
          <div className="my-1 text-muted-foreground">↓</div>
          <div className="px-4 py-2 border border-warning/50 bg-warning/10 text-warning font-bold rounded">Hot Code Profiling</div>
          <div className="my-1 text-muted-foreground">↓</div>
          <div className="px-4 py-2 border border-success/50 bg-success/10 text-success font-bold rounded">Optimized Machine Code</div>
        </div>

        <h3 className="font-bold text-lg mt-8 mb-3">What is Bytecode?</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Bytecode is the intermediate layer between your JavaScript code and raw machine code instructions. It's an instruction set that the engine explicitly understands.
        </p>
        <pre className="bg-muted p-4 rounded-xl text-sm border border-border"><code>{`let x = 2 + 3;

// Engine's internal bytecode representation:
load number 2
load number 3
add them
store result in x`}</code></pre>
      </section>
    </div>
  );
}
