import { Modal, type ModalProps } from "antd";
import _ from "lodash";
import { useImperativeHandle, useState, type FC } from "react";

export interface AfModalRef {
  open: (key: string) => void;
  cancel: () => void;
}

export interface AfModalProps extends ModalProps {
  childrenMap: Record<string, React.ReactNode>;
  ref: React.Ref<AfModalRef>;
}

export const AfModal: FC<AfModalProps> = ({ ref, childrenMap, ...props }) => {
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
    cancel: handleClose,
  }));

  return (
    <Modal open={open} destroyOnHidden {...props}>
      {_.map(childrenMap, (value, key) => {
        return <div key={key}>{currentKey === key && value}</div>;
      })}
    </Modal>
  );
};

export default AfModal;
