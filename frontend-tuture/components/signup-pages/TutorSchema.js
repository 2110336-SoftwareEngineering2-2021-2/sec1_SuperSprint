import * as yup from 'yup';
import {
  uppercaseRegex,
  lowercaseRegex,
  numberRegex,
  specialCharRegex,
  phoneRegex,
} from '../commons/Regex';
import zxcvbn from 'zxcvbn';
import moment from 'moment';

const MIN_PWD_LENGTH = 8;
const MAX_PWD_LENGTH = 30;
const MAX_USERNAME_LENGTH = 30;

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

export const tutorRegisterSchema = yup.object().shape({
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
    .oneOf(['m', 'f', 'non-binary', 'not_specified'])
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
  price: yup.object({
    min: yup.number().min(0).max(10000),
    max: yup
      .number()
      .min(0)
      .max(10000)
      .test(function (value, context) {
        const price_min = context.parent.min;
        return value >= price_min;
      }),
  }),
  availability: yup
    .array()
    .of(
      yup.object({
        from: yup
          .date()
          .typeError('Type error : from')
          .nullable(true)
          .test(
            'not-past',
            'Start time must not be in the past',
            function (value) {
              return new Date() <= value;
            }
          ),
        to: yup.date().typeError('Type error : to').nullable(true),
      })
    )
    .test(
      'null',
      'Available time must be provided for added boxes',
      function (value, context) {
        var nullCount = 0;
        value.forEach((e) => {
          if (!e.from || !e.to) nullCount++;
        });
        const A = !!value[0].from;
        const B = !!value[0].to;
        return (
          (value.length !== 1 && nullCount === 0) ||
          (value.length === 1 && !(A ^ B))
        );
      }
    )
    .test(
      'from is less or equal to',
      'End time must be equal or greater than start time',
      function (value, context) {
        var isError = false;
        value.forEach((e) => {
          if (!isError && e.from > e.to) isError = true;
        });
        return !isError;
      }
    )
    .test(
      'overlapDate',
      'Available time must not be overlapped',
      function (value, context) {
        const len = value.length;
        for (var i = 0; i < len; i++) {
          for (var j = i + 1; j < len; j++) {
            const is_fj_greater_ti = moment(
              value[j].from,
              'HH:mm'
            ).isSameOrAfter(moment(value[i].to, 'HH:mm'));

            const is_fi_greater_tj = moment(
              value[i].from,
              'HH:mm'
            ).isSameOrAfter(moment(value[j].to, 'HH:mm'));

            if (!is_fi_greater_tj && !is_fj_greater_ti) {
              return false;
            }
          }
        }
        return true;
      }
    ),
});
