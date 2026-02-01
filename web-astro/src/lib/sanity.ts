import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-01-01",
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export interface SiteSettings {
  title: string
  openGraph?: {
    title?: string
    description?: string
    image?: {
      asset: SanityImageSource
    }
  }
}

export interface Track {
  _id: string
  name: string
  artist: string
  publishedAt: string
  album?: {
    image?: {
      asset: SanityImageSource
    }
  }
  dataByPlatform?: {
    spotify?: {
      id: string
    }
  }
  tag: Array<{ title: string }>
  comment?: any[]
}

export async function getTracks(): Promise<Track[]> {
  return sanityClient.fetch(`
    *[_type == "track"] | order(publishedAt desc) {
      _id,
      name,
      artist,
      publishedAt,
      album {
        image {
          asset
        }
      },
      dataByPlatform {
        spotify {
          id
        }
      },
      tag[]-> {
        title
      },
      comment
    }
  `)
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await sanityClient.fetch(`
    *[_type == "siteSettings"][0] {
      title,
      openGraph {
        title,
        description,
        image {
          asset
        }
      }
    }
  `)

  // Fallback to defaults if no settings found
  return (
    settings || {
      title: "Share the Music and Dance",
      openGraph: {
        title: "Share the Music and Dance",
        description: "All the music in my life",
      },
    }
  )
}
