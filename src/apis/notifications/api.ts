import { NOTIFICATIONS_API_PATH } from "@/constants/apiEndpoints";
import type { Fetcher } from "@/types/api/fetcher.types";
import {
  GetNotificationListParams,
  NotificationResponse,
  NotificationListResponse,
  PatchNotificationRequest,
} from "@/types/notifications.types";

export const createNotificationsApi = (fetcher: Fetcher) => ({
  getNotificationList: (params?: GetNotificationListParams) =>
    fetcher<NotificationListResponse>(NOTIFICATIONS_API_PATH.base, { params }),

  patchAllNotifications: () => fetcher(NOTIFICATIONS_API_PATH.base, { method: "PATCH" }),

  deleteAllNotifications: () => fetcher(NOTIFICATIONS_API_PATH.base, { method: "DELETE" }),

  patchNotification: (notificationId: number, body: PatchNotificationRequest) =>
    fetcher<NotificationResponse>(NOTIFICATIONS_API_PATH.detail(notificationId), { method: "PATCH", data: body }),

  deleteNotification: (notificationId: number) =>
    fetcher(NOTIFICATIONS_API_PATH.detail(notificationId), { method: "DELETE" }),
});
