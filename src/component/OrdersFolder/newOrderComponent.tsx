import { useContext, useState } from "react";
import { clientsContext } from "../../clientContext";
import { employeesContext } from "../../employeesContext";
import { supabase } from "../../supabase";
import "./newOrderComponent.scss";
import { ordersContext } from "../../ordersContext";
import PopUpComponent from "../../PopUpComponent";
import "../../PopUpComponent.scss";
import { serviceArray } from "./ordersComponent";
import { toastyContent } from "../../toastyContext";
import { popUpWidthHeightContent } from "../../popUpPaddingContent";

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
  const { toastyObject, setToastyObject, autoHiddenToasty } =
    useContext(toastyContent);
  const { popUpWidthHeightObject, setPopUpWidthHeightObject } = useContext(
    popUpWidthHeightContent
  );
  const [selectedClientId, setSelectedClientId] = useState<number>(0);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(0);

  function newServiceContent(service: string) {
    const serviceName = service;

    const findService = serviceArray.find((serviceOption) => {
      return serviceOption.service === serviceName;
    });

    console.log(findService);

    if (findService !== undefined) {
      setOrderValueAdministration({
        ...orderValueAdministration,
        service: findService.service,
        singlePrice: findService.price,
      });

      console.log(findService.price);

      if (orderValueAdministration.quantity > 0) {
        const totalPrice = getTotalPrice(
          findService.price,
          orderValueAdministration.quantity
        );

        getTotalPrice(findService.price, orderValueAdministration.quantity);
        setOrderValueAdministration({
          ...orderValueAdministration,
          service: findService.service,
          singlePrice: findService.price,
          quantity: orderValueAdministration.quantity,
          totalPrice: totalPrice,
        });
      }
    } else {
      setOrderValueAdministration({
        ...orderValueAdministration,
        service: "",
        singlePrice: 0,
        totalPrice: 0,
      });
    }
  }

  function newServiceQuantity(quantity: string) {
    console.log(quantity);

    const serviceQuantity = Number(quantity);
    console.log(serviceQuantity);

    if (serviceQuantity < 0) {
      setOrderValueAdministration({ ...orderValueAdministration, quantity: 0 });
    } else {
      const totalPrice = getTotalPrice(
        orderValueAdministration.singlePrice,
        serviceQuantity
      );

      setOrderValueAdministration({
        ...orderValueAdministration,
        quantity: serviceQuantity,
        totalPrice: totalPrice,
      });
    }
  }

  function getTotalPrice(singlePrice: number, quantity: number) {
    return singlePrice * quantity;
  }

  async function createOder() {
    const changeDatatypeSingleprice: number = Number(
      orderValueAdministration.singlePrice
    );
    const changeDatatypeTotalprice: number = Number(
      orderValueAdministration.totalPrice
    );
    const changeDatatypeQuantity: number = Number(
      orderValueAdministration.quantity
    );

    const { error } = await supabase.from("Orders").insert({
      clients_id: selectedClientId,
      employee_id: selectedEmployeeId,
      business: orderValueAdministration.business,
      service: orderValueAdministration.service,
      single_price: changeDatatypeSingleprice,
      total_price: changeDatatypeTotalprice,
      quantity: changeDatatypeQuantity,
      order_day: orderValueAdministration.date,
      payment_method: orderValueAdministration.paymentMethode,
      payment_status: orderValueAdministration.paymentStatus,
      note: orderValueAdministration.note,
    });

    if (error?.code !== "PGRST204") {
      setNewOrderForm(false);

      setOrderValueAdministration({
        ...orderValueAdministration,
        selectedOrderId: 0,
        service: "",
        singlePrice: 0,
        totalPrice: 0,
        quantity: 1,
        paymentMethode: "",
        paymentStatus: "",
        note: "",
        business: false,
        date: "",
      });
      setPopUpWidthHeightObject({
        ...popUpWidthHeightObject,
        width: 0,
        height: 0,
      });

      showDataUpdate();

      setToastyObject({
        ...toastyObject,
        area: "order",
        message: "Auftrag wurde erfolgreich angelegt.",
        status: 1,
        z_index: 0,
      });
      autoHiddenToasty();
    } else {
      setToastyObject({
        ...toastyObject,
        area: "order",
        message: "Auftrag angelegen fehlgeschlagen.",
        status: -1,
        z_index: 1,
      });
      autoHiddenToasty();
    }
  }

  function closeNewOrderForm() {
    setNewOrderForm(false);
    setSelectedClientId(0);
    setSelectedEmployeeId(0);

    setOrderValueAdministration({
      ...orderValueAdministration,
      selectedOrderId: 0,
      service: "",
      singlePrice: 0,
      totalPrice: 0,
      quantity: 1,
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

            <div className="new-order__lable-and-input-div">
              <div className="new-order__lable-div">
                <label className="new-order__lable-client lable">
                  Auftraggeber:{" "}
                </label>{" "}
                <label className="new-order__lable-employee lable">
                  Mitarbeiter:{" "}
                </label>{" "}
                <label className="new-order__lable-service lable">
                  Dienstleistung:
                </label>{" "}
                <label className="new-order__lable-single-price lable">
                  Einzelpreis:{" "}
                </label>
                <label className="new-order__lable-quantity lable">
                  Bestellmenge:{" "}
                </label>
                <label className="new-order__lable-total-price lable">
                  Gesamtpreis:{" "}
                </label>
                <label className="new-order__lable-payment-method lable">
                  Zahlungsart:{" "}
                </label>
                <label className="new-order__lable-payment-status lable">
                  Rechnungsstatus:{" "}
                </label>
                <label className="new-order__lable-order-date lable">
                  Bestellaufgabe:
                </label>
                <label className="new-order__lable-business lable">
                  Gewerblich:{" "}
                </label>
                <label className="new-order__lable-remark lable">
                  Bemerkung:{" "}
                </label>
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
                        >{`${client.first_name} ${client.last_name}`}</option>
                      );
                    })}
                  </select>{" "}
                  <span className="new-order__input-note">* Pfichtfeld</span>
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
                        >{`${employee.first_name} ${employee.last_name}`}</option>
                      );
                    })}
                  </select>{" "}
                  <span className="new-order__input-note">* Pflichtfeld</span>
                </div>
                <div className="new-order__input-info-div">
                  <select
                    name=""
                    onChange={(event) => {
                      newServiceContent(event.target.value);
                    }}
                    id=""
                    className="new-order__select"
                  >
                    <option value="" className="new-order__option">
                      ...
                    </option>
                    {serviceArray.map((serviceOption) => (
                      <option
                        value={serviceOption.service}
                        className="new-order__option"
                      >
                        {serviceOption.service}
                      </option>
                    ))}
                  </select>
                  <span className="new-order__input-note">* Pflichtfeld </span>
                </div>

                <div className="new-order__input-info-div">
                  <p className="new-order__single-price number">
                    {orderValueAdministration.singlePrice !== 0
                      ? orderValueAdministration.singlePrice.toLocaleString(
                          "de-DE",
                          {
                            style: "currency",
                            currency: "EUR",
                          }
                        )
                      : ""}
                  </p>
                </div>

                <div className="new-order__input-info-div">
                  <input
                    type="number"
                    value={orderValueAdministration.quantity}
                    onChange={(event) => {
                      newServiceQuantity(event.target.value);
                    }}
                    className="new-order__quantity input number"
                  />{" "}
                </div>

                <div className="new-order__input-info-div">
                  <p className="new-order__total-price number">
                    {orderValueAdministration.quantity > 0 &&
                    orderValueAdministration.totalPrice !== 0
                      ? orderValueAdministration.totalPrice.toLocaleString(
                          "de-DE",
                          {
                            style: "currency",
                            currency: "EUR",
                          }
                        )
                      : ""}
                  </p>
                </div>

                <div className="new-order__input-info-div">
                  <select
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        paymentMethode: event.target.value,
                      });
                    }}
                    value={orderValueAdministration.paymentMethode}
                    name=""
                    id=""
                    className="new-order__select"
                  >
                    <option value="" className="new-order__option">
                      ...
                    </option>
                    <option value="Überweisung" className="new-order__option">
                      Überweisung
                    </option>
                    <option
                      value="Sofortüberweisung"
                      className="new-order__option"
                    >
                      Sofortüberweisung
                    </option>
                    <option value="Kreditkarte" className="new-order__option">
                      Kreditkarte
                    </option>
                    <option value="auf Rechnung" className="new-order__option">
                      auf Rechnung
                    </option>
                  </select>
                  <span className="new-order__input-note">* Pflichtfeld </span>
                </div>
                <div className="new-order__input-info-div">
                  <select
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        paymentStatus: event.target.value,
                      });
                    }}
                    value={orderValueAdministration.paymentStatus}
                    className="new-order__select"
                    name=""
                    id=""
                  >
                    <option value="" className="new-order__option">
                      ...
                    </option>
                    <option value="Bezahlt" className="new-order__option">
                      Bezahlt
                    </option>
                    <option value="Ratenzahlung" className="new-order__option">
                      Ratenzahlung
                    </option>
                    <option
                      value="Zahlung fehlgeschlagen"
                      className="new-order__option"
                    >
                      Zahlung fehlgeschlagen
                    </option>
                  </select>
                  <span className="new-order__input-note">* Pflichtfeld </span>
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
                  <span className="new-order__input-note">* Pflichtfeld</span>{" "}
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

                <div className="new-order__input-info-div">
                  <textarea
                    name=""
                    value={orderValueAdministration.note}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        note: event.target.value.trimStart(),
                      });
                    }}
                    className="new-order__ "
                    id=""
                  ></textarea>
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
                  orderValueAdministration.service !== "" &&
                  orderValueAdministration.quantity > 0 &&
                  orderValueAdministration.paymentStatus !== "" &&
                  orderValueAdministration.paymentMethode !== "" &&
                  orderValueAdministration.date.length > 0
                    ? false
                    : true
                }
                className={`new-order__new-order-button button ${
                  selectedClientId !== 0 &&
                  selectedEmployeeId !== 0 &&
                  orderValueAdministration.service !== "" &&
                  orderValueAdministration.quantity > 0 &&
                  orderValueAdministration.paymentStatus !== "" &&
                  orderValueAdministration.paymentMethode !== "" &&
                  orderValueAdministration.date.length > 0
                    ? "primary-button"
                    : "disbled-button"
                } `}
              >
                Auftrag anlegen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="new-order__new-order-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </PopUpComponent>
      )}
    </div>
  );
}
