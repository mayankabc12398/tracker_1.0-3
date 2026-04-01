import React from "react";
import { Database, Server, AlertTriangle } from "lucide-react";

export default function JSMemoryManagement() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-4 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium">
          <Database className="w-4 h-4" />
          <span>Advanced JavaScript</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Call Stack vs Memory Heap
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Where does your data and function logic perfectly reside as code triggers?
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <section className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Server className="w-6 h-6 text-primary" />
            The Call Stack
          </h2>
          <p className="text-muted-foreground mb-4">
            The Call Stack is an aggressive data structure strictly used by the JS Engine to trace its literal location inside massive execution webs.
          </p>
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-2 mb-6">
            <li>Strictly handles <strong>LIFO (Last In, First Out)</strong> formatting.</li>
            <li>Tracks Function Contexts heavily.</li>
            <li>Stores structurally simple <strong>Primitive Values</strong> (Strings, Integers, Booleans) natively inside the execution wrappers.</li>
          </ul>
          
          <pre className="bg-muted p-4 pb-0 rounded-xl text-sm border border-border font-mono mt-auto"><code>{`function one() { two(); }
function two() { three(); }
function three() { console.log('Done'); }

one(); 
// Pushes Global -> one -> two -> three. 
// Once three finishes, starts popping off.`}</code></pre>
        </section>

        <section className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Database className="w-6 h-6 text-warning" />
            The Memory Heap
          </h2>
          <p className="text-muted-foreground mb-4">
            The Heap is literally a massive sprawling unstructured memory area dynamically allocated strictly for highly complex architectures.
          </p>
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-2 mb-6">
            <li>Tracks volatile arrays and dynamic objects.</li>
            <li>Stores pure function blocks structurally.</li>
            <li>Passed heavily by references. (The stack holds the pointer ID, the heap holds the massive payload).</li>
          </ul>

          <pre className="bg-muted p-4 pb-0 rounded-xl text-sm border border-border font-mono mt-auto"><code>{`const user = {
  name: "Mayank",
  age: 25
};
// user reference ID => Resides loosely in Stack
// The actual Object data => Resides widely inside Heap

let a = 10; 
// Primitive => Resides natively directly in Stack`}</code></pre>
        </section>
      </div>

      <section className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 md:p-8 shadow-sm">
        <h3 className="text-xl font-bold text-destructive mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" />
          Stack Overflow
        </h3>
        <p className="text-muted-foreground mb-4">
          Because JavaScript runs entirely on a single thread inside a unified stack, if functions routinely call each other recursively without a guaranteed stop condition—the Call Stack will rapidly hit maximum node limits and explode.
        </p>
        <pre className="bg-background p-4 pb-0 rounded-xl text-sm border border-border font-mono shadow-inner text-destructive"><code>{`function endlessLoop() {
  endlessLoop();
}

endlessLoop(); // Throw: RangeError: Maximum call stack size exceeded.`}</code></pre>
      </section>
    </div>
  );
}
