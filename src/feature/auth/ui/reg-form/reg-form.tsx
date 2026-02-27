import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { useAppSelector } from "@/shared/lib/store"
import { useAuth } from "../../hooks/use-auth"
import RegFormSchema from "../../model/reg-schema"
import type { UserRegistrationType } from "../../types/user-type"


function RegForm() {

    const { register: registration } = useAuth()
    const { isLoading, error } = useAppSelector(state => state.auth)
    const navigate = useNavigate()

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        {
            resolver: zodResolver(RegFormSchema)
        }
    )
    const onSubmit = async (data: UserRegistrationType) => {
        await registration(data)
        navigate("/")
    }


    return (
        <div className='reg-form'>
            <h1>Форма регистрации</h1>
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


                <label htmlFor="name"> Имя</label>
                <input type="text" id="name" {...register("name")}></input>
                {
                    errors.name && <p className="error">{errors.name.message} </p>
                }

                <label htmlFor="phone"> Телефон</label>
                <input type="text" id="phone" {...register("phone")}></input>
                {
                    errors.phone && <p className="error">{errors.phone.message} </p>
                }

                <button type="submit"> {isLoading ? "Регистрируемся" : "Зарегистрироваться"} </button>
            </form>
        </div>
    )
}

export default RegForm