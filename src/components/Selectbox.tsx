import { UseFormRegister } from 'react-hook-form/dist/types/form'

interface Props {
  id: string
  register?: ReturnType<UseFormRegister<any>>
  options: (string | number)[]
}

function SelectBox({ id, register, options }: Props) {
  return (
    <select
      id={id}
      {...register}
      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
    >
      {options.map(option => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  )
}

export default SelectBox
