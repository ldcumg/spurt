import { NOTIFICATIONS_API_PATH } from "@/constants";
import { serverFetcher } from "@/lib/axios/serverFetcher";
import {
  GetNotificationListParams,
  NotificationResponse,
  NotificationListResponse,
  PatchNotificationRequest,
} from "@/types/notifications.types";

export const getNotificationList = (params?: GetNotificationListParams) =>
  serverFetcher<NotificationListResponse>(NOTIFICATIONS_API_PATH.base, { params });

export const patchAllNotifications = () => serverFetcher(NOTIFICATIONS_API_PATH.base, { method: "PATCH" });

export const deleteAllNotifications = () => serverFetcher(NOTIFICATIONS_API_PATH.base, { method: "DELETE" });

export const patchNotification = (notificationId: number, body: PatchNotificationRequest) =>
  serverFetcher<NotificationResponse>(NOTIFICATIONS_API_PATH.detail(notificationId), { method: "PATCH", data: body });

export const deleteNotification = (notificationId: number) =>
  serverFetcher(NOTIFICATIONS_API_PATH.detail(notificationId), { method: "DELETE" });
