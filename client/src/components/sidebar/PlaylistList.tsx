import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IPlaylist } from "../../../../shared/models"
import { editTitle } from "../../helpers/helperFuctions"
import { useAppSelector } from "../../helpers/hooks/redux"

function PlaylistList() {
  const { myPlaylists, followedPlaylists } = useAppSelector((state) => state.playlist)
  const [playlists, setPlaylists] = useState([] as IPlaylist[])
  const nav = useNavigate()

  useEffect(() => {
    setPlaylists([...myPlaylists, ...followedPlaylists])
  }, [myPlaylists, followedPlaylists])

  return (
    <div className="sidebar__playlist_collection">
      <hr />
      {playlists.length > 0 &&
        playlists.map((pl) => (
          <p key={pl.id} onClick={() => nav(`/playlist/${pl.id}`)}>
            {editTitle(pl.title, 19)}
          </p>
        ))}
    </div>
  )
}

export default PlaylistList
