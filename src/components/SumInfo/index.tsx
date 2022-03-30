import React from 'react';
import { useCart } from '../../hooks/useCart';
import { Container } from './styles';
import EmptyMessage from '../../components/EmptyMessage';
import formatCurrency from '../../helper/formatCurrency';



export default function index() {
    const { cartItems, sumInfo } = useCart();
  return (
    <div>
        <Container>
            {cartItems?.length > 0 ? (
            <>
            <li>
                Product <span>{formatCurrency(sumInfo.itemsSubTotal)}</span>   
            </li>
            <li>
                Frete <span>{formatCurrency(sumInfo.shippingTotal)}</span>
            </li>
            <li className="total">
                Total <span>{formatCurrency(sumInfo.itemsTotal)}</span>
            </li>
            </>
        ) : (
            <EmptyMessage />
            )}
        </Container>
    </div>
  )
}
