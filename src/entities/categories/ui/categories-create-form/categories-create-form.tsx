import { zodResolver } from "@hookform/resolvers/zod"
import { isAxiosError } from "axios"
import { useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import useToast from "@/shared/toast/hooks/use-toast"
import { fetchCreateCategories } from "../../model/categories-thunk"
import CategoriesCreateSchema from "../../model/categoris-create-schema"
import type { CategoryTypeWithoutId } from "../../types/categories.types"

function CategoriesCreateForm() {
    const { show } = useToast()

    const { isLoading, error } = useAppSelector(state => state.categories)
    const dispatch = useAppDispatch()

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm(
        {
            resolver: zodResolver(CategoriesCreateSchema)
        }
    )
    const onSubmit = async (form: CategoryTypeWithoutId) => {
        try {
            await dispatch(fetchCreateCategories(form)).unwrap()
            reset()
            show("Сохранено", "success")
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                show(error.response?.data.error, "error")
            } else {
                show("Ошибка при создании", "error")
            }

        }

    }

    return (
        <div className='ads-create-form'>
            <h1>Форма создания категории</h1>
            {
                error && <p className="error">{error} </p>
            }

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name"> Название  <span className="required">* </span></label>
                <input type="text" id="name" {...register("name")}></input>
                {
                    errors.name && <p className="error">{errors.name.message} </p>
                }


                <button type="submit"> {isLoading ? "Создается" : "Создать"} </button>
            </form>
        </div>
    )
}

export default CategoriesCreateForm