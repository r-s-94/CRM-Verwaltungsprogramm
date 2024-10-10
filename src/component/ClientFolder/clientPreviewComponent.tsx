import { useContext, useState } from "react";
import { clientsContext } from "../../clientContext";
import { supabase } from "../../supabase";
import "./clientPreviewComponent.scss";
import MenuComponent from "../../menuComponent";
import PopUpComponent from "../../PopUpComponent";

export default function ClientPreviewComponent({
  showClientsUpdate,
  setUpdateClientForm,
}: {
  showClientsUpdate: () => void;
  setUpdateClientForm: (value: boolean) => void;
}) {
  const {
    clientsStorageArray,
    clientValueAdministration,
    setClientValueAdministration,
  } = useContext(clientsContext);
  const [deleteClientPopUp, setDeleteClientPopUp] = useState<boolean>(false);

  function showUpdateClientForm(id: number) {
    console.log(id);
    setClientValueAdministration({
      ...clientValueAdministration,
      selectedClientId: id,
    });

    setUpdateClientForm(true);
  }

  function openDeleteClientPopUp(id: number) {
    setClientValueAdministration({
      ...clientValueAdministration,
      selectedClientId: id,
    });

    setDeleteClientPopUp(true);
  }

  async function deleteClient(id: number) {
    console.log(id);
    const {} = await supabase.from("Clients").delete().eq("id", id);

    setDeleteClientPopUp(false);

    showClientsUpdate();
  }

  function closeshowDeleteClientPopUp() {
    setDeleteClientPopUp(false);
  }

  /*     <div className="clients-preview">
           <div className="client__popup-main-window">
            <div className="client__popup-main-window--popup-message-window">
            </div>
  
    </div>
          </div>
  */

  return (
    <div className="clients-preview">
      {deleteClientPopUp && (
        <PopUpComponent>
          {" "}
          <div className="clients-preview__popup-message-div">
            <p className="clients-preview__popup-message-div--text">
              Soll dieser Auftraggeber wirklich gelöscht werden?
            </p>
            <div className="clients-preview__popup-message-div--button-div">
              <button
                onClick={closeshowDeleteClientPopUp}
                className="clients-preview__popup-message-div--button-div--close-button"
              >
                abbrechen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="clients-preview__popup-message-div--button-div--close-button--close-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <button
                onClick={() => {
                  deleteClient(clientValueAdministration.selectedClientId);
                }}
                className="clients-preview__popup-message-div--button-div--delete-button"
              >
                {" "}
                löschen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="clients-preview__popup-message-div--button-div--delete-button--delete-icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </PopUpComponent>
      )}{" "}
      <table className="clients-preview__table">
        <tr className="clients-preview__table--tr">
          <th className="clients-preview__table--tr--th">Vorname</th>
          <th className="clients-preview__table--tr--th">Nachname</th>
          <th className="clients-preview__table--tr--th">Alter</th>
          <th className="clients-preview__table--tr--th">Adresse</th>
          <th className="clients-preview__table--tr--th">E-Mail</th>
          <th className="clients-preview__table--tr--th">Aktionen</th>
        </tr>

        {clientsStorageArray.map((client) => {
          return (
            <tr className="clients-preview__table--tr">
              <td className="clients-preview__table--tr--td--first-name">
                {client.Vorname}
              </td>
              <td className="clients-preview__table--tr--td--last-name">
                {client.Nachname}
              </td>
              <td className="clients-preview__table--tr--td--age">
                {client.Alter}
              </td>
              <td className="clients-preview__table--tr--td--address">
                {client.Adresse}
              </td>
              <td className="clients-preview__table--tr--td--mail">
                {client.Mail}
              </td>
              <td className="clients-preview__table--tr--td--menu">
                <MenuComponent
                  buttons={
                    <div className="clients-preview__table--tr--td--button-div">
                      <button
                        onClick={() => {
                          showUpdateClientForm(client.id);
                        }}
                        className="clients-preview__table--tr--td--button-div--edit-button button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="clients-preview__table--tr--td--button-div--edit-button--edit-icon"
                        >
                          <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                        </svg>
                      </button>{" "}
                      <button
                        onClick={() => {
                          openDeleteClientPopUp(client.id);
                        }}
                        className="clients-preview__table--tr--td--button-div--delete-button button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="clients-preview__table--tr--td--button-div--delete-button--delete-icon"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>{" "}
                    </div>
                  }
                />
              </td>
            </tr>
          );
        })}
      </table>
    </div>

    /*  {" "}
     */
  );
}
