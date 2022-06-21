import React, { FC, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../helpers/hooks/redux"
import { userLogout } from "../../store/actions/userActions"

interface Props {
  open: boolean
  setOpen: (val: boolean) => void
}

const Navbar: FC<Props> = ({ open, setOpen }) => {
  const nav = useNavigate()
  const { user, isAuth } = useAppSelector((state) => state.user)
  const dispatch = useDispatch()

  return (
    <div className="navbar">
      <div className="navbar__arrows">
        <span className="material-icons" onClick={() => nav(-1)}>
          arrow_back
        </span>
      </div>

      {isAuth && (
        <div
          onClick={(e) => {
            e.stopPropagation()
            setOpen(!open)
          }}
          className="navbar__profile"
        >
          <img src={user.image} alt="" />
          <p>{user.nickname}</p>
          <span className="material-icons"> expand_more </span>
        </div>
      )}

      {!isAuth && (
        <div className="navbar__buttons">
          <button onClick={() => nav("/registration")} className="navbar__buttons__item">
            Registration
          </button>
          <button onClick={() => nav("/login")} className="navbar__buttons__item">
            Login
          </button>
        </div>
      )}

      {open && isAuth && (
        <div className="navbar__dropdown">
          <div onClick={() => nav(`/profile/${user.id}`)} className="navbar__dropdown__item">
            <p>Profile</p>
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation()
              dispatch(userLogout())
            }}
            className="navbar__dropdown__item"
          >
            <p>Logout</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
