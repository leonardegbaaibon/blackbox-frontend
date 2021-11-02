import { extend } from 'vee-validate'
import {
  email,
  digits,
  integer,
  regex,
  length,
  size,
  numeric,
} from 'vee-validate/dist/rules'

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'Passwords does not match',
})
extend('required', {
  validate(value) {
    return {
      required: true,
      valid: !['', null, undefined].includes(value),
    }
  },
  computesRequired: true,
  message: '{_field_} is required',
})
extend('email', email)
extend('length', length)
extend('digits', digits)
extend('numeric', numeric)
extend('size', {
  ...size,
  message: 'File size must be less than {size}KB',
})
extend('integer', integer)
extend('regex', regex)
extend('compareWith', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'No match',
})
extend('min', {
  validate(value, args) {
    return value.length >= args.length
  },
  params: ['length'],
  message: '{_field_} cannot be less than {length} characters',
})
extend('max', {
  validate(value, args) {
    return value.length <= args.length
  },
  params: ['length'],
  message: '{_field_} cannot be more than {length} characters',
})
extend('minInt', {
  validate(value, args) {
    console.log(value, args, 'VALUE')
    return value >= Number(args.length)
  },
  params: ['length'],
  message: '{_field_} cannot be less than {length}',
})
extend('maxInt', {
  validate(value, args) {
    return value.length <= Number(args.length)
  },
  params: ['length'],
  message: '{_field_} cannot be more than {length}',
})
extend('num_spaces', {
  validate(value, args) {
    return value.length <= Number(args.length)
  },
  params: ['length'],
  message: '{_field_} cannot be more than {length}',
})
extend('password_check', {
  validate(value, args) {
    // eslint-disable-next-line prefer-regex-literals
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    )
    return strongRegex.test(value)
  },
  params: ['length'],
  message:
    '{_field_} must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)',
})
