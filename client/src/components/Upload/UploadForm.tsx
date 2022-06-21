import { Formik } from "formik"
import React, { FC, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { IUser } from "../../../../shared/models"
import { validationScheme } from "../../helpers/formSchemas"
import { secondsToMillis } from "../../helpers/helperFuctions"
import useDebounce from "../../helpers/hooks/debounce"
import { useAppSelector } from "../../helpers/hooks/redux"
import { uploadAlbum } from "../../store/actions/albumAction"
import { uploadSong } from "../../store/actions/songAction"
import { getUsersByQuery } from "../../store/actions/userActions"
import { setAlbumStatus } from "../../store/reducers/AlbumSlice"
import { setSongStatus } from "../../store/reducers/SongSlice"
import FormFields from "./Form"

interface Props {
  type: "song" | "album"
}

interface Vals {
  image: Blob | null
  title: string
  authors: number[]
  duration?: number | null
  audios: File[] | []
  songs?: { duration: number; title: string }[] | []
}

const UploadForm: FC<Props> = ({ type }) => {
  const [imageUrl, setImageUrl] = useState("")
  const [audioUrls, setAudioUrls] = useState<string[]>([])
  const [foundUsers, setFoundUsers] = useState([] as IUser[])
  const imageInputRef = useRef<HTMLInputElement>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)

  const { user, userLoading } = useAppSelector((state) => state.user)
  const { status } = useAppSelector((state) => state[type])
  const defaultOption = { value: user.id, label: user.nickname }

  let initVals: Vals = {
    image: null,
    title: "",
    authors: [defaultOption.value],
    audios: [],
  }

  if (type == "song") {
    initVals = { ...initVals, duration: null }
  } else {
    initVals = { ...initVals, songs: [] }
  }

  const [query, setQuery] = useState("")

  const queryValue = useDebounce(query, 200)
  const nav = useNavigate()

  useEffect(() => {
    getUsersByQuery(queryValue).then((users) => {
      setFoundUsers(users || [])
    })
  }, [queryValue])

  useEffect(() => {
    if (status == "success") {
      setTimeout(() => nav(`/profile/${user.id}`), 250)
      if (type == "album") {
        dispatch(setAlbumStatus("default"))
      } else {
        dispatch(setSongStatus("default"))
      }
    }
  }, [status])

  const dispatch = useDispatch()

  const setImage = (file: Blob) => {
    if (file) {
      const fr = new FileReader()
      fr.onload = () => {
        // @ts-expect-error
        setImageUrl(fr.result)
      }
      fr.readAsDataURL(file)
    }
  }

  const setAudios = (files: File[], setter: (f: string, v: any) => void) => {
    let songs: { duration: number }[] = []
    const onload = (fileName: string) =>
      function (e: any) {
        const audio = new Audio(e.target.result)
        audio.addEventListener("loadedmetadata", () => {
          const duration = secondsToMillis(audio.duration)
          if (type == "song") {
            setter("duration", duration)
          } else {
            // @ts-expect-error
            songs = [...songs, { duration, title: fileName.replace(".mp3", "") }]
            setter("songs", songs)
          }
        })
        setAudioUrls((prev) => [...prev, audio.src])
      }
    if (files) {
      setAudioUrls([])
      for (const file of files) {
        const reader = new FileReader()
        reader.onload = onload(file.name)
        reader.readAsDataURL(file)
      }
    }
  }

  const fields: FC<any> = ({ values, setFieldValue }) => (
    <FormFields
      type={type}
      songs={values.songs}
      setFieldValue={setFieldValue}
      audioUrls={audioUrls}
      audioInputRef={audioInputRef}
      setAudios={setAudios}
      setImage={setImage}
      defaultOption={defaultOption}
      setQuery={setQuery}
      imageInputRef={imageInputRef}
      imageUrl={imageUrl}
      options={foundUsers!.map((user) => ({
        value: user.id,
        label: user.nickname,
      }))}
      loading={userLoading}
    />
  )

  return (
    <div className="song_form">
      <Formik
        initialValues={initVals}
        onSubmit={async (values) => {
          const fd = new FormData()

          for (const key in values) {
            if (key == "audios" && type == "song") {
              fd.append("audio", values[key][0], "audio")
            } else if (key == "audios" && type == "album") {
              for (const audio of values.audios) {
                fd.append("audios", audio, audio.name)
              }
            } else if (key == "songs" && type == "album") {
              fd.append("songs", JSON.stringify(values[key]))
            } else {
              //@ts-expect-error
              fd.append(key, values[key])
            }
          }

          console.log(fd.get("audios"))

          if (type == "song") {
            dispatch(uploadSong(fd))
          } else {
            dispatch(uploadAlbum(fd))
          }
        }}
        validationSchema={validationScheme}
        render={fields}
      />
    </div>
  )
}

export default UploadForm
