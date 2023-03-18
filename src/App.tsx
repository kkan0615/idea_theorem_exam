import { useState } from 'react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './App.css'
import Header from './components/Header'
import FloatingInput from './components/FloatingInput'
import axios from 'axios'
import Alert from './components/Alert'

/**
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
const validationSchema = z.object({
  fullName: z.string({
    required_error: 'Full Name is required',
  })
    .min(1, {
      message: 'Full Name field is required'
    }).refine(val => {
      // Check special characters
      return val.search(/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/) < 0
    }, {
      message: 'Symbol is not allowed',
    }),
  contactNumber: z.string({
    required_error: 'Contact Number is required',
  })
    .min(1, {
      message: 'Contact Number is required'
    }).refine(val => {
      // Check special characters
      const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      return regex.test(val)
    }, {
      message: 'Type Contact Number like xxx-xxx-xxxx',
    }),
  email: z.string({
    required_error: 'Contact Number is required',
  })
    .min(1, {
      message: 'Email field is required'
    }).email({
      message: 'Type Email Format'
    }),
  password: z.string({
    required_error: 'Password is required'
  }).refine(val => {
    // Not working....
    // Check length
    if (val.length < 8) return false
    // Check lowercase
    if (val.search(/[a-z]/i) < 0) return false
    // Check uppercase
    if (val.search(/[A-Z]/i) < 0) return false
    // Check number
    if (val.search(/[0-9]/) < 0) return false
    // Check special characters
    // if (val.search( /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/) < 0) return false
    return true
  }, {
    message: 'Password is not valid',
  }),
  confirmPassword: z.string({
    required_error: 'Confirm Password is required'
  }),
  birthday: z.string({
    required_error: 'Birthday is required'
  }).refine(val => {
    // No Future date
    const valDate = new Date(val)
    return valDate <= new Date()
  }, {
    message: 'Too Young',
  }),
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords are not matched'
})
// extracting the type
type ValidationSchema = z.infer<typeof validationSchema>;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  const [alertStatus, setAlertStatus] = useState<'success' | 'error'>('success')
  const [alertMsg, setAlertMsg] = useState('')

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    try {
      console.log('start test')
      // Reset Alert
      setAlertStatus('success')
      setAlertMsg('')
      const birthday = new Date(data.birthday)
      // const testData = {
      //   full_name: 'Youngjin Kwak',
      //   email: 'kkan0615@gmail.com',
      //   password: 'test1234@'
      // }
      const testData = {
        full_name: 'Test Full',
        email: 'test@gmail.com',
        password: 'test1234@'
      }
      console.log(data)
      const res = await axios.post('https://fullstack-test-navy.vercel.app/api/users/create', {
        full_name: data.fullName,
        contact_number: data.contactNumber,
        email: data.email,
        password: data.password,
        day: birthday.getDate(),
        month: birthday.toLocaleString('en-US', { month: 'short' }),
        year: birthday.getFullYear(),
      })
      console.log(res)
      setAlertStatus('success')
      setAlertMsg('User account successfully created.')
      // reset()
    } catch (e) {
      console.error(e)
      setAlertStatus('error')
      setAlertMsg('There was an error creating the account')
    }
  }

  return (
    <div className="relative h-screen">
      <Header />
      {alertMsg ?
        <Alert status={alertStatus}>
          {alertMsg}
        </Alert> : null
      }
      <div className="flex items-center justify-center md:h-full">
        <div className="pt-14 mx-auto w-full max-w-lg px-2 py-4 md:px-0 md:py-0">
          <h2 className="font-bold text-xl mb-11">
            Create User Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white border border-gray-200 rounded-lg shadow">
              <div className="p-6 flex flex-col space-y-4">
                <div className="input-group">
                  <label
                    htmlFor="full-name-field"
                    className="input-label"
                  >
                    Full Name
                  </label>
                  <FloatingInput
                    id="full-name-field"
                    errorMsg={errors.fullName?.message}
                    label={<span className="inner-input-label">Full Name</span>}
                    register={register('fullName')}
                  />
                </div>
                <div className="input-group">
                  <label
                    htmlFor="contact-number-field"
                    className="input-label"
                  >
                    Contact Number
                  </label>
                  <FloatingInput
                    id="contact-number-field"
                    errorMsg={errors.contactNumber?.message}
                    label={<span className="inner-input-label">Contact Number</span>}
                    type="tel"
                    register={register('contactNumber')}
                  />
                </div>
                <div className="input-group">
                  <label
                    htmlFor="email-field"
                    className="input-label"
                  >
                    Email Address
                  </label>
                  <FloatingInput
                    id="email-field"
                    errorMsg={errors.email?.message}
                    label={<span className="inner-input-label">Email Address</span>}
                    register={register('email')}
                    type="email"
                  />
                </div>
                <div className="input-group">
                  <label
                    htmlFor="password-field"
                    className="input-label"
                  >
                    Password
                  </label>
                  <FloatingInput
                    id="password-field"
                    errorMsg={errors.password?.message}
                    label={<span className="inner-input-label">Create Password</span>}
                    type="password"
                    autocomplete="true"
                    register={register('password')}
                  />
                </div>
                <div className="input-group">
                  <label
                    htmlFor="confirm-password-field"
                    className="input-label"
                  >
                    Confirm Password {errors.root?.message}
                  </label>
                  <FloatingInput
                    id="confirm-password-field"
                    errorMsg={errors.confirmPassword?.message}
                    label={<span className="inner-input-label">Create Password</span>}
                    type="password"
                    autocomplete="true"
                    register={register('confirmPassword')}
                  />
                </div>
                <div className="input-group">
                  <label
                    htmlFor="birthday-field"
                    className="input-label"
                  >
                    Birthday
                  </label>
                  <FloatingInput
                    id="birthday-field"
                    errorMsg={errors.birthday?.message}
                    label={<span className="inner-input-label">Birthday</span>}
                    type="date"
                    register={register('birthday')}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex space-x-2 flex justify-center">
              <button
                className="py-2.5 px-8 font-bold text-primary focus:outline-none rounded-lg border border-[#4790A1]
              hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                type="button"
              >
                cancel
              </button>
              <button
                className="text-white bg-primary focus:ring-4 focus:ring-blue-300 font-bold rounded-lg px-8 py-2.5 focus:outline-none capitalize"
                type="submit"
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
