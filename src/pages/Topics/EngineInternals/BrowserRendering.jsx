import React from "react";
import { Monitor, Paintbrush, Activity } from "lucide-react";

export default function BrowserRendering() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-4 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-info/10 text-info text-sm font-medium">
          <Monitor className="w-4 h-4" />
          <span>Web Performance</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Browser Rendering Pipeline
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The Critical Rendering Path (CRP): How pixels actually get painted to the screen.
        </p>
      </header>

      <section className="space-y-6">
        <p className="text-foreground/90 leading-relaxed text-lg">
          The Critical Rendering Path is the sequence of steps the browser goes through to convert HTML, CSS, and JavaScript into actual pixels on the screen.
        </p>

        <div className="relative border-l-2 border-primary/30 pl-8 ml-4 space-y-8">
          
          <div className="relative">
            <span className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-primary text-primary font-bold">
              1
            </span>
            <h3 className="text-xl font-bold mb-2">DOM & CSSOM Creation</h3>
            <p className="text-muted-foreground">
              The browser parses HTML to create the <strong>DOM</strong> (Document Object Model) and parses CSS to create the <strong>CSSOM</strong> (CSS Object Model). These are two independent trees.
            </p>
          </div>

          <div className="relative">
            <span className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-primary text-primary font-bold">
              2
            </span>
            <h3 className="text-xl font-bold mb-2">Render Tree</h3>
            <p className="text-muted-foreground">
              The DOM and CSSOM are merged to form the Render Tree. It contains only the nodes required to render the page (e.g., <code>&lt;span style="display: none"&gt;</code> is excluded).
            </p>
          </div>

          <div className="relative">
            <span className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-warning text-warning font-bold">
              3
            </span>
            <h3 className="text-xl font-bold mb-2">Layout (Reflow)</h3>
            <p className="text-muted-foreground">
              The browser calculates the exact x/y coordinates and pixel sizes of every node based on the viewport size. This is computationally expensive.
            </p>
          </div>

          <div className="relative">
            <span className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-success text-success font-bold">
              4
            </span>
            <h3 className="text-xl font-bold mb-2">Paint & Compositing</h3>
            <p className="text-muted-foreground">
              <strong>Paint:</strong> Filling in pixels (colors, shadows, text). <br/>
              <strong>Composite:</strong> Drawing the layers onto the screen in the correct Z-index order, often accelerated by the GPU.
            </p>
          </div>

        </div>
      </section>
      
      <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-xl mt-8">
        <h4 className="font-bold flex items-center gap-2 text-destructive mb-2">
          <Activity className="w-5 h-5" />
          Performance Warning
        </h4>
        <p className="text-sm text-foreground/80">
          Triggering <strong>Layout</strong> recalculations (by reading/writing properties like <code>offsetHeight</code> or changing geometry) forces the entire pipeline to re-run. Stick to changing <code>transform</code> and <code>opacity</code> to only trigger <strong>Compositing</strong>!
        </p>
      </div>

    </div>
  );
}
