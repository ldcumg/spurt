import UploadInput from ".";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

const meta = {
  title: "components/UploadInput",
  component: UploadInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onFileChange: fn(),
  },
  argTypes: {
    onFileChange: { control: false },
  },
} satisfies Meta<typeof UploadInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: (args) => (
    <div className="flex w-md flex-col gap-32">
      <UploadInput {...args} />
      <UploadInput
        {...args}
        label="파일"
      />
      <UploadInput
        {...args}
        label="사진"
        placeholder="사진을 업로드해주세요"
      />
      <UploadInput
        {...args}
        label="파일"
        error="파일 크기는 5MB 이하로 업로드해주세요"
      />
    </div>
  ),
};

export const Playground: Story = {
  decorators: [
    (Story) => (
      <div className="w-md">
        <Story />
      </div>
    ),
  ],
  args: {
    label: "사진",
    placeholder: "사진을 업로드해주세요",
    error: "",
  },
};
