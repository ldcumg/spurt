"use client";

import AddTodoModal from "@/components/AddTodoModal";
import Button from "@/components/ui/Button";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";

export default function HomePage() {
  const { isOpen, open, close } = useDisclosure();

  return (
    <>
      <Button onClick={open}>할 일 생성</Button>
      <AddTodoModal
        isOpen={true}
        onClose={close}
      />
    </>
  );
}
