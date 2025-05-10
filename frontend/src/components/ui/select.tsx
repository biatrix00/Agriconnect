import * as React from "react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ ...props }, ref) => {
    return (
      <select
        ref={ref}
        {...props}
      />
    );
  }
);

Select.displayName = "Select";

export const SelectContent = ({ children }: { children: React.ReactNode }) => (
  <div className="select-content">{children}</div>
);

export const SelectItem = ({ children }: { children: React.ReactNode }) => (
  <div className="select-item">{children}</div>
);

export const SelectTrigger = ({ children }: { children: React.ReactNode }) => (
  <div className="select-trigger">{children}</div>
);

export const SelectValue = ({ children }: { children: React.ReactNode }) => (
  <div className="select-value">{children}</div>
); 