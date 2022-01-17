import React from 'react'
import CardsContainer from '../../components/Home/CardsContainer'
import { useAppSelector } from '../../helpers/hooks/redux'
import HOC from '../HOC'

function MusicLibrary() {
  const { followedAlbums } = useAppSelector((state) => state.album)
  const { followedPlaylists } = useAppSelector((state) => state.playlist)

  return (
    <HOC>
      {followedAlbums.length > 0 && (
        <CardsContainer
          collectionType='album'
          list={followedAlbums}
          title='Albums That you Like'
          type='vertical'
        />
      )}
      {followedPlaylists.length > 0 && (
        <CardsContainer
          collectionType='playlist'
          list={followedPlaylists}
          title='Playlists That you Like'
          type='vertical'
        />
      )}
    </HOC>
  )
}

export default MusicLibrary
