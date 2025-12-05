import { supabase } from "../../supabase";
import { useContext, useState, useEffect } from "react";
import { ordersContext } from "../../ordersContext";
import { employeesContext } from "../../employeesContext";
import { clientsContext } from "../../clientContext";
import "../../index.scss";
import "./updateOrderComponent.scss";
import PopUpComponent from "../../PopUpComponent";
import "../../PopUpComponent.scss";

export default function UpdateOrderComponent({
  showDataUpdate,
  updateOrderForm,
  setUpdateOrderForm,
}: {
  showDataUpdate: () => void;
  updateOrderForm: boolean;
  setUpdateOrderForm: (value: boolean) => void;
}) {
  const {
    ordersStorageArray,
    setOrdersStorageArray,
    orderValueAdministration,
    setOrderValueAdministration,
  } = useContext(ordersContext);

  const { employeesStorageArray } = useContext(employeesContext);
  const { clientsStorageArray } = useContext(clientsContext);
  const [selectedClientId, setSelectedClientId] = useState<number>(0);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(0);

  useEffect(() => {
    showOrder();
  }, [orderValueAdministration.selectedOrderId]);

  function showOrder() {
    const selectedOder = ordersStorageArray.find((order) => {
      return order.id === orderValueAdministration.selectedOrderId;
    });

    if (selectedOder) {
      const date = new Date(selectedOder.orderDay);
      const formateDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      const formateDateToString = formateDate.toISOString().slice(0, 10);

      setSelectedClientId(selectedOder.clients_id);
      setSelectedEmployeeId(selectedOder.employee_id);

      setOrderValueAdministration({
        ...orderValueAdministration,
        selectedOrderId: selectedOder.id,
        service: selectedOder.service,
        price: selectedOder.serviceValue,
        quantity: selectedOder.quantity,
        paymentMethode: selectedOder.paymentMethod,
        paymentStatus: selectedOder.paymentStatus,
        note: selectedOder.note || "",
        business: selectedOder.business,
        date: formateDateToString,
      });
    }
  }

  async function updateOrder() {
    const {} = await supabase
      .from("Orders")
      .update({
        clients_id: selectedClientId,
        employee_id: selectedEmployeeId,
        business: orderValueAdministration.business,
        service: orderValueAdministration.service,
        serviceValue: orderValueAdministration.price,
        quantity: orderValueAdministration.quantity,
        orderDay: orderValueAdministration.date,
        paymentMethod: orderValueAdministration.paymentMethode,
        paymentStatus: orderValueAdministration.paymentStatus,
        note: orderValueAdministration.note,
      })
      .eq("id", orderValueAdministration.selectedOrderId);

    setOrderValueAdministration({
      ...orderValueAdministration,
      selectedOrderId: 0,
      service: "",
      price: 0,
      quantity: 0,
      paymentMethode: "",
      paymentStatus: "",
      note: "",
      business: false,
      date: "",
    });

    setUpdateOrderForm(false);

    showDataUpdate();
  }

  async function closeUpdateOrderForm() {
    const { data } = await supabase.from("Orders").select().order("id");

    if (data) {
      setOrdersStorageArray(data);
    }

    setOrderValueAdministration({
      ...orderValueAdministration,
      selectedOrderId: 0,
      service: "",
      price: 0,
      quantity: 0,
      paymentMethode: "",
      paymentStatus: "",
      note: "",
      business: false,
      date: "",
    });

    setUpdateOrderForm(false);
  }

  /* <div className="orders-div__popup-main-window">
          <div className="orders-div__popup-main-window--popup-message-window">
      </div>
        </div>

<div className="orders-div__popup-main-window--popup-message-window">
    </div>
  */

  return (
    <div className="update-order">
      {updateOrderForm && (
        <PopUpComponent>
          <div className="update-order__form">
            <svg
              onClick={closeUpdateOrderForm}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="update-order__close-icon hover"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>

            <div className="update-order__lable-and-input-div center-content">
              <div className="update-order__lable-div">
                <label className="update-order__lable lable">
                  Auftraggeber:
                </label>
                <label className="update-order__lable lable">
                  Mitarbeiterzuteilung:
                </label>
                <label className="update-order__lable lable">
                  Art der Dienstleistung:
                </label>
                <label className="update-order__lable lable">
                  Bestellmenge:{" "}
                </label>
                <label className="update-order__lable lable">
                  Bestellwert:{" "}
                </label>
                <label className="update-order__lable lable">
                  Zahlungsart{" "}
                </label>
                <label className="update-order__lable lable">
                  Rechnungsstatus:{" "}
                </label>
                <label className="update-order__lable lable">
                  Bestellaufgabe:
                </label>
                <label className="update-order__lable lable">Bemerkung: </label>
                <label className="update-order__lable lable">
                  Gewerblich:{" "}
                </label>
              </div>
              <div className="update-order__input-div">
                <div className="update-order__input-info-div">
                  <select
                    value={selectedClientId}
                    onChange={(event) => {
                      setSelectedClientId(Number(event.target.value));
                    }}
                    className="update-order__select"
                  >
                    <option value={0}>...</option>
                    {clientsStorageArray.map((client) => {
                      return (
                        <option
                          value={client.id}
                        >{`${client.firstName} ${client.lastName}`}</option>
                      );
                    })}
                  </select>{" "}
                  * Pflichtfeld{" "}
                </div>
                <div className="update-order__input-info-div">
                  <select
                    value={selectedEmployeeId}
                    onChange={(event) => {
                      setSelectedEmployeeId(Number(event.target.value));
                    }}
                    className="update-order__select"
                  >
                    {" "}
                    Mitarbeiterzuteilung
                    <option value={0}>...</option>
                    {employeesStorageArray.map((employee) => {
                      return (
                        <option
                          value={employee.id}
                        >{`${employee.firstName} ${employee.lastName}`}</option>
                      );
                    })}
                  </select>{" "}
                  * Pflichtfeld{" "}
                </div>

                <div className="update-order__input-info-div">
                  <input
                    type="text"
                    value={orderValueAdministration.service}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        service: event.target.value.trimStart(),
                      });
                    }}
                    className="update-order__ input"
                  />{" "}
                  * Pflichtfeld
                </div>

                <div className="update-order__input-info-div">
                  <input
                    type="number"
                    value={
                      orderValueAdministration.quantity !== 0
                        ? orderValueAdministration.quantity
                        : ""
                    }
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        quantity: Number(event.target.value),
                      });
                    }}
                    className="update-order__ input number"
                  />{" "}
                  * Pflichtfeld{" "}
                </div>

                <div className="update-order__input-info-div">
                  <input
                    type="number"
                    name=""
                    value={
                      orderValueAdministration.price !== 0
                        ? orderValueAdministration.price
                        : ""
                    }
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        price: Number(event.target.value),
                      });
                    }}
                    className="update-order__ input number"
                  />
                  {""} * Pflichtfeld
                </div>

                <div className="update-order__input-info-div">
                  <input
                    type="text"
                    value={orderValueAdministration.paymentMethode}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        paymentMethode: event.target.value.trimStart(),
                      });
                    }}
                    className="update-order__ input"
                  />{" "}
                  * Pflichtfeld
                </div>

                <div className="update-order__input-info-div">
                  <input
                    type="text"
                    value={orderValueAdministration.paymentStatus}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        paymentStatus: event.target.value.trimStart(),
                      });
                    }}
                    className="update-order__ input"
                  />{" "}
                  * Pflichtfeld
                </div>

                <div className="update-order__input-info-div">
                  <input
                    type="date"
                    value={orderValueAdministration.date}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        date: event.target.value,
                      });
                    }}
                    className="update-order__ input number"
                  />
                  * Pflichtfeld
                </div>

                <div className="update-order__input-info-div">
                  <input
                    type="text"
                    value={orderValueAdministration.note}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        note: event.target.value.trimStart(),
                      });
                    }}
                    className="update-order__ input"
                  />{" "}
                </div>

                <div className="update-order__input-info-div">
                  <input
                    type="checkbox"
                    checked={orderValueAdministration.business}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        business: event.target.checked,
                      });
                    }}
                    className="update-order__input-check-box"
                  />{" "}
                </div>
              </div>
            </div>

            <div className="update-order__button-div center-content">
              <button
                onClick={closeUpdateOrderForm}
                className="new-order__cancle-button button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="new-order__cancle-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
                abbrechen
              </button>

              <button
                onClick={updateOrder}
                disabled={
                  selectedClientId !== 0 &&
                  selectedEmployeeId !== 0 &&
                  orderValueAdministration.service.length > 0 &&
                  orderValueAdministration.quantity !== 0 &&
                  orderValueAdministration.price !== 0 &&
                  orderValueAdministration.paymentStatus.length > 0 &&
                  orderValueAdministration.paymentMethode.length > 0 &&
                  orderValueAdministration.date.length > 0
                    ? false
                    : true
                }
                className={`update-order__update-order-button button ${
                  selectedClientId !== 0 &&
                  selectedEmployeeId !== 0 &&
                  orderValueAdministration.service.length > 0 &&
                  orderValueAdministration.quantity !== 0 &&
                  orderValueAdministration.price !== 0 &&
                  orderValueAdministration.paymentStatus.length > 0 &&
                  orderValueAdministration.paymentMethode.length > 0 &&
                  orderValueAdministration.date.length > 0
                    ? "primary-button"
                    : "disbled-button"
                } `}
              >
                Auftrag bearbeiten
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="update-order__update-order-icon"
                >
                  <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                </svg>{" "}
              </button>
            </div>
          </div>
        </PopUpComponent>
      )}
    </div>
  );

  /* 
  
  */
}
