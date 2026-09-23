import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva('button', {
  variants: {
    variant: {
      default: 'button--default',
      destructive: 'button--destructive',
      outline: 'button--outline',
      ghost: 'button--ghost',
      link: 'button--link'
    },
    size: {
      default: 'button--md',
      sm: 'button--sm',
      lg: 'button--lg',
      icon: 'button--icon'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
