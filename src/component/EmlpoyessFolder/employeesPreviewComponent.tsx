import { useContext, useRef, useState } from "react";
import "../../index.scss";
import "./employeesPreviewComponent.scss";
import {
  EmployeePopUpDatatype,
  employeesContext,
} from "../../employeesContext";
import { supabase } from "../../supabase";
//import MenuComponent from "../../menuComponent";
import PopUpComponent from "../../PopUpComponent";
import ToolTip from "../../ToolTip";
import Toasty from "../../toasty";
import { toastyContent } from "../../toastyContext";
import { popUpWidthHeightContent } from "../../popUpPaddingContent";

export default function EmployeesPreviewComponent({
  setNewEmployeeForm,
  showEmployeesUpdate,
  setUpdateEmployeeForm,
  setFailInMail,
}: {
  setNewEmployeeForm: (value: boolean) => void;
  showEmployeesUpdate: () => void;
  setUpdateEmployeeForm: (value: boolean) => void;
  setFailInMail: (failInMail: number) => void;
}) {
  /*
  
  */
  const {
    employeesStorageArray,
    setEmployeesStorageArray,
    employeeValueAdministration,
    setEmployeeValueAdministration,
  } = useContext(employeesContext);
  const { toastyObject, setToastyObject, autoHiddenToasty } =
    useContext(toastyContent);
  const { popUpWidthHeightObject, setPopUpWidthHeightObject } = useContext(
    popUpWidthHeightContent
  );
  const [currentEmployeeObject, setCurrentEmployeeObject] =
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
  const [singleEmployeePopUp, setSingleEmployeePopUp] =
    useState<boolean>(false);
  const [deleteEmployeePopUp, setDeleteEmployeePopUp] =
    useState<boolean>(false);
  const [toolTipResponsibility, setToolTipResponsibility] =
    useState<string>("");
  const [toolTipArea, setToolTipArea] = useState<string>("");
  const [toolTipEmployeeId, setToolTipEmployeeId] = useState<number>(0);
  const [toolTipMessage, setToolTipMessage] = useState<string>("");
  const [toolTipPaddingTopBottom, setToolTipPaddingTopBottom] =
    useState<number>(0);
  const [toolTipPaddingLeftRight, setToolTipPaddingLeftRight] =
    useState<number>(0);
  const [toolTippDirection, setToolTipDirection] = useState<string>("");
  const timeRef = useRef(0);

  function calculateEmployeeAge(age: string) {
    const userDate = new Date(age).getTime();
    //console.log(userDate);

    const currentDate = new Date().toDateString();
    //console.log(currentDate);
    //const year = currentDate.getFullYear();
    //const month = currentDate.getMonth() + 1;
    //const day = currentDate.getDate();
    /*const mergenDate =
      String(year) +
      "-" +
      String(month < 10 ? "0" + month : month) +
      "-" +
      String(day < 10 ? "0" + day : day);

    console.log(mergenDate);*/
    //const milli = currentDate.getTime();
    //console.log(milli);

    const currentDate2 = new Date(currentDate).getTime();
    //console.log(currentDate2);

    const ageResult = Math.floor(
      (currentDate2 - userDate) / 365 / 24 / 60 / 60 / 1000
    );

    //console.log(ageResult);

    return ageResult;
  }

  function toolTipPrepare(
    overview: string,
    responsible: string,
    employeeId: number,
    message: string,
    direction: string
  ) {
    console.log(message);

    if (overview === "employee-general-overview") {
      if (responsible === "detail-note") {
        setToolTipResponsibility(responsible);
        setToolTipMessage(message);
        setToolTipPaddingTopBottom(1);
        setToolTipPaddingLeftRight(1.5);
        setToolTipDirection(direction);
      }

      if (responsible === "edit-note") {
        setToolTipResponsibility(responsible);
        setToolTipMessage(message);
        setToolTipPaddingTopBottom(1);
        setToolTipPaddingLeftRight(1.5);
        setToolTipDirection(direction);
      }

      if (responsible === "delete-note") {
        setToolTipResponsibility(responsible);
        setToolTipMessage(message);
        setToolTipPaddingTopBottom(1);
        setToolTipPaddingLeftRight(1.5);
        setToolTipDirection(direction);
      }

      timeRef.current = window.setTimeout(() => {
        showGeneralToolTip(employeeId, overview);
      }, 1500);
    } else {
      if (responsible === "edit-note") {
        setToolTipResponsibility(responsible);
        setToolTipMessage(message);
        setToolTipPaddingTopBottom(1);
        setToolTipPaddingLeftRight(1.5);
        setToolTipDirection(direction);
      }

      if (responsible === "delete-note") {
        setToolTipResponsibility(responsible);
        setToolTipMessage(message);
        setToolTipPaddingTopBottom(1);
        setToolTipPaddingLeftRight(1.5);
        setToolTipDirection(direction);
      }

      timeRef.current = window.setTimeout(() => {
        showSingleToolTip(employeeId, overview);
      }, 1500);
    }
  }

  function showGeneralToolTip(employeeId: number, overview: string) {
    setToolTipEmployeeId(employeeId);
    setToolTipArea(overview);
  }

  function showSingleToolTip(employeeId: number, overview: string) {
    setToolTipEmployeeId(employeeId);
    setToolTipArea(overview);
  }

  function hiddenToolTip() {
    setToolTipEmployeeId(0);
    setToolTipPaddingTopBottom(0);
    setToolTipPaddingLeftRight(0);
    setToolTipMessage("");
    clearTimeout(timeRef.current);
    setToolTipDirection("");
  }

  function openSingleEmployeePreview(id: number) {
    setPopUpWidthHeightObject({
      ...popUpWidthHeightObject,
      width: 50,
      height: 75,
    });
    console.log(id);

    const findCurrenEmployee = employeesStorageArray.find((employee) => {
      return employee.id === id;
    });
    console.log(findCurrenEmployee);

    if (findCurrenEmployee) {
      setCurrentEmployeeObject({
        ...currentEmployeeObject,
        selectedEmployeeId: findCurrenEmployee.id,
        salutation: findCurrenEmployee.salutation,
        firstName: findCurrenEmployee.first_name,
        lastName: findCurrenEmployee.last_name,
        age: findCurrenEmployee.age,
        street: findCurrenEmployee.street,
        streetNumber: findCurrenEmployee.street_number,
        PLZ: findCurrenEmployee.PLZ,
        city: findCurrenEmployee.city,
        mail: findCurrenEmployee.mail,
        handy: findCurrenEmployee.handy,
        remark: findCurrenEmployee.note,
      });
    }

    setEmployeeValueAdministration({
      ...employeeValueAdministration,
      selectedEmployeeId: id,
    });
    setSingleEmployeePopUp(true);
  }

  async function closeSingleEmployeePreview() {
    const { data } = await supabase.from("Employees").select().order("id");

    if (data) {
      setEmployeesStorageArray(data);
    }

    setCurrentEmployeeObject({
      ...currentEmployeeObject,
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
    setPopUpWidthHeightObject({
      ...popUpWidthHeightObject,
      width: 0,
      height: 0,
    });
    setSingleEmployeePopUp(false);
    resetEmployee();
    setToastyObject({
      ...toastyObject,
      area: "",
      message: "",
      status: 0,
      z_index: 0,
    });
  }

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

  /*function updateSingleEmployee(id: number) {
    setEmployeeValueAdministration({
      ...employeeValueAdministration,
      selectedEmployeeId: id,
    });

    setUpdateEmployeeForm(true);
    setSingleEmployeePopUp(false);

    //const { data } = await supabase.from("Orders").select().order("id");
    //console.log(data);

    if (data) {
      setOrdersStorageArray(data);
    }
  }*/

  /*function opendeleteSingleEmployeePopUp(id: number) {
    setEmployeeValueAdministration({
      ...employeeValueAdministration,
      selectedEmployeeId: id,
    });

    setDeleteEmployeePopUp(true);
    setSingleEmployeePopUp(false);
  }*/

  function openDeleteEmployeePopUp(id: number) {
    setPopUpWidthHeightObject({
      ...popUpWidthHeightObject,
      width: 50,
      height: 75,
    });
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
    const { error } = await supabase.from("Employees").delete().eq("id", id);

    if (error?.code !== "42703") {
      setDeleteEmployeePopUp(false);

      showEmployeesUpdate();

      setToastyObject({
        ...toastyObject,
        area: "employee",
        message: "Mitarbeiter wurde erfolgreich entfernt.",
        status: 1,
        z_index: 0,
      });
      autoHiddenToasty();
    } else {
      setToastyObject({
        ...toastyObject,
        area: "employee",
        message: "Mitarbeiter entfernen fehlgeschlagen.",
        status: -1,
        z_index: 1,
      });
      autoHiddenToasty();
    }
  }

  function resetEmployee() {
    setEmployeeValueAdministration({
      ...employeeValueAdministration,
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
                className="employees-preview__delete-employee-button button delete-button"
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
      {singleEmployeePopUp && (
        <PopUpComponent>
          <div className="employees-preview__single-employee-div ">
            {" "}
            <svg
              onClick={closeSingleEmployeePreview}
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
            <div className="employees-preview__single-table-div center-content">
              <div className="employees-preview__single-headline-div">
                <p className="employees-preview__single-employee-headline employees-preview__single">
                  Id
                </p>{" "}
                <p className="employees-preview__single-employee-headline employees-preview__single">
                  Anrede
                </p>
                <p className="employees-preview__single-employee-headline employees-preview__single">
                  Vor-/Nachname
                </p>
                <p className="employees-preview__single-employee-headline employees-preview__single">
                  Alter
                </p>
                <p className="employees-preview__single-employee-headline employees-preview__single">
                  Straße/Nummer
                </p>{" "}
                <p className="employees-preview__single-employee-headline employees-preview__single">
                  PLZ
                </p>
                <p className="employees-preview__single-employee-headline employees-preview__single">
                  Ort/Stadt
                </p>
                <p className="employees-preview__single-employee-headline employees-preview__single">
                  E-Mail
                </p>
                <p className="employees-preview__single-employee-headline employees-preview__single">
                  Handy
                </p>
                <p className="employees-preview__single-employee-headline employees-preview__single">
                  Bemerkung
                </p>
              </div>
              <div className="employees-preview__single-info-div">
                <div className="employees-preview__single-employee-info employees-preview__single-employee-id-info number">
                  {currentEmployeeObject.selectedEmployeeId}{" "}
                </div>
                <div className="employees-preview__single-employee-info employees-preview__single-employee-salutation-info">
                  {currentEmployeeObject.salutation}{" "}
                </div>
                <div className="employees-preview__single-employee-info employees-preview__single-employee-name-info">
                  {currentEmployeeObject.firstName}{" "}
                  {currentEmployeeObject.lastName}
                </div>
                <div className="employees-preview__single-employee-info employees-preview__single-employee-age-info number">
                  <span>
                    {new Date(currentEmployeeObject.age).toLocaleDateString(
                      "de-DE",
                      { dateStyle: "medium" }
                    )}
                  </span>
                  <span>{calculateEmployeeAge(currentEmployeeObject.age)}</span>
                </div>
                <div className="employees-preview__single-employee-info employees-preview__single-employee-street-info">
                  {currentEmployeeObject.street}{" "}
                  {currentEmployeeObject.streetNumber}
                </div>{" "}
                <div className="employees-preview__single-employee-info employees-preview__single-employee-PLZ-info number">
                  {currentEmployeeObject.PLZ}
                </div>{" "}
                <div className="employees-preview__single-employee-info employees-preview__single-employee-city-info">
                  {currentEmployeeObject.city}
                </div>{" "}
                <div className="employees-preview__single-employee-info employees-preview__single-employee-mail-info">
                  {currentEmployeeObject.mail}
                </div>
                <div className="employees-preview__single-employee-info employees-preview__single-employee-handy-info number">
                  {currentEmployeeObject.handy}
                </div>
                <div
                  style={{
                    padding: currentEmployeeObject.remark === "" ? "" : "0",
                  }}
                  className="employees-preview__single-employee-info employees-preview__single-employee-note-info"
                >
                  {currentEmployeeObject.remark}
                </div>
              </div>
            </div>
          </div>
        </PopUpComponent>
      )}
      <div className="employees-preview__table-div center-content-column">
        <button
          onClick={() => {
            setPopUpWidthHeightObject({
              ...popUpWidthHeightObject,
              width: 60,
              height: 90,
            });
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
          <h2 className="employees-preview__headline employees-preview__name">
            Name
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
                <div className="employees-preview__employee-info employees-preview__name-info">
                  {employee.salutation} {employee.first_name}{" "}
                  {employee.last_name}
                </div>
                <div className="employees-preview__employee-info employees-preview__age-info">
                  {calculateEmployeeAge(employee.age)}
                </div>
                <div className="employees-preview__employee-info employees-preview__note-info">
                  {employee.note}
                </div>
                <div className="employees-preview__employee-info employees-preview__options-div center-content">
                  <button
                    onClick={() => {
                      openSingleEmployeePreview(employee.id);
                    }}
                    className="employees-preview__detail-button button"
                  >
                    <div className="employees-preview__action-employee-tool-tip-div">
                      {toolTipArea === "employee-general-overview" &&
                        toolTipResponsibility === "detail-note" &&
                        toolTipEmployeeId === employee.id && (
                          <ToolTip
                            toolTippDirection={toolTippDirection}
                            toolTipPaddingTopBottom={toolTipPaddingTopBottom}
                            toolTipPaddingLeftRight={toolTipPaddingLeftRight}
                          >
                            {toolTipMessage}
                          </ToolTip>
                        )}
                      <svg
                        onMouseEnter={() => {
                          toolTipPrepare(
                            "employee-general-overview",
                            "detail-note",
                            employee.id,
                            "Zur Detailansicht",
                            "left"
                          );
                        }}
                        onMouseLeave={hiddenToolTip}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="employees-preview__detail-icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                        />
                      </svg>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setPopUpWidthHeightObject({
                        ...popUpWidthHeightObject,
                        width: 60,
                        height: 90,
                      });

                      setFailInMail(1);

                      updateEmployee(employee.id);
                    }}
                    className="employees-preview__edit-button button"
                  >
                    {" "}
                    <div className="employees-preview__action-order-tool-tip-div">
                      {toolTipArea === "employee-general-overview" &&
                        toolTipResponsibility === "edit-note" &&
                        toolTipEmployeeId === employee.id && (
                          <ToolTip
                            toolTippDirection={toolTippDirection}
                            toolTipPaddingTopBottom={toolTipPaddingTopBottom}
                            toolTipPaddingLeftRight={toolTipPaddingLeftRight}
                          >
                            {toolTipMessage}
                          </ToolTip>
                        )}
                      <svg
                        onMouseEnter={() => {
                          toolTipPrepare(
                            "employee-general-overview",
                            "edit-note",
                            employee.id,
                            "Mitarbeiter bearbeiten",
                            "left"
                          );
                        }}
                        onMouseLeave={hiddenToolTip}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="employees-preview__edit-icon"
                      >
                        <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                      </svg>
                    </div>
                  </button>{" "}
                  <button
                    onClick={() => {
                      openDeleteEmployeePopUp(employee.id);
                    }}
                    className="employees-preview__delete-button button"
                  >
                    <div className="employees-preview__action-employee-tool-tip-div">
                      {toolTipArea === "employee-general-overview" &&
                        toolTipResponsibility === "delete-note" &&
                        toolTipEmployeeId === employee.id && (
                          <ToolTip
                            toolTippDirection={toolTippDirection}
                            toolTipPaddingTopBottom={toolTipPaddingTopBottom}
                            toolTipPaddingLeftRight={toolTipPaddingLeftRight}
                          >
                            {toolTipMessage}
                          </ToolTip>
                        )}
                      <svg
                        onMouseEnter={() => {
                          toolTipPrepare(
                            "employee-general-overview",
                            "delete-note",
                            employee.id,
                            "Mitarbeiter entfernen",
                            "left"
                          );
                        }}
                        onMouseLeave={hiddenToolTip}
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
                    </div>
                  </button>{" "}
                </div>
              </div>
            );
          })}{" "}
        </div>
      </div>
      <Toasty
        toastyArea={toastyObject.area}
        toastyStatus={toastyObject.status}
        toastyZIndex={toastyObject.z_index}
      >
        {toastyObject.message}
      </Toasty>
    </div>

    /*     <p className="employees-preview__single-employee-headline employees-preview__single">
                  Aktionen
                </p>
                
                <div className="employees-preview__single-employee-info employees-preview__single-employee-options-div center-content">
                  <div className="employees-preview__single-employee-button-div center-content">
                    <div className="employees-preview__single-action-order-tool-tip-div">
                      {toolTipArea === "employee-single-overview" &&
                        toolTipResponsibility === "edit-note" &&
                        toolTipEmployeeId ===
                          currentEmployeeObject.selectedEmployeeId && (
                          <ToolTip
                            toolTippDirection={toolTippDirection}
                            toolTipMessageWidth={toolTipMessageWidth}
                            toolTipMessageHeight={toolTipMessageHeight}
                          >
                            {toolTipMessage}
                          </ToolTip>
                        )}
                      <svg
                        onClick={() => {
                          updateSingleEmployee(
                            currentEmployeeObject.selectedEmployeeId
                          );
                        }}
                        onMouseEnter={() => {
                          toolTipPrepare(
                            "employee-single-overview",
                            "edit-note",
                            currentEmployeeObject.selectedEmployeeId,
                            "Auftrag bearbeiten",
                            "right"
                          );
                        }}
                        onMouseLeave={hiddenToolTip}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="orders-preview__edit-icon hover"
                      >
                        <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                      </svg>
                    </div>

                    <div className="employees-preview__single-action-employee-tool-tip-div">
                      {toolTipArea === "employee-single-overview" &&
                        toolTipResponsibility === "delete-note" &&
                        toolTipEmployeeId ===
                          currentEmployeeObject.selectedEmployeeId && (
                          <ToolTip
                            toolTippDirection={toolTippDirection}
                            toolTipMessageWidth={toolTipMessageWidth}
                            toolTipMessageHeight={toolTipMessageHeight}
                          >
                            {toolTipMessage}
                          </ToolTip>
                        )}
                      <svg
                        onClick={() => {
                          opendeleteSingleEmployeePopUp(
                            currentEmployeeObject.selectedEmployeeId
                          );
                        }}
                        onMouseEnter={() => {
                          toolTipPrepare(
                            "employee-single-overview",
                            "delete-note",
                            currentEmployeeObject.selectedEmployeeId,
                            "Auftrag entfernen",
                            "right"
                          );
                        }}
                        onMouseLeave={hiddenToolTip}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="employees-preview__delete-icon hover"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
    
    <MenuComponent
                    buttons={
                      
                    }
                  /> */
  );
}
