import "./App.scss";
import PreviewComponent from "./previewComponent";
import EmployeesComponent from "./component/EmlpoyessFolder/employeesComponent";
import ClientsComponent from "./component/ClientFolder/clientComponent";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import OrdersComponent from "./component/OrdersFolder/ordersComponent";
import CompanyreportComponent from "./component/CompanyreportFolder/companyreportComponent";
import { Tables } from "./database.types";
import { clientsContext } from "./clientContext";
import { supabase } from "./supabase";
import { employeesContext } from "./employeesContext";
import { EmployeePopUpDatatype } from "./employeesContext";
import { ClientPopUpDatatype } from "./clientContext";
import { OrderPopUpDatatype } from "./ordersContext";
import { ordersContext } from "./ordersContext";
//import Error from "./component/error/error";

export default function App() {
  //const [authorizedUser, setAuthorizedUser] = useState<boolean | null>(false);

  const [employeesStorageArray, setEmployeesStorageArray] = useState<
    Tables<"Employees">[]
  >([]);

  const [clientsStorageArray, setClientsStorageArray] = useState<
    Tables<"Clients">[]
  >([]);

  const [ordersStorageArray, setOrdersStorageArray] = useState<
    Tables<"Orders">[]
  >([]);

  const [employeeValueAdministration, setEmployeeValueAdministration] =
    useState<EmployeePopUpDatatype>({
      selectedEmployeeId: 0,
      firstName: "",
      lastName: "",
      age: "",
      remark: "",
    });

  const [clientValueAdministration, setClientValueAdministration] =
    useState<ClientPopUpDatatype>({
      selectedClientId: 0,
      firstName: "",
      lastName: "",
      age: "",
      mail: "",
      address: "",
    });

  const [orderValueAdministration, setOrderValueAdministration] =
    useState<OrderPopUpDatatype>({
      selectedOrderId: 0,
      service: "",
      quantity: 0,
      price: 0,
      paymentMethode: "",
      paymentStatus: "",
      date: "",
      note: "",
      business: false,
    });

  //cd ".\react-vite-crm-managment-program\"

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: (
          <PreviewComponent
          //authorizedUser={authorizedUser}
          //setAuthorizedUser={setAuthorizedUser}
          />
        ),
        children: [
          { path: "employees", element: <EmployeesComponent /> },
          { path: "clients", element: <ClientsComponent /> },

          {
            path: "orders",
            element: <OrdersComponent />,
            /*  
            authorizedUser ?: <Error />
            wenn man vor hat Routen abzusichern ist es möglich das über den ? Tenären-Operator zu tun, indem man ihn einfach in die
                Reihe von dem key elements schreibt und eine Bedingung prüft, das währe ein Möglichkeit
            
            */
          },

          {
            path: "companyreport",
            element: <CompanyreportComponent />,

            /*authorizedUser ?: <Error />
            
            */
          },
        ],
      },
    ],
    {
      basename: "/CRM-Verwaltungsprogramm/",
    }
  );

  useEffect(() => {
    loadClients();
    loadEmployees();
    loadOrders();
  }, [supabase]);

  async function loadClients() {
    const { data } = await supabase.from("Clients").select().order("id");

    if (data) {
      //console.log(data);
      setClientsStorageArray(data);
      //console.log(clientsStorageArray);
    }
  }

  async function loadEmployees() {
    const { data } = await supabase.from("Employees").select().order("id");

    if (data) {
      //console.log(data);
      setEmployeesStorageArray(data);
      //console.log(clientsStorageArray);
    }
  }

  async function loadOrders() {
    const { data } = await supabase.from("Orders").select().order("id");

    if (data) {
      //console.log(data);
      setOrdersStorageArray(data);
    }
  }

  return (
    <div>
      <employeesContext.Provider
        value={{
          employeesStorageArray,
          setEmployeesStorageArray,
          loadEmployees,
          employeeValueAdministration,
          setEmployeeValueAdministration,
        }}
      >
        <clientsContext.Provider
          value={{
            clientsStorageArray,
            setClientsStorageArray,
            loadClients,
            clientValueAdministration,
            setClientValueAdministration,
          }}
        >
          <ordersContext.Provider
            value={{
              ordersStorageArray,
              setOrdersStorageArray,
              loadOrders,
              orderValueAdministration,
              setOrderValueAdministration,
            }}
          >
            <RouterProvider router={router} />
          </ordersContext.Provider>
        </clientsContext.Provider>
      </employeesContext.Provider>
    </div>
  );
} /*
 
*/
