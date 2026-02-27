import { useAppDispatch } from "@/shared/lib/store";
import AuthApi from "../api/auth-api";
import {
  clearAuth,
  setAuthError,
  setAuthLoading,
  setAuthSuccess,
} from "../model/auth-slice";
import authStorage from "../model/auth-storage";
import type {
  UserAuthorizationType,
  UserRegistrationType,
} from "../types/user-type";

export function useAuth() {
  const dispatch = useAppDispatch();

  const register = async (payload: UserRegistrationType) => {
    dispatch(setAuthLoading(true));

    try {
      const data = await AuthApi.register(payload);
      authStorage.saveStorage(data);
      dispatch(setAuthSuccess(data.user));
      return data;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Не удалось зарегистрироваться";
      dispatch(setAuthError(message));
      throw error;
    }
  };

  const login = async (payload: UserAuthorizationType) => {
    dispatch(setAuthLoading(true));

    try {
      const data = await AuthApi.auth(payload);
      authStorage.saveStorage(data);
      dispatch(setAuthSuccess(data.user));
      return data;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Не удалось авторизоваться";
      dispatch(setAuthError(message));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AuthApi.logout();
    } finally {
      authStorage.clearStorage();
      dispatch(clearAuth());
    }
  };

  const initFromStorage = () => {
    const user = authStorage.getStorageUser();
    const token = authStorage.getStorageAccessToken();
    if (user && token) {
      dispatch(setAuthSuccess(user));
    }
  };

  return { register, login, logout , initFromStorage };
}
