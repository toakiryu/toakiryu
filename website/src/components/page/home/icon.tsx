import {
  MegaphoneIcon,
  PackageIcon,
  PaperPlaneTiltIcon,
  type IconProps,
} from '@phosphor-icons/react';

const icons = {
  announcement: MegaphoneIcon,
  release: PackageIcon,
  other: PaperPlaneTiltIcon,
};

export const Icon = (props: IconProps & { category: string }) => {
  const { category, ...rest } = props;

  const IconComponent = icons[category as keyof typeof icons];

  return <IconComponent {...rest} />;
};
