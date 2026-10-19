import ModalActions from ".";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "UI/ModalActions",
  component: ModalActions,
  parameters: {
    layout: "centered",
  },
  args: {
    onClose: () => {},
    onConfirm: () => {},
    closeButtonLabel: "취소",
    confirmButtonLabel: "확인",
    isCloseDisabled: false,
    isConfirmDisabled: false,
  },
} satisfies Meta<typeof ModalActions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  render: function Render({ onClose, onConfirm, closeButtonLabel }) {
    return (
      <div className="flex w-500 flex-col gap-60">
        <div>
          <h2 className="text-title-lg">onClose가 없는 경우</h2>
          <ModalActions
            onConfirm={onConfirm}
            closeButtonLabel={closeButtonLabel}
          />
        </div>
        <div>
          <h2 className="text-title-lg">onClose가 있는 경우</h2>
          <ModalActions
            onClose={onClose}
            onConfirm={onConfirm}
          />
        </div>
        <div>
          <h2 className="text-title-lg">isConfirmDisabled가 true인 경우</h2>
          <ModalActions
            onClose={onClose}
            onConfirm={onConfirm}
            isConfirmDisabled={true}
          />
        </div>
      </div>
    );
  },
};

export const Playground: Story = {
  render: function Render({ closeButtonLabel, confirmButtonLabel, isCloseDisabled, isConfirmDisabled }) {
    return (
      <div className="w-600">
        <ModalActions
          onClose={() => alert(`${closeButtonLabel} 버튼 실행`)}
          onConfirm={() => alert(`${confirmButtonLabel} 버튼 실행`)}
          closeButtonLabel={closeButtonLabel}
          confirmButtonLabel={confirmButtonLabel}
          isCloseDisabled={isCloseDisabled}
          isConfirmDisabled={isConfirmDisabled}
        />
      </div>
    );
  },
};
