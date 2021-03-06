import React, { useEffect, useState } from "react"
import { IAlbum, IPlaylist, ISong, IUser } from "../../../../shared/models"
import CardsContainer from "../../components/Home/CardsContainer"
import SongsList from "../../components/SongsList/SongsList"
import useDebounce from "../../helpers/hooks/debounce"
import { getAlbumsByQuery } from "../../store/actions/albumAction"
import { getPlaylistsByQuery } from "../../store/actions/playlistAction"
import { getSongsByQuery } from "../../store/actions/songAction"
import { getUsersByQuery } from "../../store/actions/userActions"
import HOC from "../HOC"

function SearchPage() {
  const [query, setQuery] = useState(localStorage.getItem("query") || "")
  const [albums, setAlbums] = useState([] as IAlbum[])
  const [playlists, setPlaylists] = useState([] as IPlaylist[])
  const [users, setUsers] = useState([] as IUser[])
  const [songs, setSongs] = useState([] as ISong[])

  const queryValue = useDebounce(query, 250)

  useEffect(() => {
    const setters = [getSongsByQuery, getAlbumsByQuery, getPlaylistsByQuery, getUsersByQuery]
    const promises = []

    for (const setter of setters) {
      promises.push(() => setter(queryValue))
    }

    Promise.all(promises).then((results) => {
      results[0]().then((songs) => setSongs(songs || []))
      results[1]().then((albums) => getAlbumsByQuery(albums || []))
      results[2]().then((playlists) => getPlaylistsByQuery(playlists || []))
      results[3]().then((users) => getUsersByQuery(users || []))
    })

    localStorage.setItem("query", queryValue)
  }, [queryValue])

  return (
    <HOC>
      <div className="search_page">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        {songs.length > 0 && <SongsList songs={songs} type="playlist" />}
        {albums.length > 0 && (
          <CardsContainer type="vertical" title="Albums" collectionType="album" list={albums} />
        )}
        {playlists.length > 0 && (
          <CardsContainer
            collectionType="playlist"
            type="vertical"
            title="Playlists"
            list={playlists}
          />
        )}
        {users.length > 0 && (
          <CardsContainer collectionType="user" type="vertical" title="Authors" list={users} />
        )}
      </div>
    </HOC>
  )
}

export default SearchPage
