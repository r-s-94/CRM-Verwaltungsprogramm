import { createContext } from "react";
import { Tables } from "./database.types";

export interface EmployeePopUpDatatype {
  selectedEmployeeId: number;
  salutation: string;
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  streetNumber: string;
  PLZ: string;
  city: string;
  mail: string;
  handy: string;
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
  },
  setEmployeeValueAdministration: () => {},
});
