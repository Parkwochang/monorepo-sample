import React from "react";
import { cn } from "@workspace/ui/lib";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 10,
  columns = 5,
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full bg-white rounded-xl shadow-xl border border-slate-200/60",
        className,
      )}
    >
      {/* 헤더 스켈레톤 */}
      <div className="bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 border-b-2 border-slate-200/80">
        <div className="flex">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-12 px-4 py-3 border-r border-slate-200/50 last:border-r-0 flex-1"
            >
              <div className="h-4 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* 필터 행 스켈레톤 */}
        <div className="flex bg-gradient-to-r from-slate-50/50 via-white/80 to-slate-50/50">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-14 px-3 py-2 border-r border-slate-200/40 last:border-r-0 flex-1"
            >
              <div className="h-8 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 rounded-md animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* 바디 스켈레톤 */}
      <div className="bg-white">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className={cn(
              "flex border-b border-slate-100/80 transition-all duration-300",
              "hover:bg-gradient-to-r hover:from-blue-50/20 hover:via-blue-50/30 hover:to-blue-50/20",
            )}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="px-4 py-3 border-r border-slate-100/60 last:border-r-0 flex-1"
              >
                <div
                  className={cn(
                    "h-4 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 rounded animate-pulse",
                    // 다양한 너비로 자연스러운 효과
                    colIndex === 0 && "w-16",
                    colIndex === 1 && "w-24",
                    colIndex === 2 && "w-20",
                    colIndex === 3 && "w-32",
                    colIndex === 4 && "w-28",
                  )}
                  style={{
                    animationDelay: `${rowIndex * 50 + colIndex * 100}ms`,
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 로딩 오버레이 */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-slate-200 rounded-full animate-spin">
              <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
            </div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-blue-300/50 rounded-full animate-ping" />
          </div>
          <div className="text-sm font-medium text-slate-600 animate-pulse">
            데이터 로딩 중...
          </div>
        </div>
      </div>
    </div>
  );
};

// 간단한 셀 스켈레톤
export const CellSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => (
  <div
    className={cn(
      "h-4 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 rounded animate-pulse",
      className,
    )}
  />
);

// 행 스켈레톤
export const RowSkeleton: React.FC<{
  columns?: number;
  className?: string;
}> = ({ columns = 5, className }) => (
  <div
    className={cn(
      "flex border-b border-slate-100/80 animate-pulse",
      "hover:bg-gradient-to-r hover:from-blue-50/20 hover:via-blue-50/30 hover:to-blue-50/20",
      className,
    )}
  >
    {Array.from({ length: columns }).map((_, colIndex) => (
      <div
        key={colIndex}
        className="px-4 py-3 border-r border-slate-100/60 last:border-r-0 flex-1"
      >
        <CellSkeleton />
      </div>
    ))}
  </div>
);
