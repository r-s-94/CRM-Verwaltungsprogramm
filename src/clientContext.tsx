import { createContext } from "react";
import { Tables } from "./database.types";

export interface ClientPopUpDatatype {
  selectedClientId: number;
  salutation: string;
  firstName: string;
  lastName: string;
  age: string;
  mail: string;
  street: string;
  streetNumber: string;
  PLZ: string;
  city: string;
  handy: string;
  note: string;
}

interface ClientsStateData {
  clientsStorageArray: Tables<"Clients">[];
  setClientsStorageArray: React.Dispatch<
    React.SetStateAction<Tables<"Clients">[]>
  >;
  loadClients: () => void;
  clientValueAdministration: ClientPopUpDatatype;
  setClientValueAdministration: (value: ClientPopUpDatatype) => void;
}

export const clientsContext = createContext<ClientsStateData>({
  clientsStorageArray: [],
  setClientsStorageArray: () => {},
  loadClients: () => {},
  clientValueAdministration: {
    selectedClientId: 0,
    salutation: "",
    firstName: "",
    lastName: "",
    age: "",
    mail: "",
    street: "",
    streetNumber: "",
    PLZ: "",
    city: "",
    handy: "",
    note: "",
  },
  setClientValueAdministration: () => {},
});
