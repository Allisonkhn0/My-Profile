import { createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import authStorage from "@/feature/auth/model/auth-storage";
import type { UserType } from "@/feature/auth/types/user-type";
import { fetchUpdateUser, fetchUser } from "./users-thunk";

type UserState = {
    user: undefined | UserType
    isLoading: boolean,
    error: string | undefined
}

const initialState: UserState = {
    user: authStorage.getStorageUser() || undefined,
    isLoading: false,
    error: undefined
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // load 
            .addCase(fetchUser.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.error = undefined
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.error = isAxiosError(action.payload) ? action.payload.response?.data.error : "Error"
                state.isLoading = false
            })

            // update 
            .addCase(fetchUpdateUser.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchUpdateUser.fulfilled, (state, action) => {
                state.error = undefined
                state.isLoading = false
                state.user = action.payload
                authStorage.setStorageUser(action.payload)
            })
            .addCase(fetchUpdateUser.rejected, (state, action) => {
                state.error = isAxiosError(action.payload) ? action.payload.response?.data.error : "Error"
                state.isLoading = false
            })

    }
})
export default usersSlice.reducer