import { todoMocks } from "./mocks";
import { TODOS_API_PATH } from "@/constants/apiEndpoints";
import { http, HttpResponse } from "msw";

export const todoHandlers = (buildApiUrl: (path: string) => string) => [
  http.get(buildApiUrl(TODOS_API_PATH.base), () => {
    // const searchParams = request.ur l.searchParams;

    // const goalId = searchParams.get("goalId");

    return HttpResponse.json(todoMocks);
  }),
  // http.post(buildApiUrl(TODOS_API_PATH.base), async ({ request }) => {
  //   const body = await request.json();
  //   console.log("request body =>", body);

  //   return HttpResponse.json(body, { status: 201 });
  // }),
  // http.delete(urlBuilder(TODOS_API_PATH.detail("/:id")), ({ params }) => {
  //   const id = Number(params.id);

  //   const index = todoMock.todos.findIndex((todo) => todo.id === id);

  //   if (index === -1) {
  //     return new HttpResponse(null, { status: 404 });
  //   }

  //   todoMock.todos.splice(index, 1);

  //   todoMock.totalCount -= 1;

  //   return new HttpResponse(null, { status: 204 });
  // }),
];
