import { supabase } from "../../supabase";
import { useContext, useState, useEffect } from "react";
import { ordersContext } from "../../ordersContext";
import { employeesContext } from "../../employeesContext";
import { clientsContext } from "../../clientContext";
import "../../index.scss";
import "./updateOrderComponent.scss";
import PopUpComponent from "../../PopUpComponent";
import "../../PopUpComponent.scss";
import { serviceArray } from "./ordersComponent";
import { toastyContent } from "../../toastyContext";
import { popUpWidthHeightContent } from "../../popUpPaddingContent";

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
  const { toastyObject, setToastyObject, autoHiddenToasty } =
    useContext(toastyContent);
  const { popUpWidthHeightObject, setPopUpWidthHeightObject } = useContext(
    popUpWidthHeightContent
  );
  const [selectedClientId, setSelectedClientId] = useState<number>(0);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(0);

  useEffect(() => {
    showOrder();
  }, [orderValueAdministration.selectedOrderId]);

  function updateServiceContent(service: string) {
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

  function updateServiceQuantity(quantity: string) {
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

  function showOrder() {
    const selectedOder = ordersStorageArray.find((order) => {
      return order.id === orderValueAdministration.selectedOrderId;
    });

    if (selectedOder) {
      console.log(selectedOder);
      const date = new Date(selectedOder.order_day);
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
        singlePrice: selectedOder.single_price,
        totalPrice: selectedOder.total_price || 0,
        quantity: selectedOder.quantity,
        paymentMethode: selectedOder.payment_method,
        paymentStatus: selectedOder.payment_status,
        note: selectedOder.note || "",
        business: selectedOder.business,
        date: formateDateToString,
      });
    }
  }

  async function updateOrder() {
    const { error } = await supabase
      .from("Orders")
      .update({
        clients_id: selectedClientId,
        employee_id: selectedEmployeeId,
        business: orderValueAdministration.business,
        service: orderValueAdministration.service,
        single_price: orderValueAdministration.singlePrice,
        total_price: orderValueAdministration.totalPrice,
        quantity: orderValueAdministration.quantity,
        order_day: orderValueAdministration.date,
        payment_method: orderValueAdministration.paymentMethode,
        payment_status: orderValueAdministration.paymentStatus,
        note: orderValueAdministration.note,
      })
      .eq("id", orderValueAdministration.selectedOrderId);

    if (error?.code !== "PGRST204") {
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

      setUpdateOrderForm(false);
      setPopUpWidthHeightObject({
        ...popUpWidthHeightObject,
        width: 0,
        height: 0,
      });

      showDataUpdate();

      setToastyObject({
        ...toastyObject,
        area: "order",
        message: "Auftrag wurde erfolgreich bearbeitet.",
        status: 1,
        z_index: 0,
      });
      autoHiddenToasty();
    } else {
      setToastyObject({
        ...toastyObject,
        area: "order",
        message: "Auftrag bearbeiten fehlgeschlagen.",
        status: -1,
        z_index: 1,
      });
      autoHiddenToasty();
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

            <div className="update-order__lable-and-input-div">
              <div className="update-order__lable-div">
                <label className="update-order__lable-client lable">
                  Auftraggeber:
                </label>
                <label className="update-order__lable-employee lable">
                  Mitarbeiter:
                </label>
                <label className="update-order__lable-service lable">
                  Dienstleistung:
                </label>
                <label className="update-order__lable-single-price lable">
                  Einzelpreis:{" "}
                </label>
                <label className="update-order__lable-quantity lable">
                  Bestellmenge:{" "}
                </label>
                <label className="update-order__lable-total-price lable">
                  Gesamtpreis:{" "}
                </label>
                <label className="update-order__lable-payment-method lable">
                  Zahlungsart{" "}
                </label>
                <label className="update-order__lable-payment-status lable">
                  Rechnungsstatus:{" "}
                </label>
                <label className="update-order__lable-order-date lable">
                  Bestellaufgabe:
                </label>
                <label className="update-order__lable-business lable">
                  Gewerblich:{" "}
                </label>
                <label className="update-order__lable-remark lable">
                  Bemerkung:{" "}
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
                    <option value={0} className="update-order__option">
                      ...
                    </option>
                    {clientsStorageArray.map((client) => {
                      return (
                        <option
                          value={client.id}
                          className="update-order__option"
                        >{`${client.first_name} ${client.last_name}`}</option>
                      );
                    })}
                  </select>{" "}
                  <span className="update-order__input-note">
                    * Pflichtfeld
                  </span>{" "}
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
                    <option value={0} className="update-order__option">
                      ...
                    </option>
                    {employeesStorageArray.map((employee) => {
                      return (
                        <option
                          value={employee.id}
                          className="update-order__option"
                        >{`${employee.first_name} ${employee.last_name}`}</option>
                      );
                    })}
                  </select>{" "}
                  <span className="update-order__input-note">
                    * Pflichtfeld
                  </span>{" "}
                </div>

                <div className="update-order__input-info-div">
                  <select
                    name=""
                    onChange={(event) => {
                      updateServiceContent(event.target.value);
                    }}
                    value={orderValueAdministration.service}
                    className="update-order__select"
                    id=""
                  >
                    <option value="" className="update-order__option">
                      ...
                    </option>
                    {serviceArray.map((serviceOption) => (
                      <option
                        value={serviceOption.service}
                        className="update-order__option"
                      >
                        {serviceOption.service}
                      </option>
                    ))}
                  </select>
                  <span className="update-order__input-note">
                    * Pflichtfeld
                  </span>
                </div>

                <div className="update-order__input-info-div">
                  <p className="update-order__single-price number">
                    {" "}
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

                <div className="update-order__input-info-div">
                  <input
                    type="number"
                    value={orderValueAdministration.quantity}
                    onChange={(event) => {
                      updateServiceQuantity(event.target.value);
                    }}
                    className="update-order__quantity input number"
                  />{" "}
                </div>

                <div className="update-order__input-info-div">
                  <p className="update-order__total-price number">
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

                <div className="update-order__input-info-div">
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
                    className="update-order__select"
                  >
                    <option value="" className="update-order__option">
                      ...
                    </option>
                    <option
                      value="Überweisung"
                      className="update-order__option"
                    >
                      Überweisung
                    </option>
                    <option
                      value="Sofortüberweisung"
                      className="update-order__option"
                    >
                      Sofortüberweisung
                    </option>
                    <option
                      value="Kreditkarte"
                      className="update-order__option"
                    >
                      Kreditkarte
                    </option>
                    <option
                      value="auf Rechnung"
                      className="update-order__option"
                    >
                      auf Rechnung
                    </option>
                  </select>
                  <span className="update-order__input-note">
                    * Pflichtfeld
                  </span>
                </div>

                <div className="update-order__input-info-div">
                  {" "}
                  <select
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        paymentStatus: event.target.value,
                      });
                    }}
                    value={orderValueAdministration.paymentStatus}
                    className="update-order__select"
                    name=""
                    id=""
                  >
                    <option value="" className="update-order__option">
                      ...
                    </option>
                    <option value="Bezahlt" className="update-order__option">
                      Bezahlt
                    </option>
                    <option
                      value="Ratenzahlung"
                      className="update-order__option"
                    >
                      Ratenzahlung
                    </option>
                    <option
                      value="Zahlung fehlgeschlagen"
                      className="update-order__option"
                    >
                      Zahlung fehlgeschlagen
                    </option>
                  </select>
                  <span className="update-order__input-note">
                    * Pflichtfeld
                  </span>
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
                  <span className="update-order__input-note">
                    * Pflichtfeld
                  </span>
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

                <div className="update-order__input-info-div">
                  <textarea
                    name=""
                    value={orderValueAdministration.note}
                    onChange={(event) => {
                      setOrderValueAdministration({
                        ...orderValueAdministration,
                        note: event.target.value.trimStart(),
                      });
                    }}
                    className="update-order__textarea "
                    id=""
                  ></textarea>
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
                  orderValueAdministration.service !== "" &&
                  orderValueAdministration.quantity > 0 &&
                  orderValueAdministration.paymentStatus !== "" &&
                  orderValueAdministration.paymentMethode !== "" &&
                  orderValueAdministration.date.length > 0
                    ? false
                    : true
                }
                className={`update-order__update-order-button button ${
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
