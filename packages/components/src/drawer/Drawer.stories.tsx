import { useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AfDrawer, type AfDrawerRef } from "./Drawer";

const meta: Meta<typeof AfDrawer> = {
  title: "Components/AfDrawer",
  component: AfDrawer,
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

type Story = StoryObj<typeof AfDrawer>;

export const 基础使用: Story = {
  render: (args) => {
    const drawerRef = useRef<AfDrawerRef>(null);

    return (
      <div>
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <button onClick={() => drawerRef.current?.open("panel1")}>
            打开面板1
          </button>
          <button onClick={() => drawerRef.current?.open("panel2")}>
            打开面板2
          </button>
        </div>
        <AfDrawer
          {...args}
          ref={drawerRef}
          onClose={() => drawerRef.current?.close()}
        />
      </div>
    );
  },
  args: {
    childrenMap: {
      panel1: <div>面板1内容</div>,
      panel2: <div>面板2内容</div>,
    },
  },
};
