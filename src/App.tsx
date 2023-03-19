import { useMemo, useState } from 'react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import './App.css'
import Header from './components/Header'
import FloatingInput from './components/FloatingInput'
import Alert, { AlertStatus } from './components/Alert'
import { earliestYear, monthNames } from './types/date'
import { AuthReq, AuthRes, validationSchema } from './types/models/auth'
import Selectbox from './components/Selectbox'

// extracting the type
type ValidationSchema = z.infer<typeof validationSchema>

function App() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      year: new Date().getFullYear().toString(),
      month: monthNames[new Date().getMonth()],
      day: new Date().getDate().toString(),
    }
  })

  const [alertStatus, setAlertStatus] = useState<AlertStatus>('success')
  const [alertMsg, setAlertMsg] = useState('')

  const yearWatch = watch('year')
  const monthWatch = watch('month')

  const years = useMemo(() => {
    const currYear = new Date().getFullYear()

    return Array(currYear - earliestYear + 1)
      .fill(currYear)
      .map((year, i) => year - i)
  }, [])

  const days = useMemo(() => {
    const year = getValues('year')
    const month = getValues('month')
    if (!year || !month) return []

    const numberOfMonth = monthNames.findIndex(monthName => monthName === month)
    if (numberOfMonth === -1) return []
    // Get last day in month
    const lastDayInMonth = new Date(Number(year), numberOfMonth + 1, 0).getDate()
    const day = Number(getValues('day'))
    // If day is over the last day in month, change day value to last day in month
    if (day > lastDayInMonth) setValue('day', lastDayInMonth.toString())

    return Array(lastDayInMonth)
      .fill(1)
      .map((date, i) => date + i)
  }, [yearWatch, monthWatch])

  const resetAlert = () => {
    setAlertStatus('success')
    setAlertMsg('')
  }

  /**
   * setup alert and reset it after 2500 ms
   * @param status {AlertStatus} - Status of Alert
   * @param msg {string} - Alert message
   */
  const setupAlert = (status: AlertStatus, msg: string) => {
    setAlertStatus(status)
    setAlertMsg(msg)

    setTimeout(resetAlert, 2500)
  }

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    try {
      // Reset Alert
      setAlertStatus('success')
      setAlertMsg('')
      // Send data
      const res = await axios.post<AuthRes<AuthReq>>('https://fullstack-test-navy.vercel.app/api/users/create', {
        full_name: data.fullName,
        contact_number: data.contactNumber,
        email: data.email,
        password: data.password,
        day: Number(data.day),
        month: data.month,
        year: Number(data.year),
      } as AuthReq)
      if(res.status === 200) {
        // set alert to success with message
        setupAlert('success', 'User account successfully created.')
      }
    } catch (e) {
      console.error(e)
      // Set alert to error with message
      setupAlert('error', 'There was an error creating the account')
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
                    label={<span className="label-required">Full Name</span>}
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
                    label={<span className="label-required">Contact Number</span>}
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
                    label={<span className="label-required">Email Address</span>}
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
                    label={<span className="label-required">Create Password</span>}
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
                    label={<span className="label-required">Create Password</span>}
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
                  <div className="flex space-x-4">
                    <Selectbox id="birthday_day" options={days} register={register('day')} />
                    <Selectbox id="birthday_month" options={monthNames} register={register('month')} />
                    <Selectbox id="birthday_year" options={years} register={register('year')} />
                  </div>
                  {
                    (errors.day?.message || errors.year?.message || errors.month?.message) ?
                      <p className="mt-0.5 text-sm text-error">
                        Sorry, {errors.day?.message || errors.year?.message || errors.month?.message}
                      </p> : null
                  }
                </div>
              </div>
            </div>
            <div className="mt-8 flex space-x-4 flex justify-center">
              <button
                className="py-2.5 px-8 font-bold text-secondary focus:outline-none rounded-lg border border-secondary
              hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200"
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
