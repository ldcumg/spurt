import { todoMocks } from "./mocks";
import { TODOS_API_PATH } from "@/constants/apiEndpoints";
import { http, HttpResponse } from "msw";

export const todoHandlers = (buildApiUrl: (path: string) => string) => [
  http.get(buildApiUrl(TODOS_API_PATH.base), () => {
    return HttpResponse.json(todoMocks);
  }),
];
