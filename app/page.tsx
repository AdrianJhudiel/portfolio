import { cookies, headers } from "next/headers";
import ViewSwitcher, { type ViewMode } from "@/components/ViewSwitcher";

const MOBILE_UA = /Mobi|Android|iPhone|iPad|iPod/i;

export default async function Home() {
  const cookieStore = await cookies();
  const stored = cookieStore.get("pv-view-mode")?.value;

  let initialView: ViewMode;
  if (stored === "graph" || stored === "simple") {
    // Visitor already made an explicit choice on a previous visit — that
    // always wins over any heuristic below.
    initialView = stored;
  } else {
    // No stored preference yet: best-effort guess from the request's User-Agent
    // so the server doesn't ship the graph to a phone before client JS gets a
    // chance to correct it (see ViewSwitcher's mount-time matchMedia check,
    // which handles viewport sizes the UA string can't tell us about, e.g. a
    // resized desktop window).
    const userAgent = (await headers()).get("user-agent") ?? "";
    initialView = MOBILE_UA.test(userAgent) ? "simple" : "graph";
  }

  return <ViewSwitcher initialView={initialView} />;
}
