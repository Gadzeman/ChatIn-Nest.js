export type AuthSignInBody = {
  email: string;
  password: string;
};

export type RefreshTokenBody = {
  userId: number;
};
