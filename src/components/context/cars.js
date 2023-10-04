import { createContext, useCallback, useState, useEffect } from "react";

const CarsContext = createContext();

const getInitialData = () => {
  const login = localStorage.getItem("login");
  if(login === "undefined"){
    return false;
  } else {
    return JSON.parse(login); 
  }
}

const getInitialUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : [];
}

function Provider({ children }) {
  //////NAVIGATION//////////
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handler = () => {
      setCurrentPath(window.location.pathname);
    }
    
    window.addEventListener('popstate', handler);

    return () => {
      window.removeEventListener('popstate', handler);
    }
  }, []);

  const navigation = (to) => {
    window.history.pushState({}, '', to);
    setCurrentPath(to);
  };

  ///////LOGIN//////////
  // const [users, setUsers] = useState([]);
  const [login, setLogin] = useState(getInitialData);
  const [currentUser, setCurrentUser] = useState(getInitialUser);

  useEffect(()=>{
    localStorage.setItem("login", JSON.stringify(login));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  })

  //makes login true + localstorage change, use it for login
  const loginApp = () =>{
    setLogin(true);
    setCurrentUser(getInitialUser);
  }

  //sets them back to logout state
  const removeDataFromStorage = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("currentUser");
    setLogin(false);
    setCurrentUser([]);
  }
  
  ///else
  const [name, setName] = useState('');

  const valueToShare = {
    currentPath, 
    navigation,
    login,
    setLogin,
    loginApp,
    currentUser,
    setCurrentUser,
    removeDataFromStorage,
    name, 
    setName
  };

  return (
    <CarsContext.Provider value={valueToShare}>
      {children}
    </CarsContext.Provider>
  );
}

export { Provider};
export default CarsContext;
