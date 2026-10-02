import { buildBackendApiUrl } from "../utils";
import { todoMock } from "./mocks";
import { TODOS_API_PATH } from "@/constants";
import { http, HttpResponse } from "msw";

export const todoHandlers = [
  http.get(buildBackendApiUrl(TODOS_API_PATH.base), ({ request }) => {
    console.log("[ ㏒ ] request =>", request);
    // const searchParams = request.url.searchParams;

    // const goalId = searchParams.get("goalId");

    return HttpResponse.json(todoMock);
  }),
  http.post(buildBackendApiUrl(TODOS_API_PATH.base), async ({ request }) => {
    const body = await request.json();
    console.log("request body =>", body);

    return HttpResponse.json(body, { status: 201 });
  }),
  // http.delete(buildBackendApiUrl(TODOS_API_PATH.detail("/:id")), ({ params }) => {
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
