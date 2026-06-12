export function ResultSkeleton() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-[var(--radius)] p-6">
        <div className="flex items-center gap-4">
          <div className="skeleton h-9 w-48 rounded-lg" />
          <div className="skeleton h-6 w-28 rounded-md" />
        </div>
        <div className="mt-4 flex gap-2">
          <div className="skeleton h-8 w-20 rounded-md" />
          <div className="skeleton h-8 w-20 rounded-md" />
          <div className="skeleton h-8 w-24 rounded-md" />
        </div>
        <div className="mt-5 space-y-2">
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-2/3 rounded" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <div className="glass rounded-[var(--radius)] p-5 md:col-span-2">
          <div className="skeleton h-4 w-32 rounded" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-9 w-full rounded-md" />
            ))}
          </div>
        </div>
        <div className="glass rounded-[var(--radius)] p-5 md:col-span-3">
          <div className="skeleton h-4 w-40 rounded" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton h-12 w-full rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
