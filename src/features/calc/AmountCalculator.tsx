import { useForm } from "react-hook-form";
import { formSchema, FormSchema } from "./util/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchExchangeRate } from "../../util/fetchExchangeRate";
import { useState } from "react";

const AmountCalculator = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  type PriceGrid = {
    product: string;
    tax: number;
    price: number;
    taxIncludedPrice: number;
    usdPrice: number;
    eurPrice: number;
    cnyPrice: number;
  };

  const [priceGrid, setPriceGrid] = useState<PriceGrid[]>([]);

  const onSubmit = async (data: FormSchema) => {
    const { product, price, tax } = data;
    const taxIncludedPrice = Math.floor(price * (1 + tax / 100));

    const usdRate = await fetchExchangeRate("JPY", "USD");
    const eurRate = await fetchExchangeRate("JPY", "EUR");
    const cnyRate = await fetchExchangeRate("JPY", "CNY");

    const usdPrice = taxIncludedPrice * usdRate;
    const eurPrice = taxIncludedPrice * eurRate;
    const cnyPrice = taxIncludedPrice * cnyRate;

    setPriceGrid([
      ...priceGrid,
      { product, tax, price, taxIncludedPrice, usdPrice, eurPrice, cnyPrice },
    ]);
  };
  return (
    <main className="mt-10">
      <div className="flex flex-col justify-start items-center gap-4">
        <section className="bg-slate-50 py-12 px-40 rounded-lg w-2/3">
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
              <div className="text-red-500">
                {errors.price.message as string}
              </div>
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
                  <input
                    type="radio"
                    id="ten"
                    value={10}
                    {...register("tax")}
                  />
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
        {/* {rList.length !== 0 && (
          <section className="bg-slate-50 py-12 px-40 rounded-lg w-2/3">
            <table className="table-auto"></table>
          </section>
        )} */}
      </div>
    </main>
  );
};

export default AmountCalculator;
