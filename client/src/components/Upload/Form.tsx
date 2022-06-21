import React, { FC } from "react"
import Select from "react-select"
import { ErrorMessage, Form } from "formik"

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? "white" : "black",
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#7393B3",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "white",
  }),
}

interface Props {
  setFieldValue: (f: string, v: any) => void
  options: { value: number; label: string }[]
  imageUrl: string
  audioUrls: string[]
  imageInputRef: any
  audioInputRef: any
  defaultOption: any
  loading: boolean
  setQuery: (q: string) => void
  setImage: (file: File) => void
  setAudios: (files: File[], s: any) => void
  type: "song" | "album"
  songs: { duration: number; title: string }[] | undefined
}

const FormFields: FC<Props> = ({
  type,
  songs,
  setFieldValue,
  options,
  imageInputRef,
  imageUrl,
  audioInputRef,
  setAudios,
  setImage,
  audioUrls,
  defaultOption,
  setQuery,
  loading,
}) => (
  <Form>
    <div className="song_form__title">
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        onChange={(e) => setFieldValue("title", e.target.value)}
        id="title"
      />
    </div>
    <div className="song_form__error">
      <ErrorMessage name="title" />
    </div>

    <div className="song_form__upload">
      <div className="song_form__upload__info">
        <label htmlFor="image">Image:</label>
        <button
          type="button"
          style={{ borderColor: `${imageUrl ? "green" : "red"}` }}
          onClick={() => imageInputRef.current?.click()}
        >
          <span className="material-icons"> file_upload </span>Upload
        </button>
        {imageUrl && <img src={imageUrl} alt="" />}
      </div>

      <input
        accept="image/jpg, image/jpeg, image/png"
        ref={imageInputRef}
        type="file"
        id="image"
        hidden
        onChange={(e: any) => {
          setImage(e.target.files[0])
          setFieldValue("image", e.target.files[0])
        }}
      />
    </div>
    <div className="song_form__error">
      <ErrorMessage name="image" />
    </div>

    <div className="song_form__upload">
      <div className="song_form__upload__info">
        <label htmlFor="audio">Audio:</label>
        <button
          type="button"
          style={{ borderColor: `${audioUrls.length > 0 ? "green" : "red"}` }}
          onClick={() => audioInputRef.current?.click()}
        >
          <span className="material-icons"> file_upload </span>Upload
        </button>
      </div>

      <input
        multiple={type == "album"}
        accept="audio/mp3, audio/wav"
        type="file"
        id="audio"
        ref={audioInputRef}
        hidden
        onChange={(e: any) => {
          setAudios(e.target.files, setFieldValue)
          setFieldValue("audios", e.target.files)
        }}
      />

      {audioUrls.length > 0 && (
        <div className="song_form__upload__audios">
          {audioUrls.map((url, i) => (
            <div key={i}>
              <strong>{i + 1}.</strong>
              <audio src={url} controls />
            </div>
          ))}
        </div>
      )}
    </div>
    <div className="song_form__error">
      <ErrorMessage name="audio" />
    </div>

    <div className="song_form__select">
      Artist(s):
      <Select
        isLoading={loading}
        styles={customStyles}
        onInputChange={(val: string) => setQuery(val)}
        defaultValue={defaultOption}
        onChange={(obj) =>
          setFieldValue(
            "authors",
            obj.map((item: any) => item.value)
          )
        }
        isMulti
        options={options}
      />
    </div>
    <div className="song_form__error">
      <ErrorMessage name="authors" />
    </div>

    {type == "album" &&
      songs &&
      songs.length > 0 &&
      songs.map((song, i) => (
        <div key={i} className="song_form__title">
          <label htmlFor={`${song.title}#${i}`}>№{i + 1}:</label>
          <input
            type="text"
            required
            defaultValue={song.title}
            onChange={(e) => {
              setFieldValue(
                "songs",
                (() => {
                  songs[i].title = e.target.value
                  return songs
                })()
              )
            }}
            id={`${song.title}#${i}`}
          />
        </div>
      ))}

    <button type="submit">Submit</button>
  </Form>
)

export default FormFields
