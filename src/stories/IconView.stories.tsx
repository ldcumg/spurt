import {
  Burger,
  Calendar,
  Delete,
  Done,
  Edit,
  File,
  FlagFilled,
  Flag,
  Hide,
  HomeFilled,
  Home,
  Left,
  Link,
  Logout,
  More,
  NoteFilled,
  NoteFilledGray,
  NoteGray,
  Note,
  PlusWhite,
  Plus,
  Question,
  Right,
  StarFilled,
  Star,
  Tag,
  Temporary,
  Todo,
  TodosFilled,
  Todos,
  Under,
  Unhide,
  Upload,
  X,
} from "@/assets/icons";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "foundations",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const icons = [
  { name: "Burger", src: Burger },
  { name: "Calendar", src: Calendar },
  { name: "Delete", src: Delete },
  { name: "Done", src: Done },
  { name: "Edit", src: Edit },
  { name: "File", src: File },
  { name: "FlagFilled", src: FlagFilled },
  { name: "Flag", src: Flag },
  { name: "Hide", src: Hide },
  { name: "HomeFilled", src: HomeFilled },
  { name: "Home", src: Home },
  { name: "Left", src: Left },
  { name: "Link", src: Link },
  { name: "Logout", src: Logout },
  { name: "More", src: More },
  { name: "NoteFilled", src: NoteFilled },
  { name: "NoteFilledGray", src: NoteFilledGray },
  { name: "NoteGray", src: NoteGray },
  { name: "PlusWhite", src: PlusWhite },
  { name: "Note", src: Note },
  { name: "Plus", src: Plus },
  { name: "Question", src: Question },
  { name: "Right", src: Right },
  { name: "StarFilled", src: StarFilled },
  { name: "Star", src: Star },
  { name: "Tag", src: Tag },
  { name: "Temporary", src: Temporary },
  { name: "Todo", src: Todo },
  { name: "TodosFilled", src: TodosFilled },
  { name: "Todos", src: Todos },
  { name: "Under", src: Under },
  { name: "Unhide", src: Unhide },
  { name: "Upload", src: Upload },
  { name: "X", src: X },
];
function getImageSrc(src: unknown) {
  if (typeof src === "string") {
    return src;
  }

  if (typeof src === "object" && src !== null && "src" in src && typeof src.src === "string") {
    return src.src;
  }

  return "";
}
export const Icon: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-12">
        {icons.map(({ name, src }) => (
          <div
            key={name}
            className="flex min-h-[100px] min-w-[100px] flex-col items-center justify-center rounded-lg border border-neutral-700 p-16"
          >
            <img
              src={getImageSrc(src)}
              alt={name}
            />

            <span className="text-xs text-gray-600">{name}</span>
          </div>
        ))}
      </div>
    );
  },
};
