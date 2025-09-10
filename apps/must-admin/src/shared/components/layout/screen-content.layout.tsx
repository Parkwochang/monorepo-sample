import { Card, CardContent } from '@workspace/ui/components/box';

interface ContentLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const ContentLayout = ({ children, className }: ContentLayoutProps) => {
  return (
    <Card className="w-full h-full rounded-none md:rounded-xl">
      <CardContent className={className}>{children}</CardContent>
    </Card>
  );
};
