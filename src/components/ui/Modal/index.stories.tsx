import Modal from ".";
import ModalActions from "./ModalActions";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";

const meta = {
  title: "components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "모달 제목",
    isOpen: true,
    onClose: () => {},
    children: "모달 본문",
  },

  render: function Render({ title, children }) {
    const [{ isOpen }, updateArgs] = useArgs();

    return (
      <Modal
        title={title}
        isOpen={isOpen}
        onClose={() => updateArgs({ isOpen: false })}
      >
        {children}
      </Modal>
    );
  },
};

export const WithActions: Story = {
  args: {
    title: "모달 제목",
    isOpen: true,
    onClose: () => {},
    children: "모달 본문",
  },

  render: function Render({ title, children }) {
    const [{ isOpen }, updateArgs] = useArgs();

    return (
      <Modal
        title={title}
        isOpen={isOpen}
        onClose={() => updateArgs({ isOpen: false })}
      >
        {children}
        <ModalActions
          onClose={() => alert("취소버튼 클릭")}
          onConfirm={() => alert("확인버튼 클릭")}
        />
      </Modal>
    );
  },
};
