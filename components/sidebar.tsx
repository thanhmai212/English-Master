"use client"

import { Bookmark, Settings, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import type { HistoryItem } from "@/lib/data"

interface SidebarProps {
  history: HistoryItem[]
  activeWord: string
  onSelect: (word: string) => void
  onToggleBookmark: (word: string) => void
  lang: "EN" | "VI"
  onToggleLang: () => void
}

const tagColor: Record<string, string> = {
  IELTS: "text-primary",
  Academic: "text-accent",
  Business: "text-success",
  Literary: "text-accent",
  TOEIC: "text-primary",
}

export function Sidebar({
  history,
  activeWord,
  onSelect,
  onToggleBookmark,
  lang,
  onToggleLang,
}: SidebarProps) {
  return (
    <aside className="glass flex h-full w-full flex-col rounded-[var(--radius)] p-5">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <h1 className="text-base font-semibold tracking-tight text-foreground">English Mastery</h1>
          <span className="text-xs text-muted-foreground">Smart Local AI</span>
        </div>
      </div>

      {/* Local mode pill */}
      <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-card-border bg-muted px-3 py-1.5">
        <span className="relative flex h-2 w-2">
          <span className="pulse-dot absolute inline-flex h-2 w-2 rounded-full bg-success" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        <span className="text-xs font-medium text-foreground">Local Mode Active</span>
      </div>

      {/* History */}
      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent Words</h2>
        <span className="text-xs text-muted-foreground">{history.length}</span>
      </div>

      <nav className="scroll-thin mt-3 flex-1 space-y-1.5 overflow-y-auto pr-1">
        {history.map((item) => {
          const active = item.word === activeWord
          return (
            <button
              key={item.word}
              onClick={() => onSelect(item.word)}
              className={cn(
                "group flex w-full flex-col gap-2 rounded-[var(--radius-md)] border px-3 py-2.5 text-left transition-colors",
                active
                  ? "border-primary/40 bg-primary/10"
                  : "border-transparent hover:border-card-border hover:bg-muted",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "truncate text-sm font-medium",
                    active ? "text-primary" : "text-foreground",
                  )}
                >
                  {item.word}
                </span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleBookmark(item.word)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation()
                      onToggleBookmark(item.word)
                    }
                  }}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
                  aria-label={item.bookmarked ? "Remove bookmark" : "Add bookmark"}
                >
                  <Bookmark
                    className={cn("h-3.5 w-3.5", item.bookmarked && "fill-primary text-primary")}
                  />
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "rounded-md border border-card-border bg-muted px-1.5 py-0.5 text-[10px] font-medium",
                        tagColor[tag] ?? "text-muted-foreground",
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="shrink-0 text-[10px] text-muted-foreground">{item.timestamp}</span>
              </div>
            </button>
          )
        })}
      </nav>

      {/* Footer controls */}
      <div className="mt-4 flex items-center justify-between border-t border-card-border pt-4">
        <div className="inline-flex items-center rounded-full border border-card-border bg-muted p-0.5">
          {(["EN", "VI"] as const).map((l) => (
            <button
              key={l}
              onClick={() => l !== lang && onToggleLang()}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {l}
            </button>
          ))}
        </div>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full border border-card-border text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </aside>
  )
}
