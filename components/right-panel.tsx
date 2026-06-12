"use client"

import { useState } from "react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import { RotateCw, Check, X, Cpu, Clock, Coins, MemoryStick } from "lucide-react"
import { cn } from "@/lib/utils"
import { flashcards, quizQuestion, resourceSeries } from "@/lib/data"

export function RightPanel() {
  return (
    <aside className="scroll-thin flex h-full flex-col gap-6 overflow-y-auto pr-1">
      <FlashcardWidget />
      <QuizWidget />
      <ResourcesWidget />
    </aside>
  )
}

function FlashcardWidget() {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const card = flashcards[index]

  const next = () => {
    setFlipped(false)
    setTimeout(() => setIndex((i) => (i + 1) % flashcards.length), 150)
  }

  return (
    <div className="glass rounded-[var(--radius)] p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Flashcard</h3>
        <span className="text-xs text-muted-foreground">
          {index + 1} / {flashcards.length}
        </span>
      </div>

      <div className="flip-card mt-4 h-40 cursor-pointer" onClick={() => setFlipped((f) => !f)}>
        <div className={cn("flip-inner h-full w-full", flipped && "flipped")}>
          {/* Front */}
          <div className="flip-face glass flex h-full w-full flex-col items-center justify-center rounded-[var(--radius-md)] p-4 text-center">
            <span className="text-xl font-semibold text-foreground">{card.front}</span>
            <span className="mt-1 font-mono text-xs text-muted-foreground">{card.ipa}</span>
            <span className="mt-3 text-[11px] uppercase tracking-wide text-muted-foreground">
              Tap to flip
            </span>
          </div>
          {/* Back */}
          <div className="flip-face flip-back flex h-full w-full flex-col items-center justify-center rounded-[var(--radius-md)] border border-primary/40 bg-primary/10 p-4 text-center">
            <p className="text-sm leading-relaxed text-foreground">{card.back}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{card.backVi}</p>
          </div>
        </div>
      </div>

      <button
        onClick={next}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] border border-card-border bg-muted py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/10"
      >
        <RotateCw className="h-3.5 w-3.5" />
        Next card
      </button>
    </div>
  )
}

function QuizWidget() {
  const [selected, setSelected] = useState<number | null>(null)
  const letters = ["A", "B", "C", "D"]

  return (
    <div className="glass rounded-[var(--radius)] p-5">
      <h3 className="text-sm font-semibold text-foreground">Quick Quiz</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{quizQuestion.prompt}</p>

      <div className="mt-4 space-y-2">
        {quizQuestion.options.map((opt, i) => {
          const isCorrect = i === quizQuestion.correctIndex
          const isChosen = selected === i
          const reveal = selected !== null
          return (
            <button
              key={opt}
              disabled={reveal}
              onClick={() => setSelected(i)}
              className={cn(
                "flex w-full items-center gap-3 rounded-[var(--radius-md)] border px-3 py-2.5 text-left text-sm transition-colors",
                !reveal && "border-card-border hover:border-accent/50 hover:bg-accent/5",
                reveal && isCorrect && "border-success/50 bg-success/10",
                reveal && isChosen && !isCorrect && "border-red-500/50 bg-red-500/10",
                reveal && !isCorrect && !isChosen && "border-card-border opacity-60",
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-card-border text-xs font-semibold",
                  reveal && isCorrect && "border-success/50 text-success",
                  reveal && isChosen && !isCorrect && "border-red-500/50 text-red-500",
                )}
              >
                {letters[i]}
              </span>
              <span className="flex-1 text-foreground">{opt}</span>
              {reveal && isCorrect && <Check className="h-4 w-4 text-success" />}
              {reveal && isChosen && !isCorrect && <X className="h-4 w-4 text-red-500" />}
            </button>
          )
        })}
      </div>

      {selected !== null && (
        <button
          onClick={() => setSelected(null)}
          className="mt-3 w-full text-center text-xs font-medium text-primary hover:underline"
        >
          Try again
        </button>
      )}
    </div>
  )
}

function ResourcesWidget() {
  const latest = resourceSeries[resourceSeries.length - 1]

  return (
    <div className="glass rounded-[var(--radius)] p-5">
      <div className="flex items-center gap-2">
        <Cpu className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">System Resources</h3>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Metric icon={<Clock className="h-3.5 w-3.5" />} label="Time" value={`${latest.ms}ms`} />
        <Metric icon={<MemoryStick className="h-3.5 w-3.5" />} label="RAM" value={`${latest.ram}MB`} />
        <Metric icon={<Coins className="h-3.5 w-3.5" />} label="Tokens" value={`${latest.tokens}`} />
      </div>

      <div className="mt-4 h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={resourceSeries} margin={{ top: 6, right: 6, left: -24, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
            <XAxis
              dataKey="t"
              tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "var(--background)",
                border: "1px solid var(--card-border)",
                borderRadius: 12,
                fontSize: 12,
                color: "var(--foreground)",
              }}
              labelStyle={{ color: "var(--muted-foreground)" }}
            />
            <Line
              type="monotone"
              dataKey="ms"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={false}
              name="Time (ms)"
            />
            <Line
              type="monotone"
              dataKey="tokens"
              stroke="var(--accent)"
              strokeWidth={2}
              dot={false}
              name="Tokens"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-primary" /> Processing time
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent" /> Token usage
        </span>
      </div>
    </div>
  )
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-card-border bg-muted px-2.5 py-2">
      <div className="flex items-center gap-1 text-muted-foreground">
        {icon}
        <span className="text-[10px] uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  )
}
