import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { useAppSelector } from "@/shared/lib/store"
import { useAuth } from "../../hooks/use-auth"
import AuthFormSchema from "../../model/auth-schema"
import type { UserAuthorizationType } from "../../types/user-type"


function AuthForm() {

    const { login } = useAuth()
    const { isLoading, error } = useAppSelector(state => state.auth)
    const navigate = useNavigate()

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        {
            resolver: zodResolver(AuthFormSchema)
        }
    )
    const onSubmit = async (data: UserAuthorizationType) => {
        await login(data)
        navigate("/")
    }


    return (
        <div className='reg-form'>
            <h1>Форма авторизации</h1>
            {
                error && <p className="error">{error} </p>
            }

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email"> Почта <span className="required">* </span></label>
                <input type="text" id="email" {...register("email")}></input>
                {
                    errors.email && <p className="error">{errors.email.message} </p>
                }

                <label htmlFor="password"> Пароль <span className="required">* </span></label>
                <input type="text" id="password" {...register("password")}></input>
                {
                    errors.password && <p className="error">{errors.password.message} </p>
                }


                <button type="submit"> {isLoading ? "Пытаемся войти" : "Войти"} </button>
            </form>
        </div>
    )
}

export default AuthForm