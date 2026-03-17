import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-healio-primary text-white hover:bg-healio-primary-dark shadow-md hover:shadow-lg',
				destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
          'border border-input bg-background hover:bg-healio-mint hover:text-healio-primary hover:border-healio-primary',
				secondary:
          'bg-healio-slate text-white hover:bg-healio-slate/90',
				ghost: 'hover:bg-healio-mint hover:text-healio-primary',
				link: 'text-healio-primary underline-offset-4 hover:underline',
				healioPrimary: 'bg-healio-primary text-white hover:bg-healio-primary-dark shadow-md hover:shadow-lg',
				healioSecondary: 'bg-white text-healio-primary border-2 border-healio-primary hover:bg-healio-mint',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : 'button';
	return (
		<Comp
			className={cn(buttonVariants({ variant, size, className }))}
			ref={ref}
			{...props}
		/>
	);
});
Button.displayName = 'Button';

export { Button, buttonVariants };