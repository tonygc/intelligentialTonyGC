import React, { useReducer } from "react";
 
let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;
// let token = localStorage.getItem("currentUser")
//   ? JSON.parse(localStorage.getItem("currentUser")).auth_token
//   : "";
 
export const initialState = {
  userDetails: "" || user,
  //token: "" || token,
  loading: false,
  errorMessage: null
};
 
export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        errorMessage: "",
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        userDetails: action.payload,
        //token: action.payload.auth_token,
        loading: false
      };
    case "LOGOUT":
      return {
        ...initialState,
        userDetails: null,
        //token: ""
      };
 
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
        userDetails:null
      };
 
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};