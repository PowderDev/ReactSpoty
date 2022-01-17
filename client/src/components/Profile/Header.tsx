import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IUser } from '../../../../shared/models'
import { ImageFD } from '../../helpers/helperFuctions'
import { useAppSelector } from '../../helpers/hooks/redux'
import { updateAvatar } from '../../store/actions/userActions'

const Header: FC<{ propUser?: IUser }> = ({ propUser }) => {
  const [hovered, setHovered] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const { user } = useAppSelector((state) => state.user)
  const nav = useNavigate()

  const uploadImage = (e: any) => dispatch(updateAvatar(ImageFD(e.target.files[0])))

  const profile = propUser?.id ? propUser : user

  return (
    <div className='profile__header'>
      <div className='profile__header__image'>
        {profile.id == user.id ? (
          <img src={user.image} alt='' />
        ) : (
          <img src={profile.image} alt='' />
        )}
        {profile.id == user.id && (
          <div
            style={{ opacity: `${hovered ? 0.7 : 0}` }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => inputRef.current?.click()}
            className='profile__header__image__cover'
          >
            <span className='material-icons'> add_a_photo </span>
            <input onChange={uploadImage} ref={inputRef} type='file' hidden />
          </div>
        )}
      </div>

      <div className='profile__header__info'>
        <h1>{profile.nickname}</h1>
        <p>{profile.listeners} Listeners</p>
      </div>

      {profile.id == user.id && (
        <div className='profile__header__btns'>
          <button
            onClick={() => nav('/song/upload')}
            className='profile__header__btns__btn'
          >
            <span className='material-icons'> file_upload </span>
            Upload new song
          </button>
          <button
            onClick={() => nav('/album/upload')}
            className='profile__header__btns__btn'
          >
            <span className='material-icons'> file_upload </span>
            Upload new album
          </button>
        </div>
      )}
    </div>
  )
}

export default Header
