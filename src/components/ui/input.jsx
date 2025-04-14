import * as React from "react";
import { cn } from "@/lib/utils";

const variantClasses = {
  default: "bg-slate-50 text-black",
  error: "border-red-500 bg-red-100 text-red-900",
};

const Input = React.forwardRef(
  ({ className, variant, type, label, isRequired, isLabel, ...props }, ref) => {
    return (
      <div className={cn("flex mb-4", className)}>
        <div>
          <label className="font-semibold" htmlFor="">
            {label}
          </label>
          {isRequired == "true" && (
            <span className="text-red-500 text-sm ml-1">*</span>
          )}
        </div>
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-lg px-3 py-2 text-sm placeholder:text-black-600",
            variantClasses[variant || "default"]
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
