import { useState } from 'react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './App.css'
import Header from './components/Header'
import FloatingInput from './components/FloatingInput'
import axios from 'axios'
import Alert from './components/Alert'

const validationSchema = z.object({
  fullName: z.string({
    required_error: 'Full Name field is required',
  })
    .min(1, {
      message: 'Full Name field is required'
    }).refine(val => {
      console.log(val.search( /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/))
      // Check special characters
      if (val.search( /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/) >= 0) return false
      return true
    }, {
      message: 'Symbol is not allowed',
    }),
  contactNumber: z.string({
    required_error: 'Contact Number field is required',
  })
    .min(1, {
      message: 'Contact Number field is required'
    }),
  email: z.string({
    required_error: 'Contact Number field is required',
  })
    .min(1, {
      message: 'Email field is required'
    }).email({
      message: 'Type Email Format'
    }),
  password: z.string({
    required_error: 'Password field is required'
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
    if (val.search( /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/) < 0) return false
    return true
  }, {
    message: 'Password is not valid',
  }),
  confirmPassword: z.string({
    required_error: 'Password field is required'
  })
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
    reset,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  // console.log(register('fullName'))

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    try {
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
        email: data.email,
        // password: data.password
      })
      console.log(res)
      // reset()
    } catch (e: any) {
      console.error(e)
      if (e && e.response) {
        console.log(e.response.data)
      }
    }
  }

  return (
    <div className="relative">
      <Header />
      <Alert>{errors.password?.message}</Alert>
      <div className="mx-auto max-w-lg">
        <h2 className="font-bold text-xl mb-4">
          Create User Account
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
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
                label={<span className="inner-input-label">Birthday</span>}
                type="date"
              />
            </div>
          </div>
          <div className="mt-8 flex space-x-2 flex justify-center">
            <button
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-[#4790A1] focus:outline-none rounded-lg border border-[#4790A1]
              hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
              type="button"
            >
              cancel
            </button>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm
              px-5 py-2.5 mr-2 mb-2 focus:outline-none capitalize"
              type="submit"
            >
             submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
