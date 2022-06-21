import React, { FC, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { IPlaylist } from "../../../../shared/models"
import { ImageFD } from "../../helpers/helperFuctions"
import { useAppSelector } from "../../helpers/hooks/redux"
import { followPlaylist, unfollowPlaylist, updateImage } from "../../store/actions/playlistAction"

interface Props {
  pl: IPlaylist
}

const defaultPLs = ["liked", "recently", "popular"]

const Header: FC<Props> = ({ pl }) => {
  const [hovered, setHovered] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { user } = useAppSelector((state) => state.user)
  const { followedPlaylistsIds } = useAppSelector((state) => state.playlist)
  const { id } = useParams()

  const dispatch = useDispatch()

  const isMine = pl.author.id == user.id

  const isFavorite = followedPlaylistsIds.includes(pl.id)
  const handleFavorites = () =>
    isFavorite ? dispatch(unfollowPlaylist(pl.id)) : dispatch(followPlaylist(pl.id))

  const uploadImage = (e: any) => dispatch(updateImage(ImageFD(e.target.files[0]), pl.id))

  return (
    <div className="collection__header">
      <div className="collection__header__image">
        <img src={pl.image} alt="" />
        {pl.author.id == user.id && !defaultPLs.includes(`${id}`) && (
          <div
            style={{ opacity: `${hovered ? 0.7 : 0}` }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => inputRef.current?.click()}
            className="collection__header__image__cover"
          >
            <span className="material-icons"> add_a_photo </span>
            <input onChange={uploadImage} ref={inputRef} type="file" hidden />
          </div>
        )}
      </div>
      <div className="collection__header__info">
        <p>Playlist</p>
        <h1>{pl.title}</h1>
        <div className="collection__header__info__author">
          {!defaultPLs.includes(`${id}`) ? (
            <>
              <img src={pl.author.image} alt="" />
              <strong>{pl.author.nickname}</strong>
              <strong>--</strong>
            </>
          ) : null}
          <small>{pl.songs.length} Tracks</small>
          {isMine ? null : (
            <span className="material-icons" onClick={handleFavorites}>
              {isFavorite ? "favorite" : "favorite_border"}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
