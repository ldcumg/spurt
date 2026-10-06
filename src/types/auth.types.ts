// api request

export type PostSignupRequest = {
  email: string;
  name: string;
  password: string;
};

export type PostLoginRequest = {
  email: string;
  password: string;
};

export type PostRefreshRequest = {
  refreshToken: string;
};

export type PostLogoutRequest = {
  refreshToken: string;
};

export type PostOAuthRequest = {
  token: string;
};

// api response

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: AuthUserSummary;
};

export type AuthRefreshResponse = {
  accessToken: string;
  refreshToken: string | null;
};

export type OAuthProvider = "google" | "kakao";

export type AuthUserSummary = {
  id: number;
  email: string;
  name: string;
  image: string | null;
};
