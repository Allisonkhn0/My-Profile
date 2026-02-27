export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export type UserType = {
  id: number;
  email: string;
  password?: string;
  name?: string;
  phone?: string;
  role?: UserRole;
};

export type UserRegistrationType = Omit<UserType, "id" | "role">;
export type UserAuthorizationType = Omit<
  UserType,
  "id" | "role" | "name" | "phone"
>;

export type UserResponseType = {
  user: Omit<UserType, "password">;
  accessToken: string;
  refreshToken: string;
};
