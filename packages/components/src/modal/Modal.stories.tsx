import { useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AfModal, type AfModalRef } from "./Modal";

const meta: Meta<typeof AfModal> = {
  title: "Components/AfModal",
  component: AfModal,
  tags: ["autodocs"],
  argTypes: {
    childrenMap: {
      control: "object",
      defaultValue: {
        panel1: <div>面板1内容</div>,
        panel2: <div>面板2内容</div>,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AfModal>;

export const 基础使用: Story = {
  render: (args) => {
    const modalRef = useRef<AfModalRef>(null);

    return (
      <div>
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <button onClick={() => modalRef.current?.open("panel1")}>
            打开1
          </button>
          <button onClick={() => modalRef.current?.open("panel2")}>
            打开2
          </button>
        </div>
        <AfModal
          {...args}
          ref={modalRef}
          onCancel={() => modalRef.current?.cancel()}
          okText="确定"
          cancelText="取消"
        />
      </div>
    );
  },
  args: {
    childrenMap: {
      panel1: <div>1内容</div>,
      panel2: <div>2内容</div>,
    },
  },
};
