import { Skeleton, Spacing } from '@workspace/ui/components/box';

// ----------------------------------------------------------------------

export const CommunityLoading = () => {
  return (
    <div className="px-5 flex flex-col gap-3">
      {[...Array(3)].map((_, index) => (
        <Skeleton key={index} className="bg-gray-200 p-3 flex flex-col gap-2 rounded-lg">
          <Skeleton className="h-4 rounded-full" />
          <div className="flex gap-2">
            <Skeleton className="flex-1 h-14 rounded-lg" />
            <Skeleton className="size-14 rounded-lg" />
          </div>
        </Skeleton>
      ))}
    </div>
  );
};

export const ScheduleLoading = () => {
  return (
    <div className="px-5 flex gap-5">
      {[...Array(2)].map((_, index) => (
        <Skeleton key={index} className="bg-gray-200 rounded-lg">
          <Skeleton className="size-30 rounded-lg" />
        </Skeleton>
      ))}
    </div>
  );
};

export const MyPageLoading = () => {
  return (
    <div>
      <div className="px-5 flex flex-col gap-3">
        <Skeleton className="bg-gray-200 p-3 flex flex-col gap-2 rounded-lg">
          <Skeleton className="h-4 rounded-full" />
          <div className="flex gap-2">
            <Skeleton className="flex-1 h-14 rounded-lg" />
            <Skeleton className="size-14 rounded-lg" />
          </div>
        </Skeleton>
      </div>
      <Spacing size={20} />
      <div className="px-5 flex flex-col gap-3">
        <Skeleton className="rounded-lg w-full h-20" />
        <Skeleton className="rounded-lg w-full h-20" />
        <Skeleton className="rounded-lg w-full h-20" />
      </div>
    </div>
  );
};
