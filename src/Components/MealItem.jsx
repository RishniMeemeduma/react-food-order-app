import { useContext } from "react";
import { currencyFormatter } from "../Util/formatting"
import Button from "./UI/Button";
import CartContext from "../Store/CartContext";
export default function MealItem({meal}) {
    const cartCtx = useContext(CartContext);
    function handleAddMealToCart() {
        cartCtx.addItem(meal);
    }
    return (
        <li className="meal-item" key={meal.id}>
            
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt="image"/>
                <div>
                    <h3>{meal.name}</h3>
                    <div className="meal-item-price">{currencyFormatter.format(meal.price)}</div>
                    <div className='meal-item-description'>{meal.description}</div>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>Add to cart</Button>
                </p>
            </article>

           
        </li>
    )
}