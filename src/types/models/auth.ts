import { z } from 'zod'
import { monthNames } from '../date'

export interface AuthReq {
  full_name: string
  contact_number: string
  email: string
  password: string
  day: number
  month: string
  year: number
}

export interface AuthRes<T> {
  data: T
  description: string
  dev_message: string
  title: string
}

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
    // Not empty
    required_error: 'Full Name is required',
  })
    // Not empty
    .min(1, {
      message: 'Full Name is required'
    })
    .refine(val => {
      // Check symbols
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
    // Not empty
    required_error: 'Contact Number is required',
  })
    // Not empty
    .min(1, {
      message: 'Contact Number is required'
    })
    .refine(val => {
      // Check Canadian phone number format
      // xxx-xxx-xxxx
      // xxxxxxxxxx
      const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      return regex.test(val)
    }, {
      message: 'Type Contact Number like xxx-xxx-xxxx',
    }),
  email: z.string({
    // Not empty
    required_error: 'Contact Number is required',
  })
    // Not empty
    .min(1, {
      message: 'Email is required'
    })
    // check email format
    .email({
      message: 'Type Email Format'
    }),
  password: z.string({
    required_error: 'Password is required'
  })
    // Must have 8 characters in length
    .min(8, {
      message: 'minimum password is 8'
    })
    .refine(val => {
      const lowercaseReg = /[a-z]/
      const uppercaseReg = /[A-Z]/
      const numberReg = /[0-9]/
      // Check Lower case (a-z)
      if (!lowercaseReg.test(val)) return false
      // Check upper case (A-Z)
      if (!uppercaseReg.test(val)) return false
      // Check numbers (0-9)
      if (!numberReg.test(val)) return false

      return true
    }, {
      message: 'Password is not valid',
    }),
  confirmPassword: z.string({
    required_error: 'Confirm Password is required'
  }),
  year: z.string({
    // Not empty
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
    // Not empty
    required_error: 'month is required'
  })
    // Not empty , (Jan ... Dec)
    .min(3, {
      message: 'month is required'
    }),
  day: z.string({
    // Not empty
    required_error: 'day is required'
  })
    // Not empty
    .min(1, {
      message: 'day is required'
    })
})
  // Must be the same as the password field
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords are not matched'
  })
  .refine(data => {
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
  // Check any future
  .refine(data => {
    const today = new Date()
    const year = Number(data.year)
    // Check year is over current year
    if (year > today.getFullYear()) return false
    // Check month or day is over today
    else if (year === today.getFullYear()) {
      // Check month is over
      // Find the month by month name
      const numberOfMonth = monthNames.findIndex(monthName => monthName === data.month)
      if (numberOfMonth === -1) return false
      if (numberOfMonth > today.getMonth()) return false
      // Check day is over today
      const day = Number(data.day)
      if (numberOfMonth === today.getMonth() && day > today.getDate()) return false
    }

    return true
  }, {
    path: ['year'],
    message: 'Too Young',
  })
