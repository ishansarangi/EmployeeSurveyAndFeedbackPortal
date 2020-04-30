/**
 * Copyright 2020 Ishan Kumar Sarangi, Sabyasachi Mohanty, Kumar Prabhu Kalyan, Alsha Samantaray, Kirti Jha
 * Copyright 2020 Arizona State University
 * Copyright 2020 TalentMap
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

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
