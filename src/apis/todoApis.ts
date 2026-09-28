import { GOAL_API_URLS } from "@/constants/apiEndpoints";
import { handleError } from "@/utils/handleError";

//NOTE - 임시 fetch api
/** 할 일 생성 api */
export const createTodoApi = handleError(async () => {
  const res = await fetch(GOAL_API_URLS.list, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({}),
  });

  return await res.json();
});
