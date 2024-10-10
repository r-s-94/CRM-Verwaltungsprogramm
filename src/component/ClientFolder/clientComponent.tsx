import { useEffect, useContext, useState } from "react";
import "./clientComponent.scss";
import ClientPreviewComponent from "./clientPreviewComponent";
import { clientsContext } from "../../clientContext";
import NewClientComponent from "./newClientComponent";
import UpdateClientComponent from "./updateClientComponent";

export default function ClientsComponent() {
  const { loadClients, clientValueAdministration } = useContext(clientsContext);
  const [newClientForm, setNewClientForm] = useState<boolean>(false);
  const [updateClientForm, setUpdateClientForm] = useState<boolean>(false);

  useEffect(() => {
    loadClients();
  }, [clientValueAdministration.selectedClientId]);

  function showNewClientForm() {
    setNewClientForm(true);
  }

  return (
    <div className="client">
      <NewClientComponent
        showDataUpdate={loadClients}
        newClientForm={newClientForm}
        setNewClientForm={setNewClientForm}
      />

      <UpdateClientComponent
        showDataUpdate={loadClients}
        updateClientForm={updateClientForm}
        setUpdateClientForm={setUpdateClientForm}
      />

      <h1 className="client__headline">Auftraggeber</h1>
      <button
        onClick={showNewClientForm}
        className="client__create-client-button"
      >
        Auftrageber erstellen
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="client__create-client-button--new-client-icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>

      <ClientPreviewComponent
        showClientsUpdate={loadClients}
        setUpdateClientForm={setUpdateClientForm}
      />
    </div>
  );
}
