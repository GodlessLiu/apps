import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";
import { AfThrottleButton } from "./ThrottleButton";
const meta: Meta<typeof AfThrottleButton> = {
  title: "Components/ThrottleButton",
  component: AfThrottleButton,
};

export default meta;

type Story = StoryObj<typeof meta>;

const template: Story = {
  render: (args) => (
    <AfThrottleButton
      type="primary"
      throttleTime={args.throttleTime || 10}
      onClick={() => Promise.resolve(true)}
    >
      <span data-testid="button-text">按钮</span>
    </AfThrottleButton>
  ),
};

export const 基础使用: Story = {
  ...template,
};

export const 测试点击后禁用: Story = {
  ...template,
  args: {
    throttleTime: 1,
    onClick: () => Promise.resolve(true),
  },
  play: async ({ canvasElement, args }) => {
    const button = canvasElement.ownerDocument.body.querySelector(".ant-btn")!;
    await userEvent.click(button);
    expect(button).toHaveAttribute("disabled");
    setTimeout(() => {
      expect(button).not.toHaveAttribute("disabled");
    }, args.throttleTime! * 1100);
  },
};

export const 禁用后可再点击: Story = {
  ...template,
  args: {
    throttleTime: 1,
    onClick: () => Promise.resolve(true),
  },
  play: async ({ canvasElement, args }) => {
    const button = canvasElement.ownerDocument.body.querySelector(".ant-btn")!;
    await userEvent.click(button);
    expect(button).toHaveAttribute("disabled");
    setTimeout(async () => {
      expect(button).not.toHaveAttribute("disabled");
      await userEvent.click(button);
      expect(button).toHaveAttribute("disabled");
    }, args.throttleTime! * 1100);
  },
};
