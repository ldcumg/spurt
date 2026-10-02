// api request

export type PatchNotificationRequest = {
  isRead: boolean;
};

export type GetNotificationListParams = {
  cursor?: number;
  limit?: number;
};

// api response

export type NotificationListResponse = {
  notifications: NotificationResponse[];
  nextCursor: number | null;
  totalCount: number;
};

export type NotificationResponse = {
  id: number;
  teamId: string;
  userId: number;
  type: string;
  message: string;
  data?: unknown;
  isRead: boolean;
  resourceId: number | null;
  createdAt: string;
};
