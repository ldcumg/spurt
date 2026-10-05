import { goalMocks } from "./mocks";
import { GOALS_API_PATH } from "@/constants/apiEndpoints";
import { http, HttpResponse } from "msw";

export const goalHandlers = (buildApiUrl: (path: string) => string) => [
  http.get(buildApiUrl(GOALS_API_PATH.base), () => {
    return HttpResponse.json(goalMocks);
  }),
];
