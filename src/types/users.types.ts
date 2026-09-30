// 회원가입, 로그인
export type UserAuthItem = {
  id: number;
  email: string;
  name: string;
  image: string | null;
};

// 내 프로필 조회
export type UserItem = {
  id: number;
  teamId: string;
  email: string;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};
