import type {
  UserRegistrationType,
  UserType,
} from "@/feature/auth/types/user-type";
import axiosInstance from "@/shared/lib/axios-instance";

class UserAPI {
  static async getUser(): Promise<UserType> {
    const { data } = await axiosInstance.get("/users/me");
    return data;
  }

  static async updateUser(user: UserRegistrationType): Promise<UserType> {
    const { data } = await axiosInstance.patch("/users/me", user);
    return data;
  }
}

export default UserAPI;
