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
  { name: "Burger", Icon: Burger },
  { name: "Calendar", Icon: Calendar },
  { name: "Delete", Icon: Delete },
  { name: "Done", Icon: Done },
  { name: "Edit", Icon: Edit },
  { name: "File", Icon: File },
  { name: "FlagFilled", Icon: FlagFilled },
  { name: "Flag", Icon: Flag },
  { name: "Hide", Icon: Hide },
  { name: "HomeFilled", Icon: HomeFilled },
  { name: "Home", Icon: Home },
  { name: "Left", Icon: Left },
  { name: "Link", Icon: Link },
  { name: "Logout", Icon: Logout },
  { name: "More", Icon: More },
  { name: "NoteFilled", Icon: NoteFilled },
  { name: "NoteFilledGray", Icon: NoteFilledGray },
  { name: "NoteGray", Icon: NoteGray },
  { name: "Note", Icon: Note },
  { name: "PlusWhite", Icon: PlusWhite },
  { name: "Plus", Icon: Plus },
  { name: "Question", Icon: Question },
  { name: "Right", Icon: Right },
  { name: "StarFilled", Icon: StarFilled },
  { name: "Star", Icon: Star },
  { name: "Tag", Icon: Tag },
  { name: "Temporary", Icon: Temporary },
  { name: "Todo", Icon: Todo },
  { name: "TodosFilled", Icon: TodosFilled },
  { name: "Todos", Icon: Todos },
  { name: "Under", Icon: Under },
  { name: "Unhide", Icon: Unhide },
  { name: "Upload", Icon: Upload },
  { name: "X", Icon: X },
];

export const Icon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12">
      {icons.map(({ name, Icon }) => (
        <div
          key={name}
          className="flex min-h-[100px] min-w-[100px] flex-col items-center justify-center gap-8 rounded-lg border border-neutral-700 p-16"
        >
          <Icon />

          <span className="text-xs text-gray-600">{name}</span>
        </div>
      ))}
    </div>
  ),
};
