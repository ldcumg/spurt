import StatusCheckbox from ".";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/internal/preview-api";

const meta = {
  title: "UI/StatusCheckbox",
  component: StatusCheckbox,
  args: {
    checked: false,
    onChange: () => {},
  },
} satisfies Meta<typeof StatusCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  render: ({ checked, onChange }) => (
    <div className="flex flex-col gap-20">
      <div>
        <h2>체크 안된 상태</h2>
        <StatusCheckbox
          checked={checked}
          onChange={onChange}
        />
      </div>
      <div>
        <h2>체크 상태</h2>
        <StatusCheckbox
          checked={!checked}
          onChange={onChange}
        />
      </div>
      <div>
        <h2>라벨 있는 상태</h2>
        <StatusCheckbox
          checked={!checked}
          onChange={onChange}
          label="라벨"
        />
      </div>
    </div>
  ),
};

export const Playground: Story = {
  parameters: {
    layout: "centered",
  },

  render: () => {
    const [{ checked }, updateArgs] = useArgs();

    return (
      <StatusCheckbox
        checked={checked}
        onChange={() => updateArgs({ checked: !checked })}
        label="체크 박스"
      />
    );
  },
};
