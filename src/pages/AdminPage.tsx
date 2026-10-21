import { useMemo, useState } from 'react'
import { allProjects } from './ProjectsPage'
import socialMediaAssets from '../data/socialMediaAssets.json'
import {
  readContentEntries,
  readProjectCatalog,
  writeContentEntries,
  writeProjectCatalog,
  readSocialPostEdits,
  writeSocialPostEdits,
  readProjectCategorySettings,
  writeProjectCategorySettings,
  type ContentEntry,
  type ContentPage,
  type SocialPostEdit,
  type ProjectCategorySettings,
} from '../lib/adminContent'

type Project = (typeof allProjects)[number] & { figmaUrl?: string; figmaEnabled?: boolean }
type ProjectCategory = 'Websites' | 'Web Apps' | 'Mobile Apps' | 'Branding' | 'Social Media Posts' | 'Videos' | 'Events'
type AdminPageTarget = ContentPage

const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: 'Websites', label: 'Websites' },
  { id: 'Web Apps', label: 'Web App' },
  { id: 'Mobile Apps', label: 'Mobile App' },
  { id: 'Branding', label: 'Company Branding' },
  { id: 'Social Media Posts', label: 'Social Media' },
  { id: 'Videos', label: 'Video' },
  { id: 'Events', label: 'Events' },
]

const contentPages: { id: AdminPageTarget; label: string }[] = [
  { id: 'home', label: 'Home page content' },
  { id: 'projects', label: 'Projects page content' },
  { id: 'social', label: 'Social feed content' },
  { id: 'videos', label: 'Video page content' },
]

const blankDraft = { heading: '', date: '', content: '', image: '', challenge: '', outcome: '', tags: '', wireframe: '', finalDesign: '', figmaUrl: '', figmaEnabled: false }

const defaultCategoryImages: Record<ProjectCategory, { backgroundImage: string; cardImage: string }> = {
  Websites: { backgroundImage: '/assets/backgrounds/web-app-section-background.png', cardImage: '/assets/backgrounds/web-app-section-background.png' },
  'Web Apps': { backgroundImage: '/assets/backgrounds/web-app-section-background.png', cardImage: '/assets/backgrounds/web-app-section-background.png' },
  'Mobile Apps': { backgroundImage: '/assets/backgrounds/mobile-app-section-background.png', cardImage: '/assets/backgrounds/mobile-app-section-background.png' },
  Branding: { backgroundImage: '/assets/backgrounds/company-branding-section-background.png', cardImage: '/assets/backgrounds/company-branding-section-background.png' },
  'Social Media Posts': { backgroundImage: '/assets/backgrounds/social-media-section-background.png', cardImage: '/assets/backgrounds/social-media-section-background.png' },
  Videos: { backgroundImage: '/assets/backgrounds/video-section-background.png', cardImage: '/assets/backgrounds/video-section-background.png' },
  Events: { backgroundImage: '/assets/backgrounds/expo-events-section-background.png', cardImage: '/assets/backgrounds/expo-events-section-background.png' },
}

function defaultCategoryDraft(category: ProjectCategory, saved?: ProjectCategorySettings[string]) {
  return { heading: saved?.heading ?? '', ...defaultCategoryImages[category], ...saved }
}

function matchesCategory(project: Project, category: ProjectCategory) {
  if (category === 'Social Media Posts') return project.id === 17 || project.category === 'Social Media Posts' || project.category === 'Social Media'
  if (category === 'Events') return project.category === 'Events' || project.category === 'Expo Events'
  return project.category === category
}

