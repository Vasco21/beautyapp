import React from 'react';
import { useNavigate } from 'react-router';

import Button from '../../components/Button';
import SumInfo from '../../components/SumInfo';

import { Container, Content } from './styles';
import { useCart } from '../../hooks/useCart';
import ItemsList from '../../components/ItemsList';
import EmptyMessage from '../../components/EmptyMessage';

export default function CartList() {
  const { cartItems } = useCart();

  const navigate = useNavigate();

  return (
    <Container>
      {cartItems?.length > 0 ? (
        <Content>
          <ItemsList showControlers={true} />
          <SumInfo />
          <Button
            isProgressive={false}
            onClick={() => navigate('/cart/payment', { replace: true })}
          >
            proceed to payment
          </Button>
        </Content>
      ) : (
        <EmptyMessage />
      )}
    </Container>
  );
}
