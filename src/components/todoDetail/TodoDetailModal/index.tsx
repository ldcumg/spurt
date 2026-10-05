import Modal from "../../ui/Modal";
import TodoContents from "./TodoContents";
import TodoInfo from "./TodoInfo";

interface TodoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TodoDetailModal({ isOpen, onClose }: TodoDetailModalProps) {
  return (
    <Modal
      title="할 일 상세"
      isOpen={isOpen}
      onClose={onClose}
    >
      <TodoInfo />
      <TodoContents />
    </Modal>
  );
}
