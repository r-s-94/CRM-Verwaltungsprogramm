import { useContext } from "react";
import "../../index.scss";
import "./newEmployeeComponent.scss";
import { supabase } from "../../supabase";
import { employeesContext } from "../../employeesContext";
import PopUpComponent from "../../PopUpComponent";
import "../../PopUpComponent.scss";
import { toastyContent } from "../../toastyContext";
import { popUpWidthHeightContent } from "../../popUpPaddingContent";

export default function NewEmployeeComponent({
  showDataUpdate,
  newEmployeeForm,
  setNewEmployeeForm,
  failInMail,
  setFailInMail,
}: {
  showDataUpdate: () => void;
  newEmployeeForm: boolean;
  setNewEmployeeForm: (value: boolean) => void;
  failInMail: number;
  setFailInMail: (failInMail: number) => void;
}) {
  /* 
  
  */

  const { employeeValueAdministration, setEmployeeValueAdministration } =
    useContext(employeesContext);
  const { toastyObject, setToastyObject, autoHiddenToasty } =
    useContext(toastyContent);
  const { popUpWidthHeightObject, setPopUpWidthHeightObject } = useContext(
    popUpWidthHeightContent
  );

  function checkMailContent() {
    const employeeMail = employeeValueAdministration.mail;

    if (employeeMail.length > 0) {
      if (employeeMail.includes("@") && !employeeMail.includes(" ")) {
        setFailInMail(1);
      } else {
        setFailInMail(-1);
        setToastyObject({
          ...toastyObject,
          area: "employee",
          message: "Ungültige E-Mail (@ erforderlich, kein(e) Leerzeichen(en))",
          status: -1,
          z_index: 1,
        });
        autoHiddenToasty();
      }
    }
  }

  async function addEmployeeToTable() {
    const { error } = await supabase.from("Employees").insert({
      salutation: employeeValueAdministration.salutation,
      first_name: employeeValueAdministration.firstName,
      last_name: employeeValueAdministration.lastName,
      age: employeeValueAdministration.age,
      street: employeeValueAdministration.street,
      street_number: employeeValueAdministration.streetNumber,
      PLZ: employeeValueAdministration.PLZ,
      city: employeeValueAdministration.city,
      mail: employeeValueAdministration.mail,
      handy: employeeValueAdministration.handy,
      note: employeeValueAdministration.remark,
    });

    //console.log(error);

    if (error?.code !== "PGRST204") {
      setNewEmployeeForm(false);

      showDataUpdate();

      setEmployeeValueAdministration({
        ...employeeValueAdministration,
        salutation: "",
        firstName: "",
        lastName: "",
        age: "",
        street: "",
        streetNumber: "",
        PLZ: "",
        city: "",
        mail: "",
        handy: "",
        remark: "",
      });

      setPopUpWidthHeightObject({
        ...popUpWidthHeightObject,
        width: 0,
        height: 0,
      });
      setToastyObject({
        ...toastyObject,
        area: "employee",
        message: "Mitarbeiter wurde erfolgreich angelegt.",
        status: 1,
        z_index: 0,
      });
      autoHiddenToasty();
    } else {
      setToastyObject({
        ...toastyObject,
        area: "employee",
        message: "Mitarbeiter angelegen fehlgeschlagen.",
        status: -1,
        z_index: 1,
      });
      autoHiddenToasty();
    }
  }

  function closeNewEmployeeForm() {
    setEmployeeValueAdministration({
      ...employeeValueAdministration,
      salutation: "",
      firstName: "",
      lastName: "",
      age: "",
      street: "",
      streetNumber: "",
      PLZ: "",
      city: "",
      mail: "",
      handy: "",
      remark: "",
    });

    setPopUpWidthHeightObject({
      ...popUpWidthHeightObject,
      width: 0,
      height: 0,
    });

    setFailInMail(0);

    setNewEmployeeForm(false);
  }

  /* 
  
  */

  return (
    <div className="new-employee">
      {" "}
      {newEmployeeForm && (
        <PopUpComponent>
          <div className="new-employee__form">
            <svg
              onClick={closeNewEmployeeForm}
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

            <div className="new-employee__label-and-input-div">
              <div className="new-employee__label-div">
                <label className="new-employee__label-salutation label">
                  Anrede:
                </label>
                <label className="new-employee__label-first-name label">
                  Vorname:{" "}
                </label>{" "}
                <label className="new-employee__label-last-name label">
                  Nachname:{" "}
                </label>{" "}
                <label className="new-employee__label-birthday label">
                  Geburtsdatum:{" "}
                </label>{" "}
                <label className="new-employee__label-street-number label">
                  Str./Hausnr.:{" "}
                </label>{" "}
                <label className="new-employee__label-PLZ label">PLZ: </label>{" "}
                <label className="new-employee__label-city label">
                  Ort/Stadt:{" "}
                </label>{" "}
                <label className="new-employee__label-mail label">Mail: </label>{" "}
                <label className="new-employee__label-handy label">
                  Handy:{" "}
                </label>{" "}
                <label className="new-employee__label-remark label">
                  Bemerkung:{" "}
                </label>
              </div>
              <div className="new-employee__input-div">
                <div className="new-employee__input-info-div">
                  <select
                    name=""
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        salutation: event.target.value,
                      });
                    }}
                    className="new-employee__select"
                    id=""
                  >
                    <option value="" className="new-employee__option">
                      ...
                    </option>
                    <option value="Frau" className="new-employee__option">
                      Frau
                    </option>
                    <option value="Herr" className="new-employee__option">
                      Herr
                    </option>
                  </select>

                  <span className="new-employee__input-note">
                    * Pflichtfeld
                  </span>
                </div>

                <div className="new-employee__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="new-employee__first-name input"
                    value={employeeValueAdministration.firstName}
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        firstName: event.target.value.trimStart(),
                      });
                    }}
                  />{" "}
                  <span className="new-employee__input-note">
                    * Pflichtfeld
                  </span>
                </div>
                <div className="new-employee__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="new-employee__last-name input"
                    value={employeeValueAdministration.lastName}
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        lastName: event.target.value.trimStart(),
                      });
                    }}
                  />{" "}
                  <span className="new-employee__input-note">
                    * Pflichtfeld
                  </span>
                </div>
                <div className="new-employee__input-info-div">
                  <input
                    type="date"
                    name=""
                    className="new-employee__age input"
                    value={employeeValueAdministration.age}
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        age: event.target.value,
                      });
                    }}
                  />{" "}
                  <span className="new-employee__input-note">
                    * Pflichtfeld
                  </span>
                </div>

                <div className="new-employee__input-info-div">
                  <div className="new-employee__street-street-number-collect-div">
                    <input
                      type="text"
                      name=""
                      className="new-employee__street input"
                      value={employeeValueAdministration.street}
                      onChange={(event) => {
                        setEmployeeValueAdministration({
                          ...employeeValueAdministration,
                          street: event.target.value.trimStart(),
                        });
                      }}
                    />
                    <input
                      type="number"
                      name=""
                      className="new-employee__street-number input number"
                      value={employeeValueAdministration.streetNumber}
                      onChange={(event) => {
                        setEmployeeValueAdministration({
                          ...employeeValueAdministration,
                          streetNumber: event.target.value,
                        });
                      }}
                    />{" "}
                  </div>
                  <span className="new-employee__input-note">
                    {" "}
                    * Pflichtfeld
                  </span>
                </div>

                <div className="new-employee__input-info-div">
                  <input
                    type="number"
                    name=""
                    className="new-employee__PLZ input number"
                    value={employeeValueAdministration.PLZ}
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        PLZ: event.target.value,
                      });
                    }}
                  />{" "}
                  <span className="new-employee__input-note">
                    * Pflichtfeld
                  </span>
                </div>

                <div className="new-employee__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="new-employee__city input"
                    value={employeeValueAdministration.city}
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        city: event.target.value.trimStart(),
                      });
                    }}
                  />{" "}
                  <span className="new-employee__input-note">
                    * Pflichtfeld
                  </span>
                </div>

                <div className="new-employee__input-info-div">
                  <input
                    type="mail"
                    name=""
                    className="new-employee__mail input"
                    value={employeeValueAdministration.mail}
                    onChange={(event) => {
                      setFailInMail(0);

                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        mail: event.target.value.trimStart(),
                      });
                    }}
                    onBlur={checkMailContent}
                  />{" "}
                  <span className="new-employee__input-note">
                    * Pflichtfeld
                  </span>
                </div>

                <div className="new-employee__input-info-div">
                  <input
                    type="tel"
                    name=""
                    className="new-employee__handy input number"
                    value={employeeValueAdministration.handy}
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        handy: event.target.value,
                      });
                    }}
                  />{" "}
                  <span className="new-employee__input-note">
                    * Pflichtfeld
                  </span>
                </div>

                <div className="new-employee__input-info-div">
                  <textarea
                    name=""
                    className="new-employee__remark"
                    value={employeeValueAdministration.remark}
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        remark: event.target.value,
                      });
                    }}
                    id=""
                  ></textarea>{" "}
                </div>
              </div>
            </div>

            <div className="new-employee__button-div center-content">
              <button
                onClick={closeNewEmployeeForm}
                className="new-employee__cancel-button button"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="new-employee__cancel-icon"
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
                onClick={addEmployeeToTable}
                disabled={
                  employeeValueAdministration.salutation !== "" &&
                  employeeValueAdministration.firstName.length > 0 &&
                  employeeValueAdministration.lastName.length > 0 &&
                  Number(employeeValueAdministration.age) !== 0 &&
                  employeeValueAdministration.street.length > 0 &&
                  Number(employeeValueAdministration.streetNumber) !== 0 &&
                  employeeValueAdministration.PLZ.length > 4 &&
                  employeeValueAdministration.city.length > 0 &&
                  employeeValueAdministration.mail.length > 0 &&
                  failInMail === 1 &&
                  employeeValueAdministration.handy.length > 10
                    ? false
                    : true
                }
                className={`new-employee__add-button button ${
                  employeeValueAdministration.salutation !== "" &&
                  employeeValueAdministration.firstName.length > 0 &&
                  employeeValueAdministration.lastName.length > 0 &&
                  employeeValueAdministration.age.length > 0 &&
                  employeeValueAdministration.street.length > 0 &&
                  Number(employeeValueAdministration.streetNumber) !== 0 &&
                  employeeValueAdministration.PLZ.length > 4 &&
                  employeeValueAdministration.city.length > 0 &&
                  employeeValueAdministration.mail.length > 0 &&
                  failInMail === 1 &&
                  employeeValueAdministration.handy.length > 10
                    ? "primary-button"
                    : "disbled-button"
                }`}
              >
                Mitarbeiter anlegen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="new-employee__add-icon"
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
  /*
                    
  */
}
