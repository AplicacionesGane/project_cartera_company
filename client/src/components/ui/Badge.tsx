interface BadgeProps {
  color: 'green' | 'blue' | 'red' | 'yellow' | 'indigo' | 'purple' | 'pink' | 'gray';
  children: React.ReactNode;
}

export const Badge = ({ color, children }: BadgeProps) => {
  return (
    <span className={`bg-${color}-100 text-${color}-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-${color}-900 dark:text-${color}-300`}>
      {children}
    </span>
  )
}
