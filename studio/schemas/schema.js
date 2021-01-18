// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import blockContent from "./blockContent";
import siteSettings from "./siteSettings";
import song from "./documents/song";
import track from "./documents/track";
import playlist from "./documents/playlist";

// Object
import bioPortableText from "./objects/bioPortableText";
import openGraph from "./objects/openGraph";
import mainImage from "./objects/mainImage";
import tag from "./objects/tag";
import platformTrackData from "./objects/platformTrackData";
import platformData from "./objects/platformData";
import dataByPlatform from "./objects/dataByPlatform";
import album from "./objects/album";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    song,
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
  ]),
});
