import ModalActions from ".";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "components/ModalActions",
  component: ModalActions,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClose: {
      options: [true, false],
      control: "radio",
      description: "닫기 버튼 함수",
      type: {
        name: "function",
      },
    },
    closeButtonLabel: {
      control: "text",
      table: {
        defaultValue: {
          summary: "취소",
        },
      },
      description: "닫기 버튼 라벨",
    },
    onConfirm: {
      options: [true, false],
      control: "radio",
      description: "확인 버튼 함수",
      type: {
        name: "function",
      },
    },
    confirmButtonLabel: {
      table: {
        defaultValue: {
          summary: "확인",
        },
      },
      description: "확인 버튼 라벨",
    },
    isConfirmDisabled: {
      table: {
        defaultValue: {
          summary: "false",
        },
      },
      description: "확인 버튼 disabled",
    },
  },
} satisfies Meta<typeof ModalActions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: () => alert("취소 버튼 실행"),
    onConfirm: () => alert("확인 버튼 실행"),
    closeButtonLabel: "취소",
    confirmButtonLabel: "확인",
    isConfirmDisabled: false,
  },

  render: function Render({ onClose, onConfirm, closeButtonLabel, confirmButtonLabel, isConfirmDisabled }) {
    return (
      <div style={{ width: "600px" }}>
        <ModalActions
          onClose={onClose}
          onConfirm={onConfirm}
          closeButtonLabel={closeButtonLabel}
          confirmButtonLabel={confirmButtonLabel}
          isConfirmDisabled={isConfirmDisabled}
        />
      </div>
    );
  },
};
