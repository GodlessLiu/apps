import type { Meta, StoryObj } from "@storybook/react-vite";
import { AfTable } from "./Table";
import { expect, fn, userEvent, within } from "storybook/test";

const meta: Meta<typeof AfTable> = {
  title: "Components/AfTable",
  component: AfTable,
  argTypes: {},
};
type Story = StoryObj<typeof AfTable>;
export default meta;

const template: Story = {
  render: (args) => {
    return (
      <div style={{ height: "700px", width: "80vw" }}>
        <AfTable {...args} />
      </div>
    );
  },
  args: {
    columns: [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
    ],
    dataSource: Array.from({ length: 100 }, (_, index) => ({
      name: `John Brown ${index}`,
      age: index,
      address: `New York No. 1 Lake Park ${index}`,
    })),
    bordered: true,
    pagination: {
      total: 100,
      pageSize: 10,
    },
  },
};

export const 基础使用: Story = {
  ...template,
};

export const 测试表格高度: Story = {
  ...template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const tableContent = canvas.getByTestId("table-content");
    // 700 - 45 (container height - pagination height)
    expect(tableContent).toHaveStyle({ height: "655px" });
    const tableBody = tableContent.querySelector(".ant-table-body");
    // 700 - 45 - 55 (container height - pagination height - header height)
    expect(tableBody).toHaveStyle({ maxHeight: "600px" });
  },
};

export const 分页器点击触发事件: Story = {
  ...template,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const num2 = canvas.getByTitle("2");
    const num3 = canvas.getByTitle("3");
    await userEvent.click(num2);
    // @ts-ignore
    expect(args.pagination.onChange).toHaveBeenCalledWith(2, 10);
    await userEvent.click(num3);
    // @ts-ignore
    expect(args.pagination.onChange).toHaveBeenCalledWith(3, 10);
  },
  args: {
    pagination: {
      total: 100,
      pageSize: 10,
      onChange: fn((page, size) => {
        return { page, size };
      }),
    },
  },
};
