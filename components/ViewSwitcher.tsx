"use client";

import { useEffect, useState } from "react";
import MolecularCanvas from "@/components/graph/MolecularCanvas";
import SimpleView from "@/components/simple/SimpleView";

export type ViewMode = "graph" | "simple";

const STORAGE_KEY = "pv-view-mode";
const COOKIE_KEY = "pv-view-mode";
const MOBILE_QUERY = "(max-width: 768px)";

function persist(mode: ViewMode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // localStorage can throw in private-browsing/blocked-storage contexts —
    // the cookie fallback below still lets the next page load pick the
    // right default, so this is safe to ignore.
  }
  // Mirrored to a cookie (not just localStorage) so app/page.tsx can read
  // the choice server-side on the next visit/reload and render the right
  // view immediately, instead of flashing the wrong one before JS runs.
  document.cookie = `${COOKIE_KEY}=${mode}; path=/; max-age=31536000; samesite=lax`;
}

export default function ViewSwitcher({ initialView }: { initialView: ViewMode }) {
  const [view, setView] = useState<ViewMode>(initialView);

  // One-time mobile correction: if the visitor has never explicitly chosen
  // a view (no stored preference), and the viewport turns out to be narrow,
  // switch them to Simple View — the graph's fit-to-screen camera math
  // shrinks node text to near-illegible sizes below ~768px, and there's no
  // touch/pinch/pan support to compensate (a deliberate scope decision, see
  // MolecularCanvas.tsx). Runs once on mount only, so rotating a tablet or
  // resizing a desktop window mid-session never yanks a user out of the
  // view they're already using.
  useEffect(() => {
    let hasStoredPreference = true;
    try {
      hasStoredPreference = window.localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      hasStoredPreference = false;
    }
    if (hasStoredPreference) return;

    if (window.matchMedia(MOBILE_QUERY).matches) {
      // Deliberate one-time derivation from a browser-only API (matchMedia)
      // that isn't known at SSR time — not state synchronized from props,
      // so there's no non-effect alternative here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setView("simple");
    }
  }, []);

  function switchTo(next: ViewMode) {
    if (next === view) return;
    setView(next);
    persist(next);
  }

  const activeClass = "bg-accent text-white shadow";
  const inactiveClass = "text-muted hover:text-foreground";

  // Segmented control (both options always visible, active one filled)
  // rather than a single ambiguous "switch" button, so it reads as an
  // obvious choice rather than something to notice and decode. Handed to
  // each view as a prop and rendered inline in that view's own header/nav —
  // it used to float as a separate fixed pill above everything, which
  // looked disconnected sandwiched between a view's content and its own
  // sticky nav. Living inside each view's chrome instead reads as one
  // cohesive bar.
  const viewToggle = (
    <div
      role="group"
      aria-label="Portfolio view"
      className="inline-flex items-center gap-1 rounded-full border-2 bg-card/95 p-1 shadow-sm backdrop-blur-xl"
      style={{ borderColor: "var(--accent)" }}
    >
      <button
        type="button"
        onClick={() => switchTo("graph")}
        aria-pressed={view === "graph"}
        className={`rounded-full px-3.5 py-1.5 font-mono text-[10px] font-semibold tracking-widest uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          view === "graph" ? activeClass : inactiveClass
        }`}
      >
        Graph View
      </button>
      <button
        type="button"
        onClick={() => switchTo("simple")}
        aria-pressed={view === "simple"}
        className={`rounded-full px-3.5 py-1.5 font-mono text-[10px] font-semibold tracking-widest uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          view === "simple" ? activeClass : inactiveClass
        }`}
      >
        Simple View
      </button>
    </div>
  );

  return view === "graph" ? <MolecularCanvas viewToggle={viewToggle} /> : <SimpleView viewToggle={viewToggle} />;
}
