export interface Cart {
    [id: string]: any;
    items: CartItem[];
    subTotal: number;
    [shippingTotal: number]: any;
    discount: number;
    total: number;
  }

export interface CartItem{
    promoterName: string;
    itemDescription: string;
    itemURL: string;
    price: number;
    itemName: string;
    quantity: number;
    promoterId: string;
  }
  // export interface StateInterface{
  //   items: Array<CartItem>,
  //   filteredItems: Array<CartItem>,
  //   shoppingCart: Array<CartItem>,
  //   searching: string,
  //   categories: Array<string>,
  //   current: string,
  //   history: string,
  //   isSearching: boolean,
  //   filterAt: string,
  //   totalAmount: number,
  //   error: boolean,
  //   loading: boolean
  // }
  
  // export interface RoutesInterface{
  //   current: string;
  //   history: string;
  // }
  // export type ActionType = {
  //   type: string,
  //   payload?: 
  //     | CartItem[] 
  //     | string 
  //     | number 
  //     | Cart
  //     | RoutesInterface
  // }
  
  // export interface PageProps {
  //   state: StateInterface;
  //   dispatch?: React.Dispatch<ActionType>;
  //   ctx?: React.Context<StateInterface>
  // }

  // interface AppEventListenerMap {
  //   get<T>(x: T): Array<AppEventListener<T>> | undefined;
  //   set<T>(x: T, val: Array<AppEventListener<T>>): void;
  // }
  // class EventDispatcher {
  //   private listeners: AppEventListenerMap;
  
  //   constructor() {
  //     this.listeners = new Map();
  //   }
  // }
  // type AppEventListener<T> = (event: T) => void;