import { Form, Formik } from "formik"
import React, { useContext } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../helpers/hooks/redux"
import { modalContext } from "../../pages/HOC"
import { createPlaylist } from "../../store/actions/playlistAction"

function CreatePlaylist() {
  const { user } = useAppSelector((state) => state.user)
  const dispatch = useDispatch()
  const { setModalIsOpen } = useContext(modalContext)

  return (
    <Formik
      initialValues={{ title: "" }}
      onSubmit={(values) => {
        dispatch(createPlaylist(values.title, user.id))
        setModalIsOpen(false)
      }}
      render={({ handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit} className="modal__create_playlist">
          <h2>New Playlist</h2>
          <div className="modal__create_playlist__title">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              onChange={(e) => setFieldValue("title", e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    />
  )
}

export default CreatePlaylist
