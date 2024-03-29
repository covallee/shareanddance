import { useRef } from 'react'
import useSwr from 'swr'
// import { Results } from '../types/itunes-search'
// import { Track } from '../types'

const ITUNES_SEARCH_API_URL = 'https://itunes.apple.com/search'

export default function useSearch(term) {
  const previousResults = useRef([])

  const results = useSwr(term.length > 3 ? term : null, async term => {
    const params = new URLSearchParams({
      country: 'CA',
      entity: 'song',
      term,
    })

    const response = await fetch(`${ITUNES_SEARCH_API_URL}?${params}`)
    const data = await response.json()

    const transformedData = data.results.map(result => ({
      name: result.trackName,
      artist: result.artistName,
      album: {
        name: result.collectionName,
        appleMusicImageUrl: result.artworkUrl100
          .split('/')
          .slice(0, -1)
          .join('/'),
      },
      duration: result.trackTimeMillis,
      explicit: result.trackExplicitness === 'explicit',
      dataByPlatform: {
        appleMusic: {
          platform: 'appleMusic',
          id: result.trackId.toString(),
          previewUrl: result.previewUrl,
        },
      },
    }))

    previousResults.current = transformedData
    return transformedData
  })

  return {
    previousResults,
    results,
  }
}
