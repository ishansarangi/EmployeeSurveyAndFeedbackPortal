import React, {useState, useContext, useEffect, createContext} from 'react';
import Cookies from 'js-cookie';

const AuthUserContext = createContext();
const cookieName = 'FeedbackUserLogged';

export const AuthUserProvider = ({children}) => {
  const cookieLogged = Cookies.getJSON(cookieName);

  const [loggedInUser, setLoggedInUser] = useState(
    cookieLogged ? cookieLogged.loggedInUser : null
  );

  useEffect(() => {
    if (loggedInUser) {
      Cookies.set(cookieName, {loggedInUser: loggedInUser});
    } else {
      Cookies.remove(cookieName);
    }
  }, [loggedInUser]);

  return (
    <AuthUserContext.Provider value={{loggedInUser, setLoggedInUser}}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUser = () => {
  return useContext(AuthUserContext);
};
