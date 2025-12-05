import { useContext } from "react";
import "../../index.scss";
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

  async function addEmployeeToTable() {
    const {} = await supabase.from("Employees").insert({
      firstName: employeeValueAdministration.firstName,
      lastName: employeeValueAdministration.lastName,
      age: employeeValueAdministration.age,
      note: employeeValueAdministration.remark,
    });

    setNewEmployeeForm(false);

    showDataUpdate();

    setEmployeeValueAdministration({
      ...employeeValueAdministration,
      firstName: "",
      lastName: "",
      age: 0,
      remark: "",
    });
  }

  function closeNewEmployeeForm() {
    setEmployeeValueAdministration({
      ...employeeValueAdministration,
      firstName: "",
      lastName: "",
      age: 0,
      remark: "",
    });

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

            <div className="new-employee__label-and-input-div center-content">
              <div className="new-employee__label-div">
                <label className="new-employee__label label">Vorname: </label>{" "}
                <label className="new-employee__label label">Nachname: </label>{" "}
                <label className="new-employee__label label">Alter: </label>{" "}
                <label className="new-employee__label label">Bemerkung: </label>
              </div>
              <div className="new-employee__input-div">
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
                  * Pflichtfeld
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
                  * Pflichtfeld
                </div>
                <div className="new-employee__input-info-div">
                  <input
                    type="number"
                    name=""
                    className="new-employee__age input"
                    value={
                      employeeValueAdministration.age !== 0
                        ? employeeValueAdministration.age
                        : ""
                    }
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        age: Number(event.target.value),
                      });
                    }}
                  />{" "}
                  * Pflichtfeld
                </div>

                <div className="new-employee__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="new-employee__remark input"
                    value={employeeValueAdministration.remark}
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        remark: event.target.value,
                      });
                    }}
                  />{" "}
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
                  employeeValueAdministration.firstName.length > 0 &&
                  employeeValueAdministration.lastName.length > 0 &&
                  employeeValueAdministration.age !== 0
                    ? false
                    : true
                }
                className={`new-employee__add-button button ${
                  employeeValueAdministration.firstName.length > 0 &&
                  employeeValueAdministration.lastName.length > 0 &&
                  employeeValueAdministration.age !== 0
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
}
