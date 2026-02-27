import { createSlice } from "@reduxjs/toolkit";
import type { UserType } from "../types/user-type";
import authStorage from "./auth-storage";

type AuthState = {
    user: UserType | undefined,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string | undefined
}


const initialState: AuthState = {
    user: authStorage.getStorageUser() || undefined,
    isAuthenticated: authStorage.getStorageAccessToken() ? true : false,
    isLoading: false,
    error: undefined
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthSuccess: (state, action: { payload: UserType }) => { // action.type = fskgf, action.payload = {}
            state.user = action.payload
            state.isAuthenticated = true
            state.isLoading = false
            state.error = undefined
        },

        setAuthLoading: (state, action: { payload: boolean }) => {
            state.isLoading = action.payload && true
            state.error = undefined
        },

        setAuthError: (state, action: { payload: string }) => {
            state.error = action.payload
            state.isLoading = false
        },

        clearAuth: (state) => {
            state.user = undefined;
            state.isLoading = false;
            state.error = undefined;
        },

        clearError: (state) => {
            state.error = undefined
        }
    }
})

export const { setAuthLoading, setAuthSuccess, setAuthError, clearAuth, clearError } = authSlice.actions
export default authSlice.reducer