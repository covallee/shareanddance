// import got from 'got'
const got = require('got');

const ODESLI_API_URL = 'https://api.song.link/v1-alpha.1'

exports.handler = async function (event, context) {
  const params = new URLSearchParams({
    platform: 'appleMusic',
    id: event.queryStringParameters.id,
    type: 'song',
  })

  const odesliData = await got.get(`${ODESLI_API_URL}/links?${params}`).json()

  const res = transformPlatformData(odesliData);
  return {
    statusCode: 200,
    body: res.json()
  };
  // res.json(transformPlatformData(odesliData))
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
  },
  {}
  )
}

function getOdesliPlatformId(odesliEntityUniqueId) {
  return odesliEntityUniqueId.split('::')[1]
}