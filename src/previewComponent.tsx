import { Link, Outlet, useNavigate } from "react-router-dom";
import "./index.scss";
import "./previewComponent.scss";
import { supabase } from "./supabase";
import { Session } from "@supabase/supabase-js";
import { useContext, useEffect, useState } from "react";
import Logo from "./assets/Logo.jpg";
import { toastyContent } from "./toastyContext";
import Toasty from "./toasty";
//import { Auth } from "@supabase/auth-ui-react";
//import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function PreviewComponent() {
  const { toastyObject, setToastyObject, autoHiddenToasty } =
    useContext(toastyContent);
  const [session, setSession] = useState<Session | null>(null);
  const [userMail, setUserMail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [showHiddenPassword, setShowHiddenPassword] = useState<boolean>(true);
  const [textPasswordOption, setTextPasswordOption] =
    useState<string>("password");
  const navigate = useNavigate();

  /*{
  authorizedUser,
  setAuthorizedUser,
}: {
  authorizedUser: boolean | null;
  setAuthorizedUser: (value: boolean | null) => void;
}*/

  useEffect(() => {
    fetchSession();
    //fetchAuthorized();
  }, []);

  /* {" "}
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
        />
  
  */

  async function fetchSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log(error);
    } else {
      setSession(data.session);
      console.log(data);
    }
  }

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email: userMail,
      password: userPassword,
    });

    if (error?.status !== 400 || error?.code !== "invalid_credentials") {
      fetchSession();
      //fetchAuthorized();
      setToastyObject({
        ...toastyObject,
        area: "employee",
        message: "Erfolgreich angemeldet.",
        status: 1,
        z_index: 0,
      });
      autoHiddenToasty();
      navigate("employees");
      setUserMail("");
      setUserPassword("");
    } else {
      //fetchAuthorized();
      setToastyObject({
        ...toastyObject,
        area: "login",
        message: "Login fehlgeschlagen: Ungültige Zugangsdaten.",
        status: -1,
        z_index: 0,
      });
      autoHiddenToasty();
      setUserMail("");
      setUserPassword("");
    }
  }

  function controlShowHiddenPassword(showHiddenPassword: boolean) {
    if (showHiddenPassword) {
      setTextPasswordOption("text");
    } else {
      setTextPasswordOption("password");
    }

    setShowHiddenPassword(!showHiddenPassword);
  }

  const [failInMail, setFailInMail] = useState<number>(0);

  function checkMailContent() {
    if (userMail.includes("@") && !userMail.includes(" ")) {
      setFailInMail(1);
    } else {
      setFailInMail(1);
      setToastyObject({
        ...toastyObject,
        area: "login",
        message: "Ungültige E-Mail (@ erforderlich, kein(e) Leerzeichen(en))",
        status: -1,
        z_index: 1,
      });
      autoHiddenToasty();
    }
  }

  /*async function fetchAuthorized() {
    const { data, error } = await supabase
      .from("user_permission")
      .select()
      .order("id");
                                                                                                                                                                                                                                  
    if (data) {
      console.log(data);
      setAuthorizedUser(data[0].order_authorized);
    }
  }*/

  async function logOut() {
    const {} = await supabase.auth.signOut();

    setSession(null);
    navigate("/");
    setToastyObject({
      ...toastyObject,
      area: "login",
      message: "Erfolgreich abgemeldet.",
      status: 1,
      z_index: 0,
    });
    autoHiddenToasty();
  }

  if (session) {
    return (
      <div className="preview-component">
        <div className="preview-component__navbar-logo-div">
          <div className="preview-component__logo-div">
            <img src={Logo} className="preview-component__logo" alt="" />
            <h2 className="preview-component__headline">
              Client <wbr /> Nexus <wbr /> CRM
            </h2>
          </div>

          <div className="preview-component__nav-bar center-content-column">
            <Link
              to="employees"
              className="preview-component__link center-content-left link hover"
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="preview-component__employee-icon icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                />
              </svg>
              Mitarbeiter
            </Link>

            <Link
              to="clients"
              className="preview-component__link center-content-left link hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="preview-component__client-icon icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                />
              </svg>
              Auftraggeber
            </Link>

            <Link
              to="orders"
              className="preview-component__link center-content-left link hover"
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="preview-component__order-icon icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>{" "}
              Aufträge
            </Link>

            <Link
              to="companyreport"
              className="preview-component__link center-content-left link hover"
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="preview-component__company-report-icon icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                />
              </svg>
              Firmenbilanz
            </Link>
          </div>

          <button
            onClick={logOut}
            className="preview-component__logout-link center-content-left link hover"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="preview-component__logout-icon icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            Ausloggen
          </button>
        </div>

        <div className="preview-component__outlet">
          <Outlet />
        </div>
      </div>
    );
  } else {
    return (
      <div className="login">
        <div className="login__headline-div center-content-column">
          {" "}
          <img src={Logo} className="login__logo" alt="" />
          <h2 className="login__headline"> Client Nexus CRM</h2>
        </div>

        <div className="login__login-div center-content-column">
          <p className="login__mini-headline">LogIn</p>{" "}
          <input
            type="text"
            name=""
            value={userMail}
            onChange={(event) => {
              setFailInMail(0);
              console.log(event.target.value);
              setUserMail(event.target.value);
            }}
            onBlur={checkMailContent}
            className="login__input-mail"
            placeholder="Benutzername/E-Mail"
          />
          <input
            type={textPasswordOption}
            name=""
            value={userPassword}
            onChange={(event) => {
              console.log(event.target.value);
              setUserPassword(event.target.value);
            }}
            className="login__input-password"
            placeholder="Passwort"
          />
          <div className="login__password-control-div center-content">
            <input
              type="checkbox"
              onClick={() => {
                controlShowHiddenPassword(showHiddenPassword);
              }}
              name=""
              id=""
            />
            Passwort anzeigen
          </div>
          <button
            onClick={signIn}
            disabled={
              userMail.length > 3 && failInMail === 1 && userPassword.length > 3
                ? false
                : true
            }
            className={`login__login-button ${
              userMail.length > 3 && failInMail === 1 && userPassword.length > 3
                ? "primary-button"
                : "disabled-button"
            } center-content button `}
          >
            Einloggen
          </button>
        </div>

        <Toasty
          toastyArea={toastyObject.area}
          toastyStatus={toastyObject.status}
          toastyZIndex={toastyObject.z_index}
        >
          {toastyObject.message}
        </Toasty>
      </div>
    );
  }

  /*

  
  
   
            
         
            
            {authorizedUser && (
            <>
              
            </>
          )}
  
  */
}
