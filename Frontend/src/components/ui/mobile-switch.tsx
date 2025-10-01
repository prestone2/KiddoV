import * as React from "react";
import { cn } from "@/lib/utils";

interface MobileSwitchProps extends React.HTMLAttributes<HTMLLabelElement> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
}

const MobileSwitch = React.forwardRef<HTMLLabelElement, MobileSwitchProps>(
  ({ checked, onCheckedChange, label, description, className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-between w-full cursor-pointer py-2",
          className
        )}
        {...props}
      >
        {(label || description) && (
          <div className="text-sm">
            {label && <span className="font-medium text-gray-900 block">{label}</span>}
            {description && <span className="text-gray-500 block">{description}</span>}
          </div>
        )}
        <div className="relative ms-3 inline-flex items-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onCheckedChange?.(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-roblox-blue" />
        </div>
      </label>
    );
  }
);

MobileSwitch.displayName = "MobileSwitch";

export { MobileSwitch };