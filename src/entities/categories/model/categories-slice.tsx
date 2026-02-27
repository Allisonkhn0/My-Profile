import { createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import type { CategoryType } from "../types/categories.types";
import { fetchCategories, fetchCreateCategories, fetchDeleteCategories } from "./categories-thunk";

type CategoriesState = {
    categories: CategoryType[]
    isLoading: boolean,
    error: string | undefined
}

const initialState: CategoriesState = {
    categories: [],

    isLoading: false,
    error: undefined
}

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // load 
            .addCase(fetchCategories.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.error = undefined
                state.isLoading = false
                state.categories = action.payload
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.error = isAxiosError(action.payload) ? action.payload.response?.data.error : "Error"
                state.isLoading = false
            })

            // create 
            .addCase(fetchCreateCategories.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchCreateCategories.fulfilled, (state, action) => {
                state.error = undefined
                state.isLoading = false
                state.categories.push(action.payload)
            })
            .addCase(fetchCreateCategories.rejected, (state, action) => {
                state.error = isAxiosError(action.payload) ? action.payload.response?.data.error : "Error"
                state.isLoading = false
            })

            //delete
            .addCase(fetchDeleteCategories.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchDeleteCategories.fulfilled, (state, action) => {
                state.error = undefined
                state.isLoading = false
                state.categories = state.categories.filter(el => el.id !== action.payload)
            })
            .addCase(fetchDeleteCategories.rejected, (state, action) => {
                state.error = isAxiosError(action.payload) ? action.payload.response?.data.error : "Error"
                state.isLoading = false
            })
    }
})
export default categoriesSlice.reducer