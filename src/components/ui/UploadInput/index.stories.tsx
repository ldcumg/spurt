import UploadInput from ".";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ComponentProps, useState } from "react";

function StatefulUploadInput(props: Omit<ComponentProps<typeof UploadInput>, "file" | "onFileChange">) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <UploadInput
      {...props}
      file={file}
      onFileChange={setFile}
    />
  );
}

const meta = {
  title: "components/UploadInput",
  component: StatefulUploadInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StatefulUploadInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: (args) => (
    <div className="flex w-md flex-col gap-32">
      <StatefulUploadInput {...args} />
      <StatefulUploadInput
        {...args}
        label="파일"
      />
      <StatefulUploadInput
        {...args}
        label="사진"
        placeholder="사진을 업로드해주세요"
      />
      <StatefulUploadInput
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
