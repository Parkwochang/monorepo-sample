import { type ChurchEntity } from '@workspace/http/must/church';
import { Text } from '@workspace/ui/components/text';

export const ChurchInfo = ({ myChurch }: { myChurch: ChurchEntity.Church }) => {
  const { churchName, address, profileImageUrl } = myChurch;

  return (
    <div
      className="h-[200px] bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${profileImageUrl || '/images/church.jpg'})`,
      }}
    >
      <div className="absolute top-[50%] inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-black/10 blur-sm" />
      <div className="absolute bottom-5 px-5">
        <Text as="p" size={'xl'} className="text-white">
          {churchName}
        </Text>
        <Text as="p" size={'sm'} className="text-gray-300">
          {address}
        </Text>
      </div>
    </div>
  );
};
