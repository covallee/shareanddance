import { useState, useRef } from "react"
import { merge } from "lodash"
import { useClient, useDocumentOperation } from "sanity"
// import sanityClient from "part:@sanity/base/client"
// import {useClient} from 'sanity'

import getAppleMusicImageUrl from "../lib/get-image-url"

// const client = sanityClient.withConfig({ apiVersion: "2021-06-07" })

// const ODESLI_API_URL = 'https://api.song.link/v1-alpha.1'
// import {
//   Track,
//   Artist,
//   Album,
//   DataByPlatform,
//   PlatformTrackData,
// } from '../types'

export default function useManageTrack(trackDocumentId) {
  const client = useClient({
    apiVersion: "2022-09-14",
  })

  const [selectedTrack, setSelectedTrack] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(null)
  const id = useRef(trackDocumentId)

  // TODO: Type?
  const documentOperations = useDocumentOperation(trackDocumentId, "track")
  const { patch } = documentOperations

  async function onSelectTrack(track) {
    setSelectedTrack(track)
    setIsPending(true)
    setIsSuccess(null)
    // const [artists, album, dataByPlatform]
    const [album, dataByPlatform] = await Promise.all([
      // Promise.all(track.artists.map(createArtist)),
      (async () => {
        const albumImage = await createAlbumImage(track.album)
        return albumImage
        // return createAlbum(track.album, albumImage._id)
      })(),
      fetchPlatformUrls(track.dataByPlatform.appleMusic.id),
      (async () => {
        id.current = await maybeCreateTrack({ name: track.name }, id.current)
      })(),
    ])

    await patch.execute([
      {
        set: {
          ...track,
          album: {
            // _type: 'reference',
            // _ref: album._id,
            name: track.album.name,
            image: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: album._id,
              },
            },
          },
          // artists: artists.map(artist => ({
          //   _type: 'reference',
          //   _ref: artist._id,
          //   _key: artist._id,
          // })),
          dataByPlatform: merge(dataByPlatform.data, track.dataByPlatform),
        },
      },
    ])

    setIsPending(false)
    setIsSuccess(true)
  }

  return { selectedTrack, onSelectTrack, isPending, isSuccess }
}

async function fetchPlatformUrls(appleMusicId) {
  const params = new URLSearchParams({ id: appleMusicId })
  const response = await fetch(`/.netlify/functions/odesli/?${params}`)

  return response.json()
}

async function maybeCreateTrack(track, trackDocumentId) {
  if (trackDocumentId) {
    return trackDocumentId
  }

  const createdTrack = await createTrack(track)
  return createdTrack._id
}

// TODO: Return type.
function createTrack(track) {
  return client.create({
    _type: "track",
    ...track,
  })
}

// TODO: Return type.
// function createArtist(artist) {
//   return client.createIfNotExists({
//     _id: `artist.${artist.dataByPlatform.appleMusic.id}`,
//     _type: 'artist',
//     ...artist,
//   })
// }

// TODO: Return type.
// function createAlbum(album, albumImageId) {
//   return client.createIfNotExists({
//     _id: `album.${album.dataByPlatform.appleMusic.id}`,
//     _type: 'album',
//     image: {
//       _type: 'image',
//       asset: {
//         _type: 'reference',
//         _ref: albumImageId,
//       },
//     },
//     ...album,
//   })
// }

//TODO: Return type.
async function createAlbumImage(album) {
  const response = await fetch(
    getAppleMusicImageUrl(album.appleMusicImageUrl, 1400)
  )

  const data = await response.blob()
  return client.assets.upload("image", new File([data], `${album.name}.jpg`))
}
