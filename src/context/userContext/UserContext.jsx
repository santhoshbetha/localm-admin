import { useState, createContext } from "react";

export const UserListDataContext = createContext();

export function UserListDataContextProvider( props ) {
  const [userListData, setUserListData] = useState([]);

  return (
    <UserListDataContext.Provider
      value={{
        userListData,
        setUserListData
      }}
    >
        {props.children}
    </UserListDataContext.Provider>
  );
}
