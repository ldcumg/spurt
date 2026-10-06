// api request

export type PatchMeRequest = {
  name?: string;
  image?: string | null;
};

export type PatchPasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export type GetCheckNicknameParams = {
  name: string;
};

// api response

// 내 프로필 조회
export type UserResponse = {
  id: number;
  teamId: string;
  email: string;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};
