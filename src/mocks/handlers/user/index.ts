import { userMocks } from "./mock";
//import { USERS_API_PATH } from "@/constants/apiEndpoints";
import { http, HttpResponse } from "msw";

export const userHandlers = (buildApiUrl: (path: string) => string) => [
  // 1. 프록시 경로(/api/user) 대응
  http.get("*/api/user", () => {
    return HttpResponse.json(userMocks.users);
  }),

  // 2. buildApiUrl 기반 경로 대응
  http.get(buildApiUrl("/users/me"), () => {
    return HttpResponse.json(userMocks.users);
  }),
];
