import React, { useState, useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@workspace/ui/lib";
import { Input } from "../input.cell";

interface ColumnFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const ColumnFilter: React.FC<ColumnFilterProps> = ({
  value,
  onChange,
  placeholder = "필터...",
  className,
}) => {
  const [localValue, setLocalValue] = useState(value);

  // 디바운스를 위한 타이머
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  );

  const handleChange = useCallback(
    (newValue: string) => {
      setLocalValue(newValue);

      // 기존 타이머 클리어
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      // 300ms 후에 실제 필터 적용
      const timer = setTimeout(() => {
        onChange(newValue);
      }, 300);

      setDebounceTimer(timer);
    },
    [onChange, debounceTimer],
  );

  const handleClear = useCallback(() => {
    setLocalValue("");
    onChange("");
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
  }, [onChange, debounceTimer]);

  // 이벤트 전파 방지 (헤더 클릭 정렬과 충돌 방지)
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // ESC로 필터 클리어
      if (e.key === "Escape") {
        handleClear();
      }
      // 이벤트 전파 방지
      e.stopPropagation();
    },
    [handleClear],
  );

  return (
    <div className={cn("relative w-full", className)} onClick={handleClick}>
      <div className="relative">
        <Search
          className={cn(
            "absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5",
            "text-slate-400",
            localValue && "text-blue-600",
          )}
        />
        <Input
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "pl-8 pr-8 h-8 text-xs font-medium",
            "border-slate-200 bg-white",
            "hover:border-blue-300",
            "focus:border-blue-400 focus:bg-blue-50",
            "placeholder:text-slate-400",
            localValue && "border-blue-400 bg-blue-50",
          )}
        />
        {localValue && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className={cn(
              "absolute right-2 top-1/2 transform -translate-y-1/2",
              "p-1 rounded-full",
              "hover:bg-red-100 hover:text-red-600",
              "focus:outline-none focus:bg-red-100 focus:text-red-600",
              "text-slate-400",
            )}
            title="필터 클리어"
          >
            <X className="h-3 w-3" />
          </button>
        )}

        {/* 활성 필터 인디케이터 */}
        {localValue && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
        )}
      </div>
    </div>
  );
};
