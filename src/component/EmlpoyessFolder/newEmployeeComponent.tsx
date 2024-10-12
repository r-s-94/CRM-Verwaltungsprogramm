import { useContext, useState } from "react";
import "./newEmployeeComponent.scss";
import { supabase } from "../../supabase";
import { employeesContext } from "../../employeesContext";
import PopUpComponent from "../../PopUpComponent";
import "../../PopUpComponent.scss";

export default function NewEmployeeComponent({
  showDataUpdate,
  newEmployeeForm,
  setNewEmployeeForm,
}: {
  showDataUpdate: () => void;
  newEmployeeForm: boolean;
  setNewEmployeeForm: (value: boolean) => void;
}) {
  /* 
  
  */

  const { employeeValueAdministration, setEmployeeValueAdministration } =
    useContext(employeesContext);
  const [newEmployeeMessagePopUp, setNewEmployeeMessagePopUp] =
    useState<boolean>(false);

  function closeNewEmployeeMessagePopUp() {
    setNewEmployeeForm(true);
    setNewEmployeeMessagePopUp(false);
  }

  function closeNewEmployeeForm() {
    setNewEmployeeForm(false);
  }

  async function addEmployeeToTable() {
    const changeDatatypeAge = Number(employeeValueAdministration.age);

    if (
      employeeValueAdministration.firstName !== "" &&
      employeeValueAdministration.lastName !== "" &&
      employeeValueAdministration.age !== ""
    ) {
      const {} = await supabase.from("Employees").insert({
        firstName: employeeValueAdministration.firstName,
        lastName: employeeValueAdministration.lastName,
        age: changeDatatypeAge,
        note: employeeValueAdministration.remark,
      });

      setNewEmployeeForm(false);

      showDataUpdate();

      setEmployeeValueAdministration({
        ...employeeValueAdministration,
        firstName: "",
        lastName: "",
        age: "",
        remark: "",
      });
    } else {
      setNewEmployeeForm(false);
      setNewEmployeeMessagePopUp(true);
    }
  }

  /* 
  
  */

  return (
    <div className="new-employee">
      {" "}
      {newEmployeeMessagePopUp && (
        <PopUpComponent>
          <div className="new-employee__popup-message-div">
            <p className="new-employee__popup-message-div--text">
              Bitte alle * Pflichtfelder ausfühlen.
            </p>
            <button
              onClick={closeNewEmployeeMessagePopUp}
              className="new-employee__popup-message-div--close-button"
            >
              Okay Fenster schließen
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="new-employee__popup-message-div--close-button--close-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </PopUpComponent>
      )}
      {newEmployeeForm && (
        <PopUpComponent>
          <div className="new-employee__form">
            <button
              onClick={closeNewEmployeeForm}
              className="new-employee__form--close-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="new-employee__form--close-button--close-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="new-employee__form--label-and-input-container">
              <div className="new-employee__form--label-and-input-container--label-section">
                <label className="new-employee__form--label-and-input-container--label-section--label label">
                  Vorname:{" "}
                </label>{" "}
                <label className="new-employee__form--label-and-input-container--label-section--label label">
                  Nachname:{" "}
                </label>{" "}
                <label className="new-employee__form--label-and-input-container--label-section--label label">
                  Alter:{" "}
                </label>{" "}
                <label className="new-employee__form--label-and-input-container--label-section--label label">
                  Bemerkung:{" "}
                </label>
              </div>
              <div className="new-employee__form--label-and-input-container--input-section">
                <section className="new-employee__form--label-and-input-container--input-section--input-info-section">
                  <input
                    type="text"
                    name=""
                    className="input-employee-first-name input"
                    value={employeeValueAdministration.firstName}
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        firstName: event.target.value,
                      });
                    }}
                  />{" "}
                  * Pflichtfeld
                </section>
                <section className="new-employee__form--label-and-input-container--input-section--input-info-section">
                  <input
                    type="text"
                    name=""
                    className="input-employee-last-name input"
                    value={employeeValueAdministration.lastName}
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        lastName: event.target.value,
                      });
                    }}
                  />{" "}
                  * Pflichtfeld
                </section>
                <section className="new-employee__form--label-and-input-container--input-section--input-info-section">
                  <input
                    type="number"
                    name=""
                    className="input-employee-age input"
                    value={employeeValueAdministration.age}
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        age: event.target.value,
                      });
                    }}
                  />{" "}
                  * Pflichtfeld
                </section>

                <section className="new-employee__form--label-and-input-container--input-section--input-info-section">
                  <input
                    type="text"
                    name=""
                    className="input-employee-remark input"
                    value={employeeValueAdministration.remark}
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        remark: event.target.value,
                      });
                    }}
                  />{" "}
                </section>
              </div>
            </div>

            <button
              onClick={addEmployeeToTable}
              className="new-employee__form--add-button"
            >
              Mitarbeiter erstellen
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="new-employee__form--add-button--add-icon"
              >
                <path d="M10 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM16.25 5.75a.75.75 0 0 0-1.5 0v2h-2a.75.75 0 0 0 0 1.5h2v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2Z" />
              </svg>
            </button>
          </div>
        </PopUpComponent>
      )}
    </div>
  );
}
