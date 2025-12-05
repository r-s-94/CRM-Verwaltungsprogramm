import { useContext, useState } from "react";
import "../../index.scss";
import "./employeesPreviewComponent.scss";
import { employeesContext } from "../../employeesContext";
import { supabase } from "../../supabase";
//import MenuComponent from "../../menuComponent";
import PopUpComponent from "../../PopUpComponent";

export default function EmployeesPreviewComponent({
  setNewEmployeeForm,
  showEmployeesUpdate,
  setUpdateEmployeeForm,
}: {
  setNewEmployeeForm: (value: boolean) => void;
  showEmployeesUpdate: () => void;
  setUpdateEmployeeForm: (value: boolean) => void;
}) {
  /*
  
  */
  const {
    employeesStorageArray,
    employeeValueAdministration,
    setEmployeeValueAdministration,
  } = useContext(employeesContext);

  const [deleteEmployeePopUp, setDeleteEmployeePopUp] =
    useState<boolean>(false);

  function updateEmployee(id: number) {
    console.log(id);
    setEmployeeValueAdministration({
      ...employeeValueAdministration,
      selectedEmployeeId: id,
    });

    /*setUpdateFirstNameCheck(false);
    setUpdateLastNameCheck(false);
    setUpdateAgeCheck(false);*/
    setUpdateEmployeeForm(true);
  }

  function openDeleteEmployeePopUp(id: number) {
    setEmployeeValueAdministration({
      ...employeeValueAdministration,
      selectedEmployeeId: id,
    });

    setDeleteEmployeePopUp(true);
  }

  function closeDeleteEmployeePopUp() {
    setDeleteEmployeePopUp(false);
  }

  async function deleteEmployee(id: number) {
    console.log(id);
    const {} = await supabase.from("Employees").delete().eq("id", id);

    setDeleteEmployeePopUp(false);

    showEmployeesUpdate();
  }

  /*

  */

  return (
    <div className="employees-preview">
      {" "}
      {deleteEmployeePopUp && (
        <PopUpComponent>
          <div className="employees-preview__question-div">
            <svg
              onClick={closeDeleteEmployeePopUp}
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
            <p className="employees-preview__text">
              Soll der Mitarbeiter wirklich entfernt werden?
            </p>
            <div className="employees-preview__button-div center-content">
              <button
                onClick={closeDeleteEmployeePopUp}
                className="employees-preview__cancel-button button"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="employees-preview__cancel-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
                abbrechen
              </button>

              <button
                onClick={() => {
                  deleteEmployee(
                    employeeValueAdministration.selectedEmployeeId
                  );
                }}
                className="employees-preview__delete-employee-button button"
              >
                löschen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="employees-preview__delete-employee-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        </PopUpComponent>
      )}
      <div className="employees-preview__table-div center-content-column">
        <button
          onClick={() => {
            setNewEmployeeForm(true);
          }}
          className="employees-preview__new-employee-button primary-button button"
        >
          {" "}
          Mitarbeiter anlegen
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="employees-preview__new-icon"
          >
            <path d="M10 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM16.25 5.75a.75.75 0 0 0-1.5 0v2h-2a.75.75 0 0 0 0 1.5h2v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2Z" />
          </svg>
        </button>

        <div className="employees-preview__headline-div center-content">
          <h2 className="employees-preview__headline employees-preview__first-name">
            Vorname
          </h2>
          <h2 className="employees-preview__headline employees-preview__last-name">
            Nachname
          </h2>
          <h2 className="employees-preview__headline employees-preview__age">
            Alter
          </h2>
          <h2 className="employees-preview__headline employees-preview__note">
            Bemerkung
          </h2>
          <h2 className="employees-preview__headline employees-preview__options">
            Aktionen
          </h2>
        </div>
        <div className="employees-preview__employees-preview-div">
          {employeesStorageArray.map((employee) => {
            return (
              <div className="employees-preview__employee-info-div">
                <div className="employees-preview__employee-info employees-preview__first-name-info">
                  {employee.firstName}
                </div>
                <div className="employees-preview__employee-info employees-preview__last-name-info">
                  {employee.lastName}
                </div>
                <div className="employees-preview__employee-info employees-preview__age-info">
                  {employee.age}
                </div>
                <div className="employees-preview__employee-info employees-preview__note-info">
                  {employee.note}
                </div>
                <div className="employees-preview__employee-info employees-preview__options-div">
                  <div className="employees-preview__new-employee-button-div center-content">
                    <button
                      onClick={() => {
                        updateEmployee(employee.id);
                      }}
                      className="employees-preview__edit-button button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="employees-preview__edit-icon"
                      >
                        <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                      </svg>
                    </button>{" "}
                    <button
                      onClick={() => {
                        openDeleteEmployeePopUp(employee.id);
                      }}
                      className="employees-preview__delete-button button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="employees-preview__delete-icon"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>{" "}
                  </div>
                </div>
              </div>
            );
          })}{" "}
        </div>
      </div>
    </div>

    /* <MenuComponent
                    buttons={
                      
                    }
                  /> */
  );
}
