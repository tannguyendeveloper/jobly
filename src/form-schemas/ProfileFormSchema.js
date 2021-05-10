import * as yup from 'yup';

const SignUpFormSchema = yup.object().shape({
  username: yup.string().max(25).required(),
  password: yup.string().min(5).required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required()
})

export default SignUpFormSchema;