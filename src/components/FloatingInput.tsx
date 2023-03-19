import { Simulate } from 'react-dom/test-utils'
import { FormEvent, FormEventHandler, useMemo } from 'react'
import { UseFormRegister } from 'react-hook-form/dist/types/form'


interface Props {
  id: string
  type?: 'text' | 'tel' | 'password' | 'date' | 'email'
  label?: React.ReactElement
  errorMsg?: string
  className?: string
  autocomplete?: string
  placeholder?: string
  register?: ReturnType<UseFormRegister<any>>
}
function FloatingInput({ id, type, label, errorMsg, className, autocomplete, placeholder, register }: Props) {
  const statusInputClasses = useMemo(() => {
    const classes: string[] = []
    if (errorMsg) {
      classes.push('border-error')
      classes.push('focus:border-error')
    } else {
      classes.push('border-grey-300')
      classes.push('focus:border-primary')
    }

    return classes.join(' ')
  }, [errorMsg])

  const statusLabelClasses = useMemo(() => {
    const classes: string[] = []
    if (errorMsg) {
      classes.push('peer-focus:text-error')
    } else {
      classes.push('peer-focus:text-primary')
    }

    return classes.join(' ')
  }, [errorMsg])

  return (
    <div className={className}>
      <div className="relative">
        <input
          type={type || 'text'}
          id={id}
          className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none
         focus:outline-none focus:ring-0 focus:border-blue-600 peer ${statusInputClasses}`}
          placeholder={placeholder || ' '}
          autoComplete={autocomplete}
          {...register}
        />
        <label
          htmlFor={id}
          className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform
           -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white
            px-2 peer-focus:px-2 cursor-text
            peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
            peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${statusLabelClasses}`}
        >
          {label}
        </label>
      </div>
      {errorMsg ?
        <p className="mt-0.5 text-sm text-error">
          Sorry, {errorMsg}
        </p> : null
      }
    </div>
  )
}

export default FloatingInput
