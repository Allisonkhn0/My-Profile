import { isAxiosError } from "axios"
import { useAppDispatch } from "@/shared/lib/store"
import useToast from "@/shared/toast/hooks/use-toast"
import { fetchDeleteCategories } from "../../model/categories-thunk"
import type { CategoryType } from "../../types/categories.types"


function CategoriesItem({ category }: { category: CategoryType }) {

    const dispatch = useAppDispatch()

    const { show } = useToast()

    const handleDelete = async () => {

        try {

            await dispatch(fetchDeleteCategories(category.id)).unwrap()
            show("Успешно удалено", "success")

        } catch (error: unknown) {
            if (isAxiosError(error)) {
                show(error.response?.data.error, "error")
            } else {
                show("Ошибка при удалении", "error")
            }

        }
    }

    return (
        <div className="category">
            <div className="category__name">
                {category.name}
            </div>
            <span className="category__remove" onClick={handleDelete} >X</span>
        </div>
    )
}

export default CategoriesItem