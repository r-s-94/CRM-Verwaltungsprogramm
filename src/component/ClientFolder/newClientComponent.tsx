import { useContext } from "react";
import "../../index.scss";
import "./newClientComponent.scss";
import { supabase } from "../../supabase";
import { clientsContext } from "../../clientContext";
import PopUpComponent from "../../PopUpComponent";
import "../../PopUpComponent.scss";

export default function NewClientComponent({
  showDataUpdate,
  newClientForm,
  setNewClientForm,
}: {
  showDataUpdate: () => void;
  newClientForm: boolean;
  setNewClientForm: (value: boolean) => void;
}) {
  /*  
  
  */

  const { clientValueAdministration, setClientValueAdministration } =
    useContext(clientsContext);

  function closeNewClientForm() {
    setNewClientForm(false);

    setClientValueAdministration({
      ...clientValueAdministration,
      firstName: "",
      lastName: "",
      age: 0,
      address: "",
      mail: "",
    });
  }

  async function addClientToTable() {
    const {} = await supabase.from("Clients").insert({
      firstName: clientValueAdministration.firstName,
      lastName: clientValueAdministration.lastName,
      age: clientValueAdministration.age,
      address: clientValueAdministration.address,
      mail: clientValueAdministration.mail,
    });

    showDataUpdate();

    setNewClientForm(false);

    setClientValueAdministration({
      ...clientValueAdministration,
      firstName: "",
      lastName: "",
      age: 0,
      address: "",
      mail: "",
    });
  }

  /*
   */

  return (
    <div className="new-client">
      {newClientForm && (
        <PopUpComponent>
          <div className="new-client__form">
            <svg
              onClick={closeNewClientForm}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="new-client__close-icon hover"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>

            <div className="new-client__label-and-input-div center-content">
              <div className="new-client__label-div">
                {" "}
                <label className="new-clinet__label label">
                  Vorname:{" "}
                </label>{" "}
                <label className="new-clinet__label label">Nachname: </label>{" "}
                <label className="new-clinet__label label">
                  Geburtsdatum:{" "}
                </label>{" "}
                <label className="new-clinet__label label">Adresse: </label>{" "}
                <label className="new-clinet__label label">E-Mail: </label>
              </div>
              <div className="new-client__input-div">
                <div className="new-client__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="new-client__first-name input"
                    value={clientValueAdministration.firstName}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        firstName: event.target.value.trimStart(),
                      });
                    }}
                  />{" "}
                  * Pflichtfeld
                </div>
                <div className="new-client__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="new-client__last-name input"
                    value={clientValueAdministration.lastName}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        lastName: event.target.value.trimStart(),
                      });
                    }}
                  />{" "}
                  * Pflichtfeld
                </div>
                <div className="new-client__input-info-div">
                  <input
                    type="date"
                    name=""
                    id=""
                    className="new-client__age input"
                    value={
                      clientValueAdministration.age !== 0
                        ? clientValueAdministration.age
                        : ""
                    }
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        age: Number(event.target.value.trimStart()),
                      });
                    }}
                  />{" "}
                  * Pflichtfeld mind. 18 Jahre{" "}
                </div>

                <div className="new-client__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="new-client__adress input"
                    value={clientValueAdministration.address}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        address: event.target.value.trimStart(),
                      });
                    }}
                  />{" "}
                  * Pflichtfeld{" "}
                </div>

                <div className="new-client__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="new-client__mail input"
                    value={clientValueAdministration.mail}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        mail: event.target.value.trimStart(),
                      });
                    }}
                  />{" "}
                  * Pflichtfeld
                </div>
              </div>
            </div>

            <div className="new-client__button-div center-content">
              <button
                onClick={closeNewClientForm}
                className="new-client__cancel-button button"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="new-client__cancel-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
                abbrechen
              </button>{" "}
              <button
                onClick={addClientToTable}
                disabled={
                  clientValueAdministration.firstName.length > 0 &&
                  clientValueAdministration.lastName.length > 0 &&
                  clientValueAdministration.age !== 0 &&
                  clientValueAdministration.address.length > 0 &&
                  clientValueAdministration.mail.length > 0
                    ? false
                    : true
                }
                className={`new-client__new-client-button button ${
                  clientValueAdministration.firstName.length > 0 &&
                  clientValueAdministration.lastName.length > 0 &&
                  clientValueAdministration.age !== 0 &&
                  clientValueAdministration.address.length > 0 &&
                  clientValueAdministration.mail.length > 0
                    ? "primary-button"
                    : "disbled-button"
                }`}
              >
                Mitarbeiter anlegen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="new-client__new-client-icon"
                >
                  <path d="M10 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM16.25 5.75a.75.75 0 0 0-1.5 0v2h-2a.75.75 0 0 0 0 1.5h2v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2Z" />
                </svg>
              </button>
            </div>
          </div>
        </PopUpComponent>
      )}
    </div>
  );
}

/* 

*/
