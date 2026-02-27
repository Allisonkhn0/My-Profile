import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { fetchCategories } from "../../model/categories-thunk"
import CategoriesCreateForm from "../categories-create-form/categories-create-form"
import CategoriesItem from "../categories-item/categories-item"

function CategoriesList() {

    const dispatch = useAppDispatch()
    const { categories, isLoading } = useAppSelector(state => state.categories)
    const { user } = useAppSelector(state => state.auth)


    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch, user])


    if (isLoading) {
        return <h2>Loading....</h2>
    }

    return (
        <>
            <CategoriesCreateForm />
            <div className="categories-list">
                {
                    categories.map(category => <CategoriesItem key={category.id} category={category} />)
                }
            </div>
        </>
    )
}

export default CategoriesList