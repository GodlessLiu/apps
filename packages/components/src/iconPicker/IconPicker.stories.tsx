import type { Meta, StoryObj } from "@storybook/react-vite";
import { AfIconPicker } from "./IconPicker";
import { expect, userEvent, within } from "storybook/test";

const meta: Meta<typeof AfIconPicker> = {
  title: "Components/AfIconPicker",
  component: AfIconPicker,
  argTypes: {
    defaultValue: {
      control: "text",
      defaultValue: "ArrowRightOutlined",
    },
  },
};

export default meta;

type Story = StoryObj<typeof AfIconPicker>;

const template: Story = {};

export const 基础使用: Story = {
  ...template,
  args: {
    defaultValue: "ArrowRightOutlined",
    handleChange: (e) => {
      console.log(e);
    },
  },
};

export const 测试选择图标: Story = {
  ...template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const select = canvas.getByText("请选择图标");
    await userEvent.click(select);
    const iconOne = canvas.getByLabelText("align-right");
    await userEvent.click(iconOne);
    const arrowRightOutlined = canvas.getByText("AlignRightOutlined");
    await expect(arrowRightOutlined).toBeInTheDocument();
  },
};

export const 测试图标搜索: Story = {
  ...template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const select = canvas.getByText("请选择图标");
    await userEvent.click(select);
    const input = canvas.getByPlaceholderText("搜索图标");
    await userEvent.type(input, "Youtube");
    const youtubeOutlined = canvas.getByLabelText("youtube");
    await expect(youtubeOutlined).toBeInTheDocument();
  },
};
