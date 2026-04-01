import React from "react";
import { ArrowUpCircle, Info } from "lucide-react";

export default function Hoisting() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-4 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-sm font-medium">
          <ArrowUpCircle className="w-4 h-4" />
          <span>Advanced JavaScript</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Hoisting Deep-Dive
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The most misunderstood concept of JavaScript engine execution.
        </p>
      </header>

      <section className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">What Actually is Hoisting?</h2>
        <div className="p-4 bg-muted/50 border border-border rounded-xl mb-6 flex gap-4">
          <Info className="w-6 h-6 shrink-0 text-primary mt-1" />
          <p className="text-sm">
            <strong>The Myth:</strong> People commonly say "Variables and functions physically move to the top of the file." This is totally false. <br className="my-2"/>
            <strong>The Reality:</strong> During the <em>Memory Creation Phase</em>, JavaScript uniquely allocates memory for variables and functions <em>before</em> code execution actively begins.
          </p>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-4 border-b border-border pb-2">The Engine Rules</h3>
        
        <div className="space-y-8 mt-6">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="bg-background border border-border p-5 rounded-xl h-full shadow-inner">
              <h4 className="font-bold text-lg mb-2 text-orange-500 border-b border-border pb-2">var Keywords</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 mt-4">
                <li>Memory is allocated immediately.</li>
                <li>They are initialized forcibly with <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">undefined</code>.</li>
                <li>As a result, they can be queried or referenced before declaration mapping without crashing the app.</li>
              </ul>
            </div>
            
            <pre className="bg-muted p-4 rounded-xl text-sm border border-border font-mono h-full self-stretch"><code>{`console.log(x);

var x = 5;

// Output: undefined
// Why? Because internally during
// memory phase: x = undefined.
`}</code></pre>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="bg-background border border-border p-5 rounded-xl h-full shadow-inner">
              <h4 className="font-bold text-lg mb-2 text-primary border-b border-border pb-2">let & const Keywords</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 mt-4">
                <li>Memory is indeed fiercely reserved for them.</li>
                <li>However, they are <strong>NOT automatically initialized</strong> with undefined.</li>
                <li>They are trapped in the <strong>Temporal Dead Zone (TDZ)</strong> until code execution actually reaches their explicit exact line.</li>
              </ul>
            </div>
            
            <pre className="bg-muted p-4 rounded-xl text-sm border border-border font-mono h-full self-stretch"><code>{`console.log(a);

let a = 10;

// Output: ReferenceError!
// Why? 'a' physically exists in memory,
// but it hasn't survived the TDZ.
`}</code></pre>
          </div>
        </div>

      </section>
    </div>
  );
}
