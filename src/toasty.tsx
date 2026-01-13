import "./index.scss";
import "./toasty.scss";

interface ToastyDatatype {
  children: React.ReactNode;
  toastyArea: string;
  toastyStatus: number;
  toastyZIndex: number;
}

export default function Toasty({
  children,
  toastyArea,
  toastyStatus,
  toastyZIndex,
}: ToastyDatatype) {
  return (
    <div
      style={{
        position: "fixed",
        right: `${
          toastyArea === "login" ||
          toastyArea === "employee" ||
          toastyArea === "client" ||
          toastyArea === "order"
            ? 3
            : -5
        }rem`,
        bottom: "3rem",
        padding: "1.5rem",
        zIndex: toastyZIndex,
      }}
      className={`toasty ${
        toastyStatus === 1
          ? "toasty-green"
          : toastyStatus === -1
          ? "toasty-red"
          : ""
      } user-feedback center-content`}
    >
      {children}
    </div>
  );
}
