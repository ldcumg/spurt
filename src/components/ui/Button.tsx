import { twMerge } from "@/lib/twMerge";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva("rounded-lg disabled:bg-disabled disabled:text-white", {
  variants: {
    variant: {
      primary: "bg-primary-500 text-white hover:bg-primary-600",
      outline: "bg-transparent border",
      ghost: "bg-transparent",
    },
    size: {
      xs: "h-20 px-8 text-caption",
      sm: "h-28 px-12",
      md: "h-36 px-16",
      lg: "h-40 px-16",
      xl: "h-48 px-20",
      wide: "w-full h-48",
      square: "size-100",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export default function Button({ children, variant, size, className, ...props }: ButtonProps) {
  const buttonClasses = twMerge(clsx(buttonVariants({ variant, size }), className));
  return (
    <button
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
}
