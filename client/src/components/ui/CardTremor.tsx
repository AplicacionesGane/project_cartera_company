// Tremor Card [v0.0.2]

import { Slot } from '@radix-ui/react-slot'
import { cx } from '../../lib/utils'
import React from 'react'

interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, asChild, ...props }, forwardedRef) => {
    const Component = asChild ? Slot : 'div'
    return (
      <Component
        ref={forwardedRef}
        className={cx(
          // base
          'relative w-full rounded-lg border px-2 py-1 text-left shadow-sm',
          // background color
          'bg-white dark:bg-[#090E1A]',
          // border color
          'border-gray-200 dark:border-gray-900',
          // border top
          'border-t-4',
          // border top color
          'border-blue-500',
          className
        )}
        tremor-id="tremor-raw"
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export { Card, type CardProps }
