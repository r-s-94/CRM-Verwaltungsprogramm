import React, { useContext } from "react";
import "./index.scss";
import "./PopUpComponent.scss";
import { popUpWidthHeightContent } from "./popUpPaddingContent";

export default function PopUpComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { popUpWidthHeightObject } = useContext(popUpWidthHeightContent);
  return (
    <div className="popup-window-div center-content">
      <div
        style={{
          width: `${popUpWidthHeightObject.width}rem`,
          height: `${popUpWidthHeightObject.height}vh`,
        }}
        className="popup-window-div__popup-dialog-div"
      >
        {children}
      </div>
    </div>
  );
}
/*
 */
