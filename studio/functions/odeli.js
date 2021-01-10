import got from 'got'

const ODESLI_API_URL = 'https://api.song.link/v1-alpha.1'

export default async function (req, res) {
  const params = new URLSearchParams({
    platform: 'appleMusic',
    id: req.query.id,
    type: 'song',
  })

  const odesliData = await got.get(`${ODESLI_API_URL}/links?${params}`).json()

  res.json(transformPlatformData(odesliData))
}

function transformPlatformData(odesliData){
  const platforms = ['appleMusic', 'spotify', 'youtube']

  return platforms.reduce((platformData, platform) => {
    const odesliLinksByPlatform = odesliData.linksByPlatform[platform];
   
    if(!odesliLinksByPlatform) {
      return platformdata
    }

    return {
      ...platformData,
      [platform]: {
        platform,
        id: getOdesliPlatformId(odesliLinksByPlatform.entityUniqueId),
        url: odesliLinksByPlatform.url,
      },

    }
  }
  )
}

function getOdesliPlatformId(odesliEntityUniqueId) {
  return odesliEntityUniqueId.split('::')[1]
}