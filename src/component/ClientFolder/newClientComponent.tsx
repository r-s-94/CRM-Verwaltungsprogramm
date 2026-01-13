import { useContext, useState } from "react";
import "../../index.scss";
import "./newClientComponent.scss";
import { supabase } from "../../supabase";
import { clientsContext } from "../../clientContext";
import PopUpComponent from "../../PopUpComponent";
import "../../PopUpComponent.scss";
import { toastyContent } from "../../toastyContext";
import { popUpWidthHeightContent } from "../../popUpPaddingContent";

export default function NewClientComponent({
  showDataUpdate,
  newClientForm,
  setNewClientForm,
  failInMail,
  setFailInMail,
}: {
  showDataUpdate: () => void;
  newClientForm: boolean;
  setNewClientForm: (value: boolean) => void;
  failInMail: number;
  setFailInMail: (failInMail: number) => void;
}) {
  /*  
 
  */

  const [clientAgeVerification, setClientAgeVerification] = useState<number>(0);
  const { clientValueAdministration, setClientValueAdministration } =
    useContext(clientsContext);
  const { toastyObject, setToastyObject, autoHiddenToasty } =
    useContext(toastyContent);
  const { popUpWidthHeightObject, setPopUpWidthHeightObject } = useContext(
    popUpWidthHeightContent
  );

  function checkClientAge() {
    const age = clientValueAdministration.age;

    if (age.slice(6, 7) !== "0") {
      setClientAgeVerification(-2);
    }

    if (age.slice(6, 7) !== "0" && age.slice(7, 8) !== "0") {
      setClientAgeVerification(-2);
    }

    if (age.slice(0, 1).search("0") === -1) {
      const d = new Date(age);
      //console.log(d);
      const day = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear() + 18;
      const mergeISODate =
        String(year) +
        "-" +
        String(month < 10 ? "0" + month : month) +
        "-" +
        String(day < 10 ? "0" + day : day);

      //console.log(mergeISODate);

      const isoDateMillisecondsFuture = new Date(mergeISODate).getTime();
      //console.log(isoDateMillisecondsFuture);

      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      /*const helpDateString =
        String(currentDay) +
        "-" +
        String(currentMonth) +
        "-" +
        String(currentYear);*/
      //console.log(helpDateString);
      const helpISODateString =
        String(currentYear) +
        "-" +
        String(currentMonth) +
        "-" +
        String(currentDay);
      //console.log(helpISODateString);
      const currentMilliseonds = new Date(helpISODateString).getTime();
      //console.log(currentMilliseonds);

      /*  Altersüberprüfunganleitung
        0 = keine Anzeige
        1 = Auftraggeber über 18
       -1 = Auftraggeber unter 18 Meldung
       -2 = Geburstsdatum unvollständig
    
       */

      if (isoDateMillisecondsFuture <= currentMilliseonds) {
        setClientAgeVerification(1);
        setClientValueAdministration({
          ...clientValueAdministration,
          age: age,
        });
      } else {
        setClientAgeVerification(-1);
        setClientValueAdministration({
          ...clientValueAdministration,
          age: age,
        });
      }
    }

    if (age === "") {
      setClientValueAdministration({
        ...clientValueAdministration,
        age: age,
      });
      setClientAgeVerification(0);
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

  function closeNewClientForm() {
    setNewClientForm(false);

    setClientValueAdministration({
      ...clientValueAdministration,
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

    setClientAgeVerification(0);
  }

  async function addClientToTable() {
    const { error } = await supabase.from("Clients").insert({
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
    });

    if (error?.code !== "PGRST204") {
      showDataUpdate();

      setNewClientForm(false);

      setClientValueAdministration({
        ...clientValueAdministration,
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

      setToastyObject({
        ...toastyObject,
        area: "client",
        message: "Auftraggeber wurde erfolgreich angelegt.",
        status: 1,
        z_index: 0,
      });
      autoHiddenToasty();
    } else {
      setToastyObject({
        ...toastyObject,
        area: "client",
        message: "Auftraggeber angelegen fehlgeschlagen.",
        status: -1,
        z_index: 1,
      });
      autoHiddenToasty();
    }
  }

  /*
   */

  return (
    <div className="new-client">
      {newClientForm && (
        <PopUpComponent>
          <div className="new-client__form">
            <svg
              onClick={closeNewClientForm}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="new-client__close-icon hover"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>

            <div className="new-client__label-and-input-div">
              <div className="new-client__label-div">
                {" "}
                <label className="new-client__label-salutation label">
                  Anrede:
                </label>
                <label className="new-client__label-first-name label">
                  Vorname:{" "}
                </label>{" "}
                <label className="new-client__label-last-name label">
                  Nachname:{" "}
                </label>{" "}
                <label className="new-client__label-birthday label">
                  Geburtsdatum:
                </label>{" "}
                <label className="new-client__label-street-number label">
                  Str./Hausnr.:{" "}
                </label>{" "}
                <label className="new-client__label-PLZ label">PLZ: </label>{" "}
                <label className="new-client__label-city label">
                  Ort/Stadt:{" "}
                </label>{" "}
                <label className="new-client__label-mail label">E-Mail: </label>{" "}
                <label className="new-client__label-handy label">Handy: </label>
                <label className="new-client__label-remark label">
                  Bemerkung:{" "}
                </label>
              </div>
              <div className="new-client__input-div">
                <div className="new-client__input-info-div">
                  <select
                    name=""
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        salutation: event.target.value,
                      });
                    }}
                    className="new-client__select"
                    id=""
                  >
                    <option value="" className="new-client__option">
                      ...
                    </option>
                    <option value="Frau" className="new-client__option">
                      Frau
                    </option>
                    <option value="Herr" className="new-client__option">
                      Herr
                    </option>
                  </select>

                  <span className="new-employee__input-note">
                    * Pflichtfeld
                  </span>
                </div>

                <div className="new-client__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="new-client__first-name input"
                    value={clientValueAdministration.firstName}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        firstName: event.target.value.trimStart(),
                      });
                    }}
                  />{" "}
                  <span className="new-client__input-note">* Pflichtfeld</span>
                </div>
                <div className="new-client__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="new-client__last-name input"
                    value={clientValueAdministration.lastName}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        lastName: event.target.value.trimStart(),
                      });
                    }}
                  />{" "}
                  <span className="new-client__input-note">* Pflichtfeld</span>
                </div>
                <div className="new-client__input-info-div">
                  <div className="new-client__client-age-verification-div">
                    <input
                      type="date"
                      name=""
                      id=""
                      className="new-client__age input number"
                      value={clientValueAdministration.age}
                      onChange={(event) => {
                        setClientValueAdministration({
                          ...clientValueAdministration,
                          age: event.target.value,
                        });
                      }}
                      onBlur={checkClientAge}
                    />{" "}
                    <p
                      className={`new-client__age-inline ${
                        clientAgeVerification === 1
                          ? "new-client__age-over"
                          : clientAgeVerification === -1
                          ? "new-client__age-under"
                          : clientAgeVerification === -2
                          ? "new-client__date-incomplete"
                          : ""
                      } center-content`}
                    >
                      {clientAgeVerification === 1 && "Sie sind über 18"}
                      {clientAgeVerification === -1 && "Sie sind unter 18"}
                      {clientAgeVerification === 0 && ""}
                      {clientAgeVerification === -2 &&
                        "Geburtsdatum unvollständig"}
                    </p>{" "}
                  </div>
                  <span className="new-client__input-note">
                    * Pflichtfeld mind. 18 Jahre
                  </span>{" "}
                </div>

                <div className="new-client__input-info-div">
                  <div className="new-client__street-street-number-collect-div">
                    {" "}
                    <input
                      type="text"
                      name=""
                      className="new-client__street input"
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
                      className="new-client__adress-number input number"
                      value={clientValueAdministration.streetNumber}
                      onChange={(event) => {
                        setClientValueAdministration({
                          ...clientValueAdministration,
                          streetNumber: event.target.value.trimStart(),
                        });
                      }}
                    />{" "}
                  </div>
                  <span className="new-client__input-note">* Pflichtfeld</span>{" "}
                </div>

                <div className="new-client__input-info-div">
                  <input
                    type="number"
                    name=""
                    className="new-client__PLZ input number"
                    value={clientValueAdministration.PLZ}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        PLZ: event.target.value,
                      });
                    }}
                  />
                  <span className="new-client__input-note">* Pflichtfeld</span>{" "}
                </div>

                <div className="new-client__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="new-client__city input"
                    value={clientValueAdministration.city}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        city: event.target.value.trimStart(),
                      });
                    }}
                  />
                  <span className="new-client__input-note">* Pflichtfeld</span>{" "}
                </div>

                <div className="new-client__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="new-client__mail input"
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
                  <span className="new-client__input-note">* Pflichtfeld</span>
                </div>
                <div className="new-client__input-info-div">
                  <input
                    type="tel"
                    name=""
                    className="new-client__handy input number"
                    value={clientValueAdministration.handy}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        handy: event.target.value,
                      });
                    }}
                  />
                  <span className="new-client__input-note">* Pflichtfeld</span>{" "}
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

            <div className="new-client__button-div center-content">
              <button
                onClick={closeNewClientForm}
                className="new-client__cancel-button button"
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
                onClick={addClientToTable}
                disabled={
                  clientValueAdministration.firstName.length > 0 &&
                  clientValueAdministration.lastName.length > 0 &&
                  clientAgeVerification === 1 &&
                  clientValueAdministration.street.length > 0 &&
                  Number(clientValueAdministration.streetNumber) !== 0 &&
                  Number(clientValueAdministration.PLZ) !== 0 &&
                  clientValueAdministration.city.length > 0 &&
                  clientValueAdministration.mail.length > 0 &&
                  failInMail === 1 &&
                  clientValueAdministration.handy.length > 10
                    ? false
                    : true
                }
                className={`new-client__new-client-button button ${
                  clientValueAdministration.firstName.length > 0 &&
                  clientValueAdministration.lastName.length > 0 &&
                  clientAgeVerification === 1 &&
                  clientValueAdministration.street.length > 0 &&
                  Number(clientValueAdministration.streetNumber) !== 0 &&
                  Number(clientValueAdministration.PLZ) !== 0 &&
                  clientValueAdministration.city.length > 0 &&
                  clientValueAdministration.mail.length > 0 &&
                  failInMail === 1 &&
                  clientValueAdministration.handy.length > 10
                    ? "primary-button"
                    : "disbled-button"
                }`}
              >
                Mitarbeiter anlegen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="new-client__new-client-icon"
                >
                  <path d="M10 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM16.25 5.75a.75.75 0 0 0-1.5 0v2h-2a.75.75 0 0 0 0 1.5h2v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2Z" />
                </svg>
              </button>
            </div>
          </div>
        </PopUpComponent>
      )}
    </div>
  );
}

/*  <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="new-client__date-incomplete-icon"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                            />
                          </svg>
                        </span>

*/
