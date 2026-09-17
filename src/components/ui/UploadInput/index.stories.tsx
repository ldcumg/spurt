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
    label: "사진",
    placeholder: "사진을 업로드해주세요",
    onFileChange: (file) => console.log(file),
  },
};

export const NoLabel: Story = {
  args: {
    onFileChange: (file) => console.log(file),
  }
}

export const Error: Story = {
  args: {
    label: "파일",
    error: "파일 크기는 5MB를 넘길 수 없습니다",
    onFileChange: (file) => console.log(file),
  }
}
