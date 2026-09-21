"use client";

import Dropdown from "@/components/ui/Dropdown";
import Modal from "@/components/ui/Modal";
import ModalActions from "@/components/ui/Modal/ModalActions";
import TextInput from "@/components/ui/TextInput";

export default function HomePage() {
  return (
    <Modal
      title="할 일 생성"
      isOpen={true}
      onClose={() => {}}
    >
      <TextInput
        label="제목"
        placeholder="할 일의 제목을 적어 주세요"
      />
      <Dropdown />
      <TextInput
        label="링크"
        placeholder="링크를 업로드해 주세요"
      />
      <ModalActions
        onClose={() => {}}
        onConfirm={() => {}}
      />
    </Modal>
  );
}
