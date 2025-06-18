import React, { useEffect, useState } from "react";
import * as icons from "@ant-design/icons";
import type { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

interface AfDynamicIconProps {
  name: string;
}

export const AfDynamicIcon: React.FC<AfDynamicIconProps & AntdIconProps> = ({
  name,
  ...props
}) => {
  const [IconComponent, setIconComponent] = useState(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const icon = (icons as never)[name];
        if (icon) {
          setIconComponent(() => icon);
        }
      } catch (error) {
        console.error(`Icon ${name} not found, ${error}`);
      }
    };
    loadIcon();
  }, [name]);

  // @ts-ignore
  return IconComponent ? <IconComponent {...props} /> : null;
};

export default AfDynamicIcon;
