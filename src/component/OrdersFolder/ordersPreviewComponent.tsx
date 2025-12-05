import { useContext, useState } from "react";
import { ordersContext } from "../../ordersContext";
import { supabase } from "../../supabase";
import "../../index.scss";
import "./ordersPreviewComponent.scss";
//import MenuComponent from "../../menuComponent";
import { clientsContext } from "../../clientContext";
import { employeesContext } from "../../employeesContext";
import PopUpComponent from "../../PopUpComponent";
import "../../PopUpComponent.scss";

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

  const [singleOrderPreview, setSingleOrderPreview] = useState<boolean>(false);
  const [deleteOrdePopUp, setDeleteOrdePopUp] = useState<boolean>(false);
  const [deleteSingleOrderPopUp, setDeleteSingleOrderPopUp] =
    useState<boolean>(false);
  const [client, setClient] = useState<string>("");
  const [employee, setEmployee] = useState<string>("");
  const [time, setTime] = useState<string>("");

  function showOrderGoalDay(date: string) {
    const convertTime = new Date(date);
    const day = convertTime.toLocaleDateString("de-DE");

    setTime(day);
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
    const {} = await supabase.from("Orders").delete().eq("id", id);

    showDataUpdate();
    setDeleteOrdePopUp(false);
    resetOrder();
  }

  function closedeleteOrdePopUp() {
    setDeleteOrdePopUp(false);
  }

  async function openSingleOrderPreview(id: number) {
    console.log(id);
    const { data } = await supabase
      .from("Orders")
      .select()
      .filter("id", "eq", `${id}`);
    console.log(data);

    if (data) {
      setOrdersStorageArray(data);
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

    showOrderGoalDay(selectedOrder?.orderDay || "");

    const client = clientsStorageArray.find((client) => {
      return client.id === selectedOrder?.clients_id;
    });

    setClient(`${client?.firstName} ${client?.lastName}`);

    const employee = employeesStorageArray.find((employee) => {
      return employee.id === selectedOrder?.employee_id;
    });

    setEmployee(`${employee?.firstName} ${employee?.lastName}`);
  }

  async function closeSingleOrderPreview() {
    const { data } = await supabase.from("Orders").select().order("id");

    if (data) {
      setOrdersStorageArray(data);
    }

    setSingleOrderPreview(false);
    resetOrder();
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
    const {} = await supabase.from("Orders").delete().eq("id", id);

    showDataUpdate();

    setDeleteSingleOrderPopUp(false);
    resetOrder();
  }

  async function closedeleteSingleOrderPopUp() {
    //const { data } = await supabase.from("Orders").select().order("id");

    /*if (data) {
      setOrdersStorageArray(data);
    }*/

    openSingleOrderPreview(orderValueAdministration.selectedOrderId);
    setDeleteSingleOrderPopUp(false);
    setSingleOrderPreview(true);
  }

  function resetOrder() {
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
                className="orders-preview__delete-order-button button"
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
                className="orders-preview__delete-single-order-button button"
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
                  {ordersStorageArray[0].id}{" "}
                </div>
                <div className="orders-preview__single-order-info orders-preview__single-order-client-info">
                  {client}
                </div>{" "}
                <div className="orders-preview__single-order-info orders-preview__single-order-employee-info">
                  {employee}
                </div>{" "}
                <div className="orders-preview__single-order-info orders-preview__single-order-business-info">
                  {ordersStorageArray[0].business ? "Ja" : "Nein"}
                </div>
                <div className="orders-preview__single-order-info orders-preview__single-order-service-info">
                  {ordersStorageArray[0].service}
                </div>
                <div className="orders-preview__single-order-info orders-preview__single-order-service-value-info number">
                  {ordersStorageArray[0].serviceValue} €
                </div>{" "}
                <div className="orders-preview__single-order-info orders-preview__single-order-quantity-info number">
                  {ordersStorageArray[0].quantity}x
                </div>{" "}
                <div className="orders-preview__single-order-info orders-preview__single-order-quantity-service-value-info number">
                  {ordersStorageArray[0].quantity *
                    ordersStorageArray[0].serviceValue}{" "}
                  €
                </div>{" "}
                <div className="orders-preview__single-order-info orders-preview__single-order-payment-method-info">
                  {ordersStorageArray[0].paymentMethod}
                </div>
                <div
                  className={`orders-preview__single-order-info orders-preview__single-order-payment-status-info center-content
                        ${
                          ordersStorageArray[0].paymentStatus === "Bezahlt"
                            ? "payment-check-green"
                            : ordersStorageArray[0].paymentStatus ===
                              "Ratenzahlung"
                            ? "payment-check-yellow"
                            : "payment-check-red"
                        }
                      `}
                >
                  {ordersStorageArray[0].paymentStatus === "Bezahlt" && (
                    <svg
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
                  )}

                  {ordersStorageArray[0].paymentStatus === "Ratenzahlung" && (
                    <svg
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
                  )}

                  {ordersStorageArray[0].paymentStatus ===
                    "Zahlung fehlgeschlagen" && (
                    <svg
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
                  )}
                </div>
                <div className="orders-preview__single-order-info orders-preview__single-order-time-stamp-info number">
                  {time}
                </div>
                <div
                  style={{
                    padding: ordersStorageArray[0].note === "" ? "" : "0",
                  }}
                  className="orders-preview__single-order-info orders-preview__single-order-note-info"
                >
                  {ordersStorageArray[0].note}
                </div>
                <div className="orders-preview__single-order-info orders-preview__single-order-options-div center-content">
                  <div className="orders-preview__single-order-button-div center-content">
                    <svg
                      onClick={() => {
                        updateSingleOrder(ordersStorageArray[0].id);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="orders-preview__edit-icon hover"
                    >
                      <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                      <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                    </svg>

                    <svg
                      onClick={() => {
                        opendeleteSingleOrderPopUp(ordersStorageArray[0].id);
                      }}
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
        </PopUpComponent>
      )}

      <div className="orders-preview__table-div">
        <button
          onClick={() => {
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
                <div className="orders-preview__order-info orders-preview__service-total-sum-info">
                  {order.quantity * order.serviceValue} €
                </div>
                <div
                  className={`orders-preview__order-info orders-preview__payment-status-info center-content
                  ${
                    order.paymentStatus === "Bezahlt"
                      ? "payment-check-green"
                      : order.paymentStatus === "Ratenzahlung"
                      ? "payment-check-yellow"
                      : "payment-check-red"
                  }
                `}
                >
                  {order.paymentStatus === "Bezahlt" && (
                    <svg
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
                  )}

                  {order.paymentStatus === "Ratenzahlung" && (
                    <svg
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
                  )}

                  {order.paymentStatus === "Zahlung fehlgeschlagen" && (
                    <svg
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
                  )}
                </div>

                <div className="orders-preview__order-info orders-preview__option-div">
                  <div className="orders-preview__button-div center-content">
                    {" "}
                    <button
                      onClick={() => {
                        openSingleOrderPreview(order.id);
                      }}
                      className="orders-preview__detail-button button"
                    >
                      <svg
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
                    </button>
                    <button
                      onClick={() => {
                        updateOrder(order.id);
                      }}
                      className="orders-preview__edit-button button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="orders-preview__edit-icon"
                      >
                        <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        opendeleteOrdePopUp(order.id);
                      }}
                      className="orders-preview__delete-button button"
                    >
                      <svg
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
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
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
