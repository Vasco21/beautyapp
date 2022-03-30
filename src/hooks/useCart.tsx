import { createContext, ReactNode, useContext, useState, useRef, useEffect, SetStateAction, Dispatch } from 'react';
import api from '../services/api';
import { Cart, CartItem } from '../interfaces/Cart';
import { 
  VASCO_NA_WEB_ALL_ITEMS, 
  VASCO_NA_WEB_CART_ITEMS, 
  VASCO_NA_WEB_CREDIT_CARD, 
  VASCO_NA_WEB_SUM_INFO } from '../constants/local-storage';
  
import { API_URL_CART } from '../constants/api-url';
import {
    cleanLocalStorage,
    getFromLocalStorage,
    setToLocalStorage
} from '../helper/local-storage';


import { Focused } from 'react-credit-cards';
import { useToast } from './useToast';


interface CartProviderProps {
    children: ReactNode;
  }
  interface UpdateItemQuantity {
    productSku: string;
    quantity: number;
  }

  interface CreditCardInfo {
    number: string;
    name: string;
    expiry: string;
    cvc: string;
    focused: Focused;
  }
  interface SumInfo {
    itemsSubTotal: number;
    itemsDiscount: number;
    itemsTotal: number;
    shippingTotal: number;
  }
  interface CartContextData {
    sumInfo: SumInfo;
    setSumInfo: Dispatch<SetStateAction<SumInfo>>;
    creditCardInfo: CreditCardInfo;
    setCreditCardInfo: Dispatch<SetStateAction<CreditCardInfo>>;
    cartItems: CartItem[];
    addProduct: (productSku: string) => void;
    removeProduct: (productSku: string) => void;
    updateItemQuantity: ({ productSku, quantity }: UpdateItemQuantity ) => void;
    stockquantity: number;
    isPurchaseConfirm: boolean;
    setIsPurchaseConfirm: Dispatch<SetStateAction<boolean>>;
  }

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const cartItemsFromLocalStorage = getFromLocalStorage(VASCO_NA_WEB_CART_ITEMS);
  const sumInfoFromLocalStorage = getFromLocalStorage(VASCO_NA_WEB_SUM_INFO);
  const creditCardFromStorage = getFromLocalStorage(VASCO_NA_WEB_CREDIT_CARD);

  const [cartItems, setCartItems] = useState<CartItem[]>(cartItemsFromLocalStorage || []);
  const [sumInfo, setSumInfo] = useState<SumInfo>(sumInfoFromLocalStorage || {});
  const [creditCardInfo, setCreditCardInfo] = useState<CreditCardInfo>(creditCardFromStorage || {});
  const [isPurchaseConfirm, setIsPurchaseConfirm] = useState(false);

  
  const prevCartRef = useRef<CartItem[]>();
  const cartPreviousValue = prevCartRef.current ?? cartItems;
  const { addToast } = useToast();

  const stockquantity = 4;


  useEffect(() => {
    prevCartRef.current = cartItems;
  });

  useEffect(() => {
    if(cartPreviousValue !== cartItems ){
      setToLocalStorage(VASCO_NA_WEB_CART_ITEMS, cartItems)
    }
  }, [cartPreviousValue, cartItems]);
  const addProduct = async (productSku: string) => {
    try {
      const updatedCartItems = [...cartItems];
      
      const itemAlreadyInCart = updatedCartItems.find((item) => item.itemName === productSku);
      const quantitySum = itemAlreadyInCart ? itemAlreadyInCart.quantity : 0;
      const currentItemQuantity = quantitySum + 1;
      
      // if you reach the stock limit
      if (currentItemQuantity > stockquantity) {
        addToast({
          type: 'error',
          title: 'Error',
          description: 'Quantity ordered out of stock'
        });

        return;
      }

       // add plus 1 to the item that which is already in the cart
      if (itemAlreadyInCart) {
        itemAlreadyInCart.quantity = quantitySum + 1;
      }
      // store new product in cart
      else {
        const response = await api.get<Cart>(API_URL_CART);
        const newItem = response.data.items.find(
          (item: CartItem) => item.itemName === productSku
        );
        if (newItem) updatedCartItems.push(newItem);

        addToast({
          type: 'success',
          title: 'Sucess!',
          description: `"${newItem?.itemName}"has been added to cart`
        });
      }

      setCartItems(updatedCartItems);
      setSumInfoItems(updatedCartItems);
    } catch {
      addToast({
        type: 'error',
        title: 'Error',
        description: 'Error trying to add item to cart'
      });
    }
  };
  const updateItemQuantity = ({ productSku, quantity }: UpdateItemQuantity) => {
    try {
      if (quantity <= 0) return;

      if (quantity > stockquantity) {
        addToast({
          type: 'error',
          title: 'Error',
          description: 'Ordered quantity out of stock'
        });
        return;
      }

      const updatedCartItems = [...cartItems];
      const itemAlreadyInCart = updatedCartItems.find((item) => item.itemName === productSku);

      if (itemAlreadyInCart) {
        itemAlreadyInCart.quantity = quantity;

        setCartItems(updatedCartItems);
        setSumInfoItems(updatedCartItems);
      }

      else throw Error();
    } catch {
      addToast({
        type: 'error',
        title: 'Error',
        description: 'Error when trying to change quantity'
      });
    }
  };

  const removeProduct = (productSku: string) => {
    try {
      const updatedCartItems = [...cartItems];
      const productIndex = updatedCartItems.findIndex((item) => item.itemName === productSku);

      if (productIndex >= 0) {
        updatedCartItems.splice(productIndex, 1);
        setCartItems(updatedCartItems);
        setSumInfoItems(updatedCartItems);

        if (updatedCartItems?.length === 0) cleanLocalStorage();
      }
      //
      else throw Error();
    } catch {
      addToast({
        type: 'error',
        title: 'Error',
        description: 'Error trying remove item'
      });
    }
  };

  const setSumInfoItems = (updatedCartItems: CartItem[]) => {
    const cartWithSubtotal = updatedCartItems.map((item) => ({
      ...item,
      subTotal: item.price * item.quantity,
    }));

    let itemsSubTotal = 0;

    cartWithSubtotal.forEach((item) => {
      itemsSubTotal += item.subTotal;
    });

    const itemsTotal = itemsSubTotal

    const sumInfoObject = {
      ...sumInfo,
      itemsSubTotal,
      itemsTotal
    };

    setSumInfo(sumInfoObject);
    setToLocalStorage(VASCO_NA_WEB_SUM_INFO, sumInfoObject);
  };

  return (
    <CartContext.Provider
      value={{
        sumInfo,
        setSumInfo,
        creditCardInfo,
        setCreditCardInfo,
        cartItems,
        addProduct,
        removeProduct,
        updateItemQuantity,
        stockquantity,
        isPurchaseConfirm,
        setIsPurchaseConfirm
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);
  return context;
}

  

  

    





  
