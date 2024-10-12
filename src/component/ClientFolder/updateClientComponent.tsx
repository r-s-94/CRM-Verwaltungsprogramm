import { useContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";
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
  /*  const [updateClientFirstName, setUpdateClientFirstName] =
    useState<string>("");
  const [updateClientLastName, setUpdateClientLastName] = useState<string>("");
  const [updateClientAge, setUpdateClientAge] = useState<string>("");
  const [updateClientAdress, setUpdateClientAdress] = useState<string>("");
  const [updateClientMail, setUpdateClientMail] = useState<string>("");
  
  */

  const [correctClientId, setCorrectClientId] = useState<number>(0);
  const {
    clientsStorageArray,
    clientValueAdministration,
    setClientValueAdministration,
  } = useContext(clientsContext);
  const [updateClientPopUpMessage, setUpdateClientPopUpMessage] =
    useState<string>("");
  const [updateClientMessagePopUp, setUpdateClientMessagePopUp] =
    useState<boolean>(false);

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
      const changeDatatypeString: string = String(selectedClient.age);

      setClientValueAdministration({
        ...clientValueAdministration,
        firstName: selectedClient.firstName,
        lastName: selectedClient.lastName,
        age: changeDatatypeString,
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
      age: "",
      address: "",
      mail: "",
    });
  }

  function openUpdateClientGenerallyPopUp() {
    setUpdateClientPopUpMessage("Bitte alle * Pflichtfelder ausfühlen.");
  }

  function openUpdateClientAgePopUp() {
    setUpdateClientPopUpMessage(
      "Der Auftraggeber muss mindestens 18 Jahre alt sein."
    );
  }

  function closeUpdateClientMessagePopUp() {
    setUpdateClientForm(true);
    setUpdateClientMessagePopUp(false);
  }

  async function updateClient() {
    const changeDatatypeAge: number = Number(clientValueAdministration.age);

    if (
      clientValueAdministration.firstName !== "" &&
      clientValueAdministration.lastName !== "" &&
      clientValueAdministration.age !== "" &&
      clientValueAdministration.address !== "" &&
      clientValueAdministration.mail !== ""
    ) {
      if (clientValueAdministration.age >= "18") {
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
          age: "",
          address: "",
          mail: "",
        });
        setCorrectClientId(0);

        setUpdateClientForm(false);
      } else {
        openUpdateClientAgePopUp();
        setUpdateClientMessagePopUp(true);
        setUpdateClientForm(false);
      }
    } else {
      openUpdateClientGenerallyPopUp();
      setUpdateClientMessagePopUp(true);
      setUpdateClientForm(false);
    }
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
      {updateClientMessagePopUp && (
        <PopUpComponent>
          <div className="update-client__popup-message-div">
            <p className="update-client__popup-message-div--text">
              {updateClientPopUpMessage}
            </p>
            <button
              onClick={closeUpdateClientMessagePopUp}
              className="update-client__popup-message-div--close-button"
            >
              Okay Fenster schließen
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="update-client__popup-message-div--close-button--close-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </PopUpComponent>
      )}

      {updateClientForm && (
        <PopUpComponent>
          <div className="update-client__form">
            <button
              onClick={closeUpdateClientForm}
              className="update-client__form--close-button button"
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="update-client__form--close-button--close-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="update-client__form--label-and-input-container">
              <div className="update-client__form--label-and-input-container--label-section">
                <label className="label">Vorname:</label>
                <label className="label">Nachname:</label>
                <label className="label">Alter:</label>
                <label className="label">Adresse: </label>
                <label className="label">E-Mail: </label>
              </div>
              <div className="update-client__form--label-and-input-container--input-section">
                <section className="update-client__form--label-and-input-container--input-section--input-info-section">
                  <input
                    type="text"
                    name=""
                    className="input-client-first-name input"
                    value={clientValueAdministration.firstName}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        firstName: event.target.value,
                      });
                    }}
                  />{" "}
                  * Pflichtfeld{" "}
                </section>

                <section className="update-client__form--label-and-input-container--input-section--input-info-section">
                  <input
                    type="text"
                    name=""
                    className="input-client-last-name input"
                    value={clientValueAdministration.lastName}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        lastName: event.target.value,
                      });
                    }}
                  />{" "}
                  * Pflichtfeld
                </section>

                <section className="update-client__form--label-and-input-container--input-section--input-info-section">
                  <input
                    type="number"
                    name=""
                    className="input-client-age input"
                    value={clientValueAdministration.age}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        age: event.target.value,
                      });
                    }}
                  />{" "}
                  * Pflichtfeld{" "}
                </section>

                <section className="update-client__form--label-and-input-container--input-section--input-info-section">
                  <input
                    type="text"
                    name=""
                    className="input-client-adress input"
                    value={clientValueAdministration.address}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        address: event.target.value,
                      });
                    }}
                  />{" "}
                  * Pflichtfeld
                </section>

                <section className="update-client__form--label-and-input-container--input-section--input-info-section">
                  <input
                    type="text"
                    name=""
                    className="input-client-mail input"
                    value={clientValueAdministration.mail}
                    onChange={(event) => {
                      setClientValueAdministration({
                        ...clientValueAdministration,
                        mail: event.target.value,
                      });
                    }}
                  />{" "}
                  * Pflichtfeld
                </section>
              </div>
            </div>

            <button
              onClick={updateClient}
              className="update-client__form--edit-button"
            >
              Auftraggeber bearbeiten
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="update-client__form--edit-button--edit-icon"
              >
                <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
              </svg>
            </button>
          </div>
        </PopUpComponent>
      )}
    </div>
  );
}
