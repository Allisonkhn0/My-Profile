import { z } from "zod";

const CategoriesCreateSchema = z.object({
  name: z.string().min(1, "Название обязательное поле "),
});

export default CategoriesCreateSchema;
