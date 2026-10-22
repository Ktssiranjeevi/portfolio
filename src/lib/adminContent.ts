export type ContentPage = 'home' | 'projects' | 'social' | 'videos'

export type ContentEntry = {
  id: string
  page: ContentPage
  heading: string
  date: string
  content: string
  image: string
}

const storageKey = 'portfolio-admin-content-v1'
const updateEvent = 'portfolio-admin-content-updated'
const projectStorageKey = 'portfolio-project-catalog-v1'
const projectUpdateEvent = 'portfolio-project-catalog-updated'
const socialPostStorageKey = 'portfolio-social-post-edits-v1'
const projectCategoryStorageKey = 'portfolio-project-category-settings-v1'

export function readContentEntries(): ContentEntry[] {
  try {
    const saved = window.localStorage.getItem(storageKey)
    return saved ? (JSON.parse(saved) as ContentEntry[]) : []
  } catch {
    return []
  }
}

export function writeContentEntries(entries: ContentEntry[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(entries))
  window.dispatchEvent(new CustomEvent(updateEvent))
}

export function contentUpdateEventName() {
  return updateEvent
}

export function readProjectCatalog<T>(defaults: T[]): T[] {
  try {
    const saved = window.localStorage.getItem(projectStorageKey)
    return saved ? (JSON.parse(saved) as T[]) : defaults
  } catch {
    return defaults
  }
}

export function writeProjectCatalog<T>(projects: T[]) {
  window.localStorage.setItem(projectStorageKey, JSON.stringify(projects))
  window.dispatchEvent(new CustomEvent(projectUpdateEvent))
}

export function projectUpdateEventName() {
  return projectUpdateEvent
}

export type SocialPostEdit = {
  assetName: string
  category?: 'Product Poster' | 'Event Poster' | 'Special Day Poster'
  heading: string
  date: string
  content: string
  image: string
}

export function readSocialPostEdits(): SocialPostEdit[] {
  try {
    const saved = window.localStorage.getItem(socialPostStorageKey)
    return saved ? (JSON.parse(saved) as SocialPostEdit[]) : []
  } catch {
    return []
  }
}

export function writeSocialPostEdits(entries: SocialPostEdit[]) {
  window.localStorage.setItem(socialPostStorageKey, JSON.stringify(entries))
}

export type ProjectCategorySetting = {
  heading: string
  backgroundImage: string
  cardImage: string
}

export type ProjectCategorySettings = Record<string, ProjectCategorySetting>

export function readProjectCategorySettings(): ProjectCategorySettings {
  try {
    const saved = window.localStorage.getItem(projectCategoryStorageKey)
    return saved ? (JSON.parse(saved) as ProjectCategorySettings) : {}
  } catch {
    return {}
  }
}

export function writeProjectCategorySettings(settings: ProjectCategorySettings) {
  window.localStorage.setItem(projectCategoryStorageKey, JSON.stringify(settings))
}
