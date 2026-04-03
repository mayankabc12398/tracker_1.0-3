import React from "react";
import { ArrowUpToLine, Clock, Target, Layers, Play, CheckCircle2, Bookmark, Lightbulb, GraduationCap, XCircle, AlertTriangle } from "lucide-react";

const Section = ({ number, title, icon: Icon, children }) => (
  <section className="mb-10 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border/50">
      {Icon && <Icon className="w-8 h-8 text-primary" />}
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
    success: "bg-success/10 border-success text-emerald-800 dark:text-emerald-300",
    destructive: "bg-destructive/10 border-destructive text-destructive-foreground",
  };
  return (
    <div className={`p-5 border-l-4 rounded-r-xl my-6 ${colors[type]}`}>
      {title && <h4 className="font-bold flex items-center gap-2 mb-2"><Icon className="w-4 h-4" />{title}</h4>}
      <div className="opacity-90">{children}</div>
    </div>
  );
};

export default function HoistinginJavaScript() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <header className="space-y-4 border-b border-border pb-8 mb-10 text-center animate-in fade-in zoom-in-95 duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
          <ArrowUpToLine className="w-4 h-4" />
          <span>Core JavaScript</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Hoisting & TDZ
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Clear the confusion around variables, let/const errors, and function expressions vs declarations!
        </p>
      </header>

      {/* 1. What is Hoisting */}
      <Section title="Hoisting Kya Hota Hai?" icon={ArrowUpToLine}>
        <ImportantBox title="Simple Definition" type="primary" icon={CheckCircle2}>
          Hoisting ka matlab hai JavaScript me declarations ka <strong>memory creation phase</strong> me pehle se available ho jana.
        </ImportantBox>
        <div className="bg-destructive/10 border border-destructive/20 text-destructive-foreground p-3 rounded-lg text-sm font-medium mt-2">
          ⚠️ <strong>Important:</strong> Hoisting ka matlab code physically upar move hona ❌ NAHI ❌ hota. Ye sirf Engine ka execution phase setup behavior hai.
        </div>

        <CodeBlock code={`console.log(a); // Output: undefined\nvar a = 10;`} />

        <p className="font-bold text-foreground mt-6 border-b border-border pb-2">Kyun hua aisa? Internal View:</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border border-border bg-background rounded-xl">
            <h4 className="text-sm font-bold text-warning mb-2 uppercase">1. Memory Phase</h4>
            <p className="font-mono text-sm">a -{'>'} undefined</p>
          </div>
          <div className="p-4 border border-border bg-background rounded-xl">
            <h4 className="text-sm font-bold text-success mb-2 uppercase">2. Execution Phase</h4>
            <p className="font-mono text-sm leading-relaxed">
              console.log(a); // undefined<br />
              a = 10;
            </p>
          </div>
        </div>
      </Section>

      {/* 2. TDZ and let/const */}
      <Section title="Temporal Dead Zone (TDZ)" icon={Clock}>
        <p>Log sochte hain sirf `var` hoist hota hai. <strong>Wrong!</strong> `var`, `let`, `const`, classes aur function declarations sab hoist hote hain. Lekin unka behavior alag hota hai.</p>

        <h4 className="font-bold text-xl mt-6">let aur const Hoisting</h4>
        <CodeBlock code={`console.log(a); // ✅ ReferenceError\nlet a = 5;`} />
        <p className="text-sm bg-muted p-3 rounded mt-2 border border-border mb-6">
          Log bolte hain "let hoist nahi hota". Ye <strong>half truth</strong> hai. Correct answer: <strong>let hoist hota hai, but initialize nahi hota!</strong> Wo TDZ ke andar chala jata hai.
        </p>

        <ImportantBox title="What is TDZ?" type="warning" icon={AlertTriangle}>
          <p><strong>Temporal Dead Zone (TDZ)</strong> wo time hota hai jab variable memory me toh hota hai, but use absolutely access nahi kar sakte. Ye strictly declaration line tak rehta hai.</p>
        </ImportantBox>

        <CodeBlock code={`{\n  // TDZ for 'a' starts here\n  console.log(a); // ❌ ReferenceError\n\n  let a = 10; // ✅ TDZ ends completely here!\n  \n  console.log(a); // Output: 10\n}`} />

        <h4 className="font-bold text-xl mt-8 mb-4">var vs let vs const Comparison</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border border-border p-4 bg-background rounded-xl shadow-sm hover:border-primary/50">
            <h5 className="font-bold text-lg text-primary border-b border-border pb-2 mb-3">var</h5>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>Hoist hota hai</li>
              <li>Memory me <code>undefined</code> milta hai</li>
              <li>Declare hone se pehle access allowed hai</li>
            </ul>
          </div>
          <div className="border border-border p-4 bg-background rounded-xl shadow-sm hover:border-warning/50">
            <h5 className="font-bold text-lg text-warning border-b border-border pb-2 mb-3">let</h5>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>Hoist hota hai</li>
              <li><code>uninitialized</code> rehta hai</li>
              <li><strong className="text-warning-foreground">TDZ me fansa hota hai</strong></li>
            </ul>
          </div>
          <div className="border border-border p-4 bg-background rounded-xl shadow-sm hover:border-destructive/50">
            <h5 className="font-bold text-lg text-destructive border-b border-border pb-2 mb-3">const</h5>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>Hoist hota hai, TDZ me rehta hai</li>
              <li><strong className="text-destructive">Declaration aur Assign</strong> ek saath karna compulsory hai! <code>const a; // SyntaxError</code></li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 3. Functions Overview */}
      <Section title="Function Declaration vs Expression" icon={Target}>

        <div className="space-y-6">
          <div className="bg-success/5 border border-success/30 p-5 rounded-xl">
            <h4 className="font-bold text-lg text-success mb-2 flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> 1. Function Declaration</h4>
            <p className="text-sm mb-3">Ye aggressively fully hoist hota hai. Memory phase yaha poora function block safely register kar leta hai.</p>
            <CodeBlock code={`sayHello(); // Output: Hello\n\nfunction sayHello() {\n  console.log("Hello");\n}`} />
          </div>

          <div className="bg-destructive/5 border border-destructive/30 p-5 rounded-xl">
            <h4 className="font-bold text-lg text-destructive mb-2 flex items-center gap-2"><XCircle className="w-5 h-5" /> 2. Function Expression</h4>
            <p className="text-sm mb-3">Yaha JS <code>sayHi</code> ko normal variable ki tarah hoist karta hai. Execution se pehle <code>sayHi</code> sirf <code>undefined</code> hota hai, poora function nahi!</p>
            <CodeBlock code={`sayHi(); // TypeError: sayHi is not a function\n\nvar sayHi = function() {\n  console.log("Hi");\n};`} />
            <p className="text-xs font-mono mt-2 opcaity-80 px-2">Kyun? Tu `undefined()` try kar raha hai call karne ka!</p>
          </div>

          <div className="bg-warning/5 border border-warning/30 p-5 rounded-xl">
            <h4 className="font-bold text-lg text-warning-foreground mb-2 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> 3. Arrow Functions with const</h4>
            <p className="text-sm mb-3">Arrow functions declared with let/const suffer from standard TDZ.</p>
            <CodeBlock code={`greet(); // ReferenceError: Cannot access before eval\n\nconst greet = () => {\n  console.log("Hello");\n};`} />
          </div>
        </div>
      </Section>

      {/* 4. Tricky Scope Overlaps */}
      <Section title="Hoisting in Scopes + Tricky Examples" icon={Layers}>
        <p>Hoisting sirf Global level par nahi, specifically <strong>Function execution contexts</strong> ke andar local level par bhi explicitly form hoti hai.</p>

        <CodeBlock code={`var a = 100;\n\nfunction test() {\n  console.log(a);\n  var a = 10;\n}\n\ntest(); // Output: undefined`} />
        <ImportantBox title="The Shadowing Trap" type="warning" icon={AlertTriangle}>
          Logically people expect `100`. But function ke andar `var a` create hone se ek naya LOCAL context start hua. Us limited memory phase me `a  undefined` set hua. Ye pure `Shadowing + Hoisting combo` effect hai!
        </ImportantBox>

        <h4 className="font-bold text-xl mt-8 mb-3">The Most Dangerous Block Confusion</h4>
        <CodeBlock code={`var x = 1;\n\nfunction foo() {\n  console.log(x); // Output: undefined\n  if (true) {\n    var x = 2;\n  }\n}\nfoo();`} />
        <p className="text-sm bg-muted border border-border p-3 rounded mt-2"><strong>Kyun?</strong> Kyuki heavily <code>var</code> specifically block scoped (if/for inside) nahi hota. Wo direct outer Function block me fully hoist ho jata hai as <code>undefined</code> setup.</p>

        <CodeBlock code={`let y = 1;\n\nfunction fooLet() {\n  console.log(y); // Output: 1\n  if (true) {\n    let y = 2;\n  }\n}\nfooLet();`} />
        <p className="text-sm bg-success/10 text-emerald-800 dark:text-emerald-300 border border-success/20 p-3 rounded mt-2">Aur let use karne pe perfect outer `1` pick hoga, kyuki `let y = 2` tightly sirf `if()` structure ke andar limited raha.</p>
      </Section>

      {/* 5. Recap and Analogy */}
      <Section title="Final Recap & Analogy" icon={GraduationCap}>

        <ImportantBox title="Real Interview Definition" type="success" icon={CheckCircle2}>
          <p className="font-medium font-serif italic border-l-4 border-success pl-4 ml-2 my-2">"In JavaScript, variable and function declarations are securely registered inside memory inherently before code block execution rigorously begins. This conceptual behavior is universally called hoisting."</p>
        </ImportantBox>

        <div className="bg-gradient-to-br from-background to-primary/5 border border-primary/20 p-6 md:p-8 rounded-2xl shadow-md mt-10">
          <h4 className="text-2xl font-bold flex items-center gap-3 mb-6 text-foreground pb-4 border-b border-border/50">
            <GraduationCap className="w-8 h-8 text-primary" />
            Ek Super Simple Analogy 🏫
          </h4>
          <p className="font-medium text-lg mb-6">Soch JavaScript ek strictly dedicated school teacher hai 👨‍🏫</p>

          <div className="space-y-6">
            <div className="bg-background border border-border p-5 rounded-xl flex gap-4">
              <span className="text-3xl">🪑</span>
              <div>
                <h5 className="font-bold text-primary mb-1">var</h5>
                <p className="text-sm text-muted-foreground">Teacher likh deta hai: "Haan ye student definitely registered hai, but permanently abhi clearly seat number unknown (<code>undefined</code>) hai!"</p>
              </div>
            </div>

            <div className="bg-background border border-border p-5 rounded-xl flex gap-4">
              <span className="text-3xl">🎒</span>
              <div>
                <h5 className="font-bold text-warning mb-1">let / const</h5>
                <p className="text-sm text-muted-foreground">Teacher legally likhta hai: "Student completely officially registered hai memory pool me, but inherently seat abhi tak heavily assign nahi hui!"</p>
                <p className="text-sm font-bold text-warning-foreground mt-2 bg-warning/10 p-2 rounded">Aur deeply jab tak physically seat assign nahi hoti, tum usse interact / use selectively nahi kar sakte. Ye strict waiting period basically TDZ hai 😄</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 p-6 border-2 border-dashed border-primary/50 text-center rounded-2xl bg-background shadow-sm">
          <h4 className="font-bold text-xl mb-3 text-foreground">Final Conclusion</h4>
          <p className="text-muted-foreground leading-relaxed">
            Agar tu tightly ye 3 topics deeply totally samajh gaya:
            <br />
            <span className="font-bold text-primary mt-3 inline-block">
              Execution Contexts • Lexical Environments / Scope Chains • Hoisting / TDZ
            </span>
            <br /><br />
            Toh ab fundamentally JavaScript internal compiler engine ka 100% unbreakable strong mental base perfectly conceptualize ho gaya hai!
          </p>
        </div>
      </Section>
    </div>
  );
}
