import { z } from "zod";
export type FormSchema = z.infer<typeof formSchema>;

export const formSchema = z.object({
  product: z.string(),
  price: z.coerce
    .number()
    .min(1, "金額は1以上の値を入力してください")
    .int("金額は整数を入力してください"),
  tax: z.coerce.number(),
});
