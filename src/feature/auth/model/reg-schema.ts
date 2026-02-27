import { z } from "zod";

const RegFormSchema = z.object({
  email: z.email("Некорректный email").min(1, "Поле email обязательно"),
  password: z.string().min(1, "Пароль обязательное поле "),
  name: z.string().optional(),
  phone: z.string().optional(),
});

export default RegFormSchema;
