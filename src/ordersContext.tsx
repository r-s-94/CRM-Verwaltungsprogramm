import { createContext } from "react";
import { Tables } from "./database.types";

export interface OrderPopUpDatatype {
  selectedOrderId: number;
  service: string;
  quantity: string;
  price: string;
  paymentMethode: string;
  paymentStatus: string;
  date: string;
  note: string;
  business: boolean;
}

export interface OrdersStorageContext {
  ordersStorageArray: Tables<"Orders">[];
  setOrdersStorageArray: (value: Tables<"Orders">[]) => void;
  loadOrders: () => void;
  orderValueAdministration: OrderPopUpDatatype;
  setOrderValueAdministration: (value: OrderPopUpDatatype) => void;
}

export const ordersContext = createContext<OrdersStorageContext>({
  ordersStorageArray: [],
  setOrdersStorageArray: () => {},
  loadOrders: () => {},
  orderValueAdministration: {
    selectedOrderId: 0,
    service: "",
    quantity: "",
    price: "",
    paymentMethode: "",
    paymentStatus: "",
    date: "",
    note: "",
    business: false,
  },
  setOrderValueAdministration: () => {},
});
