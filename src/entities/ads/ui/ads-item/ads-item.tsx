import { useState } from 'react'
import no_photo from '../../../../../public/no_photo.png'
import { useAppDispatch, useAppSelector } from '@/shared/lib/store'
import AdsApi from '../../api/ads-api'
import { removeAds } from '../../model/ads-slice'
import type { AdsResponseType } from "../../types/ads-type"
import AdsUpdateForm from '../ads-update-form/ads-update-form'

import s from './index.module.css'

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
        <div key={ad.id} className={s.ad}>
            <h3 className={s.ad_title}>{ad.title}</h3>
            <div className={s.ad__block}>
                <div className={s.ad_}>
                    <img src={ad.imageUrl || no_photo} alt={`Изображения нету...${ad.title}`} width={200} />
                </div>

                <div className={s.ad__description}>
                    <p>Стоимость: <span className={s.ad_price}>{ad.price}$</span></p>
                    <p className={s.ad_description}>{ad.description}</p>                    
                </div>
            </div>


            {
                user && user.id === ad.User.id && (
                    <div className={s.ad__buttons}>
                        <button className={s.ad_button} onClick={handleDelete}> Удалить</button>
                        <button className={s.ad_button} onClick={() => setOpen(true)}> Изменить</button>
                    </div>
                )
            }
            <AdsUpdateForm open={open} onClose={() => setOpen(false)} ad={ad}/> 
        </div>
    )
}

export default AdsItem