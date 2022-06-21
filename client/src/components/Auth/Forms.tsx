import React from "react"
import { Formik, Form } from "formik"

import { useDispatch } from "react-redux"
import { LoginSchema, RegistrationSchema } from "../../helpers/formSchemas"
import { userLogin, userRegistration } from "../../store/actions/userActions"
import { LForm, RForm } from "./FormsContent"

export function RegistrationForm() {
  const dispatch = useDispatch()

  return (
    <div className="form_wrapper">
      <h1>Registration</h1>
      <Formik
        initialValues={{ nickname: "", email: "", password: "" }}
        validationSchema={RegistrationSchema}
        onSubmit={(values) => {
          dispatch(userRegistration(values))
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <RForm errors={errors} touched={touched} />
            {/* {error && <div className="form__error">{error}</div>} */}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export function LoginForm() {
  const dispatch = useDispatch()

  return (
    <div className="form_wrapper">
      <h1>Login</h1>
      <Formik
        initialValues={{ login: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          dispatch(userLogin(values))
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <LForm errors={errors} touched={touched} />
            {/* {error && <div className="form__error">{error}</div>} */}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
