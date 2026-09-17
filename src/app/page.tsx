"use client";

import Modal from "@/components/ui/Modal";
import ModalActions from "@/components/ui/Modal/ModalActions";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";

export default function HomePage() {
  const { close } = useDisclosure();
  return (
    <Modal
      onClose={close}
      title="dsfdsaf"
      isOpen={true}
    >
      dsfdaf
      <ModalActions
        onClose={close}
        onConfirm={close}
        closeButtonLabel="취소"
        confirmButtonLabel="확인"
        isConfirmDisabled={false}
      />
    </Modal>
  );
}
