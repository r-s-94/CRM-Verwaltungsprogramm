import { createContext } from "react";
import { Tables } from "../../database.types";

interface CompanyreportDatatyps {
  companyreportStorageObject: Tables<"Companyreport">;
  setCompanyreportStorageObject: (value: Tables<"Companyreport">) => void;
}

export const companyreportContext = createContext<CompanyreportDatatyps>({
  companyreportStorageObject: {
    id: 0,
    salesVolume: 0,
  },
  setCompanyreportStorageObject: () => {},
});
