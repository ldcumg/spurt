import { createTodosApi } from "@/apis/todos/api";
import { clientFetcher } from "@/lib/axios/clientFetcher";

export const { getTodoList } = createTodosApi(clientFetcher);
