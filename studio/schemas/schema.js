// We import object and document schemas
import blockContent from "./blockContent"
import siteSettings from "./siteSettings"
import track from "./documents/track"
import playlist from "./documents/playlist"

// Object
import bioPortableText from "./objects/bioPortableText"
import openGraph from "./objects/openGraph"
import mainImage from "./objects/mainImage"
import tag from "./objects/tag"
import platformTrackData from "./objects/platformTrackData"
import platformData from "./objects/platformData"
import dataByPlatform from "./objects/dataByPlatform"
import album from "./objects/album"

// Then we give our schema to the builder and provide the result to Sanity
export default [
  track,
  playlist,
  blockContent,
  bioPortableText,
  siteSettings,
  openGraph,
  mainImage,
  tag,
  platformTrackData,
  platformData,
  dataByPlatform,
  album,
]
