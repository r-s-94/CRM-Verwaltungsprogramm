import { useContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import "../../index.scss";
import "./updateClientComponent.scss";
import { clientsContext } from "../../clientContext";
import PopUpComponent from "../../PopUpComponent";
import "../../PopUpComponent.scss";
import { toastyContent } from "../../toastyContext";
import { popUpWidthHeightContent } from "../../popUpPaddingContent";

export default function UpdateClientComponent({
  showDataUpdate,
  updateClientForm,
  setUpdateClientForm,
  failInMail,
  setFailInMail,
}: {
  showDataUpdate: () => void;
  updateClientForm: boolean;
  setUpdateClientForm: (value: boolean) => void;
  failInMail: number;
  setFailInMail: (failInMail: number) => void;
}) {
  const [correctClientId, setCorrectClientId] = useState<number>(0);
  const {
    clientsStorageArray,
    clientValueAdministration,
    setClientValueAdministration,
  } = useContext(clientsContext);
  const { toastyObject, setToastyObject, autoHiddenToasty } =
    useContext(toastyContent);
  const { popUpWidthHeightObject, setPopUpWidthHeightObject } = useContext(
    popUpWidthHeightContent
  );

  useEffect(() => {
    showClient();
  }, [clientValueAdministration.selectedClientId]);

  function showClient() {
    console.log(clientsStorageArray);
    const selectedClient = clientsStorageArray.find((client) => {
      return client.id === clientValueAdministration.selectedClientId;
    });

    console.log(selectedClient);

    if (selectedClient) {
      setClientValueAdministration({
        ...clientValueAdministration,
        salutation: selectedClient.salutation,
        firstName: selectedClient.first_name,
        lastName: selectedClient.last_name,
        street: selectedClient.street,
        streetNumber: selectedClient.street_number,
        PLZ: selectedClient.PLZ,
        city: selectedClient.city,
        mail: selectedClient.mail,
        handy: selectedClient.handy,
        note: selectedClient.note,
      });
      setCorrectClientId(selectedClient.id);
    }
  }

  function checkMailContent() {
    const clientMail = clientValueAdministration.mail;
    if (clientMail.length > 0) {
      if (clientMail.includes("@") && !clientMail.includes(" ")) {
        setFailInMail(1);
      } else {
        setFailInMail(-1);
        setToastyObject({
          ...toastyObject,
          area: "client",
          message: "Ungültige E-Mail (@ erforderlich, kein(e) Leerzeichen(en))",
          status: -1,
          z_index: 1,
        });
        autoHiddenToasty();
      }
    }
  }

  function closeUpdateClientForm() {
    setUpdateClientForm(false);

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
      note: "",
    });
    setPopUpWidthHeightObject({
      ...popUpWidthHeightObject,
      width: 0,
      height: 0,
    });
  }

  async function updateClient() {
    const { error } = await supabase
      .from("Clients")
      .update({
        salutatio: clientValueAdministration.salutation,
        first_name: clientValueAdministration.firstName,
        last_name: clientValueAdministration.lastName,
        age: clientValueAdministration.age,
        street: clientValueAdministration.street,
        street_number: clientValueAdministration.streetNumber,
        PLZ: clientValueAdministration.PLZ,
        city: clientValueAdministration.city,
        mail: clientValueAdministration.mail,
        handy: clientValueAdministration.handy,
        note: clientValueAdministration.note,
      })
      .eq("id", correctClientId);

    if (error?.code !== "PGRST204") {
      showDataUpdate();

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
        note: "",
      });
      setCorrectClientId(0);
      setPopUpWidthHeightObject({
        ...popUpWidthHeightObject,
        width: 0,
        height: 0,
      });
      setUpdateClientForm(false);

      setToastyObject({
        ...toastyObject,
        area: "client",
        message: "Auftraggeber wurde erfolgreich bearbeitet.",
        status: 1,
        z_index: 0,
      });
      autoHiddenToasty();
    } else {
      setToastyObject({
        ...toastyObject,
        area: "client",
        message: "Auftraggeber bearbeiten fehlgeschlagen.",
        status: 1,
        z_index: 1,
      });
      autoHiddenToasty();
    }
  }

  /* <div className="client__popup-main-window">
          <div className="client__popup-main-window--popup-message-window">
    </div>
    
    <div className="client__popup-main-window--popup-message-window">
      </div>
    </div>
  */

  return (
    <div className="update-client">
      {updateClientForm && (
        <PopUpComponent>
          <div className="update-client__form">
            {" "}
            <svg
              onClick={closeUpdateClientForm}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="update-client__close-icon hover"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            <div className="update-client__label-and-input-div">
              <div className="update-client__label-div">
                <label className="update-cient__label-salutation label">
                  Anrede:
                </label>
                <label className="update-client__label-first-name label">
                  Vorname:
                </label>
                <label className="update-client__label-last-name label">
                  Nachname:
                </label>
                <label className="update-client__label-street-number label">
                  Straße/Nummer:{" "}
                </label>{" "}
                <label className="update-client__label-PLZ label">PLZ: </label>{" "}
                <label className="update-client__label-city label">
                  Ort/Stadt:{" "}
                </label>{" "}
                <label className="update-client__label-mail label">
                  E-Mail:{" "}
                </label>
                <label className="update-client__label-handy label">
                  Handy:{" "}
                </label>
                <label className="update-client__label-remark label">
                  Bemerkung:{" "}
                </label>
              </div>
              <div className="update-client__input-div">
                <div className="update-client__input-info-div">
                  <select
                    name=""
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        salutation: event.target.value,
                      });
                    }}
                    value={clientValueAdministration.salutation}
                    className="update-client__select"
                    id=""
                  >
                    <option value="" className="update-client__option">
                      ...
                    </option>
                    <option value="Frau" className="update-client__option">
                      Frau
                    </option>
                    <option value="Herr" className="update-client__option">
                      Herr
                    </option>
                  </select>

                  <span className="new-employee__input-note">
                    * Pflichtfeld
                  </span>
                </div>

                <div className="update-client__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="update-client__first-name input"
                    value={clientValueAdministration.firstName}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        firstName: event.target.value.trimStart(),
                      });
                    }}
                  />{" "}
                  <span className="update-client__input-note">
                    * Pflichtfeld
                  </span>{" "}
                </div>

                <div className="update-client__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="update-client__last-name input"
                    value={clientValueAdministration.lastName}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        lastName: event.target.value.trimStart(),
                      });
                    }}
                  />{" "}
                  <span className="update-client__input-note">
                    * Pflichtfeld
                  </span>{" "}
                </div>

                <div className="update-client__input-info-div">
                  <div className="update-client__street-street-number-collect-div">
                    <input
                      type="text"
                      name=""
                      className="update-client__street input"
                      value={clientValueAdministration.street}
                      onChange={(event) => {
                        setClientValueAdministration({
                          ...clientValueAdministration,
                          street: event.target.value.trimStart(),
                        });
                      }}
                    />
                    <input
                      type="number"
                      name=""
                      className="update-client__adress-number input number"
                      value={clientValueAdministration.streetNumber}
                      onChange={(event) => {
                        setClientValueAdministration({
                          ...clientValueAdministration,
                          streetNumber: event.target.value.trimStart(),
                        });
                      }}
                    />{" "}
                  </div>
                  <span className="update-client__input-note">
                    * Pflichtfeld
                  </span>{" "}
                </div>

                <div className="update-client__input-info-div">
                  <input
                    type="number"
                    name=""
                    className="update-client__PLZ input number"
                    value={clientValueAdministration.PLZ}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        PLZ: event.target.value,
                      });
                    }}
                  />
                  <span className="update-client__input-note">
                    * Pflichtfeld
                  </span>{" "}
                </div>

                <div className="update-client__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="update-client__city input"
                    value={clientValueAdministration.city}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        city: event.target.value.trimStart(),
                      });
                    }}
                  />
                  <span className="update-client__input-note">
                    * Pflichtfeld
                  </span>{" "}
                </div>

                <div className="update-client__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="update-client__mail input"
                    value={clientValueAdministration.mail}
                    onChange={(event) => {
                      setFailInMail(0);
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        mail: event.target.value.trimStart(),
                      });
                    }}
                    onBlur={checkMailContent}
                  />{" "}
                  <span className="update-client__input-note">
                    * Pflichtfeld
                  </span>{" "}
                </div>

                <div className="update-client__input-info-div">
                  <input
                    type="tel"
                    name=""
                    className="update-client__handy input number"
                    value={clientValueAdministration.handy}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        handy: event.target.value,
                      });
                    }}
                  />
                  <span className="update-client__input-note">
                    * Pflichtfeld
                  </span>{" "}
                </div>

                <div className="new-client__input-info-div">
                  <textarea
                    name=""
                    className="new-client__remark"
                    value={clientValueAdministration.note}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        note: event.target.value,
                      });
                    }}
                    id=""
                  ></textarea>{" "}
                </div>
              </div>
            </div>
            <div className="update-client__button-div center-content">
              <button
                onClick={closeUpdateClientForm}
                className="update-client__cancel-button button"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="new-client__cancel-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
                abbrechen
              </button>{" "}
              <button
                onClick={updateClient}
                disabled={
                  clientValueAdministration.salutation !== "" &&
                  clientValueAdministration.firstName.length > 0 &&
                  clientValueAdministration.lastName.length > 0 &&
                  clientValueAdministration.street.length > 0 &&
                  Number(clientValueAdministration.streetNumber) !== 0 &&
                  clientValueAdministration.PLZ.length > 4 &&
                  clientValueAdministration.city.length > 0 &&
                  clientValueAdministration.mail.length > 0 &&
                  failInMail === 1 &&
                  Number(clientValueAdministration.handy) !== 0
                    ? false
                    : true
                }
                className={`update-client__edit-client-button button ${
                  clientValueAdministration.salutation !== "" &&
                  clientValueAdministration.firstName.length > 0 &&
                  clientValueAdministration.lastName.length > 0 &&
                  clientValueAdministration.street.length > 0 &&
                  Number(clientValueAdministration.streetNumber) !== 0 &&
                  clientValueAdministration.PLZ.length > 4 &&
                  clientValueAdministration.city.length > 0 &&
                  clientValueAdministration.mail.length > 0 &&
                  failInMail === 1 &&
                  Number(clientValueAdministration.handy) !== 0
                    ? "primary-button"
                    : "disbled-button"
                }`}
              >
                Auftraggeber bearbeiten
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="update-client__edit-client-icon"
                >
                  <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                </svg>
              </button>
            </div>
          </div>
        </PopUpComponent>
      )}
    </div>
  );
  /*  <label className="update-clinet__label label">Alter:</label>
  
  <div className="update-client__input-info-div">
    <p className="update-client__age number">
      {calculateClientAge(clientValueAdministration.age)}
    </p>
  </div>
  
  */
}
