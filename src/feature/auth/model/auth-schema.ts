import { z } from "zod";

const AuthFormSchema = z.object({
  email: z.email("Некорректный email").min(1, "Поле email обязательно"),
  password: z.string().min(1, "Пароль обязательное поле "),
});

export default AuthFormSchema;
