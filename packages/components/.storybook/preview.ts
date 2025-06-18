import type { Preview } from "@storybook/react-vite";
import "@ant-design/v5-patch-for-react-19";

const preview: Preview = {
  beforeAll: () => {},
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
