import { useFetch } from '../customHooks/requestAPI'
import { useState } from 'react'
const ROOT_URL = 'http://localhost:3000';
 
export async function LoginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  };
 
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch(`${ROOT_URL}/user/login`, requestOptions);
    let data = await response.json();
    console.log("data getted", data);
    if (data.success) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      return data.user;
    }
    dispatch({ type: 'LOGIN_ERROR', error: data.error });
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error:error.message });
  }
}
 
export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}