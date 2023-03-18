import { useMemo } from 'react'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'

interface Props {
  status?: 'success' | 'error'
  children?: React.ReactElement | string
}

function Alert({ status = 'success', children }: Props) {
  const statusClasses = useMemo(() => {
    const classes: string[] = []
    if (status === 'success') {
      classes.push('bg-success')
    } else {
      classes.push('bg-alert-error')
    }

    return classes.join(' ')
  }, [status])

  return (
    <div
      className={`fixed z-10 top-1/4 left-3/4 flex items-center py-6 px-8 mb-4 text-lg font-bold rounded ${statusClasses}`}
      role="alert"
    >
      <div className="mr-2 pt-1">
        {
          status === 'success' ?
            <AiOutlineCheckCircle /> :
            <AiOutlineCloseCircle />
        }
      </div>
      <span className="sr-only">{status}</span>
      <div>{children}</div>
    </div>
  )
}

export default Alert
