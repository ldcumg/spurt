import { buildApiUrl } from "../index.utils";
import { todoMocks } from "./mocks";
import { TODOS_API_PATH } from "@/constants/apiEndpoints";
import { http, HttpResponse } from "msw";

export const todoHandlers = [
  http.get(buildApiUrl(TODOS_API_PATH.base), () => {
    return HttpResponse.json(todoMocks);
  }),
];
