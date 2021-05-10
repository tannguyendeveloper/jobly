import * as yup from 'yup';

const LoginFormSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
})

export default LoginFormSchema;