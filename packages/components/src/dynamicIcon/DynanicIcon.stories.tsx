import type { Meta, StoryObj } from "@storybook/react-vite";
import { AfDynamicIcon } from "./DynamicIcon";
import { expect, within } from "storybook/test";

const meta: Meta<typeof AfDynamicIcon> = {
  title: "Components/AfDynamicIcon",
  component: AfDynamicIcon,
  argTypes: {
    name: {
      type: "string",
      defaultValue: "",
    },
  },
};

export default meta;

type Story = StoryObj<typeof AfDynamicIcon>;

const template: Story = {
  render: (args) => {
    return <AfDynamicIcon {...args} />;
  },
  args: {
    name: "UserOutlined",
  },
};

export const 基础使用: Story = {
  ...template,
};

export const 测试图标显示: Story = {
  ...template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const icon = canvas.getByLabelText("user");
    expect(icon).toBeInTheDocument();
  },
};

export const 错误图标时显示默认图标: Story = {
  ...template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const icon = canvas.getByLabelText("question");
    expect(icon).toBeInTheDocument();
  },
  args: {
    name: "xxxx",
  },
};
