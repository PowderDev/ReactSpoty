import React, { FC, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ISong, IUser } from "../../../../shared/models"
import { editTitle, millisToMinutesAndSeconds } from "../../helpers/helperFuctions"
import { useAppSelector } from "../../helpers/hooks/redux"
import { addSongToPlaylist } from "../../store/actions/playlistAction"
import { followSong, unfollowSong } from "../../store/actions/songAction"

interface Props {
  song: ISong
  i: number
  type: "playlist" | "album" | "profile"
  authors?: IUser[]
  handleClickOnButton: (song: ISong) => void
}

const SongRow: FC<Props> = ({ song, i, type, authors, handleClickOnButton }) => {
  const [playBtn, setPlayBtn] = useState(false)
  const [playlistsListIsOpen, setPlaylistsListIsOpen] = useState(false)
  const { user } = useAppSelector((state) => state.user)
  const { myPlaylists } = useAppSelector((state) => state.playlist)
  const { followedSongsIds } = useAppSelector((state) => state.song)
  const { currentSong, paused } = useAppSelector((state) => state.player)

  const dispatch = useDispatch()
  const nav = useNavigate()

  const handleAddingSongToPlaylist = async (playlistId: number, songId: number) => {
    await addSongToPlaylist(playlistId, songId)
    setPlaylistsListIsOpen(false)
  }

  const isFavorite = followedSongsIds.includes(song.id)
  const handleFavorites = () =>
    isFavorite ? dispatch(unfollowSong(song.id)) : dispatch(followSong(song.id))

  const isMine =
    type == "album"
      ? authors?.map((u) => u.id).includes(user.id)
      : song.users.map((u) => u.id).includes(user.id)

  const albumTitle = song.album_title || song.title

  return (
    <div
      className={`songs_list__row ${type == "album" ? "album" : ""}`}
      onMouseOver={() => setPlayBtn(true)}
      onMouseLeave={() => setPlayBtn(false)}
    >
      <div className="songs_list__row__digit">
        {playBtn ? (
          currentSong?.id != song.id ? (
            <span className="material-icons playButton" onClick={() => handleClickOnButton(song)}>
              {" "}
              play_arrow{" "}
            </span>
          ) : (
            <span className="material-icons playButton" onClick={() => handleClickOnButton(song)}>
              {" "}
              {paused ? "play_arrow" : "pause"}{" "}
            </span>
          )
        ) : (
          <p>{i + 1}</p>
        )}
      </div>

      <div className="songs_list__row__info">
        <img src={song.image} alt="" />
        <div className="songs_list__row__info__text">
          <strong>{`${song.title.substring(0, 30)}${song.title.length > 30 ? "..." : ""}`}</strong>
          {type == "playlist" && (
            <div style={{ display: "inline", cursor: "pointer" }}>
              {song.users.map((u, i) => (
                <a onClick={() => nav(`/profile/${u.id}`)}>
                  {u.nickname}
                  {i + 1 != song.users.length ? ", " : ""}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {type != "album" && (
        <p className="songs_list__row__album_title">
          {`${albumTitle.substring(0, 40)}${albumTitle.length > 40 ? "..." : ""}`}
        </p>
      )}

      <div className="songs_list__row__duration">
        {isMine ? null : (
          <span className="material-icons" onClick={handleFavorites}>
            {isFavorite ? "favorite" : "favorite_border"}
          </span>
        )}
        <span
          className="material-icons"
          onClick={() => setPlaylistsListIsOpen(!playlistsListIsOpen)}
        >
          {" "}
          add{" "}
        </span>

        <div
          style={{ display: `${playlistsListIsOpen ? "block" : "none"}` }}
          className="songs_list__row__duration__playlists_list"
        >
          {myPlaylists.length > 0 ? (
            myPlaylists.map((pl) => (
              <p key={pl.id} onClick={() => handleAddingSongToPlaylist(pl.id, song.id)}>
                {editTitle(pl.title, 25)}
              </p>
            ))
          ) : (
            <h4>You have no playlists yet</h4>
          )}
        </div>

        <p>{millisToMinutesAndSeconds(song.duration)}</p>
      </div>
    </div>
  )
}

export default SongRow
