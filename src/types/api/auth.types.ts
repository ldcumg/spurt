export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: AuthUserItem;
};

export type AuthRefreshResponse = {
  accessToken: string;
  refreshToken: string | null;
};

type AuthUserItem = {
  id: number;
  email: string;
  name: string;
  image: string | null;
};
