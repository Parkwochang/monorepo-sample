'use client';

import Image from 'next/image';

import { Spacing } from '@workspace/ui/components/box';
import { Text } from '@workspace/ui/components/text';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

const CHALLENGES = [
  {
    image: '/images/challenge_0.svg',
    title: '기도습관 챌린지7',
    description: 'Challenge 1 description',
    link: '/challenge',
    color: '#F5BE41',
  },
  {
    image: '/images/challenge_1.svg',
    title: '감사습관 챌린지7',
    description: 'Challenge 1 description',
    link: '/challenge',
    color: '#F092D2',
  },
  {
    image: '/images/challenge_2.svg',
    title: '묵상습관 챌린지',
    description: 'Challenge 1 description',
    link: '/challenge',
    color: '#9EF079',
  },
  {
    image: '/images/challenge_4.svg',
    title: '믿음인물 챌린지7',
    description: 'Challenge 1 description',
    link: '/challenge',
    color: '#3B55E7',
  },
];

export const ChallengeInfo = () => {
  const { push } = useRouter();

  return (
    <div className="px-5">
      <Text as="p" size={'xl'} className="font-semibold">
        챌린지 미션
      </Text>
      <Spacing size={10} />
      <div className="grid grid-cols-2 gap-4">
        {CHALLENGES.map((challenge) => (
          <div
            key={challenge.title}
            className="flex flex-col items-center justify-center rounded-2xl py-3 px-4"
            style={{ backgroundColor: challenge.color }}
            onClick={() => push(challenge.link)}
          >
            <Image src={challenge.image} alt={challenge.title} width={100} height={100} />
            <Spacing size={5} />
            <Text as="p" size={'lg'} className="w-full text-white font-semibold">
              {challenge.title}
            </Text>
            <Spacing size={10} />
            <div className="flex gap-1 w-full">
              <span className="text-[10px] leading-[10px] rounded-full bg-white px-2 py-1 text-gray-500 font-semibold">
                Day7
              </span>
              <span className="text-[10px] leading-[10px] rounded-full bg-white px-2 py-1 text-gray-500 font-semibold">
                300T
              </span>
              {/* <span className="text-[10px] leading-[10px] rounded-full bg-white px-2 py-1 text-gray-500 font-semibold">
                  성공보상
                </span> */}
            </div>
            <Spacing size={10} />
          </div>
        ))}
      </div>
    </div>
  );
};
