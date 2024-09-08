import { useContext, useState } from "react";
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
  const [newClientPopUpMessage, setNewClientPopUpMessage] =
    useState<string>("");
  const [newClientMessagePopUp, setNewClientMessagePopUp] =
    useState<boolean>(false);

  function openNewClientGenerallyMessagePopUp() {
    setNewClientPopUpMessage("Bitte alle * Pflichtfelder ausfühlen.");
  }

  function openNewClientAgeMessagePopUp() {
    setNewClientPopUpMessage(
      "Der neue Auftraggeber muss mindestens 18 Jahre alt sein."
    );
  }

  function closeNewClientForm() {
    setNewClientForm(false);
    //setNewClientMessagePopUp(false);
  }

  function closeNewClientMessagePopUp() {
    setNewClientForm(true);
    setNewClientMessagePopUp(false);
  }

  async function addClientToTable() {
    const clientAgeNumber: number = Number(clientValueAdministration.age);

    if (
      clientValueAdministration.firstName !== "" &&
      clientValueAdministration.lastName !== "" &&
      clientValueAdministration.age !== "" &&
      clientValueAdministration.address !== "" &&
      clientValueAdministration.mail !== ""
    ) {
      if (clientValueAdministration.age >= "18") {
        const {} = await supabase.from("Clients").insert({
          Vorname: clientValueAdministration.firstName,
          Nachname: clientValueAdministration.lastName,
          Alter: clientAgeNumber,
          Adresse: clientValueAdministration.address,
          Mail: clientValueAdministration.mail,
        });

        showDataUpdate();

        setNewClientForm(false);

        setClientValueAdministration({
          ...clientValueAdministration,
          firstName: "",
          lastName: "",
          age: "",
          address: "",
          mail: "",
        });
      } else {
        openNewClientAgeMessagePopUp();

        setNewClientMessagePopUp(true);
        setNewClientForm(false);
      }
    } else {
      openNewClientGenerallyMessagePopUp();

      setNewClientMessagePopUp(true);
      setNewClientForm(false);
    }
  }

  /* <div className="client__popup-main-window">
          <div className="client__popup-main-window--popup-message-window">
     </div>
        </div>
      <div className="client__popup-main-window--popup-message-window"></div>
  */

  return (
    <div className="new-client">
      {newClientMessagePopUp && (
        <PopUpComponent>
          <div className="new-client__popup-message-div">
            <p className="new-client__popup-message-div--text">
              {newClientPopUpMessage}
            </p>
            <button
              onClick={closeNewClientMessagePopUp}
              className="new-client__popup-message-div--close-button button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="new-client__popup-message-div--close-button--close-icon"
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

      {newClientForm && (
        <PopUpComponent>
          <div className="new-client__form">
            <button
              onClick={closeNewClientForm}
              className="new-client__form--close-button button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="new-client__form--close-button--close-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="new-client__form--label-and-input-container">
              <div className="new-client__form--label-and-input-container--label-section">
                {" "}
                <label className="label">Vorname: </label>{" "}
                <label className="label">Nachname: </label>{" "}
                <label className="label">Alter: </label>{" "}
                <label className="label">Adresse: </label>{" "}
                <label className="label">E-Mail: </label>
              </div>
              <div className="new-client__form--label-and-input-container--input-section">
                <section className="new-client__form--label-and-input-container--input-section--input-info-section">
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
                  />
                  * Pflichtfeld
                </section>
                <section className="new-client__form--label-and-input-container--input-section--input-info-section">
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
                  />
                  * Pflichtfeld
                </section>
                <section className="new-client__form--label-and-input-container--input-section--input-info-section">
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
                  />
                  * Pflichtfeld{" "}
                </section>

                <section className="new-client__form--label-and-input-container--input-section--input-info-section">
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
                  * Pflichtfeld{" "}
                </section>

                <section className="new-client__form--label-and-input-container--input-section--input-info-section">
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
                  />
                  * Pflichtfeld
                </section>
              </div>
            </div>

            <button
              onClick={addClientToTable}
              className="new-client__form--add-button buuton"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="new-client__form--add-button--add-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </PopUpComponent>
      )}
    </div>
  );
}

/* 

*/
