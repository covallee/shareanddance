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

export async function getSiteSettings() {
  return {
    title: "Share the Music and Dance",
    description: "All the music in my life",
    author: "@shareanddance",
  }
}
