import React from "react";
import { Link2, Map, Home, Target, Layers, Play, CheckCircle2, FileJson, Coffee, Eye, AlertTriangle } from "lucide-react";

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
    success: "bg-success/10 border-success text-emerald-800 dark:text-emerald-300",
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

export default function LexicalEnvironment() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <header className="space-y-4 border-b border-border pb-8 mb-10 text-center animate-in fade-in zoom-in-95 duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
          <Map className="w-4 h-4" />
          <span>Core JavaScript</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Lexical Environment & Scope Chain
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Ye topic clear ho gaya toh variable resolution, nested functions, closures, aur scopes bilkul crystal clear ho jayenge!
        </p>
      </header>

      {/* 1, 2, 3, 4. Lexical Env */}
      <Section title="Lexical Environment Kya Hota Hai?" icon={Layers}>
        <ImportantBox title="Simple Definition" type="primary" icon={CheckCircle2}>
          <strong className="text-primary">Lexical Environment</strong> = variables + functions ka environment + outer reference.
        </ImportantBox>
        <p>Jab bhi JavaScript me koi Execution Context banta hai, uske saath ek Lexical Environment bhi zaroor banta hai. Usme hote hain: Local variables, Function declarations, aur uske <strong>Outer Environment ka reference</strong>.</p>
        
        <h3 className="text-xl font-bold mt-6 mb-2 border-b border-border pb-2 text-foreground">Lexical ka Matlab Kya Hai?</h3>
        <p>Lexical ka matlab hota hai: <strong>Code me function/variable physically kaha likha hua hai.</strong></p>
        <div className="p-4 bg-warning/10 text-warning-foreground border border-warning/20 rounded-xl mt-3 text-sm font-medium">
          JavaScript me scope run time pe nahi, balki code likhne ke place ke basis pe decide hota hai. Isliye JavaScript ko ek <strong>Lexically Scoped Language</strong> kehte hain.
        </div>

        <h3 className="text-xl font-bold mt-8 mb-2 text-foreground">Simple Example</h3>
        <CodeBlock code={`var a = 10;\n\nfunction outer() {\n  var b = 20;\n  console.log(a, b);\n}\n\nouter(); // Output: 10 20`} />
        <p className="text-sm bg-muted p-4 rounded border border-border">
          <strong>Yaha kya hua?</strong> <code>outer()</code> ke paas apna environment bhi hai (jaha <code>b</code> hai) aur bahar wale environment ka reference bhi hai (jaha <code>a</code> hai). Yehi Lexical Environment ka idea hai.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-2 border-t border-border pt-6 text-foreground">Lexical Environment ke 2 Main Parts:</h3>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-background border border-border p-5 rounded-xl shadow-sm">
            <h5 className="font-bold text-primary flex items-center gap-2 mb-2">1. Environment Record</h5>
            <p className="text-sm">Yaha strictly actual variables aur functions safely store hote hain.</p>
          </div>
          <div className="bg-background border border-border p-5 rounded-xl shadow-sm">
             <h5 className="font-bold text-success flex items-center gap-2 mb-2">2. Outer Reference</h5>
            <p className="text-sm">Yaha uske direct parent / bahar wale environment ka proper link attach hota hai.</p>
          </div>
        </div>
      </Section>

      {/* 5-9. Scopes */}
      <Section title="Scopes in JavaScript" icon={Target}>
        <p><strong>Scope</strong> ka seedha matlab hai: Variable ko actually kaha access kar sakte ho.</p>

        <div className="space-y-6 mt-6">
          <div className="border border-border p-5 rounded-xl bg-background shadow-sm hover:-translate-y-1 transition-transform">
            <h4 className="font-bold text-lg mb-2 text-primary">1. Global Scope</h4>
            <p className="text-sm mb-3">Jo variable sabse bahar declare hota hai, wo completely global scope me hota hai (har jagah se accessible).</p>
            <CodeBlock code={`var name = "Mayank";\nfunction greet() { console.log(name); }\ngreet(); // Output: Mayank`} />
          </div>

          <div className="border border-border p-5 rounded-xl bg-background shadow-sm hover:-translate-y-1 transition-transform">
            <h4 className="font-bold text-lg mb-2 text-warning">2. Function Scope</h4>
            <p className="text-sm mb-3">Jo variable exclusively function ke andar declare hota hai (jaise <code>var</code>), wo sirf wahi accessible hota hai.</p>
            <CodeBlock code={`function demo() {\n  var age = 25;\n}\ndemo();\nconsole.log(age); // ReferenceError`} />
          </div>

          <div className="border border-border p-5 rounded-xl bg-background shadow-sm hover:-translate-y-1 transition-transform relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-success"></div>
            <h4 className="font-bold text-lg mb-2 text-success">3. Block Scope</h4>
            <p className="text-sm mb-3">Jo variable <code>{`{ ... }`}</code> blocks me strictly <code>let</code> ya <code>const</code> se banaya jaye, wo completely isolate ho jata hai block me.</p>
            <CodeBlock code={`{\n  let city = "Delhi";\n  const country = "India";\n}\nconsole.log(city); // ReferenceError`} />
            <div className="mt-3 bg-destructive/10 p-3 rounded border border-destructive/20 text-sm font-medium text-destructive-foreground">
               ⚠️ Important: Agar block ke andar <code>var x = 10;</code> likha hai, toh wo global/function scope me leak kar jayega! <code>var</code> is NOT heavily block-scoped.
            </div>
          </div>
        </div>
      </Section>

      {/* 10-14. Scope Chain */}
      <Section title="The Scope Chain" icon={Link2}>
        <ImportantBox title="Sabse Important Cheez" type="success" icon={Play}>
          <strong>Scope Chain</strong> = JavaScript ka practically variable dhundhne ka exact path.
        </ImportantBox>
        
        <p>Jab JS ko koi variable basically current scope me nahi milta, toh wo:</p>
        <ol className="list-decimal list-inside ml-4 space-y-2 text-muted-foreground my-4 font-medium">
           <li>Pehle current scope me dhundhta hai</li>
           <li>Fir outer scope me search karta hai</li>
           <li>Fir uske outer me jata hai</li>
           <li>Aur aise hi explicitly global level tak float karta hai!</li>
        </ol>

        <h3 className="text-xl font-bold mt-8 mb-4 border-b border-border pb-2 text-foreground">Visual Flow (Chain)</h3>
        <CodeBlock code={`var a = 10;\n\nfunction first() {\n  var b = 20;\n  function second() {\n    var c = 30;\n    console.log(a, b, c);\n  }\n  second();\n}\nfirst();`} />
        
        <div className="bg-background border border-border p-5 rounded-xl w-full max-w-sm mx-auto shadow-sm mt-6 text-center font-mono text-sm space-y-2">
           <div className="p-2 border border-primary/50 rounded bg-primary/5">second() scope</div>
           <div className="text-primary text-lg font-bold">↓</div>
           <div className="p-2 border border-primary/50 rounded bg-primary/5">first() scope</div>
           <div className="text-primary text-lg font-bold">↓</div>
           <div className="p-2 border border-success/50 rounded bg-success/10 font-bold">global scope</div>
        </div>

        <ImportantBox title="The Golden Rule" type="warning" icon={AlertTriangle}>
          <p className="font-bold mb-1">JavaScript variable ko call hone ki jagah se nahi, balki LIKHE HONE (physically coded) ki jagah se dhundhta hai.</p>
          <p className="text-sm opacity-80">Ye line interviews me sabse commonly use hoti hai!</p>
        </ImportantBox>
      </Section>

      {/* 15-21. Shadowing & Tricky Rules */}
      <Section title="Variable Shadowing & Tricky Rules" icon={Eye}>
        
        <h4 className="text-xl font-bold mb-3 text-foreground">Variable Shadowing</h4>
        <p className="text-sm mb-4">Jab explicitly inner scope ka variable exactly apne outer scope ke identically named variable ko completely cover/hide kar deta hai, usse <strong>Variable Shadowing</strong> kehte hain.</p>
        <CodeBlock code={`var name = "Global";\n\nfunction show() {\n  var name = "Local"; // SHADOWING HAPPENED HERE\n  console.log(name);\n}\n\nshow(); // Output: Local\nconsole.log(name); // Output: Global`} />

        <div className="my-8 pt-8 border-t border-border">
          <h4 className="text-xl font-bold mb-4 text-destructive flex items-center gap-2"><AlertTriangle className="w-5 h-5"/> Most Asked Interview Confusion</h4>
          <p className="font-medium mb-3"><strong>Question:</strong> Agar function kisi aur jagah call ho raha hai, toh kya uska scope technically change hota hai??</p>
          <p className="font-bold text-destructive text-lg mb-4">❌ Nahi!</p>
          <p className="text-sm mb-4 bg-muted p-3 rounded border border-border">Scope strictly function ke directly call hone se nahi, uske specifically <strong>likhe hone ki jagah se</strong> decide hota hai!</p>
          <CodeBlock code={`var x = 1;\n\nfunction a() {\n  function b() {\n    console.log(x);\n  }\n  b();\n}\n\nfunction c() {\n  var x = 100;\n  a(); // Calls a(), but B is physically written inside A.\n}\n\nc(); // Output: 1`} />
          <p className="text-sm mt-3 text-muted-foreground font-medium">Kyun 1 aaya, 100 nahi? Kyuki <code>b()</code> originally <code>a()</code> ke andar strictly likha hua hai, <code>c()</code> ke andar nahi! So <code>b()</code> ka lexical parent inherently <code>a()</code> hai.</p>
        </div>
      </Section>

      {/* 22-25. Closures & Final Recap */}
      <Section title="The Closure Connection & Recap" icon={FileJson}>
        <p>Aage wale closures topic ka pura architecture exactly isi foundation pe purely based hai.</p>
        <CodeBlock code={`function outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    console.log(count);\n  };\n}\n\nconst counter = outer();\ncounter(); // 1\ncounter(); // 2`} />
        <p className="text-sm bg-success/10 text-emerald-800 dark:text-emerald-300 p-4 rounded-xl border border-success/20 mt-4 mb-8">
          <strong>Kyun bacha var?</strong> Kyuki heavily <code>inner()</code> ko consistently apna perfectly intact lexical parent accurately yaad hai. Matlab <code>outer()</code> ka scope totally destroy ho gaya, lekin technically uska fully loaded lexical environment memory pipeline me absolutely safely bacha raha. <strong>Yehi closure hai.</strong>
        </p>

        <h3 className="text-2xl font-bold mt-10 mb-6 flex items-center gap-3 border-b border-border pb-3">
          <Home className="w-8 h-8 text-primary"/>
          Ek Super Simple Analogy
        </h3>
        <p className="font-medium text-lg mb-6">Soch har function purely ek ghar hai 🏠</p>
        
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-background border border-border p-4 rounded-xl text-center shadow-sm">
            <span className="text-3xl block mb-2">🏠</span>
            <h5 className="font-bold text-primary">Current Scope</h5>
            <p className="text-sm text-muted-foreground">Apna khud ka ghar</p>
          </div>
          <div className="bg-background border border-border p-4 rounded-xl text-center shadow-sm">
            <span className="text-3xl block mb-2">🏘️</span>
            <h5 className="font-bold text-warning">Outer Scope</h5>
            <p className="text-sm text-muted-foreground">Parent ka ghar</p>
          </div>
          <div className="bg-background border border-border p-4 rounded-xl text-center shadow-sm">
            <span className="text-3xl block mb-2">🏙️</span>
            <h5 className="font-bold text-success">Global Scope</h5>
            <p className="text-sm text-muted-foreground">Pura mohalla</p>
          </div>
        </div>
        
        <div className="bg-muted p-5 rounded-xl border border-border text-center text-sm md:text-base font-medium">
          Jab function ko koi variable specifically chahiye hota hai: <br/>
          Pehle apne ghar me dhundhta hai → fir parent ke ghar me → fir specifically mohalla me!<br/>
          <strong className="text-primary mt-2 inline-block">Ye hi perfectly Scope Chain hai 😄</strong>
        </div>

        <div className="mt-10 p-6 border-2 border-dashed border-primary/50 text-center rounded-2xl bg-background shadow-sm">
          <h4 className="font-bold text-xl mb-3 text-foreground">Final Conclusion</h4>
          <p className="text-muted-foreground leading-relaxed">
            Agar tu Ye 2 concepts deeply samajh gaya (Execution Context + Lexical Environment / Scope Chain), toh tu extremely easily inherently samajh payega:<br/>
            <span className="font-bold text-primary mt-3 inline-block">
              Hoisting • Closures • 'this' binding • Call Stacks • Block Variables • Shadowing
            </span>
          </p>
        </div>
        
      </Section>

    </div>
  );
}
