import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { registerWebMcpTools } from "../src/lib/webmcp-tools.ts";

describe("webmcp tools", () => {
  test("registers tools when navigator.modelContext is available", () => {
    const registered: string[] = [];
    const originalNavigator = globalThis.navigator;

    Object.defineProperty(globalThis, "navigator", {
      configurable: true,
      value: {
        modelContext: {
          registerTool: (tool: { name: string }) => {
            registered.push(tool.name);
          },
        },
      },
    });

    try {
      registerWebMcpTools();
      assert.ok(registered.includes("list_ui_skills"));
      assert.ok(registered.includes("open_ui_skill"));
      assert.ok(registered.includes("get_ui_skills_overview"));
    } finally {
      Object.defineProperty(globalThis, "navigator", {
        configurable: true,
        value: originalNavigator,
      });
    }
  });

  test("no-ops when WebMCP is unavailable", () => {
    const originalNavigator = globalThis.navigator;
    Object.defineProperty(globalThis, "navigator", {
      configurable: true,
      value: {},
    });

    try {
      assert.doesNotThrow(() => registerWebMcpTools());
    } finally {
      Object.defineProperty(globalThis, "navigator", {
        configurable: true,
        value: originalNavigator,
      });
    }
  });
});
