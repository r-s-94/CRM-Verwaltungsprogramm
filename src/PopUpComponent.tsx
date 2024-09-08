import React from "react";
import "./PopUpComponent.scss";

export default function PopUpComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="popup-main-window">
      <div className="popup-main-window__popup-message-window">{children}</div>
    </div>
  );
}
/*
 */
