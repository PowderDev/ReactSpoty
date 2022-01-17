import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { IAlbum } from '../../../../shared/models'
import { useAppSelector } from '../../helpers/hooks/redux'
import { followAlbum, unfollowAlbum } from '../../store/actions/albumAction'

interface Props {
  data: IAlbum
}

const AlbumHeader: FC<Props> = ({ data: { title, users, image, id } }) => {
  const { user } = useAppSelector((state) => state.user)
  const { followedAlbumsIds } = useAppSelector((state) => state.album)

  const dispatch = useDispatch()

  const isMine = users.find(u => u.id == user.id)

  const isFavorite = followedAlbumsIds.includes(id)
  const handleFavorites = () =>
    isFavorite ? dispatch(unfollowAlbum(id)) : dispatch(followAlbum(id))

  return (
    <div className='collection__header'>
      <div className='collection__header__image'>
        <img src={image} alt='' />
      </div>
      <div className='collection__header__info'>
        <p>Album</p>
        {title.length < 40 
          ? <h1>{title}</h1>
          : <h2>{title}</h2>
        }
        <div className='collection__header__info__author'>
          <pre style={{ fontSize: '1rem' }}>
            {users.map((u) => u.nickname).join(', ')}
          </pre>
          {!isMine && (
            <span className='material-icons' onClick={handleFavorites}>
              
              {isFavorite ? 'favorite' : 'favorite_border'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default AlbumHeader
