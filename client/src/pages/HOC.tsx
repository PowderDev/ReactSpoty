import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState
} from 'react'
import { ToastContainer } from 'react-toastify'
import RightSide from '../components/Right-Side/RightSide'
import SideBar from '../components/sidebar/SideBar'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../helpers/hooks/redux'
import Modal from '../components/Modal-Window/Modal'
import CreatePlaylist from '../components/Modal-Window/CreatePlaylists'

export const modalContext = createContext({
  modalIsOpen: false,
  setModalIsOpen: (v: boolean) => {}
})

const HOC: FC = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const token = localStorage.getItem('token')
  const nav = useNavigate()
  const { user } = useAppSelector((state) => state.user)

  useEffect(() => {
    if (!user.id && !token) {
      nav('/login')
    }
  }, [user])

  return (
    <modalContext.Provider value={{ modalIsOpen, setModalIsOpen }}>
      <SideBar />
      <RightSide>{children}</RightSide>
      <ToastContainer style={{ color: 'black' }} />
      <Modal isOpen={modalIsOpen}>
        <CreatePlaylist />
      </Modal>
    </modalContext.Provider>
  )
}

export default HOC
