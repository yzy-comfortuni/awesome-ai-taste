import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { CommandKShortcut } from "./keyboard-shortcut";
import { Tooltip, TooltipProvider } from "./tooltip";

type CommandItem = {
  kind: "skill" | "playbook";
  slug: string;
  pathSlug: string;
  href: string;
  label: string;
  sourceLabel?: string;
  description?: string;
};

type CommandDialogProps = {
  items: CommandItem[];
  hideTrigger?: boolean;
};

declare global {
  interface Window {
    openCommandDialog?: () => void;
  }
}

type SearchResult = CommandItem & {
  score: number;
  snippet: string;
};

type IndexedCommandItem = CommandItem & {
  slugLower: string;
  labelLower: string;
  pathSlugLower: string;
  sourceLower: string;
  descriptionLower: string;
};

const toSearchResult = (
  item: CommandItem,
  score: number,
  snippet: string,
): SearchResult => ({
  kind: item.kind,
  slug: item.slug,
  pathSlug: item.pathSlug,
  href: item.href,
  label: item.label,
  sourceLabel: item.sourceLabel,
  description: item.description,
  score,
  snippet,
});

const MAX_DEFAULT_ITEMS = 8;
const MAX_DEFAULT_ITEMS_PER_KIND = MAX_DEFAULT_ITEMS / 2;
const MAX_FILTERED_ITEMS = 24;

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const idForPath = (pathSlug: string) =>
  `command-search-item-${pathSlug.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
const keycapClass =
  "bg-fill-strong/70 text-content-primary rounded-[4px] px-1.5 py-0.5 text-[10px] font-medium leading-none font-mono";
const plainText = (value?: string) =>
  (value ?? "")
    .replace(/^---[\s\S]*?---/, " ")
    .replace(/`{1,3}[^`]*`{1,3}/g, " ")
    .replace(/[\[\]#>*_~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const createSnippet = (content: string, query: string) => {
  if (!content || !query) {
    return "";
  }

  const normalizedContent = plainText(content);
  const lowerContent = normalizedContent.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerContent.indexOf(lowerQuery);

  if (index === -1) {
    return "";
  }

  const padding = 70;
  const start = Math.max(0, index - padding);
  const end = Math.min(
    normalizedContent.length,
    index + query.length + padding,
  );
  const prefix = start > 0 ? "..." : "";
  const suffix = end < normalizedContent.length ? "..." : "";

  return `${prefix}${normalizedContent.slice(start, end).trim()}${suffix}`;
};

const highlightText = (value: string, query: string): ReactNode => {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return value;
  }

  const matcher = new RegExp(`(${escapeRegExp(normalizedQuery)})`, "ig");
  const parts = value.split(matcher);

  return parts.map((part, index) =>
    part.toLowerCase() === normalizedQuery.toLowerCase() ? (
      <mark key={`${part}-${index}`} className="text-content-primary">
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
};

export function CommandDialog({ items, hideTrigger = false }: CommandDialogProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const indexedItems = useMemo<IndexedCommandItem[]>(
    () =>
      items.map((item) => {
        return {
          ...item,
          slugLower: item.slug.toLowerCase(),
          labelLower: item.label.toLowerCase(),
          pathSlugLower: item.pathSlug.toLowerCase(),
          sourceLower: (item.sourceLabel ?? "").toLowerCase(),
          descriptionLower: (item.description ?? "").toLowerCase(),
        };
      }),
    [items],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isMac = /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const isOpenHotkey = isMac
        ? event.metaKey && event.key.toLowerCase() === "k"
        : event.ctrlKey && event.key.toLowerCase() === "k";

      if (!isOpenHotkey) {
        return;
      }

      event.preventDefault();
      setOpen((prev) => {
        const next = !prev;

        if (next) {
          setActiveIndex(0);
        }

        return next;
      });
    };

    window.addEventListener("keydown", onKeyDown);
    const openDialog = () => {
      setActiveIndex(0);
      setOpen(true);
    };

    window.openCommandDialog = openDialog;
    window.addEventListener("open-command-dialog", openDialog);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-dialog", openDialog);
      if (window.openCommandDialog === openDialog) {
        delete window.openCommandDialog;
      }
    };
  }, []);

  const filteredItems = useMemo<SearchResult[]>(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      const defaultItems = [
        ...indexedItems
          .filter((item) => item.kind === "skill")
          .slice(0, MAX_DEFAULT_ITEMS_PER_KIND),
        ...indexedItems
          .filter((item) => item.kind === "playbook")
          .slice(0, MAX_DEFAULT_ITEMS_PER_KIND),
      ];

      return defaultItems.map((item) =>
        toSearchResult(item, 0, item.description ?? ""),
      );
    }

    return indexedItems
      .map<SearchResult | null>((item) => {
        let score = 0;

        if (item.slugLower.startsWith(value)) score += 140;
        if (item.slugLower.includes(value)) score += 90;
        if (item.labelLower.includes(value)) score += 80;
        if (item.pathSlugLower.includes(value)) score += 70;
        if (item.sourceLower.includes(value)) score += 40;
        if (item.descriptionLower.includes(value)) score += 30;
        if (item.descriptionLower.includes(value)) score += 16;

        if (!score) {
          return null;
        }

        const snippet =
          createSnippet(item.description ?? "", value) ||
          item.description ||
          "";

        return toSearchResult(item, score, snippet);
      })
      .filter((result): result is SearchResult => Boolean(result))
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        return a.pathSlug.localeCompare(b.pathSlug);
      })
      .slice(0, MAX_FILTERED_ITEMS);
  }, [indexedItems, query]);

  const scrollToItem = (index: number) => {
    const active = filteredItems[index];

    if (!active) {
      return;
    }

    const activeElement = document.getElementById(idForPath(active.pathSlug));
    activeElement?.scrollIntoView({ block: "nearest" });
  };

  const setIndexAndScroll = (index: number) => {
    setActiveIndex(index);
    requestAnimationFrame(() => scrollToItem(index));
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (nextOpen) {
      setActiveIndex(0);
    }
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setActiveIndex(0);
  };

  const onSelect = (pathSlug: string) => {
    const selected = filteredItems.find((item) => item.pathSlug === pathSlug);

    if (!selected) {
      return;
    }

    setOpen(false);
    setQuery("");
    window.location.href = selected.href;
  };

  const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (!open) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex =
        filteredItems.length === 0
          ? 0
          : (activeIndex + 1) % filteredItems.length;

      setIndexAndScroll(nextIndex);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex =
        filteredItems.length === 0
          ? 0
          : (activeIndex - 1 + filteredItems.length) % filteredItems.length;

      setIndexAndScroll(nextIndex);
      return;
    }

    if (event.key === "Enter") {
      const selected = filteredItems[activeIndex];
      if (!selected) {
        return;
      }

      event.preventDefault();
      onSelect(selected.pathSlug);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <TooltipProvider>
      <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
        {!hideTrigger ? (
          <Tooltip
            content={
              <span className="inline-flex items-center gap-2">
                Search
                <CommandKShortcut />
              </span>
            }
          >
            <DialogPrimitive.Trigger
              aria-label="Search skills and playbook"
              className="border-line-default bg-fill-default text-content-primary hover:bg-fill-subtle focus-visible:outline-content-primary inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm transition-colors focus-visible:outline-1 focus-visible:outline-offset-2"
            >
              <MagnifyingGlassIcon className="size-4 shrink-0" aria-hidden="true" />
            </DialogPrimitive.Trigger>
          </Tooltip>
        ) : null}

        <DialogPrimitive.Portal>
          <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-fill-inverse/35 backdrop-blur-sm" />
          <DialogPrimitive.Popup className="border-line-default fixed top-24 left-1/2 z-50 w-[min(92vw,680px)] -translate-x-1/2 rounded-[12px] border bg-surface-default shadow-xl outline-none">
            <DialogPrimitive.Title className="sr-only">
              Search skills and playbook
            </DialogPrimitive.Title>
            <div className="border-line-default flex items-center gap-2 border-b px-4 py-3">
              <MagnifyingGlassIcon className="size-4 text-content-secondary" aria-hidden="true" />
              <input
                autoFocus
                value={query}
                onChange={onInputChange}
                onKeyDown={onInputKeyDown}
                placeholder="Search skills and playbook..."
                className="text-content-primary placeholder:text-content-muted w-full bg-transparent text-base outline-none sm:text-base"
                role="combobox"
                aria-expanded={open}
                aria-controls="command-search-results"
                aria-activedescendant={
                  filteredItems[activeIndex]
                    ? idForPath(filteredItems[activeIndex].pathSlug)
                    : undefined
                }
              />
            </div>

            <div
              className="max-h-[55vh] overflow-y-auto px-2 pb-2 space-y-1"
              role="listbox"
              id="command-search-results"
            >
              {filteredItems.length === 0 ? (
                <div className="text-content-secondary px-2 py-8 text-center text-sm">
                  No skills or playbook entries found.
                </div>
              ) : (
                (["skill", "playbook"] as const).map((kind) => {
                  const sectionItems = filteredItems
                    .map((item, index) => ({ item, index }))
                    .filter(({ item }) => item.kind === kind);

                  if (sectionItems.length === 0) {
                    return null;
                  }

                  return (
                    <div
                      key={kind}
                      role="group"
                      aria-label={kind === "skill" ? "Skills" : "Playbook"}
                    >
                      <div className="text-content-secondary px-3 pt-3 pb-1 text-xs font-medium tracking-wide">
                        {kind === "skill" ? "Skills" : "Playbook"}
                      </div>
                      {sectionItems.map(({ item, index }) => (
                        <button
                          key={item.pathSlug}
                          id={idForPath(item.pathSlug)}
                          role="option"
                          aria-selected={index === activeIndex}
                          type="button"
                          onClick={() => onSelect(item.pathSlug)}
                          onMouseEnter={() => setActiveIndex(index)}
                          className={`w-full rounded-[8px] px-3 py-2 text-left transition-colors ${index === activeIndex
                            ? "bg-fill-subtle"
                            : "hover:bg-fill-subtle"
                            }`}
                        >
                          <div className="text-content-primary text-sm font-medium">
                            {highlightText(
                              item.kind === "playbook" ? item.label : item.slug,
                              query,
                            )}
                            {item.kind === "skill" ? (
                              <span className="text-content-secondary ml-px text-xs font-normal">
                                {" "}
                                {highlightText(
                                  item.sourceLabel ?? "Ibelick",
                                  query,
                                )}
                              </span>
                            ) : null}
                          </div>
                          {item.snippet ? (
                            <div className="text-content-secondary mt-0.5 line-clamp-2 text-xs leading-snug">
                              {highlightText(item.snippet, query)}
                            </div>
                          ) : null}
                        </button>
                      ))}
                    </div>
                  );
                })
              )}
            </div>

            <div className="text-content-secondary border-line-default flex items-center justify-between border-t px-4 py-2 text-[11px]">
              <span>{filteredItems.length} results</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="flex items-center gap-1">
                    <kbd className={keycapClass}>↑</kbd>
                    <kbd className={keycapClass}>↓</kbd>
                  </span>
                  move
                </span>
                <span>
                  <kbd className={keycapClass}>Enter</kbd> open
                </span>
                <span>
                  <kbd className={keycapClass}>Esc</kbd> close
                </span>
              </div>
            </div>
          </DialogPrimitive.Popup>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </TooltipProvider>
  );
}
