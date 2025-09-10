import { icons, type LucideProps } from "lucide-react";

// ----------------------------------------------------------------------------------------------

type IconName = keyof typeof icons;

interface IconProps extends LucideProps {
  name: IconName;
}

export const CustomIcon = ({ name, ...props }: IconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon {...props} />;
};

export type { IconName };
