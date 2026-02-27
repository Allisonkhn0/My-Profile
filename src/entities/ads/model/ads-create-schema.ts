import { z } from "zod";

const AdsCreateSchema = z.object({
  title: z.string().min(1, "Название обязательное поле "),
  description: z.string().min(1, "Описание обязательное поле "),
  price: z.coerce.number().min(1, "Цена обязательное поле "),
  categoryId: z.coerce.number().min(1, "Цена обязательное поле "),
  imageUrl: z.string().optional(),
});

export default AdsCreateSchema;
