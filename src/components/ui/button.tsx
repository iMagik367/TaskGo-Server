import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-primary hover:bg-primary/90 text-white focus:ring-primary",
      secondary: "bg-white border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary",
      danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-600",
      ghost: "hover:bg-gray-100 text-gray-600 focus:ring-gray-600",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-9 px-4",
      lg: "h-10 px-6",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };