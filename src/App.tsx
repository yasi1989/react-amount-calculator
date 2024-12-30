import "./App.css";
import Header from "./components/Header";
import AmountCalculator from "./features/calc/AmountCalculator";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] container mx-auto px-8 md:px-16 lg:px-24 min-h-screen">
      <Header />
      <AmountCalculator />
      <Footer />
    </div>
  );
}

export default App;
