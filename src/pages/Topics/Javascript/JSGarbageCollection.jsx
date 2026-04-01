import React from "react";
import { Trash2, Zap, AlertCircle } from "lucide-react";

export default function JSGarbageCollection() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-4 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium">
          <Trash2 className="w-4 h-4" />
          <span>Engine Internals</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Garbage Collection & Optimization
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          How modern V8 handles infinite dynamic memory loops efficiently.
        </p>
      </header>

      <section className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Trash2 className="w-6 h-6 text-emerald-500" />
          1. Garbage Collection (Mark & Sweep)
        </h2>
        <p className="text-muted-foreground mb-6">
          Manually destroying massive object variables would be infinitely complex. JS autonomously frees unused memory dynamically natively using the <strong>Garbage Collector (GC)</strong>. Moden GC uses variations of the "Mark and Sweep" algorithm.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-5 bg-background border border-border rounded-xl">
            <h4 className="font-bold text-lg mb-2 text-foreground">Phase 1: Mark</h4>
            <p className="text-sm text-foreground/80">The engine scans fiercely starting directly from root (Global Window object) recursively scanning deeply into absolutely all attached references inside the memory heap. If a memory node is physically attainable or touchable, it aggressively "marks" it safe.</p>
          </div>
          <div className="p-5 bg-background border border-border rounded-xl">
            <h4 className="font-bold text-lg mb-2 text-destructive">Phase 2: Sweep</h4>
            <p className="text-sm text-foreground/80">The engine iterates fiercely through the entire heap payload. Any block fundamentally lacking a "Mark" flag is utterly wiped cleanly, natively dropping payload space radically.</p>
          </div>
        </div>

        <pre className="bg-muted p-4 rounded-xl text-sm border border-border font-mono relative">
          <code>{`let a = { name: "test" };

a = null; // Unhooks reference. Node is literally disconnected.

// The next 'Mark & Sweep' loop will seamlessly obliterate {name: "test"} and purge it!`}</code>
        </pre>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="bg-card border border-success/20 rounded-2xl p-6 shadow-sm flex flex-col">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-success">
            <Zap className="w-6 h-6" />
            V8 Optimization
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            Modern JavaScript engines do not just execute code — they also optimize it. Frequently used predictable code gets fiercely optimized.
          </p>
          <pre className="bg-muted p-3 rounded-lg text-xs border border-border font-mono mb-4"><code>{`function add(a, b) {
  return a + b;
}

add(1, 2);
add(5, 10);
add(100, 200); // Engine notices repetitive numbers and optimizes!`}</code></pre>

          <p className="p-3 bg-success/10 text-success rounded-lg text-sm border border-success/20 mt-auto">
            <strong>Hidden Classes / Inline Caching:</strong> Objects sharing strict property architecture order are grouped and accelerated natively.
          </p>
          <pre className="bg-muted p-3 mt-4 rounded-lg text-xs border border-border font-mono"><code>{`// Predictable Architecture: FAST
const user1 = { name: "A", age: 20 }
const user2 = { name: "B", age: 25 }`}</code></pre>
        </section>

        <section className="bg-card border border-destructive/20 rounded-2xl p-6 shadow-sm flex flex-col">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-destructive">
            <AlertCircle className="w-6 h-6" />
            De-optimization
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            Sometimes the engine optimizes code, but later removes that optimization if the code becomes unpredictable. Unpredictable data types reduce optimization!
          </p>
          <pre className="bg-muted p-3 rounded-lg text-xs border border-border font-mono mb-4"><code>{`function add(a, b) { return a + b; }
add(1, 2);
add(5, 10);
add("Hi", 2); // Suddenly a string! Optimization breaks!`}</code></pre>
          <p className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm border border-destructive/20 mt-auto">
             <strong>Warning:</strong> Refrain absolutely from aggressively mutating object schemas deeply using randomized deletion methods!
          </p>
          <pre className="bg-muted p-3 mt-4 rounded-lg text-xs border border-border font-mono"><code>{`// Shape Shifting Object Mutating: SLOW 
const user = {};
user.name = "A";
user.age = 20;
delete user.age;
user.city = "Delhi"; // Kills optimization!`}</code></pre>
        </section>
      </div>
    </div>
  );
}
