"use client";

import Modal from "@/components/ui/Modal";
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
    </Modal>
  );
}
