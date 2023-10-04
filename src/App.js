import Route from "./components/Route";
import NavBar from "./components/NavBar";
import CarListPage from "./pages/CarListPage";
import CarTablePage from "./pages/CarTablePage";
import ClientsTablePage from "./pages/ClientsTablePage"
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
// import {useCars} from "./components/context/cars.js"
import CarsContext from "./components/context/cars.js";
import { useContext } from "react";

function App() {
  const {login, currentUser, setCurrentUser} = useContext(CarsContext);

  return (
    <div className="container is-fluid">
      {!login && (
        <Route 
          path="/">
          <Signup
          />
        </Route>
      )}
      {!login && (
        <Route 
          path="/log-in"
          >
          <Login 
          // ???
          setCurrentUser={setCurrentUser} 
          />
        </Route>
      )}
      {login && (
        <div>
          <NavBar 
            currentUser={currentUser}
          />
          <Route 
              path="/list">
            <CarListPage
              />
          </Route>
          <Route 
            path="/table">
            <CarTablePage
            />
          </Route>
          <Route
            path="/contact">
            <ClientsTablePage
            />
          </Route>
          <Route 
            path="/more">
          </Route>
        </div> 
      )} 
    </div>
  );
}

export default App;
