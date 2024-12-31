import { useState } from "react";
import { fetchExchangeRate } from "../../../util/fetchExchangeRate";
import { FormSchema } from "../util/formSchema";

export type PriceGrid = {
  product: string;
  tax: number;
  price: number;
  taxIncludedPrice: number;
  usdPrice: number;
  eurPrice: number;
};

export const useCalculateAmount = () => {
  const [priceGrid, setPriceGrid] = useState<PriceGrid[]>([]);

  const onSubmit = async (data: FormSchema) => {
    const { product, price, tax } = data;
    const taxIncludedPrice = Math.floor(price * (1 + tax / 100));

    const usdRate = await fetchExchangeRate("JPY", "USD");
    const eurRate = await fetchExchangeRate("JPY", "EUR");

    const usdPrice = Math.floor(taxIncludedPrice * usdRate * 100) / 100;
    const eurPrice = Math.floor(taxIncludedPrice * eurRate * 100) / 100;
    
    setPriceGrid([
      ...priceGrid,
      { product, tax, price, taxIncludedPrice, usdPrice, eurPrice },
    ]);
  };
  return { priceGrid, onSubmit };
};
