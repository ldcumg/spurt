import Modal from ".";
import Button from "../Button";
import ModalActions from "./ModalActions";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";

const meta = {
  title: "UI/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
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
      <>
        <Button onClick={() => updateArgs({ isOpen: true })}>모달 열기</Button>
        <Modal
          className="p-32"
          title={title}
          isOpen={isOpen}
          onClose={() => updateArgs({ isOpen: false })}
        >
          {children}
        </Modal>
      </>
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
      <>
        <Button onClick={() => updateArgs({ isOpen: true })}>모달 열기</Button>
        <Modal
          className="p-32"
          title={title}
          isOpen={isOpen}
          onClose={() => updateArgs({ isOpen: false })}
        >
          {children}
          <ModalActions
            onClose={() => updateArgs({ isOpen: false })}
            onConfirm={() => alert("확인 버튼 클릭")}
          />
        </Modal>
      </>
    );
  },
};
