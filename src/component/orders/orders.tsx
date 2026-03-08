import { useState, useContext } from "react";
import { ordersContext } from "./ordersContext";
import OrdersPreview from "./ordersPreview";
import NewOrder from "./newOrder";
import UpdateOrder from "./updateOrder";
import "./orders.scss";

interface ServiceArray {
  service: string;
  price: number;
}

export const serviceArray: ServiceArray[] = [
  {
    service: "Gartenservicepaket klein",
    price: 50,
  },
  {
    service: "Gartenservicepaket mittel",
    price: 100,
  },
  {
    service: "Gartenservicepaket groß",
    price: 150,
  },
  {
    service: "Heizung-Sanitär-Servicepaket klein",
    price: 50,
  },
  {
    service: "Heizung-Sanitär-Servicepaket mittel",
    price: 250,
  },
  {
    service: "Heizung-Sanitär-Servicepaket groß",
    price: 5000,
  },
  {
    service: "Partyservicepaket klein",
    price: 100,
  },
  {
    service: "Partyservicepaket mittel",
    price: 250,
  },
  {
    service: "Partyservicepaket groß",
    price: 500,
  },
  {
    service: "Homeservicepaket klein",
    price: 100,
  },
  {
    service: "Homeservicepaket mittel",
    price: 250,
  },
  {
    service: "Homeservicepaket groß",
    price: 500,
  },
  {
    service: "Werkzeugset klein",
    price: 500,
  },
  {
    service: "Werkzeugset mittel",
    price: 1000,
  },
  {
    service: "Werkzeugset groß",
    price: 2500,
  },
  {
    service: "Autoteilepaket klein",
    price: 250,
  },
  {
    service: "Autoteilepaket mittel",
    price: 3000,
  },
  {
    service: "Autoteilepaket groß",
    price: 10000,
  },
  {
    service: "Auto Tuningpaket klein",
    price: 5000,
  },
  {
    service: "Auto Tuningpaket mittel",
    price: 10000,
  },
  {
    service: "Auto Tuningpaket groß",
    price: 15000,
  },
];

export default function OrdersComponent() {
  const { loadOrders } = useContext(ordersContext);
  const [newOrderForm, setNewOrderForm] = useState<boolean>(false);
  const [updateOrderForm, setUpdateOrderForm] = useState<boolean>(false);

  return (
    <div className="orders">
      <NewOrder
        showDataUpdate={loadOrders}
        newOrderForm={newOrderForm}
        setNewOrderForm={setNewOrderForm}
      />
      <UpdateOrder
        showDataUpdate={loadOrders}
        updateOrderForm={updateOrderForm}
        setUpdateOrderForm={setUpdateOrderForm}
      />
      <h1 className="orders__headline">Aufträge</h1>
      <OrdersPreview
        setNewOrderForm={setNewOrderForm}
        showDataUpdate={loadOrders}
        setUpdateOrderForm={setUpdateOrderForm}
      />
    </div>
  );
  /*  

  */
}
