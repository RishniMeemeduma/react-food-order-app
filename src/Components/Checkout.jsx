import { useContext } from 'react';
import CartContext from '../Store/CartContext';
import UserProgressContext from '../Store/UserProgressContext';
import { currencyFormatter } from '../Util/formatting';
import Input from './UI/Input';
import Model from './UI/Model.jsx';
import Button from './UI/Button';
import useHttp from '../hooks/useHttp';
import Error from './Error';
const requestConfig = {method : 'POST', headers : {
    'Content-Type' : 'application/json',
},
}
export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const useCtx = useContext(UserProgressContext);
    const {error, isLoading, data, sendRequest, clearData} = useHttp('http://localhost:3000/orders', requestConfig)

    function handleClose () {
        useCtx.hideCheckout();
    }

    function handleGotoCheckout() {
        useCtx.showCheckout();
    }

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        
        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items ,
                customer: customerData 
            }
        }))
    }

    function handleFinish() {
        useCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }
    const cartTotal = cartCtx.items.reduce((total, item) =>  total + item.quantity * parseInt(item.price), 0);

    let action = (
        <>
        <Button type="button" textOnly onClick={handleClose}>Close</Button>
                    <Button >Submit Order</Button>
        </>
    )
    if(isLoading) {
        action= <span>Sending order data...</span>
    }

    if(data && !error) {
        return (
        <Model open={useCtx.progress == 'checkout'} onClose={handleClose}>
            <h2>Success !!</h2>
            <p>Your order has been placed !!</p>
            <p>We will contact you withing next few minutes</p>
             <p className='modal-actions'>
                <Button type="button" onClick={handleFinish} >Ok</Button>
             </p>
        </Model>
        )
    }
    return (
        <Model open={useCtx.progress == 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount : {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full name" type="text"  id="name" ></Input>
                <Input label="Email" type="email"  id="email"></Input>
                <Input label="Street" type="text"  id="street"></Input>
                <div className='control-row'>
                    <Input label="Postal Code" type="text" id="postal-code"></Input>
                    <Input label="City" type="text" id="city"></Input>
                </div>

                {error && <Error title="Submit Failed" message={error} ></Error>}
                <p className='modal-actions'>
                    { action}
                </p>
            </form>
        </Model>
    )
}