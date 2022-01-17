import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { ISong, IUser } from '../../../../shared/models'
import { useAppSelector } from '../../helpers/hooks/redux'
import { setPaused, setSongsList, setCurrentSong } from '../../store/reducers/PlayerSlice'
import SongRow from './SongRow'

interface Props {
  songs: ISong[]
  type: 'playlist' | 'profile' | 'album'
  authors?: IUser[]
  playlistId?: number
}

const SongsList: FC<Props> = ({ songs, type, authors, playlistId }) => {
  const { currentSong, paused } = useAppSelector((state) => state.player)
  const dispatch = useDispatch()

  const handleClickOnButton = (song: ISong) => {
    if (currentSong.id == song.id) {
      paused ? dispatch(setPaused(false)) : dispatch(setPaused(true))
    } else {
      dispatch(setSongsList({ songs, playlistId }))
      dispatch(setCurrentSong(song))
    }
  }

  if (songs == undefined) {
    return <></>
  }
  return (
    <div className='songs_list'>
      { type == 'profile' && <h2>Most Popular</h2> }
      <div className={ `songs_list__top_row ${ type == 'album' ? 'album' : '' }` }>
        <p>#</p>
        <p>Title</p>
        { type != 'album' ? <p>Album</p> : '' }
        <span className='material-icons'> schedule </span>
      </div>

      <hr />

      {songs?.map((song, i) => (
        <SongRow handleClickOnButton={handleClickOnButton} type={type} key={song.id} authors={authors} song={song} i={i}/>
      ))}
    </div>
  )
}

export default SongsList
