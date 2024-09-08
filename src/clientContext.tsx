import { createContext } from "react";
import { Tables } from "./database.types";

export interface ClientPopUpDatatype {
  selectedClientId: number;
  firstName: string;
  lastName: string;
  age: string;
  mail: string;
  address: string;
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
    firstName: "",
    lastName: "",
    age: "",
    mail: "",
    address: "",
  },
  setClientValueAdministration: () => {},
});
