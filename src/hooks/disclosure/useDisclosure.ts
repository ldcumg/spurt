import { useCallback, useState } from "react";

/** disclosure 훅 */
export const useDisclosure = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
};
