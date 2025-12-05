import { useContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import "../../index.scss";
import "./updateClientComponent.scss";
import { clientsContext } from "../../clientContext";
import PopUpComponent from "../../PopUpComponent";
import "../../PopUpComponent.scss";

export default function UpdateClientComponent({
  showDataUpdate,
  updateClientForm,
  setUpdateClientForm,
}: {
  showDataUpdate: () => void;
  updateClientForm: boolean;
  setUpdateClientForm: (value: boolean) => void;
}) {
  const [correctClientId, setCorrectClientId] = useState<number>(0);
  const {
    clientsStorageArray,
    clientValueAdministration,
    setClientValueAdministration,
  } = useContext(clientsContext);

  useEffect(() => {
    showClient();
  }, [clientValueAdministration.selectedClientId]);

  function showClient() {
    console.log(clientsStorageArray);
    const selectedClient = clientsStorageArray.find((client) => {
      return client.id === clientValueAdministration.selectedClientId;
    });

    console.log(selectedClient);

    if (selectedClient) {
      setClientValueAdministration({
        ...clientValueAdministration,
        firstName: selectedClient.firstName,
        lastName: selectedClient.lastName,
        age: selectedClient.age,
        address: selectedClient.address,
        mail: selectedClient.mail,
      });
      setCorrectClientId(selectedClient.id);
    }
  }

  function closeUpdateClientForm() {
    setUpdateClientForm(false);

    setClientValueAdministration({
      ...clientValueAdministration,
      selectedClientId: 0,
      firstName: "",
      lastName: "",
      age: 0,
      address: "",
      mail: "",
    });
  }

  async function updateClient() {
    const changeDatatypeAge: number = Number(clientValueAdministration.age);

    const {} = await supabase
      .from("Clients")
      .update({
        firstName: clientValueAdministration.firstName,
        lastName: clientValueAdministration.lastName,
        age: changeDatatypeAge,
        address: clientValueAdministration.address,
        mail: clientValueAdministration.mail,
      })
      .eq("id", correctClientId);

    showDataUpdate();

    setClientValueAdministration({
      ...clientValueAdministration,
      selectedClientId: 0,
      firstName: "",
      lastName: "",
      age: 0,
      address: "",
      mail: "",
    });
    setCorrectClientId(0);

    setUpdateClientForm(false);
  }

  /* <div className="client__popup-main-window">
          <div className="client__popup-main-window--popup-message-window">
    </div>
    
    <div className="client__popup-main-window--popup-message-window">
      </div>
    </div>
  */

  return (
    <div className="update-client">
      {updateClientForm && (
        <PopUpComponent>
          <div className="update-client__form">
            {" "}
            <svg
              onClick={closeUpdateClientForm}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="update-client__close-icon hover"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            <div className="update-client__label-and-input-div center-content">
              <div className="update-client__label-div">
                <label className="update-clinet__label label">Vorname:</label>
                <label className="update-clinet__label label">Nachname:</label>
                <label className="update-clinet__label label">
                  Geburtsdatum:
                </label>
                <label className="update-clinet__label label">Adresse: </label>
                <label className="update-clinet__label label">E-Mail: </label>
              </div>
              <div className="update-client__input-div">
                <div className="update-client__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="update-client__first-name input"
                    value={clientValueAdministration.firstName}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        firstName: event.target.value.trimStart(),
                      });
                    }}
                  />{" "}
                  * Pflichtfeld{" "}
                </div>

                <div className="update-client__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="update-client__last-name input"
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

                <div className="update-client__input-info-div">
                  <input
                    type="date"
                    name=""
                    id=""
                    className="update-client__age input"
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
                  * Pflichtfeld mind. 18 Jahre
                </div>

                <div className="update-client__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="update-client__adress input"
                    value={clientValueAdministration.address}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        address: event.target.value.trimStart(),
                      });
                    }}
                  />{" "}
                  * Pflichtfeld
                </div>

                <div className="update-client__input-info-div">
                  <input
                    type="text"
                    name=""
                    className="update-client__mail input"
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
            <div className="update-client__button-div center-content">
              <button
                onClick={closeUpdateClientForm}
                className="update-client__cancel-button button"
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
                onClick={updateClient}
                disabled={
                  clientValueAdministration.firstName.length > 0 &&
                  clientValueAdministration.lastName.length > 0 &&
                  clientValueAdministration.age !== 0 &&
                  clientValueAdministration.address.length > 0 &&
                  clientValueAdministration.mail.length > 0
                    ? false
                    : true
                }
                className={`update-client__edit-client-button button ${
                  clientValueAdministration.firstName.length > 0 &&
                  clientValueAdministration.lastName.length > 0 &&
                  clientValueAdministration.age !== 0 &&
                  clientValueAdministration.address.length > 0 &&
                  clientValueAdministration.mail.length > 0
                    ? "primary-button"
                    : "disbled-button"
                }`}
              >
                Auftraggeber bearbeiten
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="update-client__edit-client-icon"
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
