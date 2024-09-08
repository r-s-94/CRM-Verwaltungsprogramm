import { createContext } from "react";
import { Tables } from "./database.types";

export interface EmployeePopUpDatatype {
  selectedEmployeeId: number;
  firstName: string;
  lastName: string;
  age: string;
  remark: string;
}

interface EmployeesStateData {
  employeesStorageArray: Tables<"Employees">[];
  setEmployeesStorageArray: React.Dispatch<
    React.SetStateAction<Tables<"Employees">[]>
  >;
  loadEmployees: () => void;
  employeeValueAdministration: EmployeePopUpDatatype;
  setEmployeeValueAdministration: React.Dispatch<
    React.SetStateAction<EmployeePopUpDatatype>
  >;
}

export const employeesContext = createContext<EmployeesStateData>({
  employeesStorageArray: [],
  setEmployeesStorageArray: () => {},
  loadEmployees: () => {},
  employeeValueAdministration: {
    selectedEmployeeId: 0,
    firstName: "",
    lastName: "",
    age: "",
    remark: "",
  },
  setEmployeeValueAdministration: () => {},
});
