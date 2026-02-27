import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '@/shared/lib/store'
import Modal from "@/shared/ui/modal/modal"
import AdsApi from "../../api/ads-api"
import AdsCreateSchema from "../../model/ads-create-schema"
import { setAdsError, updateAds } from "../../model/ads-slice"
import type { AdsResponseType, AdsTypeWithoutID } from '../../types/ads-type'

import s from './index.module.css'

type AdsUpdateFormProps = {
    ad: AdsResponseType
    open: boolean
    onClose: () => void
}

function AdsUpdateForm({ ad, open, onClose }: AdsUpdateFormProps) {
    const { isLoading, error } = useAppSelector(state => state.ads)
    const { categories } = useAppSelector(state => state.categories)

    const dispatch = useAppDispatch()

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm(
        {
            resolver: zodResolver(AdsCreateSchema),
            defaultValues: {...ad, imageUrl: "" }
        }
    )
 
    const onSubmit = async (form: AdsTypeWithoutID) => {
        try {
            const data = await AdsApi.update({ ...form, id: ad.id })
            dispatch(updateAds(data))
            reset()
        } catch (error: unknown) {
            dispatch(setAdsError(error instanceof Error ? error?.message : "Не удалось обновить"))
        }
    }

    return (
<Modal open={open} onClose={onClose} title="Форма обновления объявления!">
    <div className={s.ads__form}>
        {error === "Cannot destructure property 'data' of '(intermediate value)' as it is undefined." ? <p className="error">Повторно авторизуйтесь!</p> : <p className="error">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={s.form_group}>
                <label htmlFor="title">Название <span className={s.required}>*</span></label>
                <input type="text" id="title" {...register("title")} className={s.input} />
                {errors.title && <p className="error">{errors.title.message}</p>}
            </div>

            <div className={s.form_group}>
                <label htmlFor="description">Описание <span className={s.required}>*</span></label>
                <input type="text" id="description" {...register("description")} className={s.input} />
                {errors.description && <p className="error">{errors.description.message}</p>}
            </div>

            <div className={s.form_group}>
                <label htmlFor="price">Цена</label>
                <input type="number" id="price" {...register("price")} className={s.input} />
                {errors.price && <p className="error">{errors.price.message}</p>}
            </div>

            <div className={s.form_group}>
                <label htmlFor="categoryId">Категория  <span className={s.required}>*</span></label>
                <select id="categoryId" {...register("categoryId")} className={s.select}>
                    <option value={""}>Выберите категорию</option>
                    {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
                {errors.categoryId && <p className="error">{errors.categoryId.message}</p>}
            </div>

            <div className={s.form_group}>
                <label htmlFor="imageUrl">Картинка</label>
                <input type="text" id="imageUrl" {...register("imageUrl")} className={s.input} />
                {errors.imageUrl && <p className="error">{errors.imageUrl.message}</p>}
            </div>

            <button type="submit" className={s.submit_btn}>
                {isLoading ? "Обновляется" : "Обновить"}
            </button>
        </form>
    </div>
</Modal>
    )
}

export default AdsUpdateForm