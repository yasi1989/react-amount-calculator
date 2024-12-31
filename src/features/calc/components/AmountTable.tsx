import { PriceGrid } from "../hooks/useCalculateAmount";
import AmountItem from "./AmountItem";

type AmountTableProps = {
  priceGrid: PriceGrid[];
};

const AmountTable = ({ priceGrid }: AmountTableProps) => {
  return (
    <section className="bg-white py-8 rounded-lg w-2/3 flex justify-center items-center">
      <table className="table-auto whitespace-no-wrap text-sm">
        <thead>
          <tr>
            <th className="px-4 py-3 title-font tracking-wider font-medium bg-gray-100 rounded-tl rounded-bl">
              製品名
            </th>
            <th className="px-4 py-3 title-font tracking-wider font-medium bg-gray-100">
              消費税率
            </th>
            <th className="px-4 py-3 title-font tracking-wider font-medium bg-gray-100">
              税抜金額
            </th>
            <th className="px-4 py-3 title-font tracking-wider font-medium bg-gray-100">
              税込金額
            </th>
            <th className="px-4 py-3 title-font tracking-wider font-medium bg-gray-100">
              USD($)
            </th>
            <th className="px-4 py-3 title-font tracking-wider font-medium bg-gray-100">
              EUR(€)
            </th>
          </tr>
        </thead>
        <tbody>
          {priceGrid.map((grid, index) => (
            <AmountItem amount={grid} key={index} />
          ))}
          <tr>
            <td className="border-t-2 border-gray-200 px-4 py-3">合計</td>
            <td className="border-t-2 border-gray-200 px-4 py-3"></td>
            <td className="border-t-2 border-gray-200 px-4 py-3 text-right">
              {priceGrid.reduce((a, c) => a + c.price, 0)}
            </td>
            <td className="border-t-2 border-gray-200 px-4 py-3 text-right">
              {priceGrid.reduce((a, c) => a + c.taxIncludedPrice, 0)}
            </td>
            <td className="border-t-2 border-gray-200 px-4 py-3 text-right">
              {priceGrid.reduce((a, c) => a + c.usdPrice, 0)}
            </td>
            <td className="border-t-2 border-gray-200 px-4 py-3 text-right">
              {priceGrid.reduce((a, c) => a + c.eurPrice, 0)}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default AmountTable;
