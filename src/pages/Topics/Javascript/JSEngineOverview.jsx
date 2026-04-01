import React from "react";
import { Cpu, Activity } from "lucide-react";

export default function JSEngineOverview() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-4 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Cpu className="w-4 h-4" />
          <span>Engine Internals</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          What is a JavaScript Engine?
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The brain that converts developer code into machine execution.
        </p>
      </header>

      <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          A JavaScript Engine is a program that reads, understands, compiles, and executes JavaScript code. Its sole job is to translate human-readable JavaScript into instructions the computer can run.
        </p>
        
        <h3 className="text-xl font-bold mb-4">Major JavaScript Engines</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-background border border-border rounded-xl text-center shadow-sm">
            <h4 className="font-bold text-foreground text-lg text-primary">V8</h4>
            <p className="text-sm border-t border-border/50 pt-2 mt-2">Chrome & Node.js</p>
          </div>
          <div className="p-4 bg-background border border-border rounded-xl text-center shadow-sm">
            <h4 className="font-bold text-foreground text-lg text-orange-500">SpiderMonkey</h4>
            <p className="text-sm border-t border-border/50 pt-2 mt-2">Firefox</p>
          </div>
          <div className="p-4 bg-background border border-border rounded-xl text-center shadow-sm">
            <h4 className="font-bold text-foreground text-lg text-blue-500">JavaScriptCore</h4>
            <p className="text-sm border-t border-border/50 pt-2 mt-2">Safari</p>
          </div>
        </div>
      </section>

      <section className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 shadow-sm">
        <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
          <Activity className="w-6 h-6" />
          Overall Working Flow
        </h3>
        <p className="mb-4 text-muted-foreground">Whenever JavaScript code runs, the engine generally follows these standard steps:</p>
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
      </section>

    </div>
  );
}
