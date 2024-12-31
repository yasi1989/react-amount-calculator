import { PriceGrid } from "../hooks/useCalculateAmount";

type AmountItemProps = {
    amount: PriceGrid;
}
const AmountItem = ({amount}: AmountItemProps) => {
  return (
    <tr>
      <td className="border-t-2 border-gray-200 px-4 py-3">{amount.product}</td>
      <td className="border-t-2 border-gray-200 px-4 py-3 text-right">
        {amount.tax}
      </td>
      <td className="border-t-2 border-gray-200 px-4 py-3 text-right">
        {amount.price}
      </td>
      <td className="border-t-2 border-gray-200 px-4 py-3 text-right">
        {amount.taxIncludedPrice}
      </td>
      <td className="border-t-2 border-gray-200 px-4 py-3 text-right">
        {amount.usdPrice}
      </td>
      <td className="border-t-2 border-gray-200 px-4 py-3 text-right">
        {amount.eurPrice}
      </td>
    </tr>
  );
};

export default AmountItem;
