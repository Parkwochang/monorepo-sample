import Link from 'next/link';

import { CustomIcon, Text } from '@workspace/ui/components/text';

// ----------------------------------------------------------------------

interface IconLinkProps {
  href: string;
  title: string;
}

export const IconLink = ({ href, title }: IconLinkProps) => {
  return (
    <div className="flex justify-between px-5">
      <Text size={'lg'} className="font-semibold">
        {title}
      </Text>
      <Link href={href}>
        <CustomIcon name="ChevronRight" size={20} />
      </Link>
    </div>
  );
};
