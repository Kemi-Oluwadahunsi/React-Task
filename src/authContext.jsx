import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //TODO
      const { user, token, role } = action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      return {
        ...state,
        isAuthenticated: true,
        user,
        token,
        role,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // React.useEffect(() => {
  //   //TODO
  // }, []);
  React.useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            "https://reacttask.mkdlabs.com/v2/api/lambda/check",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-project":
                  "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ role: "admin" }),
            }
          );
          if (response.ok) {
            // Token is valid
            const json = await response.json();
            dispatch({
              type: "LOGIN",
              payload: {
                user: json.user,
                token,
                role: json.role,
              },
            });
          } else {
            // Token is not valid
            dispatch({ type: "LOGOUT" });
          }
        } catch (error) {
          console.error("Error validating token:", error);
          dispatch({ type: "LOGOUT" });
        }
      }
    };

    checkTokenValidity();
  }, []);



  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
