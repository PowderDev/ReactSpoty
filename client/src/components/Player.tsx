import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  millisToMinutesAndSeconds,
  millisToSeconds,
  secondsToMillis
} from '../helpers/helperFuctions'
import { useAppSelector } from '../helpers/hooks/redux'
import { addListener } from '../store/actions/songAction'
import {
  setCurrentSong,
  setCurrentTime,
  setPaused,
  setVolume
} from '../store/reducers/PlayerSlice'

function Player() {
  const [audio, setAudio] = useState<HTMLAudioElement>(new Audio())
  const [changedTime, setChangedTime] = useState(0)
  const {
    currentSong,
    currentTime,
    paused,
    volume,
    songsList,
    currentSongIdx,
    playlistId
  } = useAppSelector((state) => state.player)
  const dispatch = useDispatch()
  const { user } = useAppSelector(state => state.user)

  useEffect(() => {
    if (!user?.id) {
      if (audio) {
        audio.pause()
        setPaused(true)
      }
    }

    if (currentSong?.id) {
      if (audio || paused) {
        audio.pause()
      }

      audio.src = currentSong.audio
      if (changedTime) {
        audio.currentTime = changedTime
      }

      audio.ontimeupdate = () => { dispatch(setCurrentTime(secondsToMillis(audio.currentTime))) }
      audio.onended = async () => {
        await addListener(currentSong.id, playlistId)
        handleNextSong('forward')
      }

      audio.volume = volume
      if (!paused) {
        audio.play()
      }
      setAudio(audio)

    } else if ( localStorage.getItem('currentSong') && localStorage.getItem('token') ) {
      const volume = localStorage.getItem('volume')
      const currentTime = localStorage.getItem('currentTime')

      if (volume) {
        dispatch(setVolume(JSON.parse(volume)))
      }

      if (currentTime) {
        setChangedTime( millisToSeconds(Number(currentTime)) )
      }


      dispatch(setCurrentSong(JSON.parse(localStorage.getItem('currentSong')!)))
      dispatch(setPaused(true))
    }
  }, [currentSong, user.id])

  useEffect(() => { paused ? audio?.pause() : audio?.play() }, [paused])
  useEffect(() => { audio ? (audio.volume = volume) : null }, [volume])
  useEffect(() => {
    if (audio && changedTime) {
      audio.currentTime = changedTime
      setChangedTime(0)
    }
  }, [changedTime])


  const handleTimeInput = (e: any) =>
    setChangedTime(millisToSeconds(Number(e.target.value)))


  const handleNextSong = (dir: 'forward' | 'backward') => {
    if (dir == 'forward' && currentSongIdx != null) {
      if (songsList.length > 0 && songsList.length == currentSongIdx + 1) {
        dispatch(setCurrentSong(songsList[0]))
      } else {
        dispatch(setCurrentSong(songsList[currentSongIdx + 1]))
      }
    } else if (songsList.length > 0 && currentSongIdx != null) {
      if (currentSongIdx - 1 < 0) {
        dispatch(setCurrentSong(songsList[0]))
      } else {
        dispatch(setCurrentSong(songsList[currentSongIdx - 1]))
      }
    }
  }


  if (!currentSong?.id || !user?.id) return <></>
  return (
    <div className='player'>
      <div className='player__info'>
        <img src={currentSong.image} alt='' />
        <div className='player__info__text'>
          <p>{currentSong.title}</p>
          <p>{currentSong.users.map((u) => u.nickname).join(', ')}</p>
        </div>
      </div>

      <div className='player__playbox'>
        <div className='player__playbox__top'>
          <span
            className={`material-icons ${
              !currentSongIdx || currentSongIdx - 1 < 0 ? 'disabled' : ''
            }`}
            onClick={() => handleNextSong('backward')}
          > skip_previous </span>
          <span
            className='material-icons'
            onClick={() => dispatch(setPaused(!paused))}
          > {paused ? 'play_circle' : 'pause_circle'} </span>
          <span
            className={`material-icons ${
              (currentSongIdx && currentSongIdx >= 0) || !currentSongIdx
                ? ''
                : 'disabled'
            }`}
            onClick={() => handleNextSong('forward')}
          > skip_next </span>
        </div>

        <div className='player__playbox__bot'>
          <small>{millisToMinutesAndSeconds(currentTime)}</small>
          <input
            type='range'
            min={0}
            max={currentSong.duration}
            value={currentTime}
            onChange={handleTimeInput}
          />
          <small>{millisToMinutesAndSeconds(currentSong.duration)}</small>
        </div>
      </div>

      <div className='player__volume'>
        <span className='material-icons'> volume_down </span>
        <input
          type='range'
          min={0}
          max={100}
          value={volume * 100}
          onChange={(e: any) =>
            e.target.value > 0
              ? dispatch(setVolume(Number(e.target.value) / 100))
              : dispatch(setVolume(Number(e.target.value)))
          }
        />
      </div>
    </div>
  )
}

export default Player
