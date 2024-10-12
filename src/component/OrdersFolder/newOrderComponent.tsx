import { useContext, useState } from "react";
import { clientsContext } from "../../clientContext";
import { employeesContext } from "../../employeesContext";
import { supabase } from "../../supabase";
import "./newOrderComponent.scss";
import { ordersContext } from "../../ordersContext";
import PopUpComponent from "../../PopUpComponent";
import "../../PopUpComponent.scss";

export default function NewOrderComponent({
  showDataUpdate,
  newOrderForm,
  setNewOrderForm,
}: {
  showDataUpdate: () => void;
  newOrderForm: boolean;
  setNewOrderForm: (value: boolean) => void;
}) {
  const { clientsStorageArray } = useContext(clientsContext);
  const { employeesStorageArray } = useContext(employeesContext);
  const { orderValueAdministration, setOrderValueAdministration } =
    useContext(ordersContext);
  const [selectedClientId, setSelectedClientId] = useState<number>(0);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(0);
  const [newOrderMessagePopUp, setNewOrderMessagePopUp] =
    useState<boolean>(false);

  async function createOder() {
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
      const {} = await supabase.from("Orders").insert({
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
      });

      setNewOrderForm(false);

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

      showDataUpdate();
    } else {
      setNewOrderForm(false);
      setNewOrderMessagePopUp(true);
    }
  }

  function closeNewOrderForm() {
    setNewOrderForm(false);
  }

  function closeNewOrderMessagePopUp() {
    setNewOrderMessagePopUp(false);
    setNewOrderForm(true);
  }

  /*    <div className="orders-div__popup-main-window">
          <div className="orders-div__popup-main-window--popup-message-window">
    </div>
        </div>  
        
        <div className="orders-div__popup-main-window--popup-message-window">  </div>
  */

  return (
    <div className="new-order">
      {newOrderMessagePopUp && (
        <PopUpComponent>
          <div className="new-order__popup-message-div">
            <p className="new-order__popup-message-div--text">
              Bitte alle * Pflichtfelder ausfühlen.
            </p>
            <button
              onClick={closeNewOrderMessagePopUp}
              className="new-order__popup-message-div--close-button"
            >
              Okay Fenster schließen
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="new-order__popup-message-div--close-button--close-icon"
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

      {newOrderForm && (
        <PopUpComponent>
          <div className="new-order__form">
            <button
              onClick={closeNewOrderForm}
              className="new-order__form--close-button button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="new-order__form--close-button--close-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="new-order__form--label-and-input-container">
              <div className="new-order__form--label-and-input-container--label-section">
                <label>Auftraggeber: </label>{" "}
                <label>Mitarbeiterzuteilung: </label>{" "}
                <label>Art der Dienstleistung:</label>{" "}
                <label>Bestellmenge: </label>
                <label>Preis: </label>
                <label>Zahlungsart </label>
                <label>Rechnungsstatus: </label>
                <label>Bestellaufgabe:</label>
                <label>Bemerkung: </label>
                <label>Gewerblich: </label>
              </div>
              <div className="new-order__form--label-and-input-container--input-section">
                <section className="new-order__form--label-and-input-container--input-section--input-info-section">
                  <select
                    onChange={(event) => {
                      setSelectedClientId(Number(event.target.value));
                    }}
                    className="select"
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
                  <span className="mandatory-field"> * Pfichtfeld</span>
                </section>
                <section className="new-order__form--label-and-input-container--input-section--input-info-section">
                  <select
                    onChange={(event) => {
                      setSelectedEmployeeId(Number(event.target.value));
                    }}
                    className="select"
                  >
                    <option>...</option>
                    {employeesStorageArray.map((employee) => {
                      return (
                        <option
                          value={employee.id}
                        >{`${employee.firstName} ${employee.lastName}`}</option>
                      );
                    })}
                  </select>{" "}
                  <span className="mandatory-field">* Pflichtfeld</span>
                </section>
                <section className="new-order__form--label-and-input-container--input-section--input-info-section">
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
                  * Pflichtfeld{" "}
                </section>
                <section className="new-order__form--label-and-input-container--input-section--input-info-section">
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
                <section className="new-order__form--label-and-input-container--input-section--input-info-section">
                  <input
                    type="number"
                    value={orderValueAdministration.price}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        price: event.target.value,
                      });
                    }}
                  />{" "}
                  * Pflichtfeld
                </section>
                <section className="new-order__form--label-and-input-container--input-section--input-info-section">
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
                  * Pflichtfeld{" "}
                </section>
                <section className="new-order__form--label-and-input-container--input-section--input-info-section">
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
                  * Pflichtfeld{" "}
                </section>
                <section className="new-order__form--label-and-input-container--input-section--input-info-section">
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
                <section className="new-order__form--label-and-input-container--input-section--input-info-section">
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

                <section className="new-order__form--label-and-input-container--input-section--input-info-section">
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
              onClick={createOder}
              className="new-order__form--add-button"
            >
              Auftrag erstellen
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="new-order__form--add-button--add-icon"
              >
                <path d="M10 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM16.25 5.75a.75.75 0 0 0-1.5 0v2h-2a.75.75 0 0 0 0 1.5h2v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2Z" />
              </svg>{" "}
            </button>
          </div>
        </PopUpComponent>
      )}
    </div>
  );
}
