import { createContext } from "react";

export interface ToastyContentDatatype {
  toastyObject: ToastyObject;
  setToastyObject: (toastyObject: ToastyObject) => void;
  autoHiddenToasty: () => void;
}

export interface ToastyObject {
  area: string;
  message: string;
  status: number;
  z_index: number;
}

/*  status:
    1 = positive Meldung
    0 = neutral 
   -1 = negative Meldung

*/

export const toastyContent = createContext<ToastyContentDatatype>({
  toastyObject: {
    area: "",
    message: "",
    status: 0,
    z_index: 0,
  },
  setToastyObject: () => {},
  autoHiddenToasty: () => {},
});
