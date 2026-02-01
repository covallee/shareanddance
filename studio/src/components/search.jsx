import React, { useState } from 'react'
import { Spinner, Card, Text, Inline, studioTheme, ThemeProvider, Stack, Autocomplete } from '@sanity/ui'
import { useDebounce } from 'use-debounce'
import useSearch from '../lib/use-search'
import useManageTrack from '../lib/use-manage-track'
import styles from './search.module.css'
import Result from './result'

const Search = ({ trackDocumentId }) => {
  const { selectedTrack, onSelectTrack, isPending, isSuccess } = useManageTrack(
    trackDocumentId,
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 250)
  const { previousResults, results } = useSearch(debouncedSearchTerm)

  const options = (results.isValidating && debouncedSearchTerm.length !== 0
    ? previousResults.current
    : results.data) || []

  // Create unique ID for each track using Apple Music ID
  const getTrackId = (track) => track.dataByPlatform?.appleMusic?.id || ''

  return (
    <ThemeProvider theme={studioTheme}>
    <Stack space={3}>
      <div className={styles.fieldContainer}>
        <Autocomplete
          id="track-search"
          placeholder='Artist, track, or album'
          options={options.map((track) => ({
            value: getTrackId(track),
            payload: track,
          }))}
          renderOption={(option) => (
            <Card as="button" padding={2}>
              <Result track={option.payload} />
            </Card>
          )}
          filterOption={() => true}
          onQueryChange={(query) => setSearchTerm(query || '')}
          onSelect={(value) => {
            const track = options.find((t) => getTrackId(t) === value)
            if (track) onSelectTrack(track)
          }}
          loading={results.isValidating}
        />
        {isPending && (
          <Card padding={4} radius={2} shadow={1} tone='primary'>
            <Inline space={3}>
              <Spinner />
              <Text>Fetching track data&hellip;</Text>
            </Inline>
          </Card>
        )}
        {isSuccess && (
          <Card padding={4} radius={2} shadow={1} tone='positive'>
            <Text>Fetched track data.</Text>
          </Card>
        )}
        {selectedTrack && <Result track={selectedTrack} />}
      </div>
    </Stack>
    </ThemeProvider>
  )
}

export default Search
