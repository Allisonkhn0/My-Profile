import { zodResolver } from "@hookform/resolvers/zod"
import { isAxiosError } from "axios"
import { useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import type { UserRegistrationType } from "@/feature/auth/types/user-type"
import useToast from "@/shared/toast/hooks/use-toast"
import UserFormSchema from "../../models/users-form-schema"
import { fetchUpdateUser } from "../../models/users-thunk"


function UserUpdateForm() {

    const { show } = useToast()

    const { user, isLoading, error } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()


    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        {
            defaultValues: user,
            resolver: zodResolver(UserFormSchema)
        }
    )
    const onSubmit = async (data: UserRegistrationType) => {
        try {
            await dispatch(fetchUpdateUser(data))
            show("Успешно обновлено!", "success")
        } catch (error) {
            if (isAxiosError(error)) {
                show(error.response?.data.message, "error")
            }
        }
    }


    return (
        <div className='user-update-form'>
            <h1>Профиль</h1>
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

                <button type="submit"> {isLoading ? "Обновляется " : "Обновить"} </button>
            </form>
        </div>
    )
}

export default UserUpdateForm