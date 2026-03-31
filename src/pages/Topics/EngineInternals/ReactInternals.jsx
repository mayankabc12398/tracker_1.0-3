import React from "react";
import { Combine, Clock, Cpu, Monitor } from "lucide-react";

export default function ReactInternals() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-4 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-sm font-medium">
          <Cpu className="w-4 h-4" />
          <span>Core Library Architecture</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          React Internals Foundation
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The three discrete layers that power the React ecosystem: Scheduler, Reconciler, and Renderer.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Scheduler */}
        <div className="col-span-1 border border-border bg-card rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-transform duration-300">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">1. The Scheduler</h3>
          <p className="text-sm text-muted-foreground">
            Determines <strong>when</strong> work should be done. It handles prioritizing tasks, interrupting low-priority tasks (like rendering large lists) to handle high-priority tasks (like user typing input). Uses the concept of Time Slicing.
          </p>
        </div>

        {/* Reconciler */}
        <div className="col-span-1 border border-border bg-card rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-transform duration-300">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
            <Combine className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">2. The Reconciler</h3>
          <p className="text-sm text-muted-foreground">
            Determines <strong>what</strong> changed. This is React Fiber. It computes the diff between the old virtual tree and the new virtual tree. It creates a list of "effects" (mutations to be applied) but doesn't apply them itself.
          </p>
        </div>

        {/* Renderer */}
        <div className="col-span-1 border border-border bg-card rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-transform duration-300">
          <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
            <Monitor className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">3. The Renderer</h3>
          <p className="text-sm text-muted-foreground">
            Executes the mutations. Once the Reconciler has computed the changes, the Renderer (e.g., <code>react-dom</code> for web or <code>react-native</code> for iOS/Android) flushes those changes to the actual host environment's UI.
          </p>
        </div>
      </div>

      <section className="bg-background border border-border rounded-xl p-8 mt-8">
        <h2 className="text-2xl font-bold mb-4">Why Split Them Up?</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
          <p>
            By isolating the <strong>Reconciler</strong> from the <strong>Renderer</strong>, the React team achieved "Write Once, Render Anywhere". The core diffing logic (React Fiber) is agnostic of the environment.
          </p>
          <p>
            When you use <code>&lt;div&gt;</code>, the Reconciler just knows it's a host component type. It passes the final payload to <code>react-dom</code> which calls <code>document.createElement('div')</code>. If it passed it to <code>react-three-fiber</code>, it would create a 3D mesh instead!
          </p>
        </div>
      </section>

    </div>
  );
}
