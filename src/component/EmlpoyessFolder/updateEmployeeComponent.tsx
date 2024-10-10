import { useContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import "./updateEmployeeComponent.scss";
import { employeesContext } from "../../employeesContext";
import "./employeesComponent.scss";
import PopUpComponent from "../../PopUpComponent";
import "../../PopUpComponent.scss";

export default function UpdateEmployeeComponent({
  showDataUpdate,
  updateEmployeeForm,
  setUpdateEmployeeForm,
}: {
  showDataUpdate: () => void;
  updateEmployeeForm: boolean;
  setUpdateEmployeeForm: (value: boolean) => void;
}) {
  /* const [updateEmployeeFirstName, setUpdateEmployeeFirstName] =
    useState<string>("");
  const [updateEmployeeLastName, setUpdateEmployeeLastName] =
    useState<string>("");
  const [updateEmployeeAge, setUpdateEmployeeAge] = useState<string>("");
  const [updateEmployeeRemark, setUpdateEmployeeRemark] = useState<string>("");
  
  */

  const {
    employeesStorageArray,
    employeeValueAdministration,
    setEmployeeValueAdministration,
  } = useContext(employeesContext);
  const [updateEmployeeMessagePopUp, setUpdateEmployeeMessagePopUp] =
    useState<boolean>(false);

  useEffect(() => {
    showEmployee();
  }, [employeeValueAdministration.selectedEmployeeId]);

  function showEmployee() {
    const selectedEmployee = employeesStorageArray.find((employee) => {
      return employee.id === employeeValueAdministration.selectedEmployeeId;
    });

    if (selectedEmployee) {
      const changeDatatypeString: string = String(selectedEmployee.Alter);

      setEmployeeValueAdministration({
        ...employeeValueAdministration,
        selectedEmployeeId: selectedEmployee.id,
        firstName: selectedEmployee.Vorname,
        lastName: selectedEmployee.Nachname,
        age: changeDatatypeString,
        remark: selectedEmployee.Bemerkung,
      });
    }
  }

  function closeUpdateEmployeeMessagePopUp() {
    setUpdateEmployeeMessagePopUp(false);

    setUpdateEmployeeForm(true);
  }

  function closeUpdateEmployeeForm() {
    setUpdateEmployeeForm(false);
    setEmployeeValueAdministration({
      ...employeeValueAdministration,
      selectedEmployeeId: 0,
      firstName: "",
      lastName: "",
      age: "",
      remark: "",
    });
  }

  async function updateEmployee() {
    const changeDatatypeAge: number = Number(employeeValueAdministration.age);

    if (
      employeeValueAdministration.firstName !== "" &&
      employeeValueAdministration.lastName !== "" &&
      employeeValueAdministration.age !== ""
    ) {
      const {} = await supabase
        .from("Employees")
        .update({
          Vorname: employeeValueAdministration.firstName,
          Nachname: employeeValueAdministration.lastName,
          Alter: changeDatatypeAge,
          Bemerkung: employeeValueAdministration.remark,
        })
        .eq("id", employeeValueAdministration.selectedEmployeeId);

      showDataUpdate();
      setEmployeeValueAdministration({
        ...employeeValueAdministration,
        selectedEmployeeId: 0,
        firstName: "",
        lastName: "",
        age: "",
        remark: "",
      });
      setUpdateEmployeeForm(false);
    } else {
      setUpdateEmployeeMessagePopUp(true);
      setUpdateEmployeeForm(false);
    }
  }

  /*   <div className="employee__popup-main-window">
          <div className="employee__popup-main-window--popup-message-window">
           
          </div>

          <div className="employee__popup-main-window--popup-message-window"> </div>
        </div>
  
  */

  return (
    <div className="update-employee ">
      {updateEmployeeMessagePopUp && (
        <PopUpComponent>
          {" "}
          <div className="update-employee__popup-message-div">
            <p className="update-employee__popup-message-div--text">
              Bitte alle * Pflichtfelder ausfühlen.
            </p>
            <button
              onClick={closeUpdateEmployeeMessagePopUp}
              className="update-employee__popup-message-div--close-button"
            >
              Okay Fenster schließen
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="update-employee__popup-message-div--close-button--close-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>{" "}
          </div>
        </PopUpComponent>
      )}

      {updateEmployeeForm && (
        <PopUpComponent>
          <div className="update-employee__form">
            <button
              onClick={closeUpdateEmployeeForm}
              className="update-employee__form--close-button button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="update-employee__form--close-button--close-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="update-employee__form--label-and-input-container">
              <div className="update-employee__form--label-and-input-container--label-section">
                <label className="label">Vorname:</label>
                <label className="label">Nachname: </label>
                <label className="label">Alter: </label>{" "}
                <label className="label">Bemerkung: </label>
              </div>
              <div className="update-employee__form--label-and-input-container--input-section">
                <section className="update-employee__form--label-and-input-container--input-section--input-info-section">
                  {" "}
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
                <section className="update-employee__form--label-and-input-container--input-section--input-info-section">
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

                <section className="update-employee__form--label-and-input-container--input-section--input-info-section">
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

                <section className="update-employee__form--label-and-input-container--input-section--input-info-section">
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
                  />
                </section>
              </div>
            </div>

            <button
              onClick={updateEmployee}
              className="update-employee__form--edit-button"
            >
              Mitarbeiter bearbeiten{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="update-employee__form--edit-button--edit-icon"
              >
                <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
              </svg>
            </button>
          </div>
        </PopUpComponent>
      )}
    </div>
  );
}
