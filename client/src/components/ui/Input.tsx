interface Props extends React.InputHTMLAttributes<HTMLInputElement> { }

export function Input ({ ...props }: Props): JSX.Element {
  return (
    <input className='p-2 2xl:p-4 text-md 2xl:text-xl w-full rounded-lg outline-none
    dark:bg-dark-tremor-content-subtle dark:text-white border-gray-300 text-gray-800 font-medium '
      {...props} />
  )
}
