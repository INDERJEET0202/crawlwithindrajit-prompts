"use client";
import { useState } from "react";

/** Category filter chips + grid. Cards are rendered on the server and passed in as children. */
export default function Library({ categories, children }) {
  const [active, setActive] = useState("all");

  return (
    <>
      {categories.length > 1 && (
        <div className="filters" role="tablist" aria-label="Filter prompts">
          {["all", ...categories].map(c => (
            <button
              key={c}
              className={`chip${active === c ? " is-active" : ""}`}
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
      )}
      <div className="grid" id="promptGrid" data-filter={active}>
        {children}
      </div>
      {/* hide cards whose category doesn't match; the "more drops" card only shows on All */}
      <style>{active === "all" ? "" : `#promptGrid .card:not([data-cat="${active.replace(/"/g, "")}"]) { display: none; }`}</style>
    </>
  );
}
