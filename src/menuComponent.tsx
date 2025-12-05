import { ReactElement, useState } from "react";
import "./index.scss";
import "./menuComponent.scss";

export default function MenuComponent({ buttons }: { buttons: ReactElement }) {
  const [menuControl, setMenuControl] = useState<boolean>(false);

  function showToolTip(boolean: boolean) {
    console.log(boolean);

    if (menuControl === true) {
      setMenuControl((menuControl) => !menuControl);
    } else {
      setMenuControl((menuControl) => !menuControl);
    }
  }

  return (
    <div
      onClick={() => {
        showToolTip(menuControl);
      }}
      className={`menu-div hover ${
        menuControl ? "menu-div-active" : "menu-div"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="menu-div__menu-icon menu"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      <div>{menuControl && buttons}</div>
    </div>

    /*
     */
  );
}
