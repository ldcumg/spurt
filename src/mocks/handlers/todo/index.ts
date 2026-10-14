import { todoMocks } from "./mocks";
import { TODOS_API_PATH } from "@/constants/apiEndpoints";
import { TodoResponse } from "@/types/todos.types";
import { http, HttpResponse } from "msw";

export const todoHandlers = (buildApiUrl: (path: string) => string) => [
  // 할 일 목록 조회 (GET)
  http.get(buildApiUrl(TODOS_API_PATH.base), () => {
    return HttpResponse.json(todoMocks);
  }),

  // 할 일 수정 (PATCH /api/todos/:todoId)
  http.patch(buildApiUrl(`${TODOS_API_PATH.base}/:todoId`), async ({ params, request }) => {
    const { todoId } = params;
    const body = (await request.json()) as {
      title?: string;
      done?: boolean;
      fileUrl?: string | null;
      linkUrl?: string | null;
    };

    const targetTodo = todoMocks.todos.find((item) => String(item.id) === String(todoId)) as TodoResponse | undefined;

    if (!targetTodo) {
      return HttpResponse.json({ message: "존재하지 않는 할 일입니다.", code: "TODO_NOT_FOUND" }, { status: 404 });
    }
    // 전달된 필드 업데이트 및 수정일 갱신
    if (body.title !== undefined) targetTodo.title = body.title;
    if (body.done !== undefined) targetTodo.done = body.done;
    if (body.fileUrl !== undefined) targetTodo.fileUrl = body.fileUrl;
    if (body.linkUrl !== undefined) targetTodo.linkUrl = body.linkUrl;
    targetTodo.updatedAt = new Date().toISOString();

    return HttpResponse.json(targetTodo);
  }),
];
