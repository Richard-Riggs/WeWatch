import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { v4 as uuid } from 'uuid';

export const UserDataContext = createContext();

export function UserDataProvider({ children }) {
	const [ clientId, setClientId ] = useLocalStorageState('clientId', uuid());
	return <UserDataContext.Provider value={{ clientId }}>{children}</UserDataContext.Provider>;
}
