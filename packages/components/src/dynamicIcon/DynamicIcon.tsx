import React, { useEffect, useState } from "react";
import * as icons from "@ant-design/icons";
import type { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

interface AfDynamicIconProps extends AntdIconProps {
  name: string;
}

export const AfDynamicIcon: React.FC<AfDynamicIconProps> = ({
  name,
  ...props
}) => {
  const [IconComponent, setIconComponent] = useState(null);

  useEffect(() => {
    const loadIcon = async () => {
      const icon = (icons as never)[name];
      if (icon) {
        setIconComponent(() => icon);
        return;
      }
      setIconComponent(() => (icons as never)["QuestionOutlined"]);
    };
    loadIcon();
  }, [name]);

  // @ts-ignore
  return IconComponent ? <IconComponent {...props} /> : null;
};

export default AfDynamicIcon;
