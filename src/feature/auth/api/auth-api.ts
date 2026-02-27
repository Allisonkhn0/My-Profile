import axiosInstance from "@/shared/lib/axios-instance";
import type {
   UserResponseType,
   UserRegistrationType,
   UserAuthorizationType,
} from "../types/user-type";

export const AuthApiUrl = {
  register: "/auth/register",
  login: "/auth/login",
  refresh: "/auth/refresh",
  logout: "/auth/logout",
};

class AuthApi {
  static async register(user: UserRegistrationType): Promise<UserResponseType> {
    const { data } = await axiosInstance.post<UserResponseType>(
      AuthApiUrl.register,
      user,
    );
    return data;
  }

  static async auth(user: UserAuthorizationType): Promise<UserResponseType> {
    const { data } = await axiosInstance.post<UserResponseType>(
      AuthApiUrl.login,
      user,
    );
    return data;
  }

  static async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    const { data } = await axiosInstance.post<{ accessToken: string }>(
      AuthApiUrl.refresh,
      refreshToken,
    );
    return data;
  }

  static async logout(): Promise<{ message: string }> {
    const { data } = await axiosInstance.post<{ message: string }>(
      AuthApiUrl.logout,
    );
    return data;
  }
}

export default AuthApi;
