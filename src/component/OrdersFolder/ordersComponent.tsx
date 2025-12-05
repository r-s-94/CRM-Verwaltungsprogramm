import { useState, useContext } from "react";
import { ordersContext } from "../../ordersContext";
import OrdersPreviewComponent from "./ordersPreviewComponent";
import NewOrderComponent from "./newOrderComponent";
import UpdateOrderComponent from "./updateOrderComponent";
import "./ordersComponent.scss";

export default function OrdersComponent() {
  const { loadOrders } = useContext(ordersContext);
  const [newOrderForm, setNewOrderForm] = useState<boolean>(false);
  const [updateOrderForm, setUpdateOrderForm] = useState<boolean>(false);

  return (
    <div className="orders">
      {" "}
      <NewOrderComponent
        showDataUpdate={loadOrders}
        newOrderForm={newOrderForm}
        setNewOrderForm={setNewOrderForm}
      />
      <UpdateOrderComponent
        showDataUpdate={loadOrders}
        updateOrderForm={updateOrderForm}
        setUpdateOrderForm={setUpdateOrderForm}
      />
      <h1 className="orders__headline">Aufträge</h1>
      <OrdersPreviewComponent
        setNewOrderForm={setNewOrderForm}
        showDataUpdate={loadOrders}
        setUpdateOrderForm={setUpdateOrderForm}
      />{" "}
    </div>
  );
  /*  
  
  
  
  */
}
