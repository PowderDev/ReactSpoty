import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IAlbum, ISong, IUser } from "../../../../shared/models"
import CardsContainer from "../../components/Home/CardsContainer"
import SongsList from "../../components/SongsList/SongsList"
import Header from "../../components/Profile/Header"
import { useAppSelector } from "../../helpers/hooks/redux"
import { getUsersAlbums } from "../../store/actions/albumAction"
import { getUsersSongs } from "../../store/actions/songAction"
import HOC from "../HOC"
import { fetchUserById } from "../../store/actions/userActions"

function Profile() {
  const [songs, setSongs] = useState<ISong[]>([] as ISong[])
  const [albums, setAlbums] = useState<IAlbum[]>([] as IAlbum[])
  const [propUser, setPropUser] = useState({} as IUser)
  const { user } = useAppSelector((state) => state.user)
  const { id } = useParams()

  useEffect(() => {
    fetchUserById(Number(id)).then((user) => {
      if (user) {
        setPropUser(user)
        getUsersSongs(user.id).then((songs) => setSongs(songs || []))
        getUsersAlbums(user.id).then((albums) => setAlbums(albums || []))
      }
    })
  }, [])

  return (
    <HOC>
      <Header propUser={propUser} />
      <SongsList type="profile" songs={songs} />
      {albums.length > 0 && (
        <CardsContainer
          type="vertical"
          collectionType="album"
          title={`All of ${user.nickname} Albums`}
          list={albums}
        />
      )}
    </HOC>
  )
}

export default Profile
