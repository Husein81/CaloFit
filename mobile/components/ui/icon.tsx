import * as LucideIcons from "lucide-react-native";
import type { ComponentType } from "react";
import { Pressable } from "react-native";

interface IconProps extends LucideIcons.LucideProps {
  name: string;
  className?: string;
  onPress?: () => void;
}

type LucideIconComponent = ComponentType<LucideIcons.LucideProps>;

const Icon = ({ name, color, size, className, onPress }: IconProps) => {
  const LucideIcon = LucideIcons[name as keyof typeof LucideIcons] as
    | LucideIconComponent
    | undefined;

  if (!LucideIcon) {
    throw new Error(
      `Icon "${name}" does not exist in lucide-react-native library.`,
    );
  }

  const iconElement = <LucideIcon color={color} size={size} />;

  if (onPress) {
    return (
      <Pressable className={className} onPress={onPress}>
        {iconElement}
      </Pressable>
    );
  }

  return iconElement;
};

export { Icon };
