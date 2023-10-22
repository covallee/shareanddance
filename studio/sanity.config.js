// sanity.config.js
import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import schemas from "./schemas/schema"
import deskStructure from "./src/structure/deskStructure"
import { visionTool } from "@sanity/vision"

export default defineConfig({
  title: "Share and Dance",
  projectId: "nayvmi5l",
  dataset: "production",
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],
  schema: {
    types: schemas,
  },
})
