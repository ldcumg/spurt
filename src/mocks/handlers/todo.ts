import { buildBackendApiUrl } from "./utils";
import { API_PATH } from "@/constants";
import { http, HttpResponse } from "msw";

export const todoHandlers = [
  http.get(buildBackendApiUrl(API_PATH.todos.base), () =>
    HttpResponse.json([
      { id: 1, title: "첫 번째 게시글", body: "내용 1" },
      { id: 2, title: "두 번째 게시글", body: "내용 2" },
    ]),
  ),
];
