import { GOAL_API_URLS } from "@/constants/apiEndpoints";
import { CACHE_TAGS } from "@/constants/cacheTags";
import { handleError } from "@/utils/handleError";
import { cacheTag } from "next/cache";

//NOTE - 임시 fetch api
/** 목표 전체 조회 api */
export const getGoalsApi = handleError(async () => {
  "use cache";
  cacheTag(CACHE_TAGS.goals);

  const res = await fetch(GOAL_API_URLS.list, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
});
