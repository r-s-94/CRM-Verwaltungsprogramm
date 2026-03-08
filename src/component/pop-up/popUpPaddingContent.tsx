import { createContext } from "react";

interface PopUpWidthHeightDatatype {
  popUpWidthHeightObject: PopUpWidthHeightObjectDatatype;
  setPopUpWidthHeightObject: (
    popUpWidthHeightObject: PopUpWidthHeightObjectDatatype
  ) => void;
}

export interface PopUpWidthHeightObjectDatatype {
  width: number;
  height: number;
}

export const popUpWidthHeightContent = createContext<PopUpWidthHeightDatatype>({
  popUpWidthHeightObject: {
    width: 0,
    height: 0,
  },
  setPopUpWidthHeightObject: () => {},
});
