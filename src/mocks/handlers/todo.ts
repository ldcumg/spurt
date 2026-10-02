import { http, HttpResponse } from "msw";

const baseUrl = ``;

export const todoHandlers = [
  http.get(`${baseUrl}/posts`, () => {
    return HttpResponse.json([
      { id: 1, title: "첫 번째 게시글", body: "내용 1" },
      { id: 2, title: "두 번째 게시글", body: "내용 2" },
    ]);
  }),
];
