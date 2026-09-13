import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva("disabled:cursor-not-allowed disabled:bg-disabled", {
  variants: {
    variant: {
      primary: "bg-primary-500 hover:bg-primary-600",
      outline: "bg-transparent border",
    },
    size: {
      xs: "h-20 px-8",
      sm: "h-36 px-12",
      md: "h-40 px-16",
      lg: "h-48 px-16",
      xl: "h-30 px-20",
      wide: "w-full h-48",
      square: "size-100 p-20",
    },
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