export default function AdminPage({ onNavigate }: { onNavigate: (page: 'home' | 'projects' | 'admin') => void }) {
  const [catalog, setCatalog] = useState<Project[]>(() => readProjectCatalog(allProjects))
  const [contentEntries, setContentEntries] = useState<ContentEntry[]>(() => readContentEntries())
  const [socialPostEdits, setSocialPostEdits] = useState<SocialPostEdit[]>(() => readSocialPostEdits())
  const [categorySettings, setCategorySettings] = useState<ProjectCategorySettings>(() => readProjectCategorySettings())
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('Websites')
  const [activeContentPage, setActiveContentPage] = useState<ContentPage | null>(null)
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [selectedSocialAssetName, setSelectedSocialAssetName] = useState<string | null>(null)
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null)
  const [draft, setDraft] = useState(blankDraft)
  const [notice, setNotice] = useState('')
  const [categoryNotice, setCategoryNotice] = useState('')
  const [categoryDraft, setCategoryDraft] = useState(() => defaultCategoryDraft('Websites'))

  const isContentMode = activeContentPage !== null
  const isSocialAssetMode = !isContentMode && activeCategory === 'Social Media Posts' && selectedSocialAssetName !== null
  const categoryInfo = projectCategories.find((category) => category.id === activeCategory)!
  const pageInfo = contentPages.find((page) => page.id === activeContentPage)
  const categoryProjects = useMemo(() => catalog.filter((project) => matchesCategory(project, activeCategory)), [catalog, activeCategory])
  const contentForPage = contentEntries.filter((entry) => entry.page === activeContentPage)
  const selectedProject = catalog.find((project) => project.id === selectedProjectId)
  const selectedSocialAsset = socialMediaAssets.find((asset) => asset.name === selectedSocialAssetName)

  const resetDraft = () => {
    setDraft(blankDraft)
    setSelectedProjectId(null)
    setSelectedSocialAssetName(null)
    setEditingEntryId(null)
    setNotice('')
  }

  const selectCategory = (category: ProjectCategory) => {
    setActiveCategory(category)
    setActiveContentPage(null)
    setCategoryDraft(defaultCategoryDraft(category, categorySettings[category]))
    setCategoryNotice('')
    resetDraft()
  }

  const chooseCategoryImage = (file: File | undefined, field: 'backgroundImage' | 'cardImage') => {
    if (!file) return
    if (file.size > 800_000) {
      setCategoryNotice('Choose an image under 800 KB or enter its URL/path instead.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => setCategoryDraft((current) => ({ ...current, [field]: String(reader.result ?? '') }))
    reader.readAsDataURL(file)
  }

  const saveCategorySettings = () => {
    const next = { ...categorySettings, [activeCategory]: categoryDraft }
    try {
      writeProjectCategorySettings(next)
      setCategorySettings(next)
      setCategoryNotice('Category display settings saved.')
    } catch {
      setCategoryNotice('Could not save. Use image URLs or smaller uploads.')
    }
  }

  const selectContentPage = (page: ContentPage) => {
    setActiveContentPage(page)
    resetDraft()
  }

  const chooseProject = (project: Project) => {
    setActiveContentPage(null)
    setSelectedSocialAssetName(null)
    setSelectedProjectId(project.id)
    setDraft({
      heading: project.title,
      date: project.duration,
      content: project.overview,
      image: project.image,
      challenge: project.challenge,
      outcome: project.outcome,
      tags: project.tags.join(', '),
      wireframe: project.screens[0] ?? '',
      finalDesign: project.screens[1] ?? '',
      figmaUrl: project.figmaUrl ?? '',
      figmaEnabled: project.figmaEnabled ?? Boolean(project.figmaUrl),
    })
    setNotice('Editing existing project.')
  }

  const chooseSocialAsset = (assetName: string) => {
    const asset = socialMediaAssets.find((item) => item.name === assetName)
    if (!asset) return
    const saved = socialPostEdits.find((item) => item.assetName === assetName)
    setActiveContentPage(null)
    setSelectedProjectId(null)
    setSelectedSocialAssetName(assetName)
    setDraft({
      ...blankDraft,
      heading: saved?.heading ?? `SANDS social post ${socialMediaAssets.findIndex((item) => item.name === assetName) + 1}`,
      date: saved?.date ?? (asset.timestamp <= 8640000000000000 ? new Date(asset.timestamp).toISOString().slice(0, 10) : ''),
      content: saved?.content ?? '',
      image: saved?.image ?? '',
    })
    setNotice('Editing social media asset.')
  }

  const chooseImage = (file?: File) => {
    if (!file) return
    if (file.size > 800_000) {
      setNotice('Choose an image under 800 KB or paste its URL/path instead.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => setDraft((current) => ({ ...current, image: String(reader.result ?? '') }))
    reader.readAsDataURL(file)
  }

  const chooseDesignImage = (file: File | undefined, field: 'wireframe' | 'finalDesign') => {
    if (!file) return
    if (file.size > 800_000) {
      setNotice('Choose an image under 800 KB or use its URL/path instead.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => setDraft((current) => ({ ...current, [field]: String(reader.result ?? '') }))
    reader.readAsDataURL(file)
  }

  const persistProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const current = selectedProject
    const project = {
      ...(current ?? {
        id: Math.max(0, ...catalog.map((item) => item.id)) + 1,
        category: activeCategory,
        process: ['Brief', 'Research', 'Design', 'Delivery'],
        screens: [],
        accent: activeCategory === 'Videos' ? '#9999FF' : activeCategory === 'Social Media Posts' ? '#1685D9' : '#C1FA5A',
      }),
      title: draft.heading,
      duration: draft.date,
      overview: draft.content,
      image: draft.image || current?.image || '',
      screens: [draft.wireframe, draft.finalDesign],
      figmaUrl: draft.figmaUrl.trim(),
      figmaEnabled: draft.figmaEnabled,
      challenge: draft.challenge,
      outcome: draft.outcome,
      tags: draft.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    } as Project
    const next = current ? catalog.map((item) => item.id === current.id ? project : item) : [...catalog, project]
    try {
      writeProjectCatalog(next)
      setCatalog(next)
      resetDraft()
      setNotice(current ? 'Project changes saved.' : 'New project added.')
    } catch {
      setNotice('Could not save. Try an image URL or a smaller uploaded image.')
    }
  }

  const persistContent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!activeContentPage) return
    const entry: ContentEntry = {
      id: editingEntryId ?? crypto.randomUUID(),
      page: activeContentPage,
      heading: draft.heading,
      date: draft.date,
      content: draft.content,
      image: draft.image,
    }
    const next = editingEntryId
      ? contentEntries.map((item) => item.id === editingEntryId ? entry : item)
      : [entry, ...contentEntries]
    try {
      writeContentEntries(next)
      setContentEntries(next)
      resetDraft()
      setNotice('Page content saved.')
    } catch {
      setNotice('Could not save. Try an image URL or a smaller uploaded image.')
    }
  }

  const persistSocialAsset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedSocialAssetName) return
    const edit: SocialPostEdit = { assetName: selectedSocialAssetName, heading: draft.heading, date: draft.date, content: draft.content, image: draft.image }
    const next = [...socialPostEdits.filter((item) => item.assetName !== selectedSocialAssetName), edit]
    try {
      writeSocialPostEdits(next)
      setSocialPostEdits(next)
      setNotice('Social media asset saved.')
    } catch {
      setNotice('Could not save. Try an image URL or a smaller uploaded image.')
    }
  }

  const editContent = (entry: ContentEntry) => {
    setEditingEntryId(entry.id)
    setDraft({ ...blankDraft, heading: entry.heading, date: entry.date, content: entry.content, image: entry.image })
    setNotice('Editing page content.')
  }

  const deleteContent = (id: string) => {
    const next = contentEntries.filter((item) => item.id !== id)
    try {
      writeContentEntries(next)
      setContentEntries(next)
      if (editingEntryId === id) resetDraft()
      setNotice('Content deleted.')
    } catch {
      setNotice('Could not delete this entry.')
    }
  }

  const addNewProject = () => {
    setActiveContentPage(null)
    setSelectedProjectId(null)
    setSelectedSocialAssetName(null)
    setDraft(blankDraft)
    setNotice('Enter details for the new project.')
  }

  const form = (
    <form onSubmit={isContentMode ? persistContent : isSocialAssetMode ? persistSocialAsset : persistProject} className="rounded-2xl border border-[#E7E2EF] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3"><h2 className="text-lg font-bold">{isContentMode ? editingEntryId ? 'Edit page content' : 'Add page content' : isSocialAssetMode ? 'Edit social media asset' : selectedProjectId ? 'Edit project' : 'Add project'}</h2>{(selectedProjectId || editingEntryId) && <button type="button" onClick={resetDraft} className="text-sm font-semibold text-[#557A12]">Cancel edit</button>}</div>
      {!isContentMode && <p className="mb-4 rounded-xl bg-[#F5F2FA] px-3 py-2 text-xs text-[#6E6680]">Category: <strong>{categoryInfo.label}</strong></p>}
      <label className="mb-4 block text-sm font-semibold">Heading<input required value={draft.heading} onChange={(event) => setDraft({ ...draft, heading: event.target.value })} placeholder="Project or section heading" className="mt-1.5 w-full rounded-xl border border-[#E1DDE8] px-3.5 py-3 text-sm font-normal outline-none focus:border-[#C1FA5A] focus:ring-2 focus:ring-[#C1FA5A]/15" /></label>
      <label className="mb-4 block text-sm font-semibold">Date / duration<input value={draft.date} onChange={(event) => setDraft({ ...draft, date: event.target.value })} placeholder="e.g. 6 weeks Â· 2024" className="mt-1.5 w-full rounded-xl border border-[#E1DDE8] px-3.5 py-3 text-sm font-normal outline-none focus:border-[#C1FA5A] focus:ring-2 focus:ring-[#C1FA5A]/15" /></label>
      <label className="mb-4 block text-sm font-semibold">Content<textarea required={!isSocialAssetMode} rows={5} value={draft.content} onChange={(event) => setDraft({ ...draft, content: event.target.value })} placeholder={isSocialAssetMode ? 'Optional caption or description' : 'Describe the project'} className="mt-1.5 w-full resize-y rounded-xl border border-[#E1DDE8] px-3.5 py-3 text-sm font-normal outline-none focus:border-[#C1FA5A] focus:ring-2 focus:ring-[#C1FA5A]/15" /></label>
      {!isContentMode && !isSocialAssetMode && <>
        <label className="mb-4 block text-sm font-semibold">Challenge<textarea rows={3} value={draft.challenge} onChange={(event) => setDraft({ ...draft, challenge: event.target.value })} placeholder="What problem did the project address?" className="mt-1.5 w-full resize-y rounded-xl border border-[#E1DDE8] px-3.5 py-3 text-sm font-normal outline-none focus:border-[#C1FA5A] focus:ring-2 focus:ring-[#C1FA5A]/15" /></label>
        <label className="mb-4 block text-sm font-semibold">Outcome<textarea rows={3} value={draft.outcome} onChange={(event) => setDraft({ ...draft, outcome: event.target.value })} placeholder="Describe the result" className="mt-1.5 w-full resize-y rounded-xl border border-[#E1DDE8] px-3.5 py-3 text-sm font-normal outline-none focus:border-[#C1FA5A] focus:ring-2 focus:ring-[#C1FA5A]/15" /></label>
        <label className="mb-4 block text-sm font-semibold">Tools / tags<input value={draft.tags} onChange={(event) => setDraft({ ...draft, tags: event.target.value })} placeholder="Figma, Illustrator, React" className="mt-1.5 w-full rounded-xl border border-[#E1DDE8] px-3.5 py-3 text-sm font-normal outline-none focus:border-[#C1FA5A] focus:ring-2 focus:ring-[#C1FA5A]/15" /></label>
        <div className="mb-5 rounded-xl border border-[#E8E3EF] bg-[#FAF9FC] p-4">
          <p className="mb-3 text-sm font-bold">Design previews</p>
          <label className="mb-3 block text-sm font-semibold">Wireframe preview image URL<input value={draft.wireframe.startsWith('data:') ? '' : draft.wireframe} onChange={(event) => setDraft({ ...draft, wireframe: event.target.value })} placeholder="https://â€¦ or /images/wireframe.png" className="mt-1.5 w-full rounded-xl border border-[#E1DDE8] bg-white px-3.5 py-3 text-sm font-normal outline-none focus:border-[#C1FA5A]" /></label>
          <label className="mb-3 block text-sm font-semibold">Upload wireframe image<input type="file" accept="image/*" onChange={(event) => chooseDesignImage(event.target.files?.[0], 'wireframe')} className="mt-1.5 block w-full text-sm font-normal" /></label>
          {draft.wireframe && <img src={draft.wireframe} alt="Wireframe preview" className="mb-4 max-h-36 w-full rounded-lg bg-white object-contain" />}
          <label className="mb-3 block text-sm font-semibold">Final design preview image URL<input value={draft.finalDesign.startsWith('data:') ? '' : draft.finalDesign} onChange={(event) => setDraft({ ...draft, finalDesign: event.target.value })} placeholder="https://â€¦ or /images/final-design.png" className="mt-1.5 w-full rounded-xl border border-[#E1DDE8] bg-white px-3.5 py-3 text-sm font-normal outline-none focus:border-[#C1FA5A]" /></label>
          <label className="mb-1 block text-sm font-semibold">Upload final design image<input type="file" accept="image/*" onChange={(event) => chooseDesignImage(event.target.files?.[0], 'finalDesign')} className="mt-1.5 block w-full text-sm font-normal" /></label>
          {draft.finalDesign && <img src={draft.finalDesign} alt="Final design preview" className="mt-3 max-h-36 w-full rounded-lg bg-white object-contain" />}
          <p className="mt-3 text-xs font-normal text-[#8A8797]">Uploads are limited to 800 KB. Use URLs or project paths for larger images.</p>
        </div>
        <div className="mb-5 rounded-xl border border-[#E8E3EF] p-4">
          <label className="flex items-center gap-3 text-sm font-bold"><input type="checkbox" checked={draft.figmaEnabled} onChange={(event) => setDraft({ ...draft, figmaEnabled: event.target.checked })} className="h-4 w-4 accent-[#C1FA5A]" />Enable Figma embed</label>
          {draft.figmaEnabled && <label className="mt-3 block text-sm font-semibold">Figma file or embed URL<input value={draft.figmaUrl} onChange={(event) => setDraft({ ...draft, figmaUrl: event.target.value })} placeholder="https://www.figma.com/file/â€¦" className="mt-1.5 w-full rounded-xl border border-[#E1DDE8] px-3.5 py-3 text-sm font-normal outline-none focus:border-[#C1FA5A]" /></label>}
          <p className="mt-2 text-xs font-normal text-[#8A8797]">Turn this off or leave the URL empty to hide the Figma section.</p>
        </div>
      </>}
      <label className="mb-4 block text-sm font-semibold">Image URL or project path<input value={draft.image.startsWith('data:') ? '' : draft.image} onChange={(event) => setDraft({ ...draft, image: event.target.value })} placeholder="https://â€¦ or /assets/social-media/posts/example.jpg" className="mt-1.5 w-full rounded-xl border border-[#E1DDE8] px-3.5 py-3 text-sm font-normal outline-none focus:border-[#C1FA5A] focus:ring-2 focus:ring-[#C1FA5A]/15" /></label>
      <label className="mb-5 block text-sm font-semibold">Or upload an image<input type="file" accept="image/*" onChange={(event) => chooseImage(event.target.files?.[0])} className="mt-1.5 block w-full text-sm font-normal file:mr-3 file:rounded-lg file:border-0 file:bg-[#EFF8D9] file:px-3 file:py-2 file:font-semibold file:text-[#557A12]" /><span className="mt-1 block text-xs font-normal text-[#8A8797]">Uploads are limited to 800 KB and stored in this browser.</span></label>
      {draft.image && <img src={draft.image} alt="Project preview" className="mb-5 max-h-48 w-full rounded-xl bg-[#F4F2F7] object-contain" />}
      <div className="flex flex-wrap items-center gap-3"><button type="submit" className="rounded-xl bg-[#C1FA5A] px-5 py-3 text-sm font-bold text-[#1B1C1E] shadow-md shadow-[#C1FA5A]/20 hover:bg-[#9CCB35]">{isContentMode ? editingEntryId ? 'Save changes' : 'Publish content' : isSocialAssetMode ? 'Save social post' : selectedProjectId ? 'Save project' : 'Add project'}</button>{notice && <p role="status" className="text-xs text-[#6E6680]">{notice}</p>}</div>
    </form>
  )

  return (
    <main className="admin-panel min-h-screen bg-[#1B1C1E] pt-16 text-[#F5F5F5]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[250px_minmax(0,1fr)] md:px-8">
        <aside className="rounded-2xl p-4 text-white">
          <div className="mb-7 flex items-center gap-3 px-2 pt-1"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#C1FA5A] to-[#FF6B6B] font-extrabold">KD</div><div><p className="font-bold">Content studio</p><p className="text-xs text-white/60">Portfolio admin</p></div></div>
          <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Projects</p>
          <nav className="space-y-1" aria-label="Project categories">
            {projectCategories.map((category) => {
              const count = catalog.filter((project) => matchesCategory(project, category.id)).length
              return <button key={category.id} onClick={() => selectCategory(category.id)} className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${!isContentMode && activeCategory === category.id ? 'bg-[#C1FA5A] text-[#1B1C1E]' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}>{category.label}<span className={`float-right rounded-full px-2 py-0.5 text-[10px] ${!isContentMode && activeCategory === category.id ? 'bg-[#1B1C1E]/10 text-[#1B1C1E]' : 'bg-white/10 text-white/60'}`}>{count}</span></button>
            })}
          </nav>
          <p className="mb-2 mt-7 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Page content</p>
          <nav className="space-y-1" aria-label="Other page content">
            {contentPages.map((page) => <button key={page.id} onClick={() => selectContentPage(page.id)} className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${activeContentPage === page.id ? 'bg-[#C1FA5A] text-[#1B1C1E]' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}>{page.label}</button>)}
          </nav>
          <button onClick={() => onNavigate('home')} className="mt-7 w-full rounded-xl border border-white/20 px-3 py-2.5 text-left text-sm font-semibold text-white/75 hover:bg-white/10">â† View portfolio</button>
        </aside>

        <div className="min-w-0">
          <header className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C1FA5A]">{isContentMode ? 'Page content' : 'Project management'}</p><h1 className="mt-1 text-3xl font-extrabold" style={{ fontFamily: "'Outfit', sans-serif" }}>{isContentMode ? pageInfo?.label : categoryInfo.label}</h1><p className="mt-1 text-sm text-[#777487]">{isContentMode ? 'Add and manage content blocks for this page.' : activeCategory === 'Social Media Posts' ? `${socialMediaAssets.length} creative assets Â· ${socialPostEdits.length} customized` : `${categoryProjects.length} projects in this category`}</p></div>
            {!isContentMode && <button onClick={addNewProject} className="rounded-xl bg-[#C1FA5A] px-4 py-3 text-sm font-bold text-[#1B1C1E] shadow-md shadow-[#C1FA5A]/20 hover:bg-[#9CCB35]">ï¼‹ Add new project</button>}
          </header>

          {!isContentMode && <section className="mb-5 rounded-2xl border border-[#E7E2EF] bg-white p-5 shadow-sm"><div className="mb-4 flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-bold">Project page category display</h2><p className="mt-1 text-xs text-[#777487]">Set the heading and choose the background and category card images.</p></div><span className="rounded-full bg-[#F3F9E7] px-3 py-1.5 text-xs font-bold text-[#557A12]">{categoryProjects.length} {categoryProjects.length === 1 ? 'project' : 'projects'} Â· automatic</span></div><label className="mb-4 block text-sm font-semibold">Category heading<input value={categoryDraft.heading} onChange={(event) => setCategoryDraft({ ...categoryDraft, heading: event.target.value })} placeholder={categoryInfo.label} className="mt-1.5 w-full rounded-xl border border-[#E1DDE8] px-3.5 py-3 text-sm font-normal outline-none focus:border-[#C1FA5A]" /></label><div className="grid gap-4 md:grid-cols-2"><div className="rounded-xl border border-[#EEEAF2] p-3"><label className="block text-sm font-semibold">Background image URL / path<input value={categoryDraft.backgroundImage.startsWith('data:') ? '' : categoryDraft.backgroundImage} onChange={(event) => setCategoryDraft({ ...categoryDraft, backgroundImage: event.target.value })} placeholder="/assets/backgrounds/example.png" className="mt-1.5 w-full rounded-lg border border-[#E1DDE8] px-3 py-2.5 text-xs font-normal outline-none focus:border-[#C1FA5A]" /></label><label className="mt-3 block text-xs font-semibold">Upload background<input type="file" accept="image/*" onChange={(event) => chooseCategoryImage(event.target.files?.[0], 'backgroundImage')} className="mt-1.5 block w-full text-xs" /></label>{categoryDraft.backgroundImage && <img src={categoryDraft.backgroundImage} alt="Category background preview" className="mt-3 h-28 w-full rounded-lg bg-[#F4F2F7] object-cover" />}</div><div className="rounded-xl border border-[#EEEAF2] p-3"><label className="block text-sm font-semibold">Card image URL / path<input value={categoryDraft.cardImage.startsWith('data:') ? '' : categoryDraft.cardImage} onChange={(event) => setCategoryDraft({ ...categoryDraft, cardImage: event.target.value })} placeholder="/assets/project-previews/example.png" className="mt-1.5 w-full rounded-lg border border-[#E1DDE8] px-3 py-2.5 text-xs font-normal outline-none focus:border-[#C1FA5A]" /></label><label className="mt-3 block text-xs font-semibold">Upload card image<input type="file" accept="image/*" onChange={(event) => chooseCategoryImage(event.target.files?.[0], 'cardImage')} className="mt-1.5 block w-full text-xs" /></label>{categoryDraft.cardImage && <img src={categoryDraft.cardImage} alt="Category card preview" className="mt-3 h-28 w-full rounded-lg bg-[#F4F2F7] object-cover" />}</div></div><div className="mt-4 flex flex-wrap items-center gap-3"><button type="button" onClick={saveCategorySettings} className="rounded-xl bg-[#C1FA5A] px-4 py-2.5 text-sm font-bold text-[#1B1C1E]">Save category display</button>{categoryNotice && <p role="status" className="text-xs text-[#6E6680]">{categoryNotice}</p>}</div><p className="mt-3 text-[11px] text-[#8A8797]">Uploads are limited to 800 KB and saved in this browser. Enter a URL or /assets/... path for larger images.</p></section>}

          {!isContentMode && <section className="mb-5 rounded-2xl border border-[#E7E2EF] bg-white p-4 shadow-sm"><p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#8A849C]">{activeCategory === 'Social Media Posts' ? 'Campaign project' : 'Select a project to edit'}</p>{categoryProjects.length ? <div className="flex flex-wrap gap-2">{categoryProjects.map((project) => <button key={project.id} onClick={() => chooseProject(project)} className={`max-w-full truncate rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold transition ${selectedProjectId === project.id ? 'bg-[#C1FA5A] text-[#1B1C1E]' : 'bg-[#F0F7DE] text-[#4C435F] hover:bg-[#E5F2C8]'}`}>{project.title}</button>)}</div> : <p className="text-sm text-[#858092]">No projects yet. Use â€œAdd new projectâ€ to create the first one.</p>}</section>}
          {!isContentMode && activeCategory === 'Social Media Posts' && <section className="mb-5 rounded-2xl border border-[#E7E2EF] bg-white p-4 shadow-sm"><p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#8A849C]">All supplied social media assets</p><p className="mb-3 text-xs text-[#858092]">Select any JPG or PDF to edit its heading, date, caption, and display image.</p><div className="grid max-h-[440px] gap-2 overflow-y-auto sm:grid-cols-2 xl:grid-cols-3">{socialMediaAssets.map((asset, index) => { const edit = socialPostEdits.find((item) => item.assetName === asset.name); const thumb = edit?.image || (asset.kind === 'jpg' ? `/assets/social-media/posts/${encodeURIComponent(asset.name)}` : ''); return <button key={asset.name} onClick={() => chooseSocialAsset(asset.name)} className={`flex min-w-0 items-center gap-3 rounded-xl border p-2 text-left ${selectedSocialAssetName === asset.name ? 'border-[#C1FA5A] bg-[#F3F9E7]' : 'border-[#EEEAF2] hover:bg-[#FAF9FC]'}`}>{thumb ? <img src={thumb} alt="" className="h-14 w-14 shrink-0 rounded-lg bg-[#F4F2F7] object-cover" /> : <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#EFF8D9] text-xs font-bold text-[#557A12]">PDF</span>}<span className="min-w-0"><strong className="block truncate text-xs">{edit?.heading || `Social post ${index + 1}`}</strong><span className="mt-1 block truncate text-[10px] text-[#858092]">{asset.name}</span><span className="mt-1 block text-[10px] text-[#557A12]">{edit ? 'Customized' : asset.kind.toUpperCase()}</span></span></button>})}</div></section>}

          <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(280px,0.78fr)]">
            {form}
            <div className="space-y-3">
              <h2 className="px-1 text-sm font-bold text-[#625B70]">{isContentMode ? 'Published content' : 'Project preview'}</h2>
              {isSocialAssetMode && selectedSocialAsset && <article className="overflow-hidden rounded-2xl border border-[#E7E2EF] bg-white shadow-sm">{draft.image ? <img src={draft.image} alt="" className="max-h-80 w-full bg-[#F4F2F7] object-contain" /> : selectedSocialAsset.kind === 'jpg' ? <img src={`/assets/social-media/posts/${encodeURIComponent(selectedSocialAsset.name)}`} alt="" className="max-h-80 w-full bg-[#F4F2F7] object-contain" /> : <div className="flex h-48 items-center justify-center bg-[#EFF8D9] font-bold text-[#557A12]">PDF document</div>}<div className="p-4"><p className="text-xs font-semibold text-[#8A849C]">{selectedSocialAsset.name}</p><h2 className="mt-1 font-bold">{draft.heading}</h2><p className="mt-2 line-clamp-4 text-sm leading-5 text-[#777487]">{draft.content || 'No caption added yet.'}</p></div></article>}
              {isContentMode ? contentForPage.length ? contentForPage.map((entry) => <article key={entry.id} className="flex gap-3 rounded-2xl border border-[#E7E2EF] bg-white p-3 shadow-sm">{entry.image ? <img src={entry.image} alt="" className="h-20 w-24 shrink-0 rounded-xl bg-[#F4F2F7] object-cover" /> : <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-xl bg-[#EFF8D9] text-2xl text-[#557A12]">âœ¦</div>}<div className="min-w-0 flex-1"><p className="truncate font-bold">{entry.heading}</p><p className="mt-1 line-clamp-2 text-xs leading-5 text-[#777487]">{entry.content}</p><div className="mt-2 flex gap-3"><button onClick={() => editContent(entry)} className="text-xs font-bold text-[#557A12]">Edit</button><button onClick={() => deleteContent(entry.id)} className="text-xs font-semibold text-[#B64B5B]">Delete</button></div></div></article>) : <div className="rounded-2xl border border-dashed border-[#D5CDDF] bg-white/70 p-8 text-center"><p className="font-bold">No page content yet</p><p className="mt-1 text-sm text-[#858092]">Add an entry to start building this page.</p></div> : selectedProject ? <article className="overflow-hidden rounded-2xl border border-[#E7E2EF] bg-white shadow-sm">{selectedProject.image && <img src={selectedProject.image} alt="" className="max-h-64 w-full bg-[#F4F2F7] object-contain" />}<div className="p-4"><p className="text-xs font-semibold text-[#8A849C]">{selectedProject.duration}</p><h2 className="mt-1 font-bold">{selectedProject.title}</h2><p className="mt-2 line-clamp-4 text-sm leading-5 text-[#777487]">{selectedProject.overview}</p></div></article> : <div className="rounded-2xl border border-dashed border-[#D5CDDF] bg-white/70 p-8 text-center"><p className="font-bold">Choose a project</p><p className="mt-1 text-sm text-[#858092]">Select an existing project above or add a new one.</p></div>}
              {!isContentMode && !isSocialAssetMode && selectedProject && <section className="grid gap-3"><h3 className="px-1 text-sm font-bold text-[#625B70]">Detail page design previews</h3>{[{ label: 'Wireframe Preview', image: draft.wireframe || selectedProject.screens[0] || (selectedProject.id === 1 ? '/assets/project-previews/Isometric Website Wireframe Collage.png' : selectedProject.image) }, { label: 'Final Design Preview', image: draft.finalDesign || selectedProject.screens[1] || (selectedProject.id === 1 ? '/assets/project-previews/Frame 7.png' : selectedProject.image) }].map((preview) => <article key={preview.label} className="relative overflow-hidden rounded-2xl border border-[#E7E2EF] bg-white shadow-sm"><img src={preview.image} alt={preview.label} className="max-h-64 min-h-36 w-full bg-[#F4F2F7] object-contain" /><span className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2 text-xs font-bold text-white">{preview.label}</span></article>)}</section>}
              <div className="rounded-xl bg-[#EFF8D9]/70 p-4 text-xs leading-5 text-[#6E6680]">Project edits save in this browser and show in the portfolio on return. Use a hosted image URL or a project asset path for best results.</div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
