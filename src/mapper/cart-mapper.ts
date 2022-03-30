
import { number } from 'yup';
import { Cart, CartItem } from '../interfaces/Cart';

export default async function cartMapper(cart: Cart) {
   
    const itemsWrapper: CartItem[]= []
    Object.values(cart).forEach((value) => {
    itemsWrapper.push(
       {
        promoterId:value.promoterId,
        itemName:value.itemName,
        itemURL:value.itemURL,
        price:value.price,
        itemDescription:value.itemDescription,
        promoterName:value.promoterName,
        quantity:0,
      }
    )
    
  })
  const dataWrapper = {
    id: cart.id,
    shippingTotal: cart.shippingTotal,
    items: itemsWrapper
  };
      return dataWrapper;
}


 // const itemsWrapper: CartItem[]= cart.items.map((item: CartItem) =>{
    //   const myMap = new Map();
    //   for (const item of myMap.values()) {
        
    //     return{
    //       promoterId:item.promoterId,
    //       itemName:item.itemName,
    //       itemURL:item.itemURL,
    //       price:item.price,
    //       itemDescription:item.itemDescription,
    //       promoterName:item.promoterName,
    //       quantity:0,
  
    //     }
    //   }
    // }