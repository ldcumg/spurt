import UploadInput from ".";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "components/UploadInput",
  component: UploadInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UploadInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "파일을 업로드해주세요",
    onFileChange: (file) => console.log(file),
  },
};
