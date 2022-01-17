import * as Yup from 'yup'

export const RegistrationSchema = Yup.object().shape({
  nickname: Yup.string()
    .min(2, 'This nickname is too short')
    .max(100, 'This nickname is too long')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'This password is too short')
    .max(50, 'This password is too long')
    .required('Required')
})

export const LoginSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, 'This nickname/email is too short')
    .max(100, 'This nickname/email is too long')
    .required('Required'),
  password: Yup.string()
    .min(2, 'This password is too short')
    .max(50, 'This password is too long')
    .required('Required')
})

export const validationScheme = Yup.object().shape({
  image: Yup.mixed().nullable().required(),
  audios: Yup.mixed().required(),
  title: Yup.string().min(1).max(100).required(),
  authors: Yup.array().required()
})
