import { createAsyncThunk } from "@reduxjs/toolkit";
import CategoriesApi from "../api/categories-api";
import type { CategoryTypeWithoutId } from "../types/categories.types";

export const fetchCategories = createAsyncThunk("categories/load", async () => {
  return CategoriesApi.all();
});

export const fetchCreateCategories = createAsyncThunk(
  "categories/create",
  async (data: CategoryTypeWithoutId) => {
    return CategoriesApi.create(data);
  },
);

export const fetchDeleteCategories = createAsyncThunk(
  "categories/remove",
  async (id: number) => {
    return CategoriesApi.remove(id);
  },
);
