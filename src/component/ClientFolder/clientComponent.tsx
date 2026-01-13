import { useEffect, useContext, useState } from "react";
import "../../index.scss";
import "./clientComponent.scss";
import ClientPreviewComponent from "./clientPreviewComponent";
import { clientsContext } from "../../clientContext";
import NewClientComponent from "./newClientComponent";
import UpdateClientComponent from "./updateClientComponent";

export default function ClientsComponent() {
  const { loadClients, clientValueAdministration } = useContext(clientsContext);
  const [newClientForm, setNewClientForm] = useState<boolean>(false);
  const [updateClientForm, setUpdateClientForm] = useState<boolean>(false);
  const [failInMail, setFailInMail] = useState<number>(0);

  useEffect(() => {
    loadClients();
  }, [clientValueAdministration.selectedClientId]);

  return (
    <div className="client">
      <NewClientComponent
        showDataUpdate={loadClients}
        newClientForm={newClientForm}
        setNewClientForm={setNewClientForm}
        failInMail={failInMail}
        setFailInMail={setFailInMail}
      />

      <UpdateClientComponent
        showDataUpdate={loadClients}
        updateClientForm={updateClientForm}
        setUpdateClientForm={setUpdateClientForm}
        failInMail={failInMail}
        setFailInMail={setFailInMail}
      />

      <h1 className="client__headline">Auftraggeber</h1>

      <ClientPreviewComponent
        setNewClientForm={setNewClientForm}
        showClientsUpdate={loadClients}
        setUpdateClientForm={setUpdateClientForm}
        failInMail={failInMail}
        setFailInMail={setFailInMail}
      />
    </div>
  );
}
