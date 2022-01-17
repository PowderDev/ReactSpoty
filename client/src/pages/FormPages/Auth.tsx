import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LoginForm, RegistrationForm } from '../../components/Auth/Forms'
import { useAppSelector } from '../../helpers/hooks/redux'
import HOC from '../HOC'

function Auth() {
  const location = useLocation()
  const nav = useNavigate()
  const { isAuth } = useAppSelector((state) => state.user)

  useEffect(() => {
    if (isAuth) nav('/')
  }, [isAuth])

  return (
    <HOC>
      {location.pathname == '/registration' ? (
        <RegistrationForm />
      ) : (
        <LoginForm />
      )}
    </HOC>
  )
}

export default Auth
