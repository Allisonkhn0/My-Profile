import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserRegistrationType } from "@/feature/auth/types/user-type";
import UserAPI from "../api/users-api";

export const fetchUser = createAsyncThunk("user/load", async () => {
  return UserAPI.getUser();
});

export const fetchUpdateUser = createAsyncThunk(
  "user/update",
  async (user: UserRegistrationType) => {
    return UserAPI.updateUser(user);
  },
);
