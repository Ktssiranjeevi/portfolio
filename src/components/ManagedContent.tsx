import { useEffect, useState } from 'react'
import { contentUpdateEventName, readContentEntries, type ContentEntry, type ContentPage } from '../lib/adminContent'

export default function ManagedContent({ page }: { page: ContentPage }) {
  const [entries, setEntries] = useState<ContentEntry[]>(() => readContentEntries())

  useEffect(() => {
    const refresh = () => setEntries(readContentEntries())
    const eventName = contentUpdateEventName()
    window.addEventListener(eventName, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(eventName, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  const visibleEntries = entries.filter((entry) => entry.page === page)
  if (visibleEntries.length === 0) return null

  return (
    <section className="mx-auto w-full max-w-6xl space-y-4 px-6 py-8 md:px-8" aria-label="Additional page content">
      {visibleEntries.map((entry) => (
        <article key={entry.id} className="overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white shadow-sm">
          {entry.image && <img src={entry.image} alt="" loading="lazy" className="max-h-[620px] w-full bg-[#F4F2F7] object-contain" />}
          <div className="p-5 sm:p-6">
            {entry.date && <p className="text-xs font-semibold uppercase tracking-wide text-[#8A849C]">{entry.date}</p>}
            <h2 className="mt-1 text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: "'Outfit', sans-serif" }}>{entry.heading}</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#55546A]">{entry.content}</p>
          </div>
        </article>
      ))}
    </section>
  )
}
