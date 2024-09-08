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

  function showNewOrderForm() {
    setNewOrderForm(true);
  }

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
      <button
        onClick={showNewOrderForm}
        className="orders__create-order-button button"
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="orders__create-order-button--new-icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      <OrdersPreviewComponent
        showDataUpdate={loadOrders}
        setUpdateOrderForm={setUpdateOrderForm}
      />{" "}
    </div>
  );
  /*  
  
  
  
  */
}
