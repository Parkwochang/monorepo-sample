import React from "react";
import { Search, X, Filter } from "lucide-react";
import { cn } from "@workspace/ui/lib";
import { Input } from "../input.cell";
import type { FilterConfig } from "../types";

interface TableFiltersProps {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  activeFiltersCount: number;
  config: Required<FilterConfig>;
  className?: string;
}

export const TableFilters: React.FC<TableFiltersProps> = ({
  globalFilter,
  onGlobalFilterChange,
  onClearFilters,
  hasActiveFilters,
  activeFiltersCount,
  config,
  className,
}) => {
  if (!config.enabled) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 bg-slate-50",
        "border-b border-slate-200",
        className,
      )}
    >
      {/* 글로벌 검색 */}
      <div className="relative flex-1 max-w-md">
        <Search
          className={cn(
            "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4",
            "text-slate-400",
            globalFilter && "text-blue-600",
          )}
        />
        <Input
          placeholder={config.placeholder}
          value={globalFilter}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
          className={cn(
            "pl-10 pr-4 h-10 font-medium",
            "border-slate-200 bg-white",
            "hover:border-blue-300",
            "focus:border-blue-400 focus:bg-blue-50",
            "placeholder:text-slate-400",
            globalFilter && "border-blue-400 bg-blue-50",
          )}
        />
        {globalFilter && (
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full" />
        )}
      </div>

      {/* 활성 필터 정보 및 초기화 */}
      <div className="flex items-center gap-4">
        {hasActiveFilters && (
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-800 border border-blue-300 rounded-full text-xs font-semibold">
              <Filter className="h-3 w-3" />
              {activeFiltersCount}개 활성
            </span>
            <button
              onClick={onClearFilters}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5",
                "text-xs font-medium text-slate-600 hover:text-red-700",
                "hover:bg-red-50 border border-transparent",
                "rounded-full",
                "focus:outline-none",
              )}
              title="모든 필터 제거"
            >
              <X className="h-3 w-3" />
              초기화
            </button>
          </div>
        )}

        {/* 필터 상태 인디케이터 */}
        {hasActiveFilters && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            필터링 중
          </div>
        )}
      </div>
    </div>
  );
};
