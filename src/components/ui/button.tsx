/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [font-family:'Space_Grotesk',sans-serif]",
  {
    variants: {
      variant: {
        default: "bg-[hsl(192_29%_21%)] hover:bg-[hsl(192_29%_24%)] text-primary-foreground shadow-[0_0_20px_hsl(192_40%_30%/0.3)] hover:shadow-[0_0_25px_hsl(192_40%_30%/0.4)] transition-all",
        hero: "bg-[hsl(192_29%_21%)] hover:bg-[hsl(192_29%_24%)] text-primary-foreground shadow-[0_0_20px_hsl(192_40%_30%/0.3)] hover:shadow-[0_0_30px_hsl(192_40%_30%/0.5)] hover:-translate-y-0.5 transition-all",
        "hero-outline": "border-2 border-[hsl(192_29%_21%)]/40 text-foreground bg-transparent hover:bg-[hsl(192_29%_21%)] hover:text-primary-foreground hover:border-[hsl(192_29%_21%)] shadow-[0_0_15px_hsl(192_40%_30%/0.2)] hover:shadow-[0_0_25px_hsl(192_40%_30%/0.4)] transition-all",
        secondary: "bg-secondary text-secondary-foreground shadow-[0_0_20px_hsl(145_35%_40%/0.2)] hover:brightness-110",
        outline: "bg-transparent border border-[hsl(192_29%_21%)]/40 text-[hsl(192_29%_21%)] hover:bg-[hsl(192_29%_21%)] hover:text-primary-foreground",
        ghost: "bg-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground",
        link: "bg-transparent text-[hsl(192_29%_21%)] underline-offset-4 hover:underline",
        social: "bg-card text-foreground border border-border hover:shadow-[0_0_20px_hsl(192_40%_30%/0.3)] hover:border-[hsl(192_29%_21%)]/40",
        destructive: "bg-destructive text-white shadow-sm hover:brightness-110",
      },
      size: {
        default: "h-11 px-6 py-3 text-base",
        sm: "h-9 px-4 py-2 text-sm",
        lg: "h-12 px-8 py-4 text-lg",
        xl: "h-14 px-10 py-5 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
