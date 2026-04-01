import React from "react";
import { Combine, Activity, Globe, CodepenIcon } from "lucide-react";

export default function JSEngineVsRuntime() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-4 border-b border-border pb-6 text-center">
        <div className="inline-flex mx-auto items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Combine className="w-4 h-4" />
          <span>Architecture</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Engine vs Runtime
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          The ultimate fundamental distinction every single advanced JavaScript developer absolutely must strictly understand.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
        
        {/* Engine Column */}
        <div className="bg-card border-2 border-border/60 hover:border-primary/40 rounded-3xl p-6 md:p-8 shadow-lg transition-colors flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10"></div>
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
            <CodepenIcon className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-foreground">The JS Engine</h2>
          <p className="text-muted-foreground mb-6">
            The naked, isolated execution compiler software. It has absolutely zero concept of timers, files, or screens natively.
          </p>
          
          <h3 className="font-bold text-sm tracking-widest uppercase text-muted-foreground mb-4">Core Responsibilities</h3>
          <ul className="space-y-4 mb-4 mt-auto">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>Parsing & JIT Compilation</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>Execution via <strong>Call Stack</strong></span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>Memory Allocation via <strong>Heap</strong></span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>Garbage Collection Operations</span>
            </li>
          </ul>
        </div>

        {/* Runtime Column */}
        <div className="bg-card border-2 border-border/60 hover:border-success/40 rounded-3xl p-6 md:p-8 shadow-lg transition-colors flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-bl-[100px] -z-10"></div>
          <div className="w-14 h-14 bg-success/10 rounded-2xl flex items-center justify-center mb-6">
            <Globe className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-foreground">The Runtime Environment</h2>
          <p className="text-muted-foreground mb-6">
            The overall wrapper housing the naked engine. Browsers and Node.js are incredibly robust runtimes providing custom external features globally mapped explicitly.
          </p>
          
          <h3 className="font-bold text-sm tracking-widest uppercase text-muted-foreground mb-4">Runtime Injections</h3>
          <ul className="space-y-4 mb-4 mt-auto">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              <span><strong>Web APIs:</strong> <code>document</code>, <code>fetch</code>, timers</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              <span>The Event Loop</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              <span>Microtask / Callback Queues</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              <span>C++ APIs (File system in Node)</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="bg-background rounded-2xl p-6 border border-border mt-8 text-center text-lg max-w-2xl mx-auto shadow-inner">
        <p className="font-bold italic">
          "The Engine runs your code execution aggressively. The specific Runtime uniquely dictates entirely what features your engine actually has globally available to natively call."
        </p>
      </div>

    </div>
  );
}
