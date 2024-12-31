

import { createContext, useContext, useEffect, useReducer } from 'react';



const initialState = {
    // user: localStorage.getItem('user') || null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    role: localStorage.getItem('role') || null,
    token: localStorage.getItem('token') || null,

    // user:null,
    // role:null,
    // token:null
  };
  

// Create context
export const authContext = createContext(initialState);

// Auth reducer to handle state transitions
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        role: null,
        token: null,
      };

    case 'LOGIN_SUCCESS':
      return {
        user: action.payload.user,
        role: action.payload.role,
        token: action.payload.token,
      };

    case 'LOGOUT':
      return {
        user: null,
        role: null,
        token: null,
      };

    default:
      return state;
  }
};

// AuthContextProvider component to wrap children components
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState); // Ensure initial state is passed

  useEffect(()=>{
   localStorage.setItem('user',JSON.stringify(state.user))
    localStorage.setItem('token',JSON.stringify(state.token))
    localStorage.setItem('role',JSON.stringify(state.role))


  },[state])

  // Ensure state is properly initialized before passing to context provider
  const contextValue = {
    user: state?.user || null,
    token: state?.token || null,
    role: state?.role || null,
    dispatch,
  };

  return (
    <authContext.Provider value={{
      user:state.user, 
      token:state.token, 
      role:state.role,
      dispatch}}
      >
      {children}
    </authContext.Provider>
  );
};
