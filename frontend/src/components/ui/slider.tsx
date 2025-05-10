import * as React from "react";

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  min?: number;
  max?: number;
  step?: number;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ min = 0, max = 100, step = 1, ...props }, ref) => {
    return (
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        ref={ref}
        {...props}
        style={{ width: "100%", ...props.style }}
      />
    );
  }
);

Slider.displayName = "Slider"; 