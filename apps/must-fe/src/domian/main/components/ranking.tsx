import { CustomIcon, Text } from '@workspace/ui/components/text';
import { Spacing } from '@workspace/ui/components/box';

import { ItemBox } from '@/shared/components/box';

export const MainRanking = () => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between gap-1 p-3">
        <Text size={'xl'} className="font-bold">
          교회 랭킹
        </Text>
        <CustomIcon name="EllipsisVertical" size={20} className="text-gray-500" />
      </div>

      <Spacing size={10} />

      <ItemBox>
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 active:bg-gray-50 active:scale-[.98] transition-all duration-300">
          <Text size={'lg'} className="text-blue-500 w-8">
            1
          </Text>
          <Text size={'lg'} className="text-gray-500 w-8">
            1
          </Text>
          <div className="flex flex-1 justify-between items-center">
            <div className="flex flex-col flex-1">
              <Text className="font-semibold">사랑의교회</Text>
              <Text className="text-sm text-gray-500">미션 1,234개 완료</Text>
            </div>
            <div className=" rounded-xl">
              <CustomIcon
                name="TrendingUp"
                size={20}
                className="text-green-500 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 active:bg-gray-50 active:scale-[.98] transition-all">
          <Text size={'lg'} className="text-blue-500 w-8">
            2
          </Text>
          <Text size={'lg'} className="text-gray-500 w-8">
            2
          </Text>
          <div className="flex flex-1 justify-between items-center">
            <div className="flex flex-col flex-1">
              <Text className="font-semibold">은혜의교회</Text>
              <Text className="text-sm text-gray-500">미션 1,234개 완료</Text>
            </div>
            <div className=" rounded-xl">
              <CustomIcon
                name="TrendingUp"
                size={20}
                className="text-green-500 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 active:bg-gray-50 active:scale-[.98] transition-all duration-300">
          <Text size={'lg'} className="text-blue-500 w-8">
            3
          </Text>
          <Text size={'lg'} className="text-gray-500 w-8">
            3
          </Text>
          <div className="flex flex-1 justify-between items-center">
            <div className="flex flex-col flex-1">
              <Text className="font-semibold">소망교회</Text>
              <Text className="text-sm text-gray-500">미션 1,234개 완료</Text>
            </div>
            <div className=" rounded-xl">
              <CustomIcon
                name="TrendingUp"
                size={20}
                className="text-green-500 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
          </div>
        </div>
      </ItemBox>
    </div>
  );
};
