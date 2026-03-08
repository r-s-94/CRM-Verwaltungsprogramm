import React, { useContext } from "react";
import "../../index.scss";
import "./popUp.scss";
import { popUpWidthHeightContent } from "./popUpPaddingContent";

export default function PopUp({ children }: { children: React.ReactNode }) {
  const { popUpWidthHeightObject } = useContext(popUpWidthHeightContent);
  return (
    <div className="popup-window-div center-content">
      <div
        style={{
          width: `${popUpWidthHeightObject.width}rem`,
          height: `${popUpWidthHeightObject.height}rem`,
        }}
        className="popup-window-div__popup-dialog-div center-content"
      >
        {children}
      </div>
    </div>
  );
}
/*
 */
