import { useContext, useState } from "react";
import { ordersContext } from "../../ordersContext";
import { supabase } from "../../supabase";
import "./ordersPreviewComponent.scss";
import MenuComponent from "../../menuComponent";
import { clientsContext } from "../../clientContext";
import { employeesContext } from "../../employeesContext";
import PopUpComponent from "../../PopUpComponent";
import "../../PopUpComponent.scss";

export default function OrdersPreviewComponent({
  showDataUpdate,
  setUpdateOrderForm,
}: {
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
  const [deleteOrderMessagePopUp, setDeleteOrderMessagePopUp] =
    useState<boolean>(false);
  const [deleteSingleOrderMessagePopUp, setDeleteSingleOrderMessagePopUp] =
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

  function openDeleteOrderMessagePopUp(id: number) {
    setOrderValueAdministration({
      ...orderValueAdministration,
      selectedOrderId: id,
    });

    setDeleteOrderMessagePopUp(true);
  }

  async function deleteOrder(id: number) {
    console.log(id);
    const {} = await supabase.from("Orders").delete().eq("id", id);

    showDataUpdate();

    setDeleteOrderMessagePopUp(false);

    resetOrder();
  }

  function closeDeleteOrderMessagePopUp() {
    setDeleteOrderMessagePopUp(false);
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

  function openDeleteSingleOrderMessagePopUp(id: number) {
    setOrderValueAdministration({
      ...orderValueAdministration,
      selectedOrderId: id,
    });

    setDeleteSingleOrderMessagePopUp(true);
    setSingleOrderPreview(false);
  }

  async function deleteSingleOrder(id: number) {
    console.log(id);
    const {} = await supabase.from("Orders").delete().eq("id", id);

    showDataUpdate();

    setDeleteSingleOrderMessagePopUp(false);
    resetOrder();
  }

  async function closeDeleteSingleOrderMessagePopUp() {
    //const { data } = await supabase.from("Orders").select().order("id");

    /*if (data) {
      setOrdersStorageArray(data);
    }*/

    openSingleOrderPreview(orderValueAdministration.selectedOrderId);
    setDeleteSingleOrderMessagePopUp(false);
    setSingleOrderPreview(true);
  }

  function resetOrder() {
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
  }

  /*  



  */

  return (
    <div className="orders-preview">
      {deleteOrderMessagePopUp && (
        <PopUpComponent>
          <div className="orders-preview__popup-message-div">
            <p className="orders-preview__popup-message-div--text">
              Soll der Auftrag wirklich gelöscht werden?
            </p>
            <div className="orders-preview__popup-message-div--button-div">
              <button
                onClick={closeDeleteOrderMessagePopUp}
                className="orders-preview__popup-message-div--button-div--close-button"
              >
                abbrechen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="orders-preview__popup-message-div--button-div--close-button--close-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <button
                onClick={() => {
                  deleteOrder(orderValueAdministration.selectedOrderId);
                }}
                className="orders-preview__popup-message-div--button-div--delete-button"
              >
                löschen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="orders-preview__popup-message-div--button-div--delete-button--delete-icon"
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

      {deleteSingleOrderMessagePopUp && (
        <PopUpComponent>
          <div className="orders-preview__popup-message-div">
            <p className="orders-preview__popup-message-div--text">
              Soll der Einzelauftrag wircklich gelöscht werden?
            </p>
            <div className="orders-preview__popup-message-div--button-div">
              <button
                onClick={closeDeleteSingleOrderMessagePopUp}
                className="orders-preview__popup-message-div--button-div--close-button"
              >
                abbrechen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="orders-preview__popup-message-div--button-div--close-button--close-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <button
                onClick={() => {
                  deleteSingleOrder(orderValueAdministration.selectedOrderId);
                }}
                className="orders-preview__popup-message-div--button-div--delete-button"
              >
                löschen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="orders-preview__popup-message-div--button-div--delete-button--delete-icon"
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
          <div className="orders-preview__single-order-div">
            <button
              onClick={closeSingleOrderPreview}
              className="orders-preview__single-order-div--close-button"
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="orders-preview__single-order-div--close-button--close-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>

            <table className="orders-preview__single-order-div--table">
              <tr>
                {" "}
                <th className="orders-preview__single-order-div--table--tr--th">
                  Auftragsnummer
                </th>
                <td className="orders-preview__single-order-div--table--tr--td">
                  {ordersStorageArray[0].id}
                </td>
              </tr>
              <tr>
                <th className="orders-preview__single-order-div--table--tr--th">
                  Auftraggeber
                </th>
                <td className="orders-preview__single-order-div--table--tr--td">
                  {client}
                </td>
              </tr>

              <tr>
                <th className="orders-preview__single-order-div--table--tr--th">
                  Mitarbeiter
                </th>
                <td className="orders-preview__single-order-div--table--tr--td">
                  {employee}
                </td>
              </tr>

              <tr>
                <th className="orders-preview__single-order-div--table--tr--th">
                  Gewerblich
                </th>
                <td className="orders-preview__single-order-div--table--tr--td">
                  {ordersStorageArray[0].business ? "Ja" : "Nein"}
                </td>
              </tr>
              <tr>
                <th className="orders-preview__single-order-div--table--tr--th">
                  Dienstleistung
                </th>
                <td className="orders-preview__single-order-div--table--tr--td">
                  {ordersStorageArray[0].service}
                </td>
              </tr>

              <tr>
                <th className="orders-preview__single-order-div--table--tr--th">
                  Dienstleistungswert
                </th>
                <td className="orders-preview__single-order-div--table--tr--td">
                  {ordersStorageArray[0].serviceValue} €
                </td>
              </tr>

              <tr>
                <th className="orders-preview__single-order-div--table--tr--th">
                  Bestellmenge
                </th>
                <td className="orders-preview__single-order-div--table--tr--td">
                  {ordersStorageArray[0].quantity}x
                </td>
              </tr>

              <tr>
                <th className="orders-preview__single-order-div--table--tr--th">
                  Gesamtbetrag
                </th>
                <td className="orders-preview__single-order-div--table--tr--td">
                  {ordersStorageArray[0].quantity *
                    ordersStorageArray[0].serviceValue}{" "}
                  €
                </td>
              </tr>

              <tr>
                <th className="orders-preview__single-order-div--table--tr--th">
                  Zahlungsart
                </th>
                <td className="orders-preview__single-order-div--table--tr--td">
                  {ordersStorageArray[0].paymentMethod}
                </td>
              </tr>

              <tr>
                <th className="orders-preview__single-order-div--table--tr--th">
                  Rechnungsstatus
                </th>
                <td
                  className={`orders-preview__single-order-div--table--tr--td
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
                  {ordersStorageArray[0].paymentStatus}
                </td>
              </tr>

              <tr>
                <th className="orders-preview__single-order-div--table--tr--th">
                  Bestelldatum
                </th>
                <td className="orders-preview__single-order-div--table--tr--td">
                  {time}
                </td>
              </tr>

              <tr>
                <th className="orders-preview__single-order-div--table--tr--th">
                  Bemerkung
                </th>
                <td className="orders-preview__single-order-div--table--tr--td">
                  {ordersStorageArray[0].note}
                </td>
              </tr>

              <tr>
                <th className="orders-preview__single-order-div--table--tr--th">
                  Aktionen
                </th>
                <td className="orders-preview__single-order-div--table--tr--td">
                  <MenuComponent
                    buttons={
                      <div className="orders-preview__single-order-div--table--tr--td--button-div">
                        <button
                          onClick={() => {
                            updateSingleOrder(ordersStorageArray[0].id);
                          }}
                          className="orders-preview__single-order-div--table--tr--td--button-div--edit-button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="orders-preview__single-order-div--table--tr--td--button-div--edit-button--edit-icon"
                          >
                            <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                          </svg>
                        </button>{" "}
                        <button
                          onClick={() => {
                            openDeleteSingleOrderMessagePopUp(
                              ordersStorageArray[0].id
                            );
                          }}
                          className="orders-preview__single-order-div--table--tr--td--button-div--delete-button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="orders-preview__single-order-div--table--tr--td--button-div--delete-button--delete-icon"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>{" "}
                      </div>
                    }
                  />
                </td>
              </tr>
            </table>
          </div>
        </PopUpComponent>
      )}

      <table className="orders-preview__table">
        <tr className="orders-preview__table--tr">
          <th className="orders-preview__table--tr--th">Dienstleistung</th>
          <th className="orders-preview__table--tr--th">Gesamtwert</th>
          <th className="orders-preview__table--tr--th">Rechnungstatus</th>
          <th className="orders-preview__table--tr--th">Aktionen</th>
        </tr>
        {ordersStorageArray.map((order) => {
          return (
            <tr className="orders-preview__table--tr">
              <td className="orders-preview__table--tr--td--service">
                {order.service}
              </td>
              <td className="orders-preview__table--tr--td--service-total-sum">
                {order.quantity * order.serviceValue} €
              </td>
              <td
                className={` orders-preview__table--tr--td--payment-status
                  ${
                    order.paymentStatus === "Bezahlt"
                      ? "payment-check-green"
                      : order.paymentStatus === "Ratenzahlung"
                      ? "payment-check-yellow"
                      : "payment-check-red"
                  }
                `}
              >
                {order.paymentStatus}
              </td>

              <td className="orders-preview__table--tr--td">
                <MenuComponent
                  buttons={
                    <div className="orders-preview__table--tr--td--button-div">
                      {" "}
                      <button
                        onClick={() => {
                          openSingleOrderPreview(order.id);
                        }}
                        className="orders-preview__table--tr--td--button-div--detail-button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="orders-preview__table--tr--td--button-div--detail-button--detail-icon"
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
                        className="orders-preview__table--tr--td--button-div--edit-button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="orders-preview__table--tr--td--button-div--edit-button--edit-icon"
                        >
                          <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          openDeleteOrderMessagePopUp(order.id);
                        }}
                        className="orders-preview__table--tr--td--button-div--delete-button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="orders-preview__table--tr--td--button-div--delete-button--delete-icon"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  }
                />
              </td>
            </tr>
          );
        })}
      </table>
    </div>

    /* {" "}
                      
                   
    
    */
  );
}
