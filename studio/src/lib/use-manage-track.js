import { useState, useRef } from 'react'
import { merge } from 'lodash'
import { useDocumentOperation } from '@sanity/react-hooks'
import client from 'part:@sanity/base/client'

// const ODESLI_API_URL = 'https://api.song.link/v1-alpha.1'
// import {
//   Track,
//   Artist,
//   Album,
//   DataByPlatform,
//   PlatformTrackData,
// } from '../types'

import getAppleMusicImageUrl from '../lib/get-image-url'

export default function useManageTrack(trackDocumentId) {
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(null)
  const id = useRef(trackDocumentId)

  // TODO: Type?
  const documentOperations = useDocumentOperation(trackDocumentId, 'track')
  const { patch } = documentOperations

  async function onSelectTrack(track) {
    setSelectedTrack(track)
    setIsPending(true)
    setIsSuccess(null)
    // const [artists, album, dataByPlatform]
    const [ album, dataByPlatform] = await Promise.all([
      // Promise.all(track.artists.map(createArtist)),
      (async () => {
        const albumImage = await createAlbumImage(track.album)
        return albumImage;
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
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: album._id,
              },
            },
          },
          // artists: artists.map(artist => ({
          //   _type: 'reference',
          //   _ref: artist._id,
          //   _key: artist._id,
          // })),
          dataByPlatform: merge(dataByPlatform, track.dataByPlatform),
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
  // const params = new URLSearchParams({
  //   platform: 'appleMusic',
  //   id: appleMusicId,
  //   type: 'song',
  // })

  // const odesliData = await fetch(`${ODESLI_API_URL}/links?${params}`)
  // .then(response => response.json())
  // .then(data => transformPlatformData(data));

  return response.json()
  // return odesliData;
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
    _type: 'track',
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
    getAppleMusicImageUrl(album.appleMusicImageUrl, 1400),
  )

  const data = await response.blob()
  return client.assets.upload('image', new File([data], `${album.name}.jpg`))
}
