import { Field } from "formik"
import React, { FC } from "react"

export const RForm: FC<any> = ({ errors, touched }) => (
    <>
      <div className='form__item'>
        <label htmlFor='nicknameInput'>Nickname</label>
        <Field id='nicknameInput' name='nickname' />
        {errors.nickname && touched.nickname && (
          <div className='form__item__error'>{errors.nickname}</div>
        )}
      </div>
  
      <div className='form__item'>
        <label htmlFor='emailInput'>Email</label>
        <Field id='emailInput' name='email' type='email' />
        {errors.email && touched.email && (
          <div className='form__item__error'>{errors.email}</div>
        )}
      </div>
  
      <div className='form__item'>
        <label htmlFor='passwordInput'>Password</label>
        <Field id='passwordInput' name='password' />
        {errors.password && touched.password && (
          <div className='form__item__error'>{errors.password}</div>
        )}
      </div>
    </>
  )
  
export const LForm: FC<any> = ({ errors, touched }) => (
    <>
      <div className='form__item'>
        <label htmlFor='loginInput'>Nickname/Email</label>
        <Field id='loginInput' name='login' />
        {errors.login && touched.login && (
          <div className='form__item__error'>{errors.login}</div>
        )}
      </div>
  
      <div className='form__item'>
        <label htmlFor='passwordInput'>Password</label>
        <Field id='passwordInput' name='password' />
        {errors.password && touched.password && (
          <div className='form__item__error'>{errors.password}</div>
        )}
      </div>
    </>
)