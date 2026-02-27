import type { UserResponseType, UserType } from "../types/user-type";

const authStorage = {
  getStorageAccessToken: () => localStorage.getItem("accessToken"),
  setStorageAccessToken: (token: string) =>
    localStorage.setItem("accessToken", token),

  getStorageRefreshToken: () => localStorage.getItem("refreshToken"),
  setStorageRefreshToken: (token: string) =>
    localStorage.setItem("refreshToken", token),

  getStorageUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : undefined;
  },
  setStorageUser: (user: UserType) =>
    localStorage.setItem("user", JSON.stringify(user)),

  clearStorage: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },

  saveStorage: function (data: UserResponseType) {
    this.setStorageAccessToken(data.accessToken);
    this.setStorageRefreshToken(data.refreshToken);
    this.setStorageUser(data.user);
  },
};

export default authStorage;
