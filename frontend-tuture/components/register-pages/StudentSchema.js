import * as yup from 'yup';
import {
  uppercaseRegex,
  lowercaseRegex,
  numberRegex,
  specialCharRegex,
  phoneRegex,
} from '../commons/Regex';
import {
  MAX_USERNAME_LENGTH,
  MIN_PWD_LENGTH,
  MAX_PWD_LENGTH,
} from './Constants';

export const studentRegisterSchema = yup.object().shape({
  username: yup
    .string()
    .max(
      MAX_USERNAME_LENGTH,
      `Username must not exceed ${MAX_USERNAME_LENGTH} characters`
    )
    .required(),
  new_password: yup
    .string()
    .min(MIN_PWD_LENGTH, `Password must at least ${MIN_PWD_LENGTH} characters`)
    .max(
      MAX_PWD_LENGTH,
      `Password must not exceed ${MAX_PWD_LENGTH} characters`
    )
    .matches(uppercaseRegex, 'Contains at least 1 uppercase letters')
    .matches(lowercaseRegex, 'Contains at least 1 lowercase letters')
    .matches(numberRegex, 'Contains at least 1 numerical letters')
    .matches(specialCharRegex, 'Contains at least 1 special letters')
    .test(
      'oneOfRequired',
      'Password is too weak',
      (value) => zxcvbn(value).score >= 2
    )
    .required(),
  new_password_confirm: yup
    .string()
    .oneOf(
      [yup.ref('new_password'), null],
      'Confirm password does not match with password'
    )
    .required(),
  first_name: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'First name must contain only alphabet')
    .required(),
  last_name: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'Last name must contain only alphabet')
    .required(),
  email: yup.string().email(),
  phone: yup
    .string()
    .matches(phoneRegex, 'Phone number must contain only number')
    .required(),
  gender: yup
    .string()
    .oneOf(['male', 'female', 'non-binary', 'not_specified'])
    .required(),
});
