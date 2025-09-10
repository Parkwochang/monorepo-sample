import Link from 'next/link';
import type { UrlObject } from 'url';

import { Button } from '@workspace/ui/components/button';

interface Href extends Pick<UrlObject, 'pathname' | 'query'> {}

interface LinkButtonProps extends React.ComponentProps<typeof Button> {
  href: string;
  children: React.ReactNode;
}

export const LinkButton = ({ href, children, ...props }: LinkButtonProps) => {
  return (
    <Button asChild {...props}>
      <Link href={href}>{children}</Link>
    </Button>
  );
};
