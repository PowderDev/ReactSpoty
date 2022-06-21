import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IAlbum } from "../../../../shared/models"
import AlbumHeader from "../../components/Album/AlbumHeader"
import SongsList from "../../components/SongsList/SongsList"
import { getAlbumById } from "../../store/actions/albumAction"
import HOC from "../HOC"

function AlbumPage() {
  const [album, setAlbum] = useState({} as IAlbum)
  const { id } = useParams()

  useEffect(() => {
    getAlbumById(Number(id)).then((album) => {
      if (album) setAlbum(album)
    })
  }, [])

  return (
    <HOC>
      {album?.songs?.length > 0 && <AlbumHeader data={album} />}
      {album?.songs?.length > 0 && (
        <SongsList type="album" authors={album.users} songs={album.songs} />
      )}
    </HOC>
  )
}

export default AlbumPage
