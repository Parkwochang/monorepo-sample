import { Heading } from '@workspace/ui/components/text';
import { cn } from '@workspace/ui/lib';

import { ContentLayout } from './screen-content.layout';

interface ContentFormLayoutProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

export const ContentFormLayout = ({ children, title, className }: ContentFormLayoutProps) => {
  return (
    <ContentLayout className={cn('grid grid-cols-1 gap-4', className)}>
      <Heading size={'sm'} asType="h4">
        {title}
      </Heading>
      {children}
    </ContentLayout>
  );
};
