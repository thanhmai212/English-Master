"use client"

import { useEffect, useRef, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Workspace } from "@/components/workspace"
import { RightPanel } from "@/components/right-panel"
import {
  dictionary,
  fallbackEntry,
  initialHistory,
  type DictionaryEntry,
  type HistoryItem,
} from "@/lib/data"

export default function Page() {
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory)
  const [activeWord, setActiveWord] = useState("meticulous")
  const [query, setQuery] = useState("")
  const [entry, setEntry] = useState<DictionaryEntry>(dictionary.meticulous)
  const [loading, setLoading] = useState(false)
  const [lang, setLang] = useState<"EN" | "VI">("EN")
  const searchRef = useRef<HTMLInputElement>(null)

  const loadWord = (word: string) => {
    const key = word.trim().toLowerCase()
    const found = dictionary[key] ?? { ...fallbackEntry, word: word.trim() || fallbackEntry.word }
    setLoading(true)
    setActiveWord(found.word)
    setTimeout(() => {
      setEntry(found)
      setLoading(false)
    }, 700)
  }

  const handleSearch = () => {
    if (!query.trim()) return
    loadWord(query)
    setQuery("")
  }

  const toggleBookmark = (word: string) => {
    setHistory((prev) =>
      prev.map((h) => (h.word === word ? { ...h, bookmarked: !h.bookmarked } : h)),
    )
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchRef.current) {
        e.preventDefault()
        searchRef.current?.focus()
      }
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        loadWord(activeWord)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeWord])

  return (
    <main className="mx-auto h-screen max-w-[1440px] p-4 lg:p-6">
      <div className="grid h-full grid-cols-1 gap-4 lg:gap-6 lg:[grid-template-columns:300px_minmax(0,1fr)_340px]">
        <div className="hidden lg:block">
          <Sidebar
            history={history}
            activeWord={entry.word}
            onSelect={loadWord}
            onToggleBookmark={toggleBookmark}
            lang={lang}
            onToggleLang={() => setLang((l) => (l === "EN" ? "VI" : "EN"))}
          />
        </div>

        <Workspace
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
          entry={entry}
          loading={loading}
          searchRef={searchRef}
          lang={lang}
        />

        <div className="hidden lg:block">
          <RightPanel />
        </div>
      </div>
    </main>
  )
}
