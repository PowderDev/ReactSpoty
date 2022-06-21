import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IPlaylist } from "../../../../shared/models"
import Header from "../../components/Playlist/Header"
import SongsList from "../../components/SongsList/SongsList"
import { useAppSelector } from "../../helpers/hooks/redux"
import { getPlaylistById } from "../../store/actions/playlistAction"
import { getMostPopularSongs, getRecentlyListened } from "../../store/actions/songAction"
import HOC from "../HOC"

function PlaylistPage() {
  const [playlist, setPlaylist] = useState({} as IPlaylist)
  const { user } = useAppSelector((state) => state.user)
  const { followedSongs } = useAppSelector((state) => state.song)
  const { myPlaylists } = useAppSelector((state) => state.playlist)
  const { images } = useAppSelector((state) => state.song)

  const { id } = useParams()

  const defaultPlaylistProps = {
    id: Math.random(),
    public: true,
    listeners: 1,
  }

  useEffect(() => {
    if (id == "liked") {
      setPlaylist({
        title: "Liked songs",
        author: user,
        image: images.liked,
        songs: followedSongs,
        ...defaultPlaylistProps,
      })
    } else if (id == "recently") {
      getRecentlyListened().then((songs) => {
        if (songs) {
          setPlaylist({
            title: "Recently Listened",
            author: user,
            image: images.recently,
            songs,
            ...defaultPlaylistProps,
          })
        }
      })
    } else if (id == "popular") {
      getMostPopularSongs().then((songs) => {
        if (songs) {
          setPlaylist({
            title: "The Most Popular Songs",
            author: user,
            image: images.popular,
            songs,
            ...defaultPlaylistProps,
          })
        }
      })
    } else {
      getPlaylistById(Number(id)).then((playlist) => {
        if (playlist) setPlaylist(playlist)
      })
    }
  }, [id, myPlaylists])

  return (
    <HOC>
      {playlist.image && (
        <>
          <Header pl={playlist} />
          <SongsList type="playlist" playlistId={playlist.id} songs={playlist.songs} />
        </>
      )}
    </HOC>
  )
}

export default PlaylistPage
