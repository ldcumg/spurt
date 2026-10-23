import { createNotificationsApi } from "@/apis/notifications/api";
import { serverFetcher } from "@/lib/axios/serverFetcher";

export const {
  getNotificationList,
  patchAllNotifications,
  deleteAllNotifications,
  patchNotification,
  deleteNotification,
} = createNotificationsApi(serverFetcher);
