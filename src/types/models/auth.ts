import { z } from 'zod'
import { monthNames } from '../date'

/**
 * Validation zod Schema
 * full_name: Not empty, no symbols, no spaces around.
 * contact_number: Not empty, Canadian phone number format
 * email: Not empty, email format
 * day: Not empty, calendar days
 * month: Not empty, Jan - Dec.
 * year: Not empty, any future date.
 * password:
 1. Not empty.
 2. Lower case (a-z), upper case (A-Z) and numbers (0-9).
 3. Must have 8 characters in length
 * confirm_password: Must be the same as the password field
 */
export const validationSchema = z.object({
  fullName: z.string({
    required_error: 'Full Name is required',
  })
    .min(1, {
      message: 'Full Name field is required'
    })
    .refine(val => {
      // Check special characters
      return val.search(/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/) < 0
    }, {
      message: 'Symbol is not allowed',
    })
    .refine(val => {
      // Check spaces around.
      return !(val.startsWith(' ') || val.endsWith(' '))
    }, {
      message: 'Spaces around is invalid',
    }),
  contactNumber: z.string({
    required_error: 'Contact Number is required',
  })
    .min(1, {
      message: 'Contact Number is required'
    })
    .refine(val => {
      // Check special characters
      // xxx-xxx-xxxx
      // xxxxxxxxxx
      const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      return regex.test(val)
    }, {
      message: 'Type Contact Number like xxx-xxx-xxxx',
    }),
  email: z.string({
    required_error: 'Contact Number is required',
  })
    .min(1, {
      message: 'Email is required'
    })
    .email({
      message: 'Type Email Format'
    }),
  password: z.string({
    required_error: 'Password is required'
  })
    .min(8, {
      message: 'minimum password is 8'
    })
    .refine(val => {
      // Check lowercase
      if (val.search(/[a-z]/i) < 0) return false
      // Check uppercase
      if (val.search(/[A-Z]/i) < 0) return false
      // Check number
      if (val.search(/[0-9]/) < 0) return false

      return true
    }, {
      message: 'Password is not valid',
    }),
  confirmPassword: z.string({
    required_error: 'Confirm Password is required'
  }),
  year: z.string({
    required_error: 'year is required'
  })
    .refine(val => {
      const numberYear = Number(val)
      return !(!numberYear
        || numberYear > new Date().getFullYear()
        || numberYear <= 0)
    }, {
      message: 'Invalid year',
    }),
  month: z.string({
    required_error: 'month is required'
  }).min(3, {
    message: 'month is required'
  }),
  day: z.string({
    required_error: 'day is required'
  })
    .min(1, {
      message: 'day is required'
    })
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords are not matched'
}).refine(data => {
  // Find the month by month name
  const numberOfMonth = monthNames.findIndex(monthName => monthName === data.month)
  if (numberOfMonth === -1) return false

  const day = Number(data.day)
  const lastDayInMonth = new Date(Number(data.year), numberOfMonth + 1, 0).getDate()
  // Check day is between 1 and last day in month
  return !(day > lastDayInMonth || day <= 0)
}, {
  path: ['day'],
  message: 'Invalid day',
})
