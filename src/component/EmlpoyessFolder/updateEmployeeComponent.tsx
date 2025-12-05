import { useContext, useEffect } from "react";
import { supabase } from "../../supabase";
import "../../index.scss";
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
        firstName: selectedEmployee.firstName,
        lastName: selectedEmployee.lastName,
        age: selectedEmployee.age,
        remark: selectedEmployee.note,
      });
    }
  }

  async function updateEmployee() {
    const {} = await supabase
      .from("Employees")
      .update({
        firstName: employeeValueAdministration.firstName,
        lastName: employeeValueAdministration.lastName,
        age: employeeValueAdministration.age,
        note: employeeValueAdministration.remark,
      })
      .eq("id", employeeValueAdministration.selectedEmployeeId);

    showDataUpdate();
    setEmployeeValueAdministration({
      ...employeeValueAdministration,
      selectedEmployeeId: 0,
      firstName: "",
      lastName: "",
      age: 0,
      remark: "",
    });

    setUpdateEmployeeForm(false);
  }

  function closeUpdateEmployeeForm() {
    setUpdateEmployeeForm(false);
    setEmployeeValueAdministration({
      ...employeeValueAdministration,
      selectedEmployeeId: 0,
      firstName: "",
      lastName: "",
      age: 0,
      remark: "",
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

            <div className="update-employee__label-and-input-div center-content">
              <div className="update-employee__label-div">
                <label className="label">Vorname:</label>
                <label className="label">Nachname: </label>
                <label className="label">Alter: </label>{" "}
                <label className="label">Bemerkung: </label>
              </div>
              <div className="update-employee__input-div">
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
                  * Pflichtfeld
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
                  * Pflichtfeld
                </div>

                <div className="update-employee__input-info-div">
                  <input
                    type="number"
                    name=""
                    className="update-employee__age input"
                    value={
                      employeeValueAdministration.age !== 0
                        ? employeeValueAdministration.age
                        : ""
                    }
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        age: Number(event.target.value.trimStart()),
                      });
                    }}
                  />{" "}
                  * Pflichtfeld
                </div>

                <div className="update-employee__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="update-employee__remark input"
                    value={employeeValueAdministration.remark}
                    onChange={(event) => {
                      setEmployeeValueAdministration({
                        ...employeeValueAdministration,
                        remark: event.target.value,
                      });
                    }}
                  />
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
                  employeeValueAdministration.firstName.length > 0 &&
                  employeeValueAdministration.lastName.length > 0 &&
                  employeeValueAdministration.age !== 0
                    ? false
                    : true
                }
                className={`update-employee__edit-button button ${
                  employeeValueAdministration.firstName.length > 0 &&
                  employeeValueAdministration.lastName.length > 0 &&
                  employeeValueAdministration.age !== 0
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
