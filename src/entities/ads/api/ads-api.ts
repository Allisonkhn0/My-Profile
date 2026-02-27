import axiosInstance from "@/shared/lib/axios-instance";
import type {
  AdsResponseType,
  AdsType,
  AdsTypeWithoutID,
} from "../types/ads-type";

export const AdsApiUrl = {
  base: "/ads",
};

class AdsApi {
  static async all(): Promise<AdsResponseType[]> {
    const { data } = await axiosInstance.get<AdsResponseType[]>(AdsApiUrl.base);
    return data;
  }

  static async one(id: number): Promise<AdsResponseType> {
    const { data } = await axiosInstance.get<AdsResponseType>(
      `${AdsApiUrl.base}/${id}`,
    );
    return data;
  }

  static async create(ads: AdsTypeWithoutID): Promise<AdsResponseType> {
    const { data } = await axiosInstance.post<AdsResponseType>(AdsApiUrl.base, ads);
    return data;
  }

  static async update(ads: AdsType): Promise<AdsResponseType> {
    const { data } = await axiosInstance.put<AdsResponseType>(
      `${AdsApiUrl.base}/${ads.id}`,
      ads,
    );
    return data;
  }

  static async remove(id: number): Promise<{message: string}> {
    const { data } = await axiosInstance.delete<{message: string}>(
      `${AdsApiUrl.base}/${id}`,
    );
    return data;
  }
}

export default AdsApi;
