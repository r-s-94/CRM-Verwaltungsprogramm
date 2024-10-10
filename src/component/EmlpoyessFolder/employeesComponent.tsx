import { useEffect, useContext, useState } from "react";
import "./employeesComponent.scss";
import EmployeesPreviewComponent from "./employeesPreviewComponent";
import { employeesContext } from "../../employeesContext";
import NewEmployeeComponent from "./newEmployeeComponent";
import UpdateEmployeeComponent from "./updateEmployeeComponent";

export default function EmployeesComponent() {
  const { loadEmployees, employeeValueAdministration } =
    useContext(employeesContext);
  const [newEmployeeForm, setNewEmployeeForm] = useState<boolean>(false);
  const [updateEmployeeForm, setUpdateEmployeeForm] = useState<boolean>(false);

  useEffect(() => {
    loadEmployees();
  }, [employeeValueAdministration.selectedEmployeeId]);

  /*  !!!!!!  ACHTUNG ACHTUNG ACHTUNG !!!!!!

      wenn zum Beispiel eine Funktion von einer Datei in eine andere Datei angewendet/verwendet werden soll, sollte dies immer nach Möglichkeit 
      durch ein Prop = Komponentenattribute passieren und nicht durch ein useState() und context
  
  */

  /*async function showEmployees() {
    const { data } = await supabase.from("Employees").select().order("id");
    if (data) {
      console.log(data);
    }
  }*/

  function showNewEmployeeForm() {
    setNewEmployeeForm(true);
  }

  return (
    <section className="employee-section">
      <NewEmployeeComponent
        showDataUpdate={loadEmployees}
        newEmployeeForm={newEmployeeForm}
        setNewEmployeeForm={setNewEmployeeForm}
      />

      <UpdateEmployeeComponent
        showDataUpdate={loadEmployees}
        updateEmployeeForm={updateEmployeeForm}
        setUpdateEmployeeForm={setUpdateEmployeeForm}
      />

      <h1 className="employee-section__headline">Mitarbeiter</h1>

      <button
        onClick={showNewEmployeeForm}
        className="employee-section__new-employee-button "
      >
        Mitarbeiter erstellen
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="employee-section__new-employee-button--add-icon"
        >
          <path d="M10 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM16.25 5.75a.75.75 0 0 0-1.5 0v2h-2a.75.75 0 0 0 0 1.5h2v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2Z" />
        </svg>
      </button>

      <EmployeesPreviewComponent
        showEmployeesUpdate={loadEmployees}
        setUpdateEmployeeForm={setUpdateEmployeeForm}
      />
    </section>
  );

  /*

      
  
  */
}
