
import { useState } from 'react'
import no_photo from '../../../../../public/no_photo.png'
import { useAppDispatch, useAppSelector } from '@/shared/lib/store'
import AdsApi from '../../api/ads-api'
import { removeAds } from '../../model/ads-slice'
import type { AdsResponseType } from "../../types/ads-type"
import AdsUpdateForm from '../ads-update-form/ads-update-form'

function AdsItem({ ad }: { ad: AdsResponseType }) {

    const [open, setOpen] = useState(false)

    const { user } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const handleDelete = async () => {
        const data = await AdsApi.remove(ad.id)
        if (data.message === "Deleted") {
            dispatch(removeAds(ad.id))
        }
    }
    return (
        <div key={ad.id} className="ads-item">
            <div className="ads-item__title">{ad.title} </div>
            <img src={ad.imageUrl || no_photo} alt={ad.title} width={200} />
            <div className="ads-item__price">{ad.price}$ </div>
            <div className="ads-item__description">{ad.description}</div>
            {
                user && user.id === ad.User.id && (
                    <>
                        <button type="button" onClick={handleDelete}> Удалить</button>
                        <button type="button" onClick={() => setOpen(true)}> Изменить</button>
                    </>
                )
            }
            <AdsUpdateForm open={open} onClose={() => setOpen(false)} ad={ad}/> 
        </div>
    )
}

export default AdsItem