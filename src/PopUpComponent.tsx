import React from "react";
import "./index.scss";
import "./PopUpComponent.scss";

export default function PopUpComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="popup-window-div center-content">
      <div className="popup-window-div__popup-dialog-div ">{children}</div>
    </div>
  );
}
/*
 */
