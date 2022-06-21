import React, { FC, useContext, useState } from "react"
import Navbar from "./Navbar"
import CreatePlaylist from "../Modal-Window/CreatePlaylists"
import Modal from "../Modal-Window/Modal"
import { modalContext } from "../../pages/HOC"
import { useAppSelector } from "../../helpers/hooks/redux"

const RightSide: FC = ({ children }) => {
  const [dropdownVisb, setDropdownVisb] = useState(false)
  const modal = useContext(modalContext)
  const { user } = useAppSelector((state) => state.user)

  const setClosed = () => {
    setDropdownVisb(false)
    modal.setModalIsOpen(false)
  }

  return (
    <div onClick={setClosed} className="right_side">
      <Navbar setOpen={setDropdownVisb} open={dropdownVisb} />
      {children}
      {user.id && (
        <Modal isOpen={modal.modalIsOpen}>
          <CreatePlaylist />
        </Modal>
      )}
    </div>
  )
}

export default RightSide
