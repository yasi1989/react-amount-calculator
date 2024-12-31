import AmountTable from "./components/AmountTable";
import CalculatorForm from "./components/CalculatorForm";
import { useCalculateAmount } from "./hooks/useCalculateAmount";

const AmountCalculator = () => {
  const { priceGrid, onSubmit } = useCalculateAmount();
  return (
    <main className="mt-8">
      <div className="flex flex-col justify-start items-center gap-4">
        <CalculatorForm onSubmit={onSubmit} />
        {priceGrid.length !== 0 && (
          <AmountTable priceGrid={priceGrid} />
        )}
      </div>
    </main>
  );
};

export default AmountCalculator;
