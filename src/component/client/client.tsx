import { useEffect, useContext, useState } from "react";
import "../../index.scss";
import "./client.scss";
import ClientPreview from "./clientPreview";
import { clientsContext } from "./clientContext";
import NewClient from "./newClient";
import UpdateClient from "./updateClient";

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
      <NewClient
        showDataUpdate={loadClients}
        newClientForm={newClientForm}
        setNewClientForm={setNewClientForm}
        failInMail={failInMail}
        setFailInMail={setFailInMail}
      />

      <UpdateClient
        showDataUpdate={loadClients}
        updateClientForm={updateClientForm}
        setUpdateClientForm={setUpdateClientForm}
        failInMail={failInMail}
        setFailInMail={setFailInMail}
      />

      <h1 className="client__headline">Auftraggeber</h1>

      <ClientPreview
        setNewClientForm={setNewClientForm}
        showClientsUpdate={loadClients}
        setUpdateClientForm={setUpdateClientForm}
        setFailInMail={setFailInMail}
      />
    </div>
  );
}
