import React from "react";
import { Terminal, Layers, Cpu, Box, Zap, Activity, Play, Code, CheckCircle2, Bookmark, Lightbulb, Coffee, FileJson, ArrowRight, Target } from "lucide-react";

// Helper components consistent with the professional UI/UX theme
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
    destructive: "bg-destructive/10 border-destructive text-destructive-foreground",
    info: "bg-cyan-500/10 border-cyan-500 text-cyan-700 dark:text-cyan-400"
  };
  
  return (
    <div className={`p-5 border-l-4 rounded-r-xl my-6 ${colors[type]}`}>
      {title && <h4 className="font-bold flex items-center gap-2 mb-2"><Icon className="w-4 h-4"/>{title}</h4>}
      <div className="opacity-90">{children}</div>
    </div>
  );
};

export default function JavaScriptEngine() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <header className="space-y-4 border-b border-border pb-8 mb-10 text-center animate-in fade-in zoom-in-95 duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
          <Terminal className="w-4 h-4" />
          <span>Core JavaScript</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Execution Context
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          The ultimate guide to how JS actually runs under the hood. Memory, Threads, Scopes, and Hoisting.
        </p>
      </header>

      {/* 1 & 2 & 3. What is EC and Phases */}
      <Section title="Execution Context Kya Hota Hai?" icon={Box}>
        <p>Execution Context ka matlab hota hai: JavaScript engine ko code run karne ke liye jo environment chahiye hota hai, usse Execution Context kehte hain.</p>
        
        <ImportantBox title="Simple Language Me:" type="primary" icon={Lightbulb}>
          Jab bhi JavaScript code run hota hai, engine us code ko execute karne ke liye ek special <strong>box / environment</strong> banata hai. Us box ke andar hota hai:
          <ul className="list-disc list-inside mt-2 space-y-1 ml-2 text-sm md:text-base">
            <li>Variables kaha store honge</li>
            <li>Functions kaha store honge</li>
            <li>Code kis order me chalega</li>
            <li><code>this</code> kis value ko point karega</li>
          </ul>
        </ImportantBox>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4 border-b border-border pb-2">JavaScript Code Run Kaise Hota Hai?</h3>
        <p>Jab JavaScript engine koi file padhta hai, wo code ko line by line directly execute <strong>nahi</strong> karta. Wo pehle ek Execution Context banata hai aur phir code ko <strong>2 main phases</strong> me run karta hai:</p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-background border border-border p-6 rounded-xl shadow-sm">
            <h4 className="font-bold text-primary flex items-center gap-2 mb-3"><Layers className="w-5 h-5"/> Phase 1: Memory Creation</h4>
            <p className="text-sm text-muted-foreground mb-3">(Also called Creation Phase). Is phase me JavaScript engine:</p>
            <ul className="list-disc list-inside space-y-1 text-sm mb-4">
              <li>Variables ke liye memory reserve karta hai (assigns <code>undefined</code>)</li>
              <li>Function declarations ko poora memory me store karta hai</li>
              <li><code>this</code> ko assign karta hai</li>
            </ul>
            <p className="text-xs font-bold text-destructive bg-destructive/10 p-2 rounded">LEKIN is phase me actual code execute nahi hota. Sirf setup hota hai.</p>
          </div>
          
          <div className="bg-background border border-border p-6 rounded-xl shadow-sm">
             <h4 className="font-bold text-success flex items-center gap-2 mb-3"><Play className="w-5 h-5"/> Phase 2: Code Execution</h4>
            <p className="text-sm text-muted-foreground mb-3">Is phase me Code actually run hota hai:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Code line by line execute hota hai</li>
              <li>Variables ko actual values milti hain</li>
              <li>Functions call hote hain</li>
              <li>Expressions evaluate hote hain</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 4 & 5 & 6. Types of EC (GEC/FEC) */}
      <Section title="Types of Execution Context" icon={Layers}>
        <p>JavaScript me mainly 2 important execution contexts hote hain: <strong>Global (GEC)</strong> aur <strong>Function (FEC)</strong>.</p>
        
        <h4 className="text-xl font-bold bg-primary/10 text-primary inline-block px-4 py-1.5 rounded-lg mb-4 mt-6">1. Global Execution Context (GEC)</h4>
        <p>Jab bhi koi JS file run hoti hai, sabse pehle ek GEC banta hai. Ye poori file/program ke liye hota hai. Isme Global variables, Global functions, aur <code>this</code> keyword hota hai (Browser me <code>this = window</code>).</p>
        
        <div className="bg-muted p-5 rounded-xl border border-border mt-6">
          <h5 className="font-bold text-foreground mb-4">GEC ke andar generally 2 major cheeze hoti hain:</h5>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded bg-background flex items-center justify-center shrink-0 shadow-sm font-bold text-primary">1</div>
              <div>
                <h6 className="font-bold text-foreground">Memory Component (Variable Environment)</h6>
                <p className="text-sm">Yaha variables aur functions store hote hain.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded bg-background flex items-center justify-center shrink-0 shadow-sm font-bold text-success">2</div>
              <div>
                <h6 className="font-bold text-foreground">Code Component (Thread of Execution)</h6>
                <p className="text-sm">Yaha actual code line-by-line execute hota hai.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 7-11. Step by Step Example */}
      <Section title="Step-by-Step Flow Breakdown" icon={Activity}>
        <p>Chalo is code ko deeply samjhte hain:</p>
        <CodeBlock code={`var a = 10;\nvar b = 20;\n\nfunction sum() {\n  var x = 5;\n  var y = 10;\n  console.log(x + y);\n}\n\nconsole.log(a);\nsum();\nconsole.log(b);`} />

        <div className="mt-8 space-y-6">
          <div className="border border-primary/30 p-5 rounded-xl bg-primary/5">
            <h5 className="font-bold text-lg mb-2 text-primary">Step 1: Memory Creation Phase (GEC)</h5>
            <p className="text-sm mb-3">JavaScript sabse pehle memory allocate karega. Memory me store hoga:</p>
            <div className="font-mono text-sm bg-background p-3 rounded border border-border shadow-inner">
              a: undefined<br/>
              b: undefined<br/>
              sum: function sum() {'{ ... }'}
            </div>
            <p className="mt-3 text-sm font-bold text-warning-foreground">⚠️ Dhyan de: <code>var</code> ko initially undefined milta hai, aur function declaration ko poora function hi memory me mil jata hai.</p>
          </div>

          <div className="border border-success/30 p-5 rounded-xl bg-success/5">
             <h5 className="font-bold text-lg mb-2 text-success">Step 2: Code Execution Phase (GEC)</h5>
             <p className="text-sm mb-3">Ab engine line by line code execute karega:</p>
             <ul className="space-y-2 text-sm bg-background p-3 rounded border border-border shadow-inner">
               <li><strong className="text-foreground">Line 1:</strong> <code>var a = 10;</code> (Ab a=10)</li>
               <li><strong className="text-foreground">Line 2:</strong> <code>var b = 20;</code> (Ab b=20)</li>
               <li><strong className="text-foreground">Line 3:</strong> <code>function sum()</code> (Already memory me tha, yaha ignore hoga)</li>
               <li><strong className="text-foreground">Line 4:</strong> <code>console.log(a);</code> (Output: 10)</li>
               <li><strong className="text-foreground">Line 5:</strong> <code>sum();</code> (🚨 Function call! Ye ek naya <strong>Function Execution Context</strong> banayega.)</li>
             </ul>
          </div>

          <div className="border border-warning/30 p-5 rounded-xl bg-warning/5">
             <h5 className="font-bold text-lg mb-2 text-warning-foreground">Step 3: Inside Function Execution Context (FEC)</h5>
             <p className="text-sm mb-3">Jab <code>sum()</code> call hua, uska apna alag Box banega. Bilkul GEC ki tarah, ye bhi 2 phases me chalta hai:</p>
             <div className="bg-background p-3 rounded border border-border shadow-inner text-sm space-y-2">
                <p><strong>Memory Phase:</strong> <code>x -{'>'} undefined</code>, <code>y -{'>'} undefined</code></p>
                <p><strong>Execution Phase:</strong> <code>x = 5</code>, <code>y = 10</code>, <code>console.log(15)</code> (Output: 15)</p>
             </div>
             <p className="mt-3 text-sm font-bold text-destructive">Function khatam hote hi uska execution context destroy/remove ho jata hai!</p>
          </div>
        </div>
      </Section>

      {/* 12, 13. Call Stack Flow */}
      <Section title="Call Stack Flow" icon={Layers}>
        <p>Execution Contexts ko JavaScript engine <strong>Call Stack</strong> me manage karta hai. Call Stack ek stack data structure hai (LIFO - Last In, First Out) jaha contexts push aur pop hote hain.</p>
        
        <CodeBlock code={`function first() { console.log("first"); }\nfunction second() { console.log("second"); }\n\nfirst();\nsecond();`} />
        
        <div className="bg-background border border-border p-5 rounded-xl w-full max-w-2xl mx-auto shadow-sm mt-6">
          <h4 className="font-bold text-center mb-4 border-b border-border pb-2 text-primary uppercase tracking-widest text-sm">Visual Stack Flow</h4>
          <div className="space-y-4 font-mono text-sm">
            <div className="flex items-center gap-3"><Badge>Step 1</Badge> <span>[ GEC ]</span> <span className="text-muted-foreground text-xs ml-auto">Program starts</span></div>
            <div className="flex items-center gap-3"><Badge color="success">Step 2</Badge> <span>[ GEC, first() ]</span> <span className="text-muted-foreground text-xs ml-auto">first() is called</span></div>
            <div className="flex items-center gap-3"><Badge>Step 3</Badge> <span>[ GEC ]</span> <span className="text-muted-foreground text-xs ml-auto">first() completes & pops</span></div>
            <div className="flex items-center gap-3"><Badge color="success">Step 4</Badge> <span>[ GEC, second() ]</span> <span className="text-muted-foreground text-xs ml-auto">second() is called</span></div>
            <div className="flex items-center gap-3"><Badge>Step 5</Badge> <span>[ GEC ]</span> <span className="text-muted-foreground text-xs ml-auto">second() completes & pops</span></div>
            <div className="flex items-center gap-3"><Badge color="destructive">Step 6</Badge> <span>[ ]</span> <span className="text-muted-foreground text-xs ml-auto">Program ends</span></div>
          </div>
        </div>
      </Section>

      {/* 17. Global vs Function Scope */}
      <Section title="Important Observation: Scopes" icon={Target}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 bg-background border border-border rounded-xl">
             <h4 className="font-bold text-primary mb-2">Global Variables:</h4>
             <p className="text-sm">Global Execution Context me rehte hain. Ye kahin se bhi access ho sakte hain.</p>
          </div>
          <div className="p-5 bg-background border border-border rounded-xl">
             <h4 className="font-bold text-destructive mb-2">Function Variables:</h4>
             <p className="text-sm">Sirf us function ke execution context me rehte hain. Context destroy hote hi variables khatam ho jate hain.</p>
          </div>
        </div>
        <CodeBlock code={`function demo() {\n  var x = 100;\n}\ndemo();\nconsole.log(x); // Output: ReferenceError: x is not defined`} />
        <p className="text-sm text-muted-foreground mt-2"><strong>Kyun?</strong> Kyuki <code>x</code> sirf <code>demo()</code> ke context me tha. Function khatam hote hi wo context destroy ho gaya.</p>
      </Section>

      {/* 18-21. Connections to concepts */}
      <Section title="Execution Context connects to EVERYTHING" icon={FileJson}>
        <div className="space-y-6">
          
          <div className="border border-border p-5 rounded-xl bg-background shadow-sm hover:border-primary/50 transition-colors">
            <h5 className="font-bold text-lg mb-2 text-foreground">1. Hoisting Connection</h5>
            <p className="text-sm text-muted-foreground mb-3">Memory Creation phase ke karan hi code actually hoist hota hai, chuki variables <code>undefined</code> se allocate ho chuke hote hain execute hone se pehle!</p>
            <CodeBlock code={`sayHello(); // Output: Hello\nfunction sayHello() { console.log("Hello"); }`} />
          </div>

          <div className="border border-border p-5 rounded-xl bg-background shadow-sm hover:border-primary/50 transition-colors">
            <h5 className="font-bold text-lg mb-2 text-foreground">2. 'this' Keyword Binding</h5>
            <p className="text-sm text-muted-foreground mb-3">Execution context banne par hi <code>this</code> ki value decide hoti hai.</p>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>Global Context me (Browser): <code>this = window</code></li>
              <li>Object Method me: <code>this</code> us object ko point karta hai jiske through function call hua.</li>
            </ul>
          </div>

          <div className="border border-border p-5 rounded-xl bg-background shadow-sm hover:border-primary/50 transition-colors">
            <h5 className="font-bold text-lg mb-2 text-foreground">3. Scope Chain & Closures</h5>
            <p className="text-sm text-muted-foreground mb-3">Execution Box me apne Lexical Environment ki details bhi hoti hai. Agar koi variable apne context me nahi milta, toh wo uske Outer reference (parent context) me check karta hai.</p>
            <CodeBlock code={`function outer() {\n  var count = 0;\n  return function inner() {\n    count++;\n    console.log(count);\n  };\n}\n// Yaha outer() destroy ho gaya, lekin inner() ne 'count' yaad rakha, \n// kyuki JS EC + Lexical environment maintain karta hai! (Closure)`} />
          </div>

        </div>
      </Section>

      {/* 22-26. Final Analogy & Notes */}
      <Section title="The Final Mental Models" icon={Coffee}>
        
        <ImportantBox title="Sabse Important Interview Line" type="success" icon={CheckCircle2}>
          <p className="mb-2">Execution Context is the environment in which JavaScript code is evaluated and executed.</p>
          <p className="font-bold mt-2">It firmly consists of:</p>
          <ul className="list-disc list-inside ml-2 mt-1">
            <li>Memory / Variable Environment</li>
            <li>Thread of Execution</li>
            <li><code>this</code> binding</li>
            <li>Scope / Lexical Environment</li>
          </ul>
        </ImportantBox>

        <h4 className="text-2xl font-bold mt-10 mb-4 border-b border-border pb-2 text-foreground">Ek Super Simple Analogy 🏢</h4>
        <div className="bg-gradient-to-br from-background to-primary/5 border border-primary/20 p-6 md:p-8 rounded-2xl shadow-md">
          <p className="font-medium text-lg mb-6">Soch JavaScript engine ek office hai.</p>
          
          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="text-3xl">🏢</div>
              <div>
                <h5 className="font-bold text-lg text-primary">Global Execution Context</h5>
                <p className="text-sm text-muted-foreground">Ye office ka main room hai. Sab yahi se shuru hota hai.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🚪</div>
              <div>
                <h5 className="font-bold text-lg text-warning">Function Execution Context</h5>
                <p className="text-sm text-muted-foreground">Jab bhi koi function call hota hai, uske liye ek temporary cabin banti hai. Us cabin me us function ke variables, uska kaam, aur uska <code>this</code> sab hota hai.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🧹</div>
              <div>
                <h5 className="font-bold text-lg text-destructive">Destroying Context</h5>
                <p className="text-sm text-muted-foreground">Kaam khatam hote hi → cabin hata di jaati hai (popped off stack). Bas yehi Execution Context hai!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 p-6 border-2 border-dashed border-primary/50 text-center rounded-2xl bg-background shadow-sm">
          <h4 className="font-bold text-xl mb-3 text-foreground">Final Conclusion</h4>
          <p className="text-muted-foreground leading-relaxed">
            Agar tu Execution Context deeply samajh gaya, toh ye saare topics bahut easy ho jayenge:<br/>
            <span className="font-bold text-primary mt-3 inline-block">
              Hoisting • Scope • Scope Chain • Lexical Env • Closures • 'this' • Call Stack • Event Loop
            </span>
          </p>
        </div>
      </Section>

    </div>
  );
}

// Small helper for Stack Flow visual
const Badge = ({ children, color = "primary" }) => {
  const map = {
    primary: "bg-primary text-primary-foreground",
    success: "bg-success text-success-foreground",
    destructive: "bg-destructive text-destructive-foreground"
  };
  return <span className={`px-2 py-0.5 rounded text-xs font-bold ${map[color]}`}>{children}</span>;
}
