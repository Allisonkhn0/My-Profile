import { Link, useNavigate } from "react-router"
import { useAppSelector } from "@/shared/lib/store"
import { useAuth } from "@/feature/auth/hooks/use-auth"

function Header() {

    const { user } = useAppSelector(state => state.auth)
    const { logout } = useAuth()

    const navigate = useNavigate()

    const handlerLogout = async () => {
        await logout()
        navigate("/")
    }
    return (
        <nav>
            {/* guest */}
            <Link to={"/ads"}>Объявления</Link>
            {
                !user && (
                    <>
                        <Link to={"/reg"}>Регистрация</Link>
                        <Link to={"/auth"}>Авторизация</Link>
                    </>
                )
            }

            {/* admin */}

            {
                user && user.role === "admin" && (
                    <Link to={"/categories"}>Категории</Link>
                )
            }

            
            {/* auth */}
            {
                user && (<>
                    <Link to={"/favorites"}>Избранное</Link>
                    <Link to={"/orders"}>Заказы</Link>
                    <Link to={"/profile"}>Профиль</Link>
                    <span className="header__logout" onClick={handlerLogout} >Выход</span>
                </>)
            }

            {
                user && (
                    <span className="header__username">{user?.name ?? user.email}</span>
                )
            }



        </nav>
    )
}

export default Header