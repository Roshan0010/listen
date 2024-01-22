/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [play, setPlay] = useState(false);
  const [music, setMusic] = useState(null);

  return (
    <UserContext.Provider value={{ play, setPlay, music, setMusic }}>
      {children}
    </UserContext.Provider>
  );
}
