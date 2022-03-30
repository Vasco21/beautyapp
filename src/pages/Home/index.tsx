import React, { useEffect, useState } from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import SlickerImage from './'
import { ProductList, StockCounter } from './styles';
import  api from '../../services/api';
import { API_URL_CART } from '../../constants/api-url';

import { useCart } from '../../hooks/useCart';
import { Cart, CartItem } from '../../interfaces/Cart';
import Header from './components/Header';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import formatCurrency from '../../helper/formatCurrency';
import cartMapper from '../../mapper/cart-mapper';
import { setToLocalStorage } from '../../helper/local-storage';
import { VASCO_NA_WEB_ALL_ITEMS } from '../../constants/local-storage';

interface CartItemsQuantity {
    [key: string]: number;
  }


export default function Home() {

    const { cartItems, stockquantity, setSumInfo, sumInfo, addProduct, isPurchaseConfirm } = useCart();
    const [allProducts, setAllProducts] = useState<CartItem[]>([] as CartItem[]);
    
    useEffect(() => {
    async function loadProducts() {
      const response = await api.get<Cart>(API_URL_CART);
      const cartWrapper = cartMapper(response.data);
      const { items, shippingTotal } =  await cartWrapper;
      setAllProducts(items);
      setSumInfo({ ...sumInfo, shippingTotal });
      setToLocalStorage(VASCO_NA_WEB_ALL_ITEMS, items);
    }

    loadProducts();
  }, []);

  useEffect(() => {
    if (isPurchaseConfirm) {
      window.location.reload();
    }
  }, [isPurchaseConfirm]);

  const cartItemsQuantity = cartItems.reduce((itemsQuantity, item) => {
    const itemsQuantityObj = { ...itemsQuantity };
    itemsQuantityObj[item.itemName] = item.quantity;
    return itemsQuantityObj;
    
    
  }, {} as CartItemsQuantity);
  return (
    <>  
    
        <Header/>
        {/* <SlickerImage /> */}
        <h1>Fashion</h1>
        <ProductList>
            {allProducts.map((item: CartItem) => (
                <li key={item.promoterId}>
                    <img src={item.itemURL} alt={item.itemName} />
                    <h1>{item.itemName}</h1>
                    <p>{item.itemDescription}</p>
                    <span>{formatCurrency(item.price)}</span>
                    <p>By {item.promoterName}</p>

                    <Button
                        onClick={() => addProduct(item.itemName)}
                        data-testid="add-item-button"
                        isProgressive={false}
                    >
                        <div className="icon" data-testid="cart-item-quantity">
                            <MdShoppingBasket size={20} color="#fff" />
                            {cartItemsQuantity[item.itemName] || 0} 
                        </div>
                        <span>Add TO CART</span>
                    </Button>
                    <StockCounter>
                    remain {stockquantity - (cartItemsQuantity[item.itemName] || 0)} no stock
                    </StockCounter>
                </li>
            ))}
        </ProductList>
        {allProducts?.length === 0 && <Loading />}
    </>
  )
}