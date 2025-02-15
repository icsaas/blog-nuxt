import { MarkdownParsedContent, ParsedContent } from '@nuxt/content/dist/runtime/types'

export const DefaultNuxtImagePath = '/assets/blog-no-image.jpg'
export const DefaultNuxtImageAlt = 'NuxtImage'
export const DefaultNuxtImageHeight = 1024
export const DefaultNuxtImageWidth = 576

export interface PostFrontMatterImage {
  path: string
  alt: string
  height: number
  width: number
  caption?: string
}

export interface PostFrontMatter {
  title: string
  description: string
  date: string
  locale: string
  categories: string[]
  tags: string[]
  image: PostFrontMatterImage
}

export interface PostList extends ParsedContent, PostFrontMatter {
  title: string
  readingTime: {
    minutes: number
    text: string
    time: number
    words: number
  }
}

export interface PostListFilter {
  search?: string
  tags?: string[]
  categories?: string[]
  locales?: string[]
}

export interface PostDetail extends MarkdownParsedContent, PostFrontMatter {
  title: string
  readingTime: {
    minutes: number
    text: string
    time: number
    words: number
  },
  lastUpdated: string
}
