
import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { fetchCategories } from '@/entities/categories/model/categories-thunk'
import Header from "@/widgets/header/header"
import { useAppDispatch } from '../../shared/lib/store'

function Layout() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout