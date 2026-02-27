import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import adsReducer from "@/entities/ads/model/ads-slice.tsx";
import categoriesReducer from "@/entities/categories/model/categories-slice.tsx";
import userReducer from "@/entities/users/models/users-slice.tsx";
import authReducer from "@/feature/auth/model/auth-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ads: adsReducer,
    categories: categoriesReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
