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

  async function createOder() {
    const changeDatatypePrice: number = Number(orderValueAdministration.price);
    const changeDatatypeQuantity: number = Number(
      orderValueAdministration.quantity
    );

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
      price: 0,
      quantity: 0,
      paymentMethode: "",
      paymentStatus: "",
      note: "",
      business: false,
      date: "",
    });

    showDataUpdate();
  }

  function closeNewOrderForm() {
    setNewOrderForm(false);
    setSelectedClientId(0);
    setSelectedEmployeeId(0);

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
  }

  /*    <div className="orders-div__popup-main-window">
          <div className="orders-div__popup-main-window--popup-message-window">
    </div>
        </div>  
        
        <div className="orders-div__popup-main-window--popup-message-window">  </div>
  */

  return (
    <div className="new-order">
      {newOrderForm && (
        <PopUpComponent>
          <div className="new-order__form">
            <svg
              onClick={closeNewOrderForm}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="new-order__close-icon hover"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>

            <div className="new-order__lable-and-input-div center-content">
              <div className="new-order__lable-div">
                <label className="new-order-lable lable">Auftraggeber: </label>{" "}
                <label className="new-order-lable lable">
                  Mitarbeiterzuteilung:{" "}
                </label>{" "}
                <label className="new-order-lable lable">
                  Art der Dienstleistung:
                </label>{" "}
                <label className="new-order-lable lable">Bestellmenge: </label>
                <label className="new-order-lable lable">Preis: </label>
                <label className="new-order-lable lable">Zahlungsart </label>
                <label className="new-order-lable lable">
                  Rechnungsstatus:{" "}
                </label>
                <label className="new-order-lable lable">Bestellaufgabe:</label>
                <label className="new-order-lable lable">Bemerkung: </label>
                <label className="new-order-lable lable">Gewerblich: </label>
              </div>
              <div className="new-order__input-div">
                <div className="new-order__input-info-div">
                  <select
                    onChange={(event) => {
                      setSelectedClientId(Number(event.target.value));
                    }}
                    className="new-order__select"
                  >
                    <option value={0} className="new-order__option">
                      ...
                    </option>
                    {clientsStorageArray.map((client) => {
                      return (
                        <option
                          value={client.id}
                          className="new-order__option"
                        >{`${client.firstName} ${client.lastName}`}</option>
                      );
                    })}
                  </select>{" "}
                  <span className="mandatory-field"> * Pfichtfeld</span>
                </div>
                <div className="new-order__input-info-div">
                  <select
                    onChange={(event) => {
                      setSelectedEmployeeId(Number(event.target.value));
                    }}
                    className="new-order__select"
                  >
                    <option value={0} className="new-order__option">
                      ...
                    </option>
                    {employeesStorageArray.map((employee) => {
                      return (
                        <option
                          value={employee.id}
                          className="new-order__option"
                        >{`${employee.firstName} ${employee.lastName}`}</option>
                      );
                    })}
                  </select>{" "}
                  <span className="mandatory-field">* Pflichtfeld</span>
                </div>
                <div className="new-order__input-info-div">
                  <input
                    type="text"
                    value={orderValueAdministration.service}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        service: event.target.value.trimStart(),
                      });
                    }}
                    className="new-order__ input"
                  />{" "}
                  * Pflichtfeld{" "}
                </div>
                <div className="new-order__input-info-div">
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
                    className="new-order__input-quantity input number"
                  />{" "}
                  * Pflichtfeld{" "}
                </div>
                <div className="new-order__input-info-div">
                  <input
                    type="number"
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
                    className="new-order__ input number"
                  />{" "}
                  * Pflichtfeld
                </div>
                <div className="new-order__input-info-div">
                  <input
                    type="text"
                    value={orderValueAdministration.paymentMethode}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        paymentMethode: event.target.value.trimStart(),
                      });
                    }}
                    className="new-order__ input"
                  />{" "}
                  * Pflichtfeld{" "}
                </div>
                <div className="new-order__input-info-div">
                  <input
                    type="text"
                    value={orderValueAdministration.paymentStatus}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        paymentStatus: event.target.value.trimStart(),
                      });
                    }}
                    className="new-order__ input"
                  />{" "}
                  * Pflichtfeld{" "}
                </div>
                <div className="new-order__input-info-div">
                  <input
                    type="date"
                    value={orderValueAdministration.date}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        date: event.target.value,
                      });
                    }}
                    className="new-order__ input number"
                  />{" "}
                  * Pflichtfeld
                </div>
                <div className="new-order__input-info-div">
                  <input
                    type="text"
                    value={orderValueAdministration.note}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        note: event.target.value.trimStart(),
                      });
                    }}
                    className="new-order__ input"
                  />{" "}
                </div>

                <div className="new-order__input-info-div">
                  <input
                    type="checkbox"
                    checked={orderValueAdministration.business}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        business: event.target.checked,
                      });
                    }}
                    className="new-order__input-check-box"
                  />{" "}
                </div>
              </div>
            </div>

            <div className="new-order__button-div center-content">
              <button
                onClick={closeNewOrderForm}
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
                onClick={createOder}
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
                className={`new-order__new-order-button button ${
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
                Auftrag anlegen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="new-order__new-order-icon"
                >
                  <path d="M10 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM16.25 5.75a.75.75 0 0 0-1.5 0v2h-2a.75.75 0 0 0 0 1.5h2v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2Z" />
                </svg>{" "}
              </button>
            </div>
          </div>
        </PopUpComponent>
      )}
    </div>
  );
}
