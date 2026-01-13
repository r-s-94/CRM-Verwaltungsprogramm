import { useContext, useRef, useState } from "react";
import { ClientPopUpDatatype, clientsContext } from "../../clientContext";
import { supabase } from "../../supabase";
import "../../index.scss";
import "./clientPreviewComponent.scss";
//import MenuComponent from "../../menuComponent";
import PopUpComponent from "../../PopUpComponent";
import ToolTip from "../../ToolTip";
import Toasty from "../../toasty";
import { toastyContent } from "../../toastyContext";
import { popUpWidthHeightContent } from "../../popUpPaddingContent";

export default function ClientPreviewComponent({
  setNewClientForm,
  showClientsUpdate,
  setUpdateClientForm,
  setFailInMail,
}: {
  setNewClientForm: (value: boolean) => void;
  showClientsUpdate: () => void;
  setUpdateClientForm: (value: boolean) => void;
  setFailInMail: (failInMail: number) => void;
}) {
  const {
    clientsStorageArray,
    setClientsStorageArray,
    clientValueAdministration,
    setClientValueAdministration,
  } = useContext(clientsContext);
  const { toastyObject, setToastyObject, autoHiddenToasty } =
    useContext(toastyContent);
  const { popUpWidthHeightObject, setPopUpWidthHeightObject } = useContext(
    popUpWidthHeightContent
  );
  const [currentClientObject, setCurrentClientObject] =
    useState<ClientPopUpDatatype>({
      selectedClientId: 0,
      salutation: "",
      firstName: "",
      lastName: "",
      age: "",
      mail: "",
      street: "",
      streetNumber: "",
      PLZ: "",
      city: "",
      handy: "",
      note: "",
    });
  const [singleClientPopUp, setSingleClientPopUp] = useState<boolean>(false);
  const [deleteClientPopUp, setDeleteClientPopUp] = useState<boolean>(false);
  const [toolTipResponsibility, setToolTipResponsibility] =
    useState<string>("");
  const [toolTipArea, setToolTipArea] = useState<string>("");
  const [toolTipClientId, setToolTipClientId] = useState<number>(0);
  const [toolTipMessage, setToolTipMessage] = useState<string>("");
  const [toolTipPaddingTopBottom, setToolTipPaddingTopBottom] =
    useState<number>(0);
  const [toolTipPaddingLeftRight, setToolTipPaddingLeftRight] =
    useState<number>(0);
  const [toolTippDirection, setToolTipDirection] = useState<string>("");
  const timeRef = useRef(0);

  function calculateClientAge(age: string) {
    const userDate = new Date(age).getTime();
    //console.log(userDate);

    const currentDate = new Date().toDateString();
    //console.log(currentDate);
    //const year = currentDate.getFullYear();
    //const month = currentDate.getMonth() + 1;
    //const day = currentDate.getDate();
    /*const mergenDate =
      String(year) +
      "-" +
      String(month < 10 ? "0" + month : month) +
      "-" +
      String(day < 10 ? "0" + day : day);

    console.log(mergenDate);*/
    //const milli = currentDate.getTime();
    //console.log(milli);

    const currentDate2 = new Date(currentDate).getTime();
    //console.log(currentDate2);

    const ageResult = Math.floor(
      (currentDate2 - userDate) / 365 / 24 / 60 / 60 / 1000
    );

    //console.log(ageResult);

    return ageResult;
  }

  function showUpdateClientForm(id: number) {
    console.log(id);
    setClientValueAdministration({
      ...clientValueAdministration,
      selectedClientId: id,
    });

    setUpdateClientForm(true);
  }

  function toolTipPrepare(
    overview: string,
    responsible: string,
    employeeId: number,
    message: string,
    direction: string
  ) {
    console.log(message);

    if (overview === "client-general-overview") {
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
        showGeneralToolTip(employeeId, overview);
      }, 1500);
    } else {
      if (overview === "client-single-overview") {
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
      }

      timeRef.current = window.setTimeout(() => {
        showSingleToolTip(employeeId, overview);
      }, 1500);
    }
  }

  function showGeneralToolTip(employeeId: number, overview: string) {
    setToolTipClientId(employeeId);
    setToolTipArea(overview);
  }

  function showSingleToolTip(employeeId: number, overview: string) {
    setToolTipClientId(employeeId);
    setToolTipArea(overview);
  }

  function hiddenToolTip() {
    setToolTipClientId(0);
    setToolTipPaddingTopBottom(0);
    setToolTipPaddingLeftRight(0);
    setToolTipMessage("");
    clearTimeout(timeRef.current);
    setToolTipDirection("");
  }

  function openSingleClientPreview(id: number) {
    console.log(id);

    const findCurrenClient = clientsStorageArray.find((client) => {
      return client.id === id;
    });
    console.log(findCurrenClient);

    if (findCurrenClient) {
      setCurrentClientObject({
        ...currentClientObject,
        selectedClientId: findCurrenClient.id,
        salutation: findCurrenClient.salutation,
        firstName: findCurrenClient.first_name,
        lastName: findCurrenClient.last_name,
        age: findCurrenClient.age,
        mail: findCurrenClient.mail,
        street: findCurrenClient.street,
        streetNumber: findCurrenClient.street_number,
        PLZ: findCurrenClient.PLZ,
        city: findCurrenClient.city,
        handy: findCurrenClient.handy,
      });

      //showClientDetails(id);
    }

    setClientValueAdministration({
      ...clientValueAdministration,
      selectedClientId: id,
    });
    setSingleClientPopUp(true);
  }

  async function closeSingleClientPreview() {
    const { data } = await supabase.from("Clients").select().order("id");

    if (data) {
      setClientsStorageArray(data);
    }

    setCurrentClientObject({
      ...currentClientObject,
      selectedClientId: 0,
      salutation: "",
      firstName: "",
      lastName: "",
      age: "",
      mail: "",
      street: "",
      streetNumber: "",
      PLZ: "",
      city: "",
      handy: "",
    });
    setSingleClientPopUp(false);
    resetClient();
    setToastyObject({
      ...toastyObject,
      area: "",
      message: "",
      status: 0,
      z_index: 0,
    });
  }

  function openDeleteClientPopUp(id: number) {
    setClientValueAdministration({
      ...clientValueAdministration,
      selectedClientId: id,
    });

    setDeleteClientPopUp(true);
  }

  async function deleteClient(id: number) {
    console.log(id);
    const { error } = await supabase.from("Clients").delete().eq("id", id);

    if (error?.code !== "42703") {
      setDeleteClientPopUp(false);

      showClientsUpdate();

      setToastyObject({
        ...toastyObject,
        area: "client",
        message: "Auftraggeber wurde erfolgreich entfernt.",
        status: 1,
        z_index: 0,
      });
      autoHiddenToasty();
    } else {
      setToastyObject({
        ...toastyObject,
        area: "client",
        message: "Auftraggeber entfernen fehlgeschlagen.",
        status: -1,
        z_index: 1,
      });
      autoHiddenToasty();
    }
  }

  function closeshowDeleteClientPopUp() {
    setDeleteClientPopUp(false);
  }

  function resetClient() {
    setClientValueAdministration({
      ...clientValueAdministration,
      selectedClientId: 0,
      salutation: "",
      firstName: "",
      lastName: "",
      age: "",
      mail: "",
      street: "",
      streetNumber: "",
      PLZ: "",
      city: "",
      handy: "",
    });
  }

  /*     <div className="clients-preview">
           <div className="client__popup-main-window">
            <div className="client__popup-main-window--popup-message-window">
            </div>
  
    </div>
          </div>
  */

  return (
    <div className="clients-preview">
      {deleteClientPopUp && (
        <PopUpComponent>
          {" "}
          <div className="clients-preview__question-div">
            <svg
              onClick={closeshowDeleteClientPopUp}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="employees-preview__close-icon hover"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>

            <p className="clients-preview__text">
              Soll dieser Auftraggeber wirklich entfernt werden?
            </p>

            <div className="clients-preview__dialog-button-div center-content">
              <button
                onClick={closeshowDeleteClientPopUp}
                className="clients-preview__cancel-button button"
              >
                abbrechen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="clients-preview__cancel-icon"
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
                  deleteClient(clientValueAdministration.selectedClientId);
                }}
                className="clients-preview__delete-client-button button delete-button"
              >
                {" "}
                löschen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="clients-preview__delete-client-icon"
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
      )}{" "}
      {singleClientPopUp && (
        <PopUpComponent>
          <div className="clients-preview__single-client-div ">
            {" "}
            <svg
              onClick={closeSingleClientPreview}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="clients-preview__close-icon hover"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            <div className="clients-preview__single-table-div center-content">
              <div className="clients-preview__single-headline-div">
                <p className="clients-preview__single-client-headline clients-preview__single">
                  Id
                </p>{" "}
                <p className="clients-preview__single-client-headline clients-preview__single">
                  Anrede
                </p>
                <p className="clients-preview__single-client-headline clients-preview__single">
                  Vor-/nachname
                </p>
                <p className="clients-preview__single-client-headline clients-preview__single">
                  Alter
                </p>
                <p className="clients-preview__single-client-headline clients-preview__single">
                  Straße/Nummber
                </p>{" "}
                <p className="clients-preview__single-client-headline clients-preview__single">
                  PLZ
                </p>
                <p className="clients-preview__single-client-headline clients-preview__single">
                  Ort/Stadt
                </p>
                <p className="clients-preview__single-client-headline clients-preview__single">
                  E-Mail
                </p>
                <p className="clients-preview__single-client-headline clients-preview__single">
                  Handy
                </p>
                <p className="clients-preview__single-client-headline clients-preview__single">
                  Bemerkung
                </p>
              </div>
              <div className="clients-preview__single-info-div">
                <div className="clients-preview__single-client-info clients-preview__single-client-id-info number">
                  {currentClientObject.selectedClientId}{" "}
                </div>
                <div className="clients-preview__single-client-info clients-preview__single-client-salutation-info">
                  {currentClientObject.salutation}{" "}
                </div>{" "}
                <div className="clients-preview__single-client-info clients-preview__single-client-name-info">
                  {currentClientObject.firstName} {currentClientObject.lastName}
                </div>{" "}
                <div className="clients-preview__single-client-info clients-preview__single-client-age-info number">
                  <span>
                    {new Date(currentClientObject.age).toLocaleDateString(
                      "de-DE",
                      { dateStyle: "medium" }
                    )}
                  </span>
                  <span>{calculateClientAge(currentClientObject.age)}</span>
                </div>{" "}
                <div className="clients-preview__single-client-info clients-preview__single-client-street-info">
                  {currentClientObject.street}{" "}
                  {currentClientObject.streetNumber}
                </div>
                <div className="clients-preview__single-client-info clients-preview__single-client-PLZ-info number">
                  {currentClientObject.PLZ}
                </div>
                <div className="clients-preview__single-client-info clients-preview__single-client-city-info">
                  {currentClientObject.city}
                </div>{" "}
                <div className="clients-preview__single-client-info clients-preview__single-client-mail-info">
                  {currentClientObject.mail}
                </div>{" "}
                <div className="clients-preview__single-client-info clients-preview__single-client-handy-info number">
                  {currentClientObject.handy}
                </div>{" "}
                <div
                  style={{
                    padding: currentClientObject.note === "" ? "" : "0",
                  }}
                  className="clients-preview__single-client-info clients-preview__single-client-note-info"
                >
                  {currentClientObject.note}
                </div>
              </div>
            </div>
          </div>
        </PopUpComponent>
      )}
      <div className="clients-preview__table-div center-content-column">
        <button
          onClick={() => {
            setPopUpWidthHeightObject({
              ...popUpWidthHeightObject,
              width: 60,
              height: 95,
            });
            setNewClientForm(true);
          }}
          className="clients-preview__new-client-button primary-button button"
        >
          Auftrageber anlegen
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="clients-preview__new-client-icon"
          >
            <path d="M10 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM16.25 5.75a.75.75 0 0 0-1.5 0v2h-2a.75.75 0 0 0 0 1.5h2v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2Z" />
          </svg>
        </button>

        <div className="clients-preview__headline-div center-content">
          <h2 className="clients-preview__headline clients-preview__name">
            Name
          </h2>
          <h2 className="clients-preview__headline clients-preview__age">
            Alter
          </h2>
          <h2 className="clients-preview__headline clients-preview__address">
            Adresse
          </h2>
          <h2 className="clients-preview__headline clients-preview__mail">
            E-Mail
          </h2>
          <h2 className="clients-preview__headline clients-preview__options">
            Aktionen
          </h2>
        </div>

        <div className="clients-preview__clients-preview-div">
          {clientsStorageArray.map((client) => {
            return (
              <div className="clients-preview__client-info-div">
                <div className="clients-preview__client-info clients-preview__name-info">
                  {client.salutation} {client.first_name} {client.last_name}
                </div>

                <div className="clients-preview__client-info clients-preview__age-info">
                  {calculateClientAge(client.age)}
                </div>
                <div className="clients-preview__client-info clients-preview__address-info">
                  <p>
                    {client.street}
                    {client.street_number}
                  </p>
                  <p>{client.PLZ}</p>
                  <p>{client.city}</p>
                </div>
                <div className="clients-preview__client-info clients-preview__mail-info">
                  {client.mail}
                </div>
                <div className="clients-preview__client-info clients-preview__options-div center-content">
                  <button
                    onClick={() => {
                      setPopUpWidthHeightObject({
                        ...popUpWidthHeightObject,
                        width: 50,
                        height: 75,
                      });
                      openSingleClientPreview(client.id);
                    }}
                    className="clients-preview__detail-button button"
                  >
                    <div className="clients-preview__action-order-tool-tip-div">
                      {toolTipArea === "client-general-overview" &&
                        toolTipResponsibility === "detail-note" &&
                        toolTipClientId === client.id && (
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
                            "client-general-overview",
                            "detail-note",
                            client.id,
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
                        className="clients-preview__detail-icon"
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
                        height: 87,
                      });
                      setFailInMail(1);
                      showUpdateClientForm(client.id);
                    }}
                    className="clients-preview__edit-button button"
                  >
                    <div className="clients-preview__action-order-tool-tip-div">
                      {toolTipArea === "client-general-overview" &&
                        toolTipResponsibility === "edit-note" &&
                        toolTipClientId === client.id && (
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
                            "client-general-overview",
                            "edit-note",
                            client.id,
                            "Auftraggeber bearbeiten",
                            "left"
                          );
                        }}
                        onMouseLeave={hiddenToolTip}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="clients-preview__edit-icon"
                      >
                        <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                      </svg>
                    </div>
                  </button>{" "}
                  <button
                    onClick={() => {
                      openDeleteClientPopUp(client.id);
                    }}
                    className="clients-preview__delete-button button"
                  >
                    <div className="clients-preview__action-order-tool-tip-div">
                      {" "}
                      {toolTipArea === "client-general-overview" &&
                        toolTipResponsibility === "delete-note" &&
                        toolTipClientId === client.id && (
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
                            "client-general-overview",
                            "delete-note",
                            client.id,
                            "Auftraggeber entfernen",
                            "left"
                          );
                        }}
                        onMouseLeave={hiddenToolTip}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="clients-preview__delete-icon"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>{" "}
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

    /*   <p className="clients-preview__single-client-headline clients-preview__single">
                  Aktionen
                </p>
                
                <div className="clients-preview__single-client-info clients-preview__single-client-options-div center-content">
                  <div className="clients-preview__single-client-button-div center-content">
                    <div className="client-preview__single-action-order-tool-tip-div">
                      {toolTipArea === "client-single-overview" &&
                        toolTipResponsibility === "edit-note" &&
                        toolTipClientId ===
                          currentClientObject.selectedClientId && (
                          <ToolTip
                            toolTippDirection={toolTippDirection}
                            toolTipMessageWidth={toolTipMessageWidth}
                            toolTipMessageHeight={toolTipMessageHeight}
                          >
                            {toolTipMessage}
                          </ToolTip>
                        )}
                      <svg
                        onClick={() => {
                          updateSingleClient(
                            currentClientObject.selectedClientId
                          );
                        }}
                        onMouseEnter={() => {
                          toolTipPrepare(
                            "client-single-overview",
                            "edit-note",
                            currentClientObject.selectedClientId,
                            "Auftrag bearbeiten",
                            "right"
                          );
                        }}
                        onMouseLeave={hiddenToolTip}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="clients-preview__edit-icon hover"
                      >
                        <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                      </svg>
                    </div>

                    <div className="clients-preview__single-action-client-tool-tip-div">
                      {toolTipArea === "client-single-overview" &&
                        toolTipResponsibility === "delete-note" &&
                        toolTipClientId ===
                          currentClientObject.selectedClientId && (
                          <ToolTip
                            toolTippDirection={toolTippDirection}
                            toolTipMessageWidth={toolTipMessageWidth}
                            toolTipMessageHeight={toolTipMessageHeight}
                          >
                            {toolTipMessage}
                          </ToolTip>
                        )}
                      <svg
                        onClick={() => {
                          openDeleteSingleClientPopUp(
                            currentClientObject.selectedClientId
                          );
                        }}
                        onMouseEnter={() => {
                          toolTipPrepare(
                            "client-single-overview",
                            "delete-note",
                            currentClientObject.selectedClientId,
                            "Auftrag entfernen",
                            "right"
                          );
                        }}
                        onMouseLeave={hiddenToolTip}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="clients-preview__delete-icon hover"
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
    
    {" "} <MenuComponent
                    buttons={
                     
                    }
                  />
     */
  );
}
