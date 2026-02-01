// sanity.config.js
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import schemas from "./schemas/schema"
import deskStructure from "./src/structure/deskStructure"
import { visionTool } from "@sanity/vision"

export default defineConfig({
  title: "Share and Dance",
  projectId: "nayvmi5l",
  dataset: "production",
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],
  schema: {
    types: schemas,
  },
})
