import React from 'react';
import {ButtonContainer} from './Button';

export default function CartTotal({value}) {
    return (
        <div className="float-right">
        {(value.cartTotal > 0) ? 
            <React.Fragment>
                <h1 className="text-capitalize font-weight-bold text-title">Cart
                 <strong className="text-blue"> Total</strong></h1>
                <h3><span className="text-title">Sub Total :</span> {value.cartSubTotal}</h3>
                <h3><span className="text-title">Total Tax :</span> {value.cartTax}</h3>
                <h3><span className="text-title">Total :</span> {value.cartTotal}</h3>
            </React.Fragment>
        :null}
        <ButtonContainer cart onClick={()=> {value.clearCart()}}>
            Clear Cart
        </ButtonContainer>
        </div>
    )
}
