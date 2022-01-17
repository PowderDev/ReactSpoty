import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IPlaylist } from '../../../../shared/models'
import Header from '../../components/Playlist/Header'
import SongsList from '../../components/SongsList/SongsList'
import { useAppSelector } from '../../helpers/hooks/redux'
import { getPlaylistById } from '../../store/actions/playlistAction'
import {
  getMostPopularSongs,
  getRecentlyListened
} from '../../store/actions/songAction'
import HOC from '../HOC'

function PlaylistPage() {
  const [playlist, setPlaylist] = useState({} as IPlaylist)
  const { user } = useAppSelector((state) => state.user)
  const { followedSongs } = useAppSelector((state) => state.song)
  const { myPlaylists } = useAppSelector((state) => state.playlist)
  const { images } = useAppSelector(state => state.song)

  const { id } = useParams()

  useEffect(() => {
    const get = async () => {
      if (id == 'liked') {
        // @ts-expect-error
        setPlaylist({
          title: 'Liked songs',
          author: user,
          image: images.liked,
          songs: followedSongs
        })
      } else if (id == 'recently') {
        const s = await getRecentlyListened()
        setPlaylist({
          title: 'Recently Listened',
          author: user,
          image: images.recently,
          // @ts-expect-error
          songs: s
        })
      } else if (id == 'popular') {
        const s = await getMostPopularSongs()

        setPlaylist({
          title: 'The Most Popular Songs',
          author: user,
          image: images.popular,
          // @ts-expect-error
          songs: s
        })
      } else {
        const p = await getPlaylistById(Number(id))
        setPlaylist(p || ({} as IPlaylist))
      }
    }
    get()
  }, [id, myPlaylists])

  return (
    <HOC>
      {playlist.image && (
        <>
          <Header pl={playlist} />
          <SongsList
            type='playlist'
            playlistId={playlist.id}
            songs={playlist.songs}
          />
        </>
      )}
    </HOC>
  )
}

export default PlaylistPage
