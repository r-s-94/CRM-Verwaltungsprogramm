import { useContext, useRef, useState } from "react";
import { OrderPopUpDatatype, ordersContext } from "../../ordersContext";
import { supabase } from "../../supabase";
import "../../index.scss";
import "./ordersPreviewComponent.scss";
//import MenuComponent from "../../menuComponent";
import { clientsContext } from "../../clientContext";
import { employeesContext } from "../../employeesContext";
import PopUpComponent from "../../PopUpComponent";
import "../../PopUpComponent.scss";
import ToolTip from "../../ToolTip";
import Toasty from "../../toasty";
import { toastyContent } from "../../toastyContext";
import { popUpWidthHeightContent } from "../../popUpPaddingContent";

export default function OrdersPreviewComponent({
  setNewOrderForm,
  showDataUpdate,
  setUpdateOrderForm,
}: {
  setNewOrderForm: (value: boolean) => void;
  showDataUpdate: () => void;
  setUpdateOrderForm: (value: boolean) => void;
}) {
  const {
    ordersStorageArray,
    setOrdersStorageArray,
    orderValueAdministration,
    setOrderValueAdministration,
  } = useContext(ordersContext);
  const { clientsStorageArray } = useContext(clientsContext);
  const { employeesStorageArray } = useContext(employeesContext);
  const { toastyObject, setToastyObject, autoHiddenToasty } =
    useContext(toastyContent);
  const { popUpWidthHeightObject, setPopUpWidthHeightObject } = useContext(
    popUpWidthHeightContent
  );

  const [currentOrderObject, setCurrentOrderObject] =
    useState<OrderPopUpDatatype>({
      selectedOrderId: 0,
      service: "",
      quantity: 0,
      singlePrice: 0,
      totalPrice: 0,
      paymentMethode: "",
      paymentStatus: "",
      date: "",
      note: "",
      business: false,
    });
  const [singleOrderPreview, setSingleOrderPreview] = useState<boolean>(false);
  const [deleteOrdePopUp, setDeleteOrdePopUp] = useState<boolean>(false);
  const [deleteSingleOrderPopUp, setDeleteSingleOrderPopUp] =
    useState<boolean>(false);
  const [client, setClient] = useState<string>("");
  const [employee, setEmployee] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [toolTipArea, setToolTipArea] = useState<string>("");
  const [toolTipResponsibility, setToolTipResponsibility] =
    useState<string>("");
  const [toolTipOrderId, setToolTipOrderId] = useState<number>(0);
  const [toolTipMessage, setToolTipMessage] = useState<string>("");
  const [toolTipPaddingTopBottom, setToolTipPaddingTopBottom] =
    useState<number>(0);
  const [toolTipPaddingLeftRight, setToolTipPaddingLeftRight] =
    useState<number>(0);
  const [toolTippDirection, setToolTipDirection] = useState<string>("");
  const timeRef = useRef(0);

  function showOrderGoalDay(date: string) {
    console.log(date);
    //const convertTime = new Date(date);
    /*const day =
      Number(date.slice(8, 10)) < 10
        ? "0" + Number(date.slice(9, 10))
        : Number(date.slice(8, 10));
    const month =
      Number(date.slice(5, 7)) < 10
        ? "0" + Number(date.slice(6, 7))
        : Number(date.slice(5, 7));
    const year = date.slice(0, 4);
    const convertDate = String(day) + "." + String(month) + "." + year;*/
    //const day = convertTime.toLocaleDateString("de-DE");
    const convertDate = new Date(date).toLocaleDateString("de-DE", {
      dateStyle: "medium",
    });

    setTime(convertDate);
  }

  function toolTipPrepare(
    overview: string,
    responsible: string,
    orderId: number,
    message: string,
    direction: string
  ) {
    console.log(message);

    if (overview === "order-general-overview") {
      if (responsible === "check") {
        setToolTipResponsibility(responsible);
        setToolTipMessage(message);
        setToolTipPaddingTopBottom(1);
        setToolTipPaddingLeftRight(1.5);
        setToolTipDirection(direction);
      }

      if (responsible === "paymentPeriod") {
        setToolTipResponsibility(responsible);
        setToolTipMessage(message);
        setToolTipPaddingTopBottom(1);
        setToolTipPaddingLeftRight(1.5);
        setToolTipDirection(direction);
      }

      if (responsible === "uncheck") {
        setToolTipResponsibility(responsible);
        setToolTipMessage(message);
        setToolTipPaddingTopBottom(1);
        setToolTipPaddingLeftRight(1.5);
        setToolTipDirection(direction);
      }

      if (responsible === "detail-note") {
        setToolTipResponsibility(responsible);
        setToolTipMessage(message);
        setToolTipPaddingTopBottom(1);
        setToolTipPaddingLeftRight(1.5);
        setToolTipDirection(direction);
      }

      if (responsible === "edit-note") {
        setToolTipResponsibility(responsible);
        setToolTipMessage(message);
        setToolTipPaddingTopBottom(1);
        setToolTipPaddingLeftRight(1.5);
        setToolTipDirection(direction);
      }

      if (responsible === "delete-note") {
        setToolTipResponsibility(responsible);
        setToolTipMessage(message);
        setToolTipPaddingTopBottom(1);
        setToolTipPaddingLeftRight(1.5);
        setToolTipDirection(direction);
      }

      timeRef.current = window.setTimeout(() => {
        showGeneralOverviewToolTip(overview, orderId);
      }, 1500);
    }

    if (overview === "order-single-overview") {
      if (responsible === "check") {
        setToolTipResponsibility(responsible);
        setToolTipMessage(message);
        setToolTipPaddingTopBottom(1);
        setToolTipPaddingLeftRight(1.5);
        setToolTipDirection(direction);
      }

      if (responsible === "paymentPeriod") {
        setToolTipResponsibility(responsible);
        setToolTipMessage(message);
        setToolTipPaddingTopBottom(1);
        setToolTipPaddingLeftRight(1.5);
        setToolTipDirection(direction);
      }

      if (responsible === "uncheck") {
        setToolTipResponsibility(responsible);
        setToolTipMessage(message);
        setToolTipPaddingTopBottom(1);
        setToolTipPaddingLeftRight(1.5);
        setToolTipDirection(direction);
      }

      if (responsible === "edit-note") {
        setToolTipResponsibility(responsible);
        setToolTipMessage(message);
        setToolTipPaddingTopBottom(1);
        setToolTipPaddingLeftRight(1.5);
        setToolTipDirection(direction);
      }

      if (responsible === "delete-note") {
        setToolTipResponsibility(responsible);
        setToolTipMessage(message);
        setToolTipPaddingTopBottom(1);
        setToolTipPaddingLeftRight(1.5);
        setToolTipDirection(direction);
      }

      timeRef.current = window.setTimeout(() => {
        showSingleOverviewToolTip(overview, orderId);
      }, 1500);
    }
  }

  function showGeneralOverviewToolTip(overview: string, orderId: number) {
    setToolTipArea(overview);
    setToolTipOrderId(orderId);
  }

  function showSingleOverviewToolTip(overview: string, orderId: number) {
    setToolTipArea(overview);
    setToolTipOrderId(orderId);
  }

  function hiddenToolTip() {
    setToolTipOrderId(0);
    setToolTipDirection("");
    setToolTipPaddingTopBottom(0);
    setToolTipMessage("");
    clearTimeout(timeRef.current);
    setToolTipArea("");
  }

  function updateOrder(id: number) {
    setOrderValueAdministration({
      ...orderValueAdministration,
      selectedOrderId: id,
    });

    setUpdateOrderForm(true);
  }

  function opendeleteOrdePopUp(id: number) {
    setOrderValueAdministration({
      ...orderValueAdministration,
      selectedOrderId: id,
    });

    setDeleteOrdePopUp(true);
  }

  async function deleteOrder(id: number) {
    console.log(id);
    const { error } = await supabase.from("Orders").delete().eq("id", id);

    if (error?.code !== "42703") {
      showDataUpdate();
      setDeleteOrdePopUp(false);
      resetPopUpWidthHeightObject();
      resetOrder();
      setToastyObject({
        ...toastyObject,
        area: "order",
        message: "Auftrag wurde erfolgreich entfernt.",
        status: 1,
        z_index: 0,
      });
      autoHiddenToasty();
    } else {
      setToastyObject({
        ...toastyObject,
        area: "order",
        message: "Auftrag entfernen fehlgeschlagen.",
        status: -1,
        z_index: 1,
      });
      autoHiddenToasty();
    }
  }

  function closedeleteOrdePopUp() {
    setDeleteOrdePopUp(false);
    resetPopUpWidthHeightObject();
  }

  function openSingleOrderPreview(id: number) {
    console.log(id);

    const findCurrenOrder = ordersStorageArray.find((order) => {
      return order.id === id;
    });
    console.log(findCurrenOrder);

    if (findCurrenOrder) {
      setCurrentOrderObject({
        ...currentOrderObject,
        selectedOrderId: findCurrenOrder.id,
        service: findCurrenOrder.service,
        quantity: findCurrenOrder.quantity,
        singlePrice: findCurrenOrder.single_price,
        totalPrice: findCurrenOrder.total_price || 0,
        paymentMethode: findCurrenOrder.payment_method,
        paymentStatus: findCurrenOrder.payment_status,
        date: findCurrenOrder.order_day,
        note: findCurrenOrder.note || "",
        business: findCurrenOrder.business,
      });
      showOrderDetails(id);
    }

    setOrderValueAdministration({
      ...orderValueAdministration,
      selectedOrderId: id,
    });
    setSingleOrderPreview(true);
  }

  function showOrderDetails(orderId: number) {
    const selectedOrder = ordersStorageArray.find((order) => {
      return order.id === orderId;
    });

    showOrderGoalDay(selectedOrder?.order_day || "");

    const client = clientsStorageArray.find((client) => {
      return client.id === selectedOrder?.clients_id;
    });

    setClient(`${client?.first_name} ${client?.last_name}`);

    const employee = employeesStorageArray.find((employee) => {
      return employee.id === selectedOrder?.employee_id;
    });

    setEmployee(`${employee?.first_name} ${employee?.last_name}`);
  }

  async function closeSingleOrderPreview() {
    const { data } = await supabase.from("Orders").select().order("id");

    if (data) {
      setOrdersStorageArray(data);
    }

    setCurrentOrderObject({
      ...currentOrderObject,
      selectedOrderId: 0,
      service: "",
      quantity: 1,
      singlePrice: 0,
      totalPrice: 0,
      paymentMethode: "",
      paymentStatus: "",
      date: "",
      note: "",
      business: false,
    });

    resetPopUpWidthHeightObject();
    setSingleOrderPreview(false);
    resetOrder();
    setToastyObject({
      ...toastyObject,
      area: "",
      message: "",
      status: 0,
      z_index: 0,
    });
  }

  function updateSingleOrder(id: number) {
    setOrderValueAdministration({
      ...orderValueAdministration,
      selectedOrderId: id,
    });

    setUpdateOrderForm(true);
    setSingleOrderPreview(false);

    //const { data } = await supabase.from("Orders").select().order("id");
    //console.log(data);

    /*if (data) {
      setOrdersStorageArray(data);
    }*/
  }

  function opendeleteSingleOrderPopUp(id: number) {
    setOrderValueAdministration({
      ...orderValueAdministration,
      selectedOrderId: id,
    });

    setDeleteSingleOrderPopUp(true);
    setSingleOrderPreview(false);
  }

  async function deleteSingleOrder(id: number) {
    console.log(id);
    const { error } = await supabase.from("Orders").delete().eq("id", id);

    if (error?.code !== "42703") {
      showDataUpdate();

      setDeleteSingleOrderPopUp(false);
      resetPopUpWidthHeightObject();
      resetOrder();
      setToastyObject({
        ...toastyObject,
        area: "order",
        message: "Auftrag wurde erfolgreich entfernt.",
        status: 1,
        z_index: 0,
      });
      autoHiddenToasty();
    } else {
      setToastyObject({
        ...toastyObject,
        area: "order",
        message: "Auftrag entfernen fehlgeschlagen.",
        status: -1,
        z_index: 1,
      });
      autoHiddenToasty();
    }
  }

  async function closedeleteSingleOrderPopUp() {
    //const { data } = await supabase.from("Orders").select().order("id");

    /*if (data) {
      setOrdersStorageArray(data);
    }*/

    openSingleOrderPreview(orderValueAdministration.selectedOrderId);
    setDeleteSingleOrderPopUp(false);
    setPopUpWidthHeightObject({
      ...popUpWidthHeightObject,
      width: 60,
      height: 90,
    });

    setSingleOrderPreview(true);
  }

  function resetOrder() {
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

  function resetPopUpWidthHeightObject() {
    setPopUpWidthHeightObject({
      ...popUpWidthHeightObject,
      width: 0,
      height: 0,
    });
  }

  /*  



  */

  return (
    <div className="orders-preview">
      {deleteOrdePopUp && (
        <PopUpComponent>
          <div className="orders-preview__delete-order-form">
            <svg
              onClick={closedeleteOrdePopUp}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="new-employee__close-icon hover"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>

            <p className="orders-preview__text">
              Soll der Auftrag wirklich entfernt werden?
            </p>

            <div className="orders-preview__delete-order-button-div center-content">
              <button
                onClick={closedeleteOrdePopUp}
                className="orders-preview__delete-order-cancle-button button"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="orders-preview__delete-order-cancle-icon"
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
                onClick={() => {
                  deleteOrder(orderValueAdministration.selectedOrderId);
                }}
                className="orders-preview__delete-order-button button delete-button"
              >
                löschen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="orders-preview__delete-order-icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </PopUpComponent>
      )}
      {deleteSingleOrderPopUp && (
        <PopUpComponent>
          <div className="orders-preview__delete-single-order-form-div">
            <svg
              onClick={closedeleteSingleOrderPopUp}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="new-employee__close-icon hover"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>

            <p className="orders-preview__text">
              Soll der Einzelauftrag wircklich entfernt werden?
            </p>

            <div className="orders-preview__delete-single-order-button-div center-content">
              <button
                onClick={closedeleteSingleOrderPopUp}
                className="orders-preview__delete-single-order-cancle-button button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="orders-preview__delete-single-order-cancle-icon"
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
                onClick={() => {
                  deleteSingleOrder(orderValueAdministration.selectedOrderId);
                }}
                className="orders-preview__delete-single-order-button button delete-button"
              >
                löschen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="orders-preview__delete-single-order-icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </PopUpComponent>
      )}
      {singleOrderPreview && (
        <PopUpComponent>
          <div className="orders-preview__single-order-div ">
            {" "}
            <svg
              onClick={closeSingleOrderPreview}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="orders-preview__close-icon hover"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            <div className="orders-preview__single-table-div center-content">
              <div className="orders-preview__single-headline-div">
                <p className="orders-preview__single-order-headline orders-preview__single-order-number">
                  Auftragsnummer
                </p>{" "}
                <p className="orders-preview__single-order-headline orders-preview__single-order-client">
                  Auftraggeber
                </p>
                <p className="orders-preview__single-order-headline orders-preview__single-order-employee">
                  Mitarbeiter
                </p>
                <p className="orders-preview__single-order-headline orders-preview__single">
                  Gewerblich
                </p>{" "}
                <p className="orders-preview__single-order-headline orders-preview__single">
                  Dienstleistung
                </p>
                <p className="orders-preview__single-order-headline orders-preview__single">
                  Dienstleistungswert
                </p>
                <p className="orders-preview__single-order-headline orders-preview__single">
                  Bestellmenge
                </p>
                <p className="orders-preview__single-order-headline orders-preview__single">
                  Gesamtbetrag
                </p>
                <p className="orders-preview__single-order-headline orders-preview__single">
                  Zahlungsart
                </p>
                <p className="orders-preview__single-order-headline orders-preview__single">
                  Rechnungsstatus
                </p>
                <p className="orders-preview__single-order-headline orders-preview__single">
                  Bestelldatum
                </p>
                <p className="orders-preview__single-order-headline orders-preview__single">
                  Bemerkung
                </p>
                <p className="orders-preview__single-order-headline orders-preview__single">
                  Aktionen
                </p>
              </div>
              <div className="orders-preview__single-info-div">
                <div className="orders-preview__single-order-info orders-preview__single-order-id-info number">
                  {currentOrderObject.selectedOrderId}{" "}
                </div>
                <div className="orders-preview__single-order-info orders-preview__single-order-client-info">
                  {client}
                </div>{" "}
                <div className="orders-preview__single-order-info orders-preview__single-order-employee-info">
                  {employee}
                </div>{" "}
                <div className="orders-preview__single-order-info orders-preview__single-order-business-info">
                  {currentOrderObject.business ? "Ja" : "Nein"}
                </div>
                <div className="orders-preview__single-order-info orders-preview__single-order-service-info">
                  {currentOrderObject.service}
                </div>
                <div className="orders-preview__single-order-info orders-preview__single-order-service-value-info number">
                  {currentOrderObject.singlePrice.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </div>{" "}
                <div className="orders-preview__single-order-info orders-preview__single-order-quantity-info number">
                  {currentOrderObject.quantity}x
                </div>{" "}
                <div className="orders-preview__single-order-info orders-preview__single-order-quantity-service-value-info number">
                  {currentOrderObject.totalPrice.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}{" "}
                </div>{" "}
                <div className="orders-preview__single-order-info orders-preview__single-order-payment-method-info">
                  {currentOrderObject.paymentMethode}
                </div>
                <div
                  className={`orders-preview__single-order-info orders-preview__single-order-payment-status-info center-content
                        ${
                          currentOrderObject.paymentStatus === "Bezahlt"
                            ? "payment-check-green"
                            : currentOrderObject.paymentStatus ===
                              "Ratenzahlung"
                            ? "payment-check-yellow"
                            : "payment-check-red"
                        }
                      `}
                >
                  {currentOrderObject.paymentStatus === "Bezahlt" && (
                    <div className="orders-preview__single-order-payment-status">
                      {" "}
                      {toolTipArea === "order-single-overview" &&
                        toolTipResponsibility === "check" &&
                        toolTipOrderId ===
                          currentOrderObject.selectedOrderId && (
                          <ToolTip
                            toolTippDirection={toolTippDirection}
                            toolTipPaddingTopBottom={toolTipPaddingTopBottom}
                            toolTipPaddingLeftRight={toolTipPaddingLeftRight}
                          >
                            {toolTipMessage}
                          </ToolTip>
                        )}
                      <svg
                        onMouseEnter={() => {
                          toolTipPrepare(
                            "order-single-overview",
                            "check",
                            currentOrderObject.selectedOrderId,
                            "Service vollständig bezahlt",
                            "right"
                          );
                        }}
                        onMouseLeave={hiddenToolTip}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="orders-preview__single-order-check-icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </div>
                  )}

                  {currentOrderObject.paymentStatus === "Ratenzahlung" && (
                    <div className="orders-preview__single-order-payment-status">
                      {" "}
                      {toolTipArea === "order-single-overview" &&
                        toolTipResponsibility === "paymentPeriod" &&
                        toolTipOrderId ===
                          currentOrderObject.selectedOrderId && (
                          <ToolTip
                            toolTippDirection={toolTippDirection}
                            toolTipPaddingTopBottom={toolTipPaddingTopBottom}
                            toolTipPaddingLeftRight={toolTipPaddingLeftRight}
                          >
                            {toolTipMessage}
                          </ToolTip>
                        )}{" "}
                      <svg
                        onMouseEnter={() => {
                          toolTipPrepare(
                            "order-single-overview",
                            "paymentPeriod",
                            currentOrderObject.selectedOrderId,
                            "Zahlung noch nicht eingegangen",
                            "right"
                          );
                        }}
                        onMouseLeave={hiddenToolTip}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="orders-preview__single-order-note-icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                        />
                      </svg>
                    </div>
                  )}

                  {currentOrderObject.paymentStatus ===
                    "Zahlung fehlgeschlagen" && (
                    <div className="orders-preview__single-order-payment-status">
                      {toolTipArea === "order-single-overview" &&
                        toolTipResponsibility === "uncheck" &&
                        toolTipOrderId ===
                          currentOrderObject.selectedOrderId && (
                          <ToolTip
                            toolTippDirection={toolTippDirection}
                            toolTipPaddingTopBottom={toolTipPaddingTopBottom}
                            toolTipPaddingLeftRight={toolTipPaddingLeftRight}
                          >
                            {toolTipMessage}
                          </ToolTip>
                        )}
                      <svg
                        onMouseEnter={() => {
                          toolTipPrepare(
                            "order-single-overview",
                            "uncheck",
                            currentOrderObject.selectedOrderId,
                            "Zahlung konnte nicht abgeschlossen werden",
                            "right"
                          );
                        }}
                        onMouseLeave={hiddenToolTip}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="orders-preview__single-order-attention-icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="orders-preview__single-order-info orders-preview__single-order-time-stamp-info number">
                  {time}
                </div>
                <div
                  style={{
                    padding: currentOrderObject.note === "" ? "" : "0",
                  }}
                  className="orders-preview__single-order-info orders-preview__single-order-note-info"
                >
                  {currentOrderObject.note}
                </div>
                <div className="orders-preview__single-order-info orders-preview__single-order-options-div center-content">
                  <div className="orders-preview__single-order-button-div center-content">
                    <div className="order-preview__single-action-order-tool-tip-div">
                      {toolTipArea === "order-single-overview" &&
                        toolTipResponsibility === "edit-note" &&
                        toolTipOrderId ===
                          currentOrderObject.selectedOrderId && (
                          <ToolTip
                            toolTippDirection={toolTippDirection}
                            toolTipPaddingTopBottom={toolTipPaddingTopBottom}
                            toolTipPaddingLeftRight={toolTipPaddingLeftRight}
                          >
                            {toolTipMessage}
                          </ToolTip>
                        )}
                      <svg
                        onClick={() => {
                          setPopUpWidthHeightObject({
                            ...popUpWidthHeightObject,
                            width: 60,
                            height: 90,
                          });
                          updateSingleOrder(currentOrderObject.selectedOrderId);
                        }}
                        onMouseEnter={() => {
                          toolTipPrepare(
                            "order-single-overview",
                            "edit-note",
                            currentOrderObject.selectedOrderId,
                            "Auftrag bearbeiten",
                            "right"
                          );
                        }}
                        onMouseLeave={hiddenToolTip}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="orders-preview__edit-icon hover"
                      >
                        <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                      </svg>
                    </div>

                    <div className="order-preview__single-action-order-tool-tip-div">
                      {toolTipArea === "order-single-overview" &&
                        toolTipResponsibility === "delete-note" &&
                        toolTipOrderId ===
                          currentOrderObject.selectedOrderId && (
                          <ToolTip
                            toolTippDirection={toolTippDirection}
                            toolTipPaddingTopBottom={toolTipPaddingTopBottom}
                            toolTipPaddingLeftRight={toolTipPaddingLeftRight}
                          >
                            {toolTipMessage}
                          </ToolTip>
                        )}
                      <svg
                        onClick={() => {
                          setPopUpWidthHeightObject({
                            ...popUpWidthHeightObject,
                            width: 50,
                            height: 75,
                          });
                          opendeleteSingleOrderPopUp(
                            currentOrderObject.selectedOrderId
                          );
                        }}
                        onMouseEnter={() => {
                          toolTipPrepare(
                            "order-single-overview",
                            "delete-note",
                            currentOrderObject.selectedOrderId,
                            "Auftrag entfernen",
                            "right"
                          );
                        }}
                        onMouseLeave={hiddenToolTip}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="orders-preview__delete-icon hover"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PopUpComponent>
      )}
      <div className="orders-preview__table-div">
        <button
          onClick={() => {
            setPopUpWidthHeightObject({
              ...popUpWidthHeightObject,
              width: 60,
              height: 90,
            });
            setNewOrderForm(true);
          }}
          className="orders-preview__new-order-button primary-button button"
        >
          Auftrag anlegen{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="orders-preview__new-order-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>

        <div className="orders-preview__headline-div">
          <h2 className="orders-preview__headline orders-preview__service">
            Dienstleistung
          </h2>
          <h2 className="orders-preview__headline orders-preview__service-total-sum">
            Gesamtwert
          </h2>
          <h2 className="orders-preview__headline orders-preview__payment-status">
            Rechnungstatus
          </h2>
          <h2 className="orders-preview__headline orders-preview__options">
            Aktionen
          </h2>
        </div>

        <div className="orders-preview__order-preview-div">
          {ordersStorageArray.map((order) => {
            return (
              <div className="orders-preview__order-info-div">
                <div className="orders-preview__order-info orders-preview__service-info">
                  {order.service}
                </div>
                <div className="orders-preview__order-info orders-preview__service-total-sum-info center-content">
                  {order.total_price?.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </div>
                <div
                  className={`orders-preview__order-info orders-preview__payment-status-info center-content
                  ${
                    order.payment_status === "Bezahlt"
                      ? "payment-check-green"
                      : order.payment_status === "Ratenzahlung"
                      ? "payment-check-yellow"
                      : "payment-check-red"
                  }
                `}
                >
                  {order.payment_status === "Bezahlt" && (
                    <div className="orders-preview__payment-status">
                      {" "}
                      {toolTipArea === "order-general-overview" &&
                        toolTipResponsibility === "check" &&
                        toolTipOrderId === order.id && (
                          <ToolTip
                            toolTippDirection={toolTippDirection}
                            toolTipPaddingTopBottom={toolTipPaddingTopBottom}
                            toolTipPaddingLeftRight={toolTipPaddingLeftRight}
                          >
                            {toolTipMessage}
                          </ToolTip>
                        )}
                      <svg
                        onMouseEnter={() => {
                          toolTipPrepare(
                            "order-general-overview",
                            "check",
                            order.id,
                            "Service vollständig bezahlt",
                            "right"
                          );
                        }}
                        onMouseLeave={hiddenToolTip}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="orders-preview__check-icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </div>
                  )}

                  {order.payment_status === "Ratenzahlung" && (
                    <div className="orders-preview__payment-status">
                      {" "}
                      {toolTipArea === "order-general-overview" &&
                        toolTipResponsibility === "paymentPeriod" &&
                        toolTipOrderId === order.id && (
                          <ToolTip
                            toolTippDirection={toolTippDirection}
                            toolTipPaddingTopBottom={toolTipPaddingTopBottom}
                            toolTipPaddingLeftRight={toolTipPaddingLeftRight}
                          >
                            {toolTipMessage}
                          </ToolTip>
                        )}{" "}
                      <svg
                        onMouseEnter={() => {
                          toolTipPrepare(
                            "order-general-overview",
                            "paymentPeriod",
                            order.id,
                            "Zahlung noch nicht eingegangen",
                            "right"
                          );
                        }}
                        onMouseLeave={hiddenToolTip}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="orders-preview__note-icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                        />
                      </svg>
                    </div>
                  )}

                  {order.payment_status === "Zahlung fehlgeschlagen" && (
                    <div className="orders-preview__payment-status">
                      {" "}
                      {toolTipArea === "order-general-overview" &&
                        toolTipResponsibility === "uncheck" &&
                        toolTipOrderId === order.id && (
                          <ToolTip
                            toolTippDirection={toolTippDirection}
                            toolTipPaddingTopBottom={toolTipPaddingTopBottom}
                            toolTipPaddingLeftRight={toolTipPaddingLeftRight}
                          >
                            {toolTipMessage}
                          </ToolTip>
                        )}
                      <svg
                        onMouseEnter={() => {
                          toolTipPrepare(
                            "order-general-overview",
                            "uncheck",
                            order.id,
                            "Zahlung konnte nicht abgeschlossen werden",
                            "right"
                          );
                        }}
                        onMouseLeave={hiddenToolTip}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="orders-preview__attention-icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="orders-preview__order-info orders-preview__option-div">
                  <div className="orders-preview__button-div center-content">
                    {" "}
                    <button
                      onClick={() => {
                        setPopUpWidthHeightObject({
                          ...popUpWidthHeightObject,
                          width: 60,
                          height: 90,
                        });
                        openSingleOrderPreview(order.id);
                      }}
                      className="orders-preview__detail-button button"
                    >
                      <div className="order-preview__action-order-tool-tip-div">
                        {toolTipArea === "order-general-overview" &&
                          toolTipResponsibility === "detail-note" &&
                          toolTipOrderId === order.id && (
                            <ToolTip
                              toolTippDirection={toolTippDirection}
                              toolTipPaddingTopBottom={toolTipPaddingTopBottom}
                              toolTipPaddingLeftRight={toolTipPaddingLeftRight}
                            >
                              {toolTipMessage}
                            </ToolTip>
                          )}
                        <svg
                          onMouseEnter={() => {
                            toolTipPrepare(
                              "order-general-overview",
                              "detail-note",
                              order.id,
                              "Zur Detailansicht",
                              "left"
                            );
                          }}
                          onMouseLeave={hiddenToolTip}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="orders-preview__detail-icon"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                          />
                        </svg>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setPopUpWidthHeightObject({
                          ...popUpWidthHeightObject,
                          width: 60,
                          height: 90,
                        });
                        updateOrder(order.id);
                      }}
                      className="orders-preview__edit-button button"
                    >
                      <div className="order-preview__action-order-tool-tip-div">
                        {toolTipArea === "order-general-overview" &&
                          toolTipResponsibility === "edit-note" &&
                          toolTipOrderId === order.id && (
                            <ToolTip
                              toolTippDirection={toolTippDirection}
                              toolTipPaddingTopBottom={toolTipPaddingTopBottom}
                              toolTipPaddingLeftRight={toolTipPaddingLeftRight}
                            >
                              {toolTipMessage}
                            </ToolTip>
                          )}
                        <svg
                          onMouseEnter={() => {
                            toolTipPrepare(
                              "order-general-overview",
                              "edit-note",
                              order.id,
                              "Auftrag bearbeiten",
                              "left"
                            );
                          }}
                          onMouseLeave={hiddenToolTip}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="orders-preview__edit-icon"
                        >
                          <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                        </svg>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setPopUpWidthHeightObject({
                          ...popUpWidthHeightObject,
                          width: 50,
                          height: 75,
                        });
                        opendeleteOrdePopUp(order.id);
                      }}
                      className="orders-preview__delete-button button"
                    >
                      {" "}
                      <div className="order-preview__action-order-tool-tip-div">
                        {toolTipArea === "order-general-overview" &&
                          toolTipResponsibility === "delete-note" &&
                          toolTipOrderId === order.id && (
                            <ToolTip
                              toolTippDirection={toolTippDirection}
                              toolTipPaddingTopBottom={toolTipPaddingTopBottom}
                              toolTipPaddingLeftRight={toolTipPaddingLeftRight}
                            >
                              {toolTipMessage}
                            </ToolTip>
                          )}
                        <svg
                          onMouseEnter={() => {
                            toolTipPrepare(
                              "order-general-overview",
                              "delete-note",
                              order.id,
                              "Auftrag entfernen",
                              "left"
                            );
                          }}
                          onMouseLeave={hiddenToolTip}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="orders-preview__delete-icon"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Toasty
        toastyArea={toastyObject.area}
        toastyStatus={toastyObject.status}
        toastyZIndex={toastyObject.z_index}
      >
        {toastyObject.message}
      </Toasty>
    </div>

    /* {" "}
                      
              <MenuComponent
                    buttons={
                     
                    }
                  /> 
                  
                  <MenuComponent
                    buttons={
                     
                    }
                  />      
    
    */
  );
}
