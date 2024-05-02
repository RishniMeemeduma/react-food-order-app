import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import FoodItems from "./Components/FoodItems";
import Header from "./Components/Header";
import { CartContextProvider } from "./Store/CartContext";
import  { UserProgressContextProvider } from "./Store/UserProgressContext";
function App() {
  return (
    <CartContextProvider>
      <UserProgressContextProvider>
        <Header />
        <FoodItems/>
        <Cart />
        <Checkout />
      </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
