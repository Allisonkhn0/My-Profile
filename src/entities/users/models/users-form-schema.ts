import { z } from "zod";

const UserFormSchema = z.object({
  email: z.email("Некорректный email").min(1, "Поле email обязательно"),
  password: z.string().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
});

export default UserFormSchema;
