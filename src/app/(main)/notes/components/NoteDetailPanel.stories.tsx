import { INITIAL_NOTES } from "../mock";
import NoteDetailPanel from "./NoteDetailPanel";
import Button from "@/components/ui/Button";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const responsiveViewports = {
  mobile: {
    name: "Mobile 390",
    styles: { width: "390px", height: "844px" },
    type: "mobile",
  },
  tablet: {
    name: "Tablet 1080",
    styles: { width: "1080px", height: "1440px" },
    type: "tablet",
  },
  desktop: {
    name: "Desktop 1680",
    styles: { width: "1680px", height: "940px" },
    type: "desktop",
  },
} as const;

const meta = {
  title: "Pages/Notes/Note Detail Panel",
  component: NoteDetailPanel,
  parameters: {
    layout: "fullscreen",
    viewport: { options: responsiveViewports },
  },
  args: {
    note: INITIAL_NOTES[0],
    isOpen: true,
    onClose: () => {},
  },
} satisfies Meta<typeof NoteDetailPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

function NoteDetailExample() {
  const { isOpen, open, close } = useDisclosure(true);

  return (
    <main className="bg-surface flex min-h-screen items-center justify-center p-24">
      <Button onClick={open}>노트 상세 열기</Button>
      <NoteDetailPanel
        note={INITIAL_NOTES[0]}
        isOpen={isOpen}
        onClose={close}
      />
    </main>
  );
}

export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
  render: () => <NoteDetailExample />,
};

export const Tablet: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
  render: () => <NoteDetailExample />,
};

export const Desktop: Story = {
  globals: { viewport: { value: "desktop", isRotated: false } },
  render: () => <NoteDetailExample />,
};
