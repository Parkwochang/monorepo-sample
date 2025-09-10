import { cn } from "@repo/ui/lib";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full bg-white/80 backdrop-blur-sm rounded-md",
          "border border-slate-200/60 px-3 py-1.5 text-sm font-medium",
          "transition-all duration-200 ease-in-out",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-slate-400 placeholder:font-normal",
          "hover:border-blue-300/60 hover:bg-blue-50/30",
          "focus:border-blue-400/80 focus:bg-blue-50/50 focus:ring-2 focus:ring-blue-400/20",
          "focus:outline-none",
          "read-only:bg-slate-50/80 read-only:text-slate-500 read-only:border-slate-200",
          "disabled:cursor-not-allowed disabled:bg-slate-50/80 disabled:text-slate-400 disabled:border-slate-200",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export interface EditableInputProps
  extends Omit<InputProps, "onChange" | "onBlur"> {
  value: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  setEditing?: (isEditing: boolean) => void;
}

const EditableInput = React.forwardRef<HTMLInputElement, EditableInputProps>(
  ({ value, onChange, className, onBlur, setEditing, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    // ref를 통합 처리
    React.useImperativeHandle(ref, () => inputRef.current!, []);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e.target.value);
      setEditing?.(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setEditing?.(false);
        e.currentTarget.blur(); // 포커스 해제
      } else if (e.key === "Escape") {
        // Escape 시 원래 값으로 되돌리기
        e.currentTarget.value = value;
        onBlur?.(value);
        setEditing?.(false);
        e.currentTarget.blur(); // 포커스 해제
      }
    };

    const handleFocus = () => {
      setEditing?.(true);
    };

    const handleContainerDoubleClick = (e: React.MouseEvent) => {
      // td 더블클릭 시 input으로 포커스 이동
      e.stopPropagation();
      inputRef.current?.focus();
    };

    return (
      <div
        className={cn(
          "w-full h-full flex items-center cursor-text group relative",
          "transition-all duration-200 ease-in-out",
          "hover:bg-gradient-to-r hover:from-blue-50/20 hover:to-blue-50/30",
          "focus-within:bg-gradient-to-r focus-within:from-blue-50/40 focus-within:to-blue-100/30",
          "focus-within:ring-1 focus-within:ring-blue-400/40 focus-within:shadow-sm",
          "rounded-md",
        )}
        onDoubleClick={handleContainerDoubleClick}
      >
        <Input
          key={value}
          ref={inputRef}
          defaultValue={value}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          className={cn(
            "border-none bg-transparent",
            "focus:bg-gradient-to-r focus:from-blue-50/60 focus:to-blue-100/40",
            "focus:border-2 focus:border-blue-500/80",
            "focus:ring-2 focus:ring-blue-400/30 focus:ring-offset-1",
            "focus:scale-[1.03] focus:z-20 focus:shadow-lg",
            "focus:font-semibold",
            className,
          )}
          {...props}
        />

        {/* 편집 가능 인디케이터 */}
        <div
          className={cn(
            "absolute top-1 right-1 w-1.5 h-1.5 bg-blue-400 rounded-full",
            "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
            "group-focus-within:bg-blue-600 group-focus-within:w-2 group-focus-within:h-2",
            "group-focus-within:animate-pulse",
            "transition-all duration-200",
          )}
        />
      </div>
    );
  },
);

EditableInput.displayName = "EditableInput";

export { Input, EditableInput };
