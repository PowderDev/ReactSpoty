import React, { useEffect, useState } from 'react'
import { IAlbum, IPlaylist } from '../../../../shared/models'
import CardsContainer from '../../components/Home/CardsContainer'
import { useAppSelector } from '../../helpers/hooks/redux'
import { getPopularAlbums } from '../../store/actions/albumAction'
import { getPopularPlaylists } from '../../store/actions/playlistAction'
import HOC from '../HOC'



function HomePage() {
  const [albums, setAlbums] = useState([] as IAlbum[])
  const [playlists, setPlaylists] = useState([] as IPlaylist[])
  const { images } = useAppSelector(state => state.song)

  const list = [
    { id: 1, title: 'Liked songs', image: images.liked, url: 'liked' },
    { id: 2, title: 'You Recently listened', image: images.recently , url: 'recently' },
    { id: 3, title: 'The Top 20 right now', image: images.popular, url: 'popular' }
  ]

  useEffect(() => {
    const get = async () => {
      const a = await getPopularAlbums()
      setAlbums(a || [])
      const p = await getPopularPlaylists()
      setPlaylists(p || [])
    }

    get()
  }, [])

  return (
    <HOC>
      <CardsContainer
        collectionType='playlist'
        type='horizontal'
        title='Good day!'
        list={list}
      />
      {albums.length > 0 && (
        <CardsContainer
          collectionType='album'
          type='vertical'
          title='The Most Popular Albums'
          list={albums}
        />
      )}
      {playlists.length > 0 && (
        <CardsContainer
          collectionType='playlist'
          type='vertical'
          title='The Most Popular Playlists'
          list={playlists}
        />
      )}
    </HOC>
  )
}

export default HomePage
