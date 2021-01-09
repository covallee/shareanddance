import S from "@sanity/desk-tool/structure-builder";
import { MdSettings } from "react-icons/md";
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
      // artwork,
      // S.documentTypeListItem("project").title("Project"),
      // S.documentTypeListItem("track").title("Tracks"),
      S.listItem()
        .title("Tracks")
        .child(
          S.list()
            .title('Song List')
            .items([
              S.listItem()
                .title('Songs')
                .schemaType('track')
                .child(
                  S.documentTypeList('track')
                  .title('Song')
                    .child(
                      S.document()
                        .schemaType('track')
                        .views([
                          S.view.form(),
                          S.view.component(SearchView).title('Search')
                        ])
                    )
                )
            ])
            // .child(id =>
            //   S.document()
            //     .schemaType('song')
            //     .params({id})
            //     .views([
            //       S.view.form()
            //     ])
            // )
        ),
      S.listItem()
        .title("Songs")
        .child(
          S.list()
            .title('Song List')
            .items([
              S.listItem()
                .title('Songs')
                .schemaType('song')
                .child(
                  S.documentTypeList('song')
                  .title('Song')
                    .child(
                      S.document()
                        .schemaType('song')
                        .views([
                          S.view.form(),
                          S.view.component(JsonPreview).title('JSON'),
                          S.view.component(SearchView).title('Search')
                        ])
                    )
                )
            ])
            // .child(id =>
            //   S.document()
            //     .schemaType('song')
            //     .params({id})
            //     .views([
            //       S.view.form()
            //     ])
            // )
        ),
      // ...S.documentTypeListItems().filter(listItem => !['siteSettings'].includes(listItem.getId()))
    ]);
