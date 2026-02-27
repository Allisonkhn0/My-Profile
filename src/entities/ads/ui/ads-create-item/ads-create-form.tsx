import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import useToast from "@/shared/toast/hooks/use-toast"
import AdsApi from "../../api/ads-api"
import AdsCreateSchema from "../../model/ads-create-schema"
import { createAds, setAdsError } from "../../model/ads-slice"
import type { AdsTypeWithoutID } from "../../types/ads-type"


function AdsCreateForm() {

    const { show } = useToast()

    const { isLoading, error } = useAppSelector(state => state.ads)
    const { categories } = useAppSelector(state => state.categories)

    const dispatch = useAppDispatch()

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm(
        {
            resolver: zodResolver(AdsCreateSchema)
        }
    )
    const onSubmit = async (form: AdsTypeWithoutID) => {
        try {
            const data = await AdsApi.create(form)
            dispatch(createAds(data))
            reset()
            show("Сохранено", "success")

        } catch (error: unknown) {
            dispatch(setAdsError(error instanceof Error ? error?.message : "Не удалось создать"))
            show("Ошибка ", "error")
        }

    }

    return (
        <div className='ads-create-form'>
            <h1>Форма создания объявления</h1>
            {
                error && <p className="error">{error} </p>
            }

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title"> Название  <span className="required">* </span></label>
                <input type="text" id="title" {...register("title")}></input>
                {
                    errors.title && <p className="error">{errors.title.message} </p>
                }

                <label htmlFor="description"> Описание <span className="required">* </span></label>
                <input type="text" id="description" {...register("description")}></input>
                {
                    errors.description && <p className="error">{errors.description.message} </p>
                }


                <label htmlFor="price"> Цена</label>
                <input type="number" id="price" {...register("price")}></input>
                {
                    errors.price && <p className="error">{errors.price.message} </p>
                }

                <label htmlFor="categoryId"> Категория </label>
                <select id="categoryId" {...register("categoryId")}>
                    <option value={""}>Выберите категорию</option>
                    {
                        categories.map(category => <option key={category.id} value={category.id}>{category.name} </option>)
                    }
                </select>

                {
                    errors.categoryId && <p className="error">{errors.categoryId.message} </p>
                }

                <label htmlFor="imageUrl"> Картинка</label>
                <input type="text" id="imageUrl" {...register("imageUrl")}></input>
                {
                    errors.imageUrl && <p className="error">{errors.imageUrl.message} </p>
                }


                <button type="submit"> {isLoading ? "Создается" : "Создать"} </button>
            </form>
        </div>
    )
}

export default AdsCreateForm