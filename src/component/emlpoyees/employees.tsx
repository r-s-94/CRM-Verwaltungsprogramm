import { useEffect, useContext, useState } from "react";
import "../../index.scss";
import "./employees.scss";
import EmployeesPreview from "./employeesPreview";
import { employeesContext } from "./employeesContext";
import NewEmployee from "./newEmployee";
import UpdateEmployee from "./updateEmployee";

export default function EmployeesComponent() {
  const { loadEmployees, employeeValueAdministration } =
    useContext(employeesContext);

  const [newEmployeeForm, setNewEmployeeForm] = useState<boolean>(false);
  const [updateEmployeeForm, setUpdateEmployeeForm] = useState<boolean>(false);
  const [failInMail, setFailInMail] = useState<number>(0);

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

  return (
    <section className="employee-section">
      <NewEmployee
        showDataUpdate={loadEmployees}
        newEmployeeForm={newEmployeeForm}
        setNewEmployeeForm={setNewEmployeeForm}
        failInMail={failInMail}
        setFailInMail={setFailInMail}
      />

      <UpdateEmployee
        showDataUpdate={loadEmployees}
        updateEmployeeForm={updateEmployeeForm}
        setUpdateEmployeeForm={setUpdateEmployeeForm}
        failInMail={failInMail}
        setFailInMail={setFailInMail}
      />

      <h1 className="employee-section__headline">Mitarbeiter</h1>

      <EmployeesPreview
        setNewEmployeeForm={setNewEmployeeForm}
        showEmployeesUpdate={loadEmployees}
        setUpdateEmployeeForm={setUpdateEmployeeForm}
        setFailInMail={setFailInMail}
      />
    </section>
  );

  /*

  */
}
