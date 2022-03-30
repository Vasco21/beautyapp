import React, { useEffect, useState } from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Header, CartInfo } from './styles';
import { useCart } from '../../../../hooks/useCart';

export default function Home() {
  const { cartItems } = useCart();

  const [cartQtd, setCartQtd] = useState(0);

  useEffect(() => {
    let qtd = 0;
    cartItems.forEach((items) => (qtd += items.quantity));
    setCartQtd(qtd);
  }, [cartItems]);

  return (
    <Header>
      <Link to="">
        <h1>
          <div>
          </div>
          <div>
            <span>/BeautyMarket</span>
            <i>Place/</i>
          </div>
        </h1>
      </Link>

      <CartInfo to={cartQtd > 0 ? '/cart' : '/'}>
        <p>Menu Cart</p>
        <div>
          <span data-testid="cart-size">{cartQtd}</span>
          <MdShoppingBasket size={36} color="white" />
        </div>
      </CartInfo>
    </Header>
  );
}
