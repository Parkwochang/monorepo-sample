import type { IconName } from '@workspace/ui/components/text';

export interface NavItemType {
  title: string;
  url: string;
  icon?: IconName;
  isActive?: boolean;
}

export interface NavGroupItemType {
  title: string;
  url: string;
  icon?: IconName;
  items?: NavItem[];
}
