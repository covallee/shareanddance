import S from "@sanity/desk-tool/structure-builder";
import artwork from "./artwork";
import { MdSettings } from "react-icons/md";

export default () =>
  S.list()
    .title("Content")
    .items([
      S.documentListItem()
        .schemaType("siteSettings")
        .title("Site settings")
        .icon(MdSettings)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .views([S.view.form()])
        ),
      // artwork,
      // S.documentTypeListItem("project").title("Project"),
      // S.documentTypeListItem("artist").title("Artist"),
    ]);
