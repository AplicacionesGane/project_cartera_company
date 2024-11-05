interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button ({ children, disabled, ...props }: Props): JSX.Element {
  return (
    <button
      type="submit"
      className={`text-lg px-4 py-2   
        text-white rounded-md
        bg-gradient-to-b from-punch-700 to-punch-800 hover:bg-gradient-to-b hover:from-punch-500 hover:to-punch-600 transition-all ease-in-out
        dark:bg-gradient-to-b dark:from-blue-900 dark:to-blue-800 dark:hover:bg-gradient-to-b dark:hover:from-blue-800 dark:hover:to-blue-600
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
