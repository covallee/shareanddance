import S from "@sanity/desk-tool/structure-builder";
import { MdSettings } from "react-icons/md";
import { IoMdMusicalNotes } from "react-icons/io";
import React from 'react'
import { Box } from '@sanity/ui'
import Search from '../components/search'

const JsonPreview = ({document}) => (
  <pre>{JSON.stringify(document.displayed, null, 2)}</pre>
)

const SearchView = props => (
  <Box padding={4}>
    <Search trackDocumentId={props.documentId} />
  </Box>
)

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
      S.listItem()
        .title("Tracks")
        .icon(IoMdMusicalNotes)
        .child(
          S.documentTypeList('track')
          .title('Tracks')
            .child(
              S.document()
                .schemaType('track')
                .views([
                  S.view.form(),
                  S.view.component(SearchView).title('Search')
                ])
            )
        ),
      S.documentTypeListItem("playlist").title("Playlists"),
      S.documentTypeListItem("tag").title("Tags"),
      // S.divider(),
      // ...S.documentTypeListItems().filter(
      //   item => item.getId() !== 'siteSettings'
      // ) 
    ]);
