import axiosInstance from "@/shared/lib/axios-instance";
import type {
  CategoryType,
  CategoryTypeWithoutId,
} from "../types/categories.types";

export const AdsApiUrl = {
  base: "/categories",
};

class CategoriesApi {
  static async all(): Promise<CategoryType[]> {
    const { data } = await axiosInstance.get<CategoryType[]>(AdsApiUrl.base);
    return data;
  }

  static async one(id: number): Promise<CategoryType> {
    const { data } = await axiosInstance.get<CategoryType>(
      `${AdsApiUrl.base}/${id}`,
    );
    return data;
  }

  static async create(category: CategoryTypeWithoutId): Promise<CategoryType> {
    const { data } = await axiosInstance.post<CategoryType>(
      AdsApiUrl.base,
      category,
    );
    return data;
  }

  static async update(category: CategoryType): Promise<CategoryType> {
    const { data } = await axiosInstance.put<CategoryType>(
      `${AdsApiUrl.base}/${category.id}`,
      category,
    );
    return data;
  }

  static async remove(id: number): Promise<number> {
    await axiosInstance.delete<{ message: string }>(`${AdsApiUrl.base}/${id}`);
    return id;
  }
}

export default CategoriesApi;
