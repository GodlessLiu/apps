import { Drawer, type DrawerProps } from "antd";
import _ from "lodash";
import { useImperativeHandle, useState, type FC } from "react";

export interface AfDrawerRef {
  open: (key: string) => void;
  close: () => void;
}

export interface AfDrawerProps {
  childrenMap: Record<string, React.ReactNode>;
  ref: React.Ref<AfDrawerRef>;
}

export const AfDrawer: FC<AfDrawerProps & DrawerProps> = ({
  ref,
  childrenMap,
  ...props
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentKey, setCurrentKey] = useState<string>("");

  function handleClose() {
    setOpen(false);
    setCurrentKey("");
  }

  function handleOpen(key: string) {
    setCurrentKey(key);
    setOpen(true);
  }

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }));

  return (
    <Drawer open={open} destroyOnHidden {...props}>
      {_.map(childrenMap, (value, key) => {
        return <div key={key}>{currentKey === key && value}</div>;
      })}
    </Drawer>
  );
};

export default AfDrawer;
