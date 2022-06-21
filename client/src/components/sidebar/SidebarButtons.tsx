import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { modalContext } from "../../pages/HOC"

function SidebarButtons() {
  const nav = useNavigate()
  const { modalIsOpen, setModalIsOpen } = useContext(modalContext)

  return (
    <>
      <div className="sidebar__links">
        <div className="sidebar__links__link" onClick={() => nav("/")}>
          <span className="material-icons"> home </span>
          <p>Home</p>
        </div>
        <div className="sidebar__links__link" onClick={() => nav("/search")}>
          <span className="material-icons"> search </span>
          <p>Search</p>
        </div>
        <div className="sidebar__links__link" onClick={() => nav("/library")}>
          <span className="material-icons"> library_music </span>
          <p>Music Library</p>
        </div>
        <div className="sidebar__links__link" onClick={() => nav("/playlist/liked")}>
          <img
            src="https://res.cloudinary.com/powder-shopit/image/upload/v1642434043/0774a492388967e2b5b6d65b95f3fd1a_l3axck.png"
            alt=""
          />
          <p>Liked songs</p>
        </div>
      </div>

      <div className="sidebar__actions">
        <div className="sidebar__actions__action" onClick={() => setModalIsOpen(!modalIsOpen)}>
          <span className="material-icons"> add_box </span>
          <p>Create a playlist</p>
        </div>
      </div>
    </>
  )
}

export default SidebarButtons
