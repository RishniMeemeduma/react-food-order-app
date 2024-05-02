import { useContext } from "react";
import CartContext from "../Store/CartContext";
import UserProgressContext from "../Store/UserProgressContext";
import { currencyFormatter } from "../Util/formatting";
import Model from "./UI/Model";
import Button from "./UI/Button";

export default function Cart() {
    const cartctx = useContext(CartContext);
    const userPrograssctx = useContext(UserProgressContext);


    const cartTotal = cartctx.items.reduce((total, item) =>  total + item.quantity * parseInt(item.price), 0);

    function handleCloseCart() {
        userPrograssctx.hideCart()
    }
    function handleGotoCheckout() {
        userPrograssctx.showCheckout();
    }
    return (
        <Model className="cart" open={userPrograssctx.progress === 'cart'} onClose={userPrograssctx.progress === 'cart' ? handleCloseCart : null}>
            <h2>Your Cart</h2>
            <ul>
                {cartctx.items.map(item => 
                <li key={item.id} className="cart-item">
                    {item.name} - {currencyFormatter.format(item.quantity * item.price)}
                    <p className="cart-item-actions">
                        <button onClick={() =>cartctx.removeItem(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() =>cartctx.addItem(item)}>+</button>
                    </p>  
                </li>
                )}
            </ul>
            <p className="cart-total"> {currencyFormatter.format(cartTotal)} </p>
            <p className="modal-action">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                <Button onClick={handleGotoCheckout}>Go to checkout</Button>
            </p>
        </Model>
    )
}