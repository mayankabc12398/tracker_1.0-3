import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

export function CustomSelect({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedValue = options.find((opt) => opt === value || opt?.value === value);
  const displayLabel = typeof selectedValue === "object" ? selectedValue.label : selectedValue;

  return (
    <div className="relative w-full sm:w-48" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-11 w-full items-center justify-between rounded-lg border border-input bg-background/60 backdrop-blur-md px-3.5 py-2 text-sm text-foreground shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] focus:outline-none focus:ring-2 focus:ring-primary/30 hover:border-primary/40 transition-all duration-300"
      >
        <span className="truncate font-medium">{displayLabel || "Select..."}</span>
        <ChevronDown className={`h-4 w-4 opacity-50 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180 text-primary opacity-100' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-[calc(100%+8px)] left-0 z-50 w-full min-w-[12rem] overflow-hidden rounded-xl border border-border/80 bg-background/95 text-popover-foreground shadow-2xl backdrop-blur-3xl"
          >
            <div className="p-1.5 max-h-60 overflow-y-auto">
              {options.map((option) => {
                const optValue = typeof option === "object" ? option.value : option;
                const optLabel = typeof option === "object" ? option.label : option;
                const isSelected = value === optValue;

                return (
                  <button
                    key={optValue}
                    onClick={() => {
                      onChange(optValue);
                      setIsOpen(false);
                    }}
                    className={`relative flex w-full cursor-pointer select-none items-center rounded-md py-2 pl-3 pr-9 text-sm outline-none transition-all duration-200
                      hover:bg-primary/10 hover:text-primary 
                      ${isSelected ? 'bg-primary border-transparent text-primary-foreground font-semibold shadow-md' : 'text-foreground/80'}
                    `}
                  >
                    <span className="block truncate">{optLabel}</span>
                    {isSelected && (
                      <span className="absolute inset-y-0 right-3 flex items-center text-primary-foreground">
                        <Check className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
