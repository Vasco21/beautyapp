import React from 'react';
import { CartItem } from '../../interfaces/Cart';
import formatCurrency from '../../helper/formatCurrency';

import {
  Container,
  ItemTitle,
  ProductListContent,
  UpdateItemControl,
  DeleteItemControl
} from './styles';
import { MdAddCircleOutline, MdDelete, MdRemoveCircleOutline } from 'react-icons/md';
import { useCart } from '../../hooks/useCart';
import EmptyMessage from '../../components/EmptyMessage';
import Loading from '../Loading';

interface ItemsListProps {
  showControlers: boolean;
  showPrice?: boolean;
}

export default function ItemsList({ showControlers, showPrice = true }: ItemsListProps) {
  const { removeProduct, updateItemQuantity, cartItems } = useCart();

  function handleProductIncrement(item: CartItem) {
    updateItemQuantity({
      productSku: item.promoterId,
      quantity: item.quantity + 1
    });
  }

  function handleProductDecrement(item: CartItem) {
    updateItemQuantity({
      productSku: item.promoterId,
      quantity: item.quantity - 1
    });
  }

  function handleRemoveProduct(productSku: string) {
    removeProduct(productSku);
  }

  return (
    <Container>
      {cartItems?.length > 0 ? (
        <>
          <h2>Products</h2>
          <ProductListContent>
            {cartItems?.map((item: CartItem) => (
              <li key={item.promoterId}>
                <div>
                  {!item.itemURL ? (
                    <Loading />
                  ) : (
                    <img src={item.itemURL} />
                  )}
                </div>

                <ItemTitle>
                  {item.itemName}
                  {showPrice && (
                    <span>
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  )}
                </ItemTitle>

                {showControlers && (
                  <>
                    <UpdateItemControl>
                      <button
                        type="button"
                        data-testid="decrement-product"
                        disabled={item.quantity <= 1}
                        onClick={() => handleProductDecrement(item)}
                      >
                        <MdRemoveCircleOutline size={20} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        data-testid="increment-product"
                        onClick={() => handleProductIncrement(item)}
                      >
                        <MdAddCircleOutline size={20} />
                      </button>
                    </UpdateItemControl>

                    <DeleteItemControl>
                      <button
                        type="button"
                        data-testid="remove-product"
                        onClick={() => handleRemoveProduct(item.promoterId)}
                      >
                        <MdDelete size={20} />
                      </button>
                    </DeleteItemControl>
                  </>
                )}
              </li>
            ))}
          </ProductListContent>
        </>
      ) : (
        <EmptyMessage />
      )}
    </Container>
  );
}
