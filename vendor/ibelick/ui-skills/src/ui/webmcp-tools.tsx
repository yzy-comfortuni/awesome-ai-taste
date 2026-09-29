import { useEffect } from "react";

import { registerWebMcpTools } from "../lib/webmcp-tools";

/** Registers WebMCP tools on browsers that expose navigator.modelContext. */
export function WebMcpTools() {
  useEffect(() => {
    const controller = new AbortController();
    registerWebMcpTools(controller.signal);
    return () => controller.abort();
  }, []);

  return null;
}
