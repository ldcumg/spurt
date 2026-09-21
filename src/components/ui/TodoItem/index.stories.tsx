import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TodoItem from ".";

const Todos = {
  todos: [
    {
      id: 12,
      teamId: "team-abc",
      userId: 1,
      goalId: 3,
      title:
        "길이를 늘려서 truncate를 실험해보자. 길이를 늘려서 truncate를 실험해보자. 길이를 늘려서 truncate를 실험해보자. 길이를 늘려서 truncate를 실험해보자. ",
      done: false,
      fileUrl: null,
      linkUrl: "https://docs.example.com",
      dueDate: "2026-02-20T00:00:00.000Z",
      createdAt: "2026-02-16T09:00:00.000Z",
      updatedAt: "2026-02-16T09:00:00.000Z",
      goal: {
        id: 3,
        title: "프로젝트 완성",
      },
      noteIds: [5],
      tags: [
        {
          id: 1,
          name: "urgent",
        },
      ],
      isFavorite: false,
    },
    {
      id: 13,
      teamId: "team-abc",
      userId: 1,
      goalId: 3,
      title: "Storybook 컴포넌트 문서화 및 인터랙션 테스트",
      done: true,
      fileUrl: "https://storage.example.com/assets/screenshot-1.png",
      linkUrl: "http://localhost:6006",
      dueDate: "2026-02-18T23:59:59.000Z",
      createdAt: "2026-02-16T10:30:00.000Z",
      updatedAt: "2026-02-18T14:20:00.000Z",
      goal: {
        id: 3,
        title: "프로젝트 완성",
      },
      noteIds: [6, 7],
      tags: [
        {
          id: 2,
          name: "frontend",
        },
        {
          id: 3,
          name: "storybook",
        },
      ],
      isFavorite: true,
    },
    {
      id: 14,
      teamId: "team-abc",
      userId: 2,
      goalId: 3,
      title: "데이터베이스 ERD 설계 및 마이그레이션",
      done: true,
      fileUrl: null,
      linkUrl: "https://dbdiagram.io/d/example",
      dueDate: "2026-02-17T18:00:00.000Z",
      createdAt: "2026-02-15T11:00:00.000Z",
      updatedAt: "2026-02-17T17:45:00.000Z",
      goal: {
        id: 3,
        title: "프로젝트 완성",
      },
      noteIds: [],
      tags: [
        {
          id: 4,
          name: "backend",
        },
      ],
      isFavorite: false,
    },
    {
      id: 15,
      teamId: "team-abc",
      userId: 1,
      goalId: 4,
      title: "정보처리기사 실기 기출문제 풀이 (1~3회차)",
      done: false,
      fileUrl: null,
      linkUrl: null,
      dueDate: "2026-02-25T00:00:00.000Z",
      createdAt: "2026-02-17T13:10:00.000Z",
      updatedAt: "2026-02-17T13:10:00.000Z",
      goal: {
        id: 4,
        title: "자격증 취득",
      },
      noteIds: [8],
      tags: [
        {
          id: 5,
          name: "study",
        },
      ],
      isFavorite: true,
    },
    {
      id: 16,
      teamId: "team-abc",
      userId: 3,
      goalId: 3,
      title: "디자인 시스템 컬러/타이포그래피 토큰 정의",
      done: false,
      fileUrl: "https://storage.example.com/assets/design-tokens.json",
      linkUrl: "https://www.figma.com/design/example",
      dueDate: "2026-02-22T15:00:00.000Z",
      createdAt: "2026-02-17T15:40:00.000Z",
      updatedAt: "2026-02-17T15:40:00.000Z",
      goal: {
        id: 3,
        title: "프로젝트 완성",
      },
      noteIds: [],
      tags: [
        {
          id: 6,
          name: "design",
        },
        {
          id: 1,
          name: "urgent",
        },
      ],
      isFavorite: false,
    },
  ],
  nextCursor: 17,
  totalCount: 25,
};

const meta = {
  title: "components/TodoItem",
  component: TodoItem,
  tags: ["autodocs"],
  argTypes: {
    todo: {
      description: "할 일",
      control: "object",
    },
  },
} satisfies Meta<typeof TodoItem>;

export default meta;

type Story = StoryObj<typeof TodoItem>;

export const All_States: Story = {
  render: () => (
    <div className="flex flex-col gap-24">
      <p>*호버도 테스트 해보세요</p>
      <h1>(Todo)</h1>
      <TodoItem todo={Todos.todos[3]} />
      <h1>(Done)</h1>
      <TodoItem todo={Todos.todos[1]} />
      <h1>(Goal)</h1>
      <TodoItem
        todo={Todos.todos[3]}
        type="goal"
      />
      <h1>(Goal md)</h1>
      <div className="w-[468px] border border-dashed p-4">
        <TodoItem
          todo={Todos.todos[3]}
          type="goal"
        />
      </div>

      <h1>Test (truncate)</h1>
      <TodoItem todo={Todos.todos[0]} />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    todo: {
      ...Todos.todos[3],
      title: Todos.todos[3].title,
      done: Todos.todos[3].done,
      fileUrl: Todos.todos[3].fileUrl,
      linkUrl: Todos.todos[3].linkUrl,
      noteIds: Todos.todos[3].noteIds,
      goal: Todos.todos[3].goal,
    },
  },
};
