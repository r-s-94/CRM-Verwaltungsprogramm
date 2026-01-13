import { useContext, useEffect } from "react";
import { supabase } from "../../supabase";
import "../../index.scss";
import "./updateEmployeeComponent.scss";
import { employeesContext } from "../../employeesContext";
import "./employeesComponent.scss";
import PopUpComponent from "../../PopUpComponent";
import "../../PopUpComponent.scss";
import { toastyContent } from "../../toastyContext";
import { popUpWidthHeightContent } from "../../popUpPaddingContent";

export default function UpdateEmployeeComponent({
  showDataUpdate,
  updateEmployeeForm,
  setUpdateEmployeeForm,
  failInMail,
  setFailInMail,
}: {
  showDataUpdate: () => void;
  updateEmployeeForm: boolean;
  setUpdateEmployeeForm: (value: boolean) => void;
  failInMail: number;
  setFailInMail: (failInMail: number) => void;
}) {
  const {
    employeesStorageArray,
    employeeValueAdministration,
    setEmployeeValueAdministration,
  } = useContext(employeesContext);
  const { toastyObject, setToastyObject, autoHiddenToasty } =
    useContext(toastyContent);
  const { popUpWidthHeightObject, setPopUpWidthHeightObject } = useContext(
    popUpWidthHeightContent
  );

  useEffect(() => {
    showEmployee();
  }, [employeeValueAdministration.selectedEmployeeId]);

  function showEmployee() {
    const selectedEmployee = employeesStorageArray.find((employee) => {
      return employee.id === employeeValueAdministration.selectedEmployeeId;
    });

    if (selectedEmployee) {
      setEmployeeValueAdministration({
        ...employeeValueAdministration,
        selectedEmployeeId: selectedEmployee.id,
        salutation: selectedEmployee.salutation,
        firstName: selectedEmployee.first_name,
        lastName: selectedEmployee.last_name,
        age: selectedEmployee.age,
        street: selectedEmployee.street,
        streetNumber: selectedEmployee.street_number,
        PLZ: selectedEmployee.PLZ,
        city: selectedEmployee.city,
        mail: selectedEmployee.mail,
        handy: selectedEmployee.handy,
        remark: selectedEmployee.note,
      });
    }
  }

  function employeeAgeContent(age: string) {
    const employeeAge = age;

    if (employeeAge.length > 0) {
      setEmployeeValueAdministration({
        ...employeeValueAdministration,
        age: employeeAge,
      });
    }

    if (employeeAge === "") {
      setEmployeeValueAdministration({
        ...employeeValueAdministration,
        age: "",
      });
    }
  }

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

  async function updateEmployee() {
    const { error } = await supabase
      .from("Employees")
      .update({
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
      })
      .eq("id", employeeValueAdministration.selectedEmployeeId);

    if (error?.code !== "PGRST204") {
      showDataUpdate();
      setEmployeeValueAdministration({
        ...employeeValueAdministration,
        selectedEmployeeId: 0,
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

      setUpdateEmployeeForm(false);
      setToastyObject({
        ...toastyObject,
        area: "employee",
        message: "Mitarbeiter wurde erfolgreich bearbeitet.",
        status: 1,
        z_index: 0,
      });
      autoHiddenToasty();
    } else {
      setToastyObject({
        ...toastyObject,
        area: "employee",
        message: "Mitarbeiter bearbeiten fehlgeschlagen.",
        status: -1,
        z_index: 1,
      });
      autoHiddenToasty();
    }
  }

  function closeUpdateEmployeeForm() {
    setUpdateEmployeeForm(false);
    setEmployeeValueAdministration({
      ...employeeValueAdministration,
      selectedEmployeeId: 0,
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
  }

  /*   <div className="employee__popup-main-window">
          <div className="employee__popup-main-window--popup-message-window">
           
          </div>

          <div className="employee__popup-main-window--popup-message-window"> </div>
        </div>
  
  */

  return (
    <div className="update-employee ">
      {updateEmployeeForm && (
        <PopUpComponent>
          <div className="update-employee__form">
            <svg
              onClick={closeUpdateEmployeeForm}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="update-employee__close-icon hover"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>

            <div className="update-employee__label-and-input-div">
              <div className="update-employee__label-div">
                <label className="update-employee__label-salutation label">
                  Anrede:
                </label>
                <label className="update-employee__label-first-name label">
                  Vorname:
                </label>
                <label className="update-employee__label-last-name label">
                  Nachname:{" "}
                </label>
                <label className="update-employee__label-birthday label">
                  Geburtsdatum:{" "}
                </label>{" "}
                <label className="update-employee__label-street-number label">
                  Str./Hausnr.:{" "}
                </label>{" "}
                <label className="update-employee__label-PLZ label">
                  PLZ:{" "}
                </label>{" "}
                <label className="update-employee__label-city label">
                  Ort/Stadt:{" "}
                </label>{" "}
                <label className="update-employee__label-mail label">
                  Mail:{" "}
                </label>{" "}
                <label className="update-employee__label-handy label">
                  Handy:{" "}
                </label>{" "}
                <label className="update-employee__label-remark label">
                  Bemerkung:{" "}
                </label>
              </div>
              <div className="update-employee__input-div">
                <div className="update-employee__input-info-div">
                  <select
                    name=""
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        salutation: event.target.value,
                      });
                    }}
                    value={employeeValueAdministration.salutation}
                    className="update-employee__select"
                    id=""
                  >
                    <option value="" className="update-employee__option">
                      ...
                    </option>
                    <option value="Frau" className="update-employee__option">
                      Frau
                    </option>
                    <option value="Herr" className="update-employee__option">
                      Herr
                    </option>
                  </select>

                  <span className="new-employee__input-note">
                    * Pflichtfeld
                  </span>
                </div>

                <div className="update-employee__input-info-div">
                  {" "}
                  <input
                    type="text"
                    name=""
                    className="update-employee__first-name input"
                    value={employeeValueAdministration.firstName}
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        firstName: event.target.value.trimStart(),
                      });
                    }}
                  />{" "}
                  <span className="update-employee__input-note">
                    * Pflichtfeld
                  </span>
                </div>
                <div className="update-employee__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="update-employee__last-name input"
                    value={employeeValueAdministration.lastName}
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        lastName: event.target.value.trimStart(),
                      });
                    }}
                  />{" "}
                  <span className="update-employee__input-note">
                    * Pflichtfeld
                  </span>
                </div>

                <div className="update-employee__input-info-div">
                  <input
                    type="date"
                    name=""
                    className="update-employee__age input"
                    value={employeeValueAdministration.age}
                    onChange={(event) => {
                      employeeAgeContent(event.target.value);
                    }}
                  />{" "}
                  <span className="update-employee__input-note">
                    * Pflichtfeld
                  </span>
                </div>

                <div className="update-employee__input-info-div">
                  <div className="update-employee__street-street-number-collect-div">
                    <input
                      type="text"
                      name=""
                      className="update-employee__street input"
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
                      className="update-employee__street-number input number"
                      value={employeeValueAdministration.streetNumber}
                      onChange={(event) => {
                        setEmployeeValueAdministration({
                          ...employeeValueAdministration,
                          streetNumber: event.target.value,
                        });
                      }}
                    />{" "}
                  </div>

                  <span className="update-employee__input-note">
                    * Pflichtfeld
                  </span>
                </div>

                <div className="update-employee__input-info-div">
                  <input
                    type="number"
                    name=""
                    className="update-employee__PLZ input number"
                    value={employeeValueAdministration.PLZ}
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        PLZ: event.target.value,
                      });
                    }}
                  />{" "}
                  <span className="update-employee__input-note">
                    * Pflichtfeld
                  </span>
                </div>

                <div className="update-employee__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="update-employee__city input"
                    value={employeeValueAdministration.city}
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        city: event.target.value.trimStart(),
                      });
                    }}
                  />{" "}
                  <span className="update-employee__input-note">
                    * Pflichtfeld
                  </span>
                </div>

                <div className="update-employee__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="update-employee__mail input"
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
                  <span className="update-employee__input-note">
                    * Pflichtfeld
                  </span>
                </div>

                <div className="update-employee__input-info-div">
                  <input
                    type="tel"
                    name=""
                    className="update-employee__handy input number"
                    value={employeeValueAdministration.handy}
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        handy: event.target.value,
                      });
                    }}
                  />{" "}
                  <span className="update-employee__input-note">
                    * Pflichtfeld
                  </span>
                </div>

                <div className="update-employee__input-info-div">
                  <textarea
                    name=""
                    className="update-employee__remark"
                    value={employeeValueAdministration.remark}
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        remark: event.target.value,
                      });
                    }}
                    id=""
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="update-employee__button-div center-content">
              <button
                onClick={closeUpdateEmployeeForm}
                className="update-employee__cancel-button button"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="update-employee__cancel-icon"
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
                onClick={updateEmployee}
                disabled={
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
                    ? false
                    : true
                }
                className={`update-employee__edit-button button ${
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
                Mitarbeiter bearbeiten{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="update-employee__edit-icon"
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
}
