"use client"

import { useState } from "react"
import { Search, Command, Volume2, Layers, Quote, GitBranch } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DictionaryEntry } from "@/lib/data"
import { ResultSkeleton } from "./result-skeleton"

interface WorkspaceProps {
  query: string
  onQueryChange: (q: string) => void
  onSearch: () => void
  entry: DictionaryEntry
  loading: boolean
  searchRef: React.RefObject<HTMLInputElement | null>
  lang: "EN" | "VI"
}

export function Workspace({
  query,
  onQueryChange,
  onSearch,
  entry,
  loading,
  searchRef,
  lang,
}: WorkspaceProps) {
  const [activeSense, setActiveSense] = useState(0)
  const sense = entry.senses[Math.min(activeSense, entry.senses.length - 1)]

  return (
    <section className="flex h-full flex-col gap-6">
      {/* Search bar */}
      <div className="glass flex items-center gap-3 rounded-[var(--radius)] px-4 py-3">
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input
          ref={searchRef}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch()
          }}
          placeholder="Search any English word..."
          className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          aria-label="Search word"
        />
        <kbd className="hidden shrink-0 items-center gap-1 rounded-md border border-card-border bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground sm:flex">
          Press <span className="font-semibold text-foreground">/</span> to focus
        </kbd>
      </div>

      {loading ? (
        <ResultSkeleton />
      ) : (
        <div className="scroll-thin flex-1 space-y-6 overflow-y-auto pr-1">
          {/* Instant result */}
          <div className="glass rounded-[var(--radius)] p-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">{entry.word}</h2>
              <span className="font-mono text-sm text-muted-foreground">{entry.ipa}</span>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full border border-card-border text-primary transition-colors hover:bg-primary/10"
                aria-label="Play pronunciation"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>

            {/* POS tabs */}
            <div className="mt-4 inline-flex rounded-[var(--radius-md)] border border-card-border bg-muted p-1">
              {entry.senses.map((s, i) => (
                <button
                  key={s.pos + i}
                  onClick={() => setActiveSense(i)}
                  className={cn(
                    "rounded-[var(--radius-sm)] px-3.5 py-1.5 text-sm font-medium transition-colors",
                    activeSense === i
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {s.pos}
                </button>
              ))}
            </div>

            <div className="mt-5 space-y-1.5">
              <p className="text-base leading-relaxed text-foreground">
                {lang === "EN" ? sense.definitionEn : sense.definitionVi}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {lang === "EN" ? sense.definitionVi : sense.definitionEn}
              </p>
            </div>
          </div>

          {/* Advanced breakdown */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Advanced Language Breakdown
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              {/* Word formation */}
              <div className="glass rounded-[var(--radius)] p-5 md:col-span-2">
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-accent" />
                  <h4 className="text-sm font-semibold text-foreground">Word Formation</h4>
                </div>
                <dl className="mt-4 space-y-2.5">
                  {entry.formation.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] border border-card-border px-3 py-2"
                    >
                      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {f.label}
                      </dt>
                      <dd className="truncate text-sm text-foreground">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Collocations */}
              <div className="glass rounded-[var(--radius)] p-5 md:col-span-3">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-semibold text-foreground">Contextual Collocations</h4>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {entry.collocations.map((c) => (
                    <li
                      key={c.phrase}
                      className="rounded-[var(--radius-md)] border border-card-border px-3 py-2.5"
                    >
                      <p className="text-sm font-medium text-foreground">{c.phrase}</p>
                      <p className="text-xs text-muted-foreground">{c.meaningVi}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bilingual examples */}
              <div className="glass rounded-[var(--radius)] p-5 md:col-span-5">
                <div className="flex items-center gap-2">
                  <Quote className="h-4 w-4 text-accent" />
                  <h4 className="text-sm font-semibold text-foreground">Bilingual Examples</h4>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {entry.examples.map((ex) => (
                    <blockquote
                      key={ex.en}
                      className="rounded-[var(--radius-md)] border-l-2 border-primary/60 bg-muted px-4 py-3"
                    >
                      <p className="text-sm leading-relaxed text-foreground">{ex.en}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{ex.vi}</p>
                    </blockquote>
                  ))}
                </div>
              </div>
            </div>

            {/* Hint */}
            <div className="mt-4 flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-card-border bg-muted px-3 py-1.5 text-xs text-muted-foreground">
                <Command className="h-3 w-3" />
                Press <span className="font-semibold text-foreground">Ctrl + Enter</span> for Deep AI Analysis
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
