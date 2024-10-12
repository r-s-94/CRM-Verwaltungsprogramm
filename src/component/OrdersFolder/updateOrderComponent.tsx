import { supabase } from "../../supabase";
import { useContext, useState, useEffect } from "react";
import { ordersContext } from "../../ordersContext";
import { employeesContext } from "../../employeesContext";
import { clientsContext } from "../../clientContext";
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
  const [updateOrderMessagePopUp, setUpdateOrderMessagePopUp] =
    useState<boolean>(false);

  useEffect(() => {
    showOrder();
  }, [orderValueAdministration.selectedOrderId]);

  function showOrder() {
    const selectedOder = ordersStorageArray.find((order) => {
      return order.id === orderValueAdministration.selectedOrderId;
    });

    if (selectedOder) {
      const date = new Date(selectedOder.orderDay);
      const formateDate = date.toISOString().split("T")[0];
      const changeDatatypePrice: string = String(selectedOder.serviceValue);
      const changeDatatypeQuantity: string = String(selectedOder.quantity);

      setSelectedClientId(selectedOder.clients_id);
      setSelectedEmployeeId(selectedOder.employee_id);

      setOrderValueAdministration({
        ...orderValueAdministration,
        selectedOrderId: selectedOder.id,
        service: selectedOder.service,
        price: changeDatatypePrice,
        quantity: changeDatatypeQuantity,
        paymentMethode: selectedOder.paymentMethod,
        paymentStatus: selectedOder.paymentStatus,
        note: selectedOder.note || "",
        business: selectedOder.business,
        date: formateDate,
      });
    }
  }

  async function updateOrder() {
    const changeDatatypePrice: number = Number(orderValueAdministration.price);
    const changeDatatypeQuantity: number = Number(
      orderValueAdministration.quantity
    );

    if (
      orderValueAdministration.service !== "" &&
      orderValueAdministration.quantity !== "" &&
      orderValueAdministration.price !== "" &&
      orderValueAdministration.paymentMethode !== "" &&
      orderValueAdministration.paymentStatus !== ""
    ) {
      const {} = await supabase
        .from("Orders")
        .update({
          clients_id: selectedClientId,
          employee_id: selectedEmployeeId,
          business: orderValueAdministration.business,
          service: orderValueAdministration.service,
          serviceValue: changeDatatypePrice,
          quantity: changeDatatypeQuantity,
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
        price: "",
        quantity: "",
        paymentMethode: "",
        paymentStatus: "",
        note: "",
        business: false,
        date: "",
      });

      setUpdateOrderForm(false);

      showDataUpdate();
    } else {
      setUpdateOrderMessagePopUp(true);
      setUpdateOrderForm(false);
    }
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
      price: "",
      quantity: "",
      paymentMethode: "",
      paymentStatus: "",
      note: "",
      business: false,
      date: "",
    });

    setUpdateOrderForm(false);
  }

  function closeUpdateOrderMessagePopUp() {
    setUpdateOrderMessagePopUp(false);
    setUpdateOrderForm(true);
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
      {updateOrderMessagePopUp && (
        <PopUpComponent>
          <div className="update-order__popup-message-div">
            <p className="update-order__popup-message-div--text">
              Bitte alle * Pflichtfelder ausfühlen.
            </p>
            <button
              onClick={closeUpdateOrderMessagePopUp}
              className="update-order__popup-message-div--close-button"
            >
              Okay Fenster schließen
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="update-order__popup-message-div--close-button--close-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </PopUpComponent>
      )}

      {updateOrderForm && (
        <PopUpComponent>
          <div className="update-order__form">
            <button
              onClick={closeUpdateOrderForm}
              className="update-order__form--close-button button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="update-order__form--close-button--close-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="update-order__form--label-and-input-container">
              <div className="update-order__form--label-and-input-container--label-section">
                <label>Auftraggeber:</label>
                <label>Mitarbeiterzuteilung:</label>
                <label>Art der Dienstleistung:</label>
                <label>Bestellmenge: </label>
                <label>Bestellwert: </label>
                <label>Zahlungsart </label>
                <label>Rechnungsstatus: </label>
                <label>Bestehlaufgabe:</label>
                <label>note: </label>
                <label>Gewerblich: </label>
              </div>
              <div className="update-order__form--label-and-input-container--input-section">
                <section className="update-order__form--label-and-input-container--input-section--input-info-section">
                  <select
                    value={selectedClientId}
                    onChange={(event) => {
                      setSelectedClientId(Number(event.target.value));
                    }}
                  >
                    <option>...</option>
                    {clientsStorageArray.map((client) => {
                      return (
                        <option
                          value={client.id}
                        >{`${client.firstName} ${client.lastName}`}</option>
                      );
                    })}
                  </select>{" "}
                  * Pflichtfeld{" "}
                </section>
                <section className="update-order__form--label-and-input-container--input-section--input-info-section">
                  <select
                    value={selectedEmployeeId}
                    onChange={(event) => {
                      setSelectedEmployeeId(Number(event.target.value));
                    }}
                  >
                    {" "}
                    Mitarbeiterzuteilung
                    <option>...</option>
                    {employeesStorageArray.map((employee) => {
                      return (
                        <option
                          value={employee.id}
                        >{`${employee.firstName} ${employee.lastName}`}</option>
                      );
                    })}
                  </select>{" "}
                  * Pflichtfeld{" "}
                </section>

                <section className="update-order__form--label-and-input-container--input-section--input-info-section">
                  <input
                    type="text"
                    value={orderValueAdministration.service}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        service: event.target.value,
                      });
                    }}
                  />{" "}
                  * Pflichtfeld
                </section>

                <section className="update-order__form--label-and-input-container--input-section--input-info-section">
                  <input
                    type="number"
                    value={orderValueAdministration.quantity}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        quantity: event.target.value,
                      });
                    }}
                  />{" "}
                  * Pflichtfeld{" "}
                </section>

                <section className="update-order__form--label-and-input-container--input-section--input-info-section">
                  <input
                    type="number"
                    name=""
                    value={orderValueAdministration.price}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        price: event.target.value,
                      });
                    }}
                  />
                  {""} * Pflichtfeld
                </section>

                <section className="update-order__form--label-and-input-container--input-section--input-info-section">
                  <input
                    type="text"
                    value={orderValueAdministration.paymentMethode}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        paymentMethode: event.target.value,
                      });
                    }}
                  />{" "}
                  * Pflichtfeld
                </section>

                <section className="update-order__form--label-and-input-container--input-section--input-info-section">
                  <input
                    type="text"
                    value={orderValueAdministration.paymentStatus}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        paymentStatus: event.target.value,
                      });
                    }}
                  />{" "}
                  * Pflichtfeld
                </section>

                <section className="update-order__form--label-and-input-container--input-section--input-info-section">
                  <input
                    type="date"
                    value={orderValueAdministration.date}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        date: event.target.value,
                      });
                    }}
                  />
                </section>

                <section className="update-order__form--label-and-input-container--input-section--input-info-section">
                  <input
                    type="text"
                    value={orderValueAdministration.note}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        note: event.target.value,
                      });
                    }}
                  />{" "}
                </section>

                <section className="update-order__form--label-and-input-container--input-section--input-info-section">
                  <input
                    type="checkbox"
                    checked={orderValueAdministration.business}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        business: event.target.checked,
                      });
                    }}
                  />{" "}
                </section>
              </div>
            </div>

            <button
              onClick={updateOrder}
              className="update-order__form--edit-button"
            >
              Auftrag bearbeiten
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="update-order__form--edit-button--edit-icon"
              >
                <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
              </svg>{" "}
            </button>
          </div>
        </PopUpComponent>
      )}
    </div>
  );

  /* 
  
  */
}
