import { useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { AfDrawer, type AfDrawerRef } from "./Drawer";

const meta: Meta<typeof AfDrawer> = {
  title: "Components/AfDrawer",
  component: AfDrawer,
  argTypes: {
    childrenMap: {
      control: "object",
      defaultValue: {
        panel1: <div>content1</div>,
        panel2: <div>content2</div>,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AfDrawer>;

const template: Story = {
  render: ({ childrenMap }) => {
    const drawerRef = useRef<AfDrawerRef>(null);
    return (
      <div>
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <button onClick={() => drawerRef.current?.open("panel1")}>
            open1
          </button>
          <button onClick={() => drawerRef.current?.open("panel2")}>
            open2
          </button>
        </div>
        <AfDrawer
          childrenMap={childrenMap}
          ref={drawerRef}
          onClose={() => drawerRef.current?.close()}
        />
      </div>
    );
  },
};

export const 基础使用: Story = {
  ...template,
  args: {
    childrenMap: {
      panel1: <div>content1</div>,
      panel2: <div>content2</div>,
    },
  },
};

export const 测试关闭和开启: Story = {
  render: ({ childrenMap }) => {
    const drawerRef = useRef<AfDrawerRef>(null);
    return (
      <div>
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <button onClick={() => drawerRef.current?.open("panel1")}>
            open
          </button>
        </div>
        <AfDrawer
          childrenMap={childrenMap}
          ref={drawerRef}
          onClose={() => drawerRef.current?.close()}
        />
      </div>
    );
  },
  args: {
    childrenMap: {
      panel1: <div>content</div>,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const button1 = canvas.getByRole("button", { name: "open" });
    await userEvent.click(button1);
    const content1 = canvas.getByText("content");
    expect(content1).toBeInTheDocument();
    const closeButton = canvas.getByLabelText("Close");
    await userEvent.click(closeButton);
    expect(content1).not.toBeInTheDocument();
  },
};

export const 测试开启不同面板: Story = {
  ...template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const button1 = canvas.getByRole("button", { name: "open1" });
    const button2 = canvas.getByRole("button", { name: "open2" });
    await userEvent.click(button1);
    const content1 = canvas.getByText("content1");
    expect(content1).toBeInTheDocument();
    await button2.click();
    const content2 = canvas.getByText("content2");
    expect(content2).toBeInTheDocument();
  },
  args: {
    childrenMap: {
      panel1: <div>content1</div>,
      panel2: <div>content2</div>,
    },
  },
};
