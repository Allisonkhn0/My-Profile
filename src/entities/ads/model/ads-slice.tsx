import { createSlice } from "@reduxjs/toolkit";
import type { AdsResponseType, AdsType } from "../types/ads-type";

type AdsState = {
    ads: AdsResponseType[] | []
    ad: AdsResponseType | undefined
    isLoading: boolean,
    error: string | undefined
}

const initialState: AdsState = {
    ads: [],
    ad: undefined,
    isLoading: false,
    error: undefined
}

const adsSlice = createSlice({
    name: "ads",
    initialState,
    reducers: {
        // CRUD [] 
        loadAds: (state, action: { payload: AdsResponseType[] }) => {
            state.ads = action.payload
            state.isLoading = false
            state.error = undefined
        },

        createAds: (state, action: { payload: AdsResponseType }) => {
            state.ads = [...state.ads, action.payload]
            state.isLoading = false
            state.error = undefined
        },

        updateAds: (state, action: { payload: AdsType }) => {
            state.ads = state.ads.map(ad => ad.id === action.payload.id ? { ...ad, ...action.payload } : ad)
            state.isLoading = false
            state.error = undefined
        },

        removeAds: (state, action: { payload: number }) => {
            state.ads = state.ads.filter(ad => ad.id !== action.payload)
            state.isLoading = false
            state.error = undefined
        },
        // One
        setAd: (state, action: { payload: AdsResponseType | undefined }) => {
            state.ad = action.payload
            state.isLoading = false
            state.error = undefined
        },

        clearAd: (state) => {
            state.ad = undefined

        },

        // Loading
        setAdsLoading: (state, action: { payload: boolean }) => {
            state.isLoading = action.payload && true
            state.error = undefined
        },
        // Error
        setAdsError: (state, action: { payload: string }) => {
            state.error = action.payload
            state.isLoading = false
        },

        clearError: (state) => {
            state.error = undefined
        }
    }
})

export const { loadAds, createAds, updateAds, removeAds, setAd, clearAd, setAdsLoading, setAdsError, clearError } = adsSlice.actions
export default adsSlice.reducer