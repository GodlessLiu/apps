import { useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AfModal, type AfModalRef } from "./Modal";
import { expect, userEvent, within } from "storybook/test";

const meta: Meta<typeof AfModal> = {
  title: "Components/AfModal",
  component: AfModal,
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

type Story = StoryObj<typeof AfModal>;

const template: Story = {
  render: ({ childrenMap }) => {
    const modalRef = useRef<AfModalRef>(null);
    return (
      <div>
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <button onClick={() => modalRef.current?.open("panel1")}>
            open1
          </button>
          <button onClick={() => modalRef.current?.open("panel2")}>
            open2
          </button>
        </div>
        <AfModal
          childrenMap={childrenMap}
          ref={modalRef}
          onCancel={() => modalRef.current?.cancel()}
          okText="确定"
          cancelText="取消"
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
    const modalRef = useRef<AfModalRef>(null);
    return (
      <div>
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <button onClick={() => modalRef.current?.open("panel1")}>open</button>
        </div>
        <AfModal
          childrenMap={childrenMap}
          ref={modalRef}
          onCancel={() => modalRef.current?.cancel()}
          okText="确定"
          cancelText={<span data-testid="cancel">取消</span>}
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
    const closeButton = canvas.getByTestId("cancel");
    await userEvent.click(closeButton, { delay: 500 });
    expect(content1).not.toBeInTheDocument();
  },
};

// export const 测试开启不同模态框: Story = {
//   ...template,
//   args: {
//     childrenMap: {
//       panel1: <div>content1</div>,
//       panel2: <div>content2</div>,
//     },
//   },
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement.ownerDocument.body);
//     const button1 = canvas.getByRole("button", { name: "open1" });
//     const button2 = canvas.getByRole("button", { name: "open2" });
//     await userEvent.click(button1);
//     const content1 = canvas.getByText("content1");
//     expect(content1).toBeInTheDocument();
//     await userEvent.click(button2);
//     const content2 = canvas.getByText("content2");
//     expect(content2).toBeInTheDocument();
//   },
// };
