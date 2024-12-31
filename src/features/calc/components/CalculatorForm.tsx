import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, formSchema } from "../util/formSchema";

type CalculatorFormProps = {
  onSubmit: (data: FormSchema) => Promise<void>;
};

const CalculatorForm = ({ onSubmit }: CalculatorFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  return (
    <section className="bg-white py-8 px-40 rounded-lg w-2/3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate
      >
        <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
          <label htmlFor="produce">製品名</label>
          <input
            type="text"
            id="product"
            className="border rounded-sm p-1"
            {...register("product")}
          />
        </div>
        <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
          <label htmlFor="price">金額</label>
          <input
            type="number"
            id="price"
            className="border rounded-sm p-1"
            {...register("price")}
          />
        </div>
        {errors.price && (
          <div className="text-red-500">{errors.price.message as string}</div>
        )}
        <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
          <div>消費税率</div>
          <div className="flex flex-col p-1">
            <div>
              <input
                type="radio"
                id="eight"
                value={8}
                defaultChecked
                {...register("tax")}
              />
              <label htmlFor="eight" className="ml-2">
                8%
              </label>
            </div>
            <div>
              <input type="radio" id="ten" value={10} {...register("tax")} />
              <label htmlFor="ten" className="ml-2">
                10%
              </label>
            </div>
          </div>
        </div>
        <button className="bg-slate-300 px-4 py-2 rounded-sm hover:bg-slate-600 transition-all duration-300 mx-auto">
          計算
        </button>
      </form>
    </section>
  );
};

export default CalculatorForm;
