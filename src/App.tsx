import "./App.scss";
import PreviewComponent from "./preview";
import EmployeesComponent from "./component/emlpoyees/employees";
import ClientsComponent from "./component/client/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import OrdersComponent from "./component/orders/orders";
import CompanyreportComponent from "./component/companyreport/companyreport";
import { Tables } from "./database.types";
import { clientsContext } from "./component/client/clientContext";
import { supabase } from "./supabase";
import { employeesContext } from "./component/emlpoyees/employeesContext";
import { EmployeePopUpDatatype } from "./component/emlpoyees/employeesContext";
import { ClientPopUpDatatype } from "./component/client/clientContext";
import { OrderPopUpDatatype } from "./component/orders/ordersContext";
import { ordersContext } from "./component/orders/ordersContext";
import {
  popUpWidthHeightContent,
  PopUpWidthHeightObjectDatatype,
} from "./component/pop-up/popUpPaddingContent";
import { toastyContent, ToastyObject } from "./component/toasty/toastyContext";

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
    });

  const [clientValueAdministration, setClientValueAdministration] =
    useState<ClientPopUpDatatype>({
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
    });

  const [orderValueAdministration, setOrderValueAdministration] =
    useState<OrderPopUpDatatype>({
      selectedOrderId: 0,
      service: "",
      quantity: 1,
      singlePrice: 0,
      totalPrice: 0,
      paymentMethode: "",
      paymentStatus: "",
      date: "",
      note: "",
      business: false,
    });

  const [popUpWidthHeightObject, setPopUpWidthHeightObject] =
    useState<PopUpWidthHeightObjectDatatype>({
      width: 0,
      height: 0,
    });

  const [toastyObject, setToastyObject] = useState<ToastyObject>({
    area: "",
    message: "",
    status: 0,
    z_index: 0,
  });

  const timeControlToasty = useRef(0);

  //cd ".\react-vite-crm-managment-program\"
  //

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
    },
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
      const sortedArray = data.sort((current, next) => next.id - current.id);
      setOrdersStorageArray(sortedArray);
    }
  }

  function autoHiddenToasty() {
    timeControlToasty.current = window.setTimeout(() => {
      setToastyObject({
        ...toastyObject,
        area: "",
        status: 0,
        z_index: 0,
      });
    }, 3000);
    postProcessing();
  }

  function postProcessing() {
    timeControlToasty.current = window.setTimeout(() => {
      setToastyObject({
        ...toastyObject,
        message: "",
      });
    }, 10000);
  }

  return (
    <div>
      <toastyContent.Provider
        value={{ toastyObject, setToastyObject, autoHiddenToasty }}
      >
        <popUpWidthHeightContent.Provider
          value={{ popUpWidthHeightObject, setPopUpWidthHeightObject }}
        >
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
        </popUpWidthHeightContent.Provider>
      </toastyContent.Provider>
    </div>
  );
} /*
 
*/
