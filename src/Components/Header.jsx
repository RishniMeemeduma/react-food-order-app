import logoImage from './../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../Store/CartContext';
import { useContext } from 'react';
import UserProgressContext from '../Store/UserProgressContext';
export default function Header() {
    const cartCtx = useContext(CartContext);
    const userPrograssctx = useContext(UserProgressContext)
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity
    }, 0)

    function handleShowCart() {
        userPrograssctx.showCart();
    }
    return (
        <div id="main-header">
            
            <div id="title">
                <img src={logoImage} alt="logo"/>
                REACTFOOD
            </div>

            <Button textOnly onClick={handleShowCart}>Cart {totalCartItems}</Button>
        </div>
    )
}