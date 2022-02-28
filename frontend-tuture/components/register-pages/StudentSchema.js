import * as yup from 'yup';
import zxcvbn from 'zxcvbn';
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

yup.addMethod(yup.array, 'unique', function (message) {
  return this.test('unique', message, function (list) {
    const mapper = (x) => String(x.subject) + String(x.level);
    const set = [...new Set(list.map(mapper))];
    const isUnique = list.length === set.length;
    if (isUnique) {
      return true;
    }
    const { path, createError } = this;
    const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
    return this.createError({
      path: `${path}.${idx}`,
      message: message,
    });
  });
});

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
    .required('Please enter the password')
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
    ),
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
  subjects: yup
    .array()
    .of(
      yup.object({
        subject: yup
          .string()
          .test(
            'test-subject',
            'Subject must be selected',
            function (value, context) {
              const parent2 = context.from[1];
              const len = parent2.value.subjects.length;
              if (value === '' && len === 1) {
                return true;
              } else if (value !== '') {
                return true;
              }
              return false;
            }
          ),
        level: yup
          .string()
          .test(
            'test-level',
            'Level must be selected',
            function (value, context) {
              const parent2 = context.from[1];
              const len = parent2.value.subjects.length;
              if (value === '' && len === 1 && context.parent.subject === '') {
                return true;
              } else if (value !== '') {
                return true;
              }
              return false;
            }
          ),
      })
    )
    .unique('Duplicate subject and level'),
});
