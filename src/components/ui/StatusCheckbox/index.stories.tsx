import StatusCheckbox from ".";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/internal/preview-api";

const meta = {
  title: "components/StatusCheckbox",
  component: StatusCheckbox,
} satisfies Meta<typeof StatusCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  args: {
    isDone: true,
    onChange: () => {},
  },

  render: ({ isDone, onChange }) => (
    <div className="flex flex-col gap-20">
      <div>
        <h2>체크 안된 상태</h2>
        <StatusCheckbox
          isDone={!isDone}
          onChange={onChange}
        />
      </div>
      <div>
        <h2>체크 상태</h2>
        <StatusCheckbox
          isDone={isDone}
          onChange={onChange}
        />
      </div>
      <div>
        <h2>라벨 있는 상태</h2>
        <StatusCheckbox
          isDone={isDone}
          onChange={onChange}
          label="라벨"
        />
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    isDone: false,
    onChange: () => {},
  },
  parameters: {
    layout: "centered",
  },

  render: ({ isDone }) => {
    const [_, updateArgs] = useArgs();

    return (
      <div className="flex gap-200">
        <StatusCheckbox
          isDone={isDone}
          onChange={() => updateArgs({ isDone: !isDone })}
          label="체크 박스"
        />
      </div>
    );
  },
};
