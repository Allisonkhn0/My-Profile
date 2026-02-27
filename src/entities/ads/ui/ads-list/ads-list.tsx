import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import AdsApi from "../../api/ads-api"
import { loadAds, setAdsError, setAdsLoading } from "../../model/ads-slice"
import AdsCreateForm from "../ads-create-item/ads-create-form"
import AdsItem from "../ads-item/ads-item"

function AdsList() {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.auth)
    const { ads } = useAppSelector(state => state.ads)


    useEffect(() => {
        dispatch(setAdsLoading(true))
        AdsApi.all()
            .then(data => dispatch(loadAds(data)))
            .catch((error) => dispatch(setAdsError(error.message)))


    }, [dispatch])

    return (
        <div className="ads-list">
            {
                user && (
                    <AdsCreateForm />       
                )
            }
            {
                ads.map(ad => <AdsItem key={ad.id} ad={ad} />)
            }
        </div>
    )
}

export default AdsList