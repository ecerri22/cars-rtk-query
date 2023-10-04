import { useState } from 'react';
import { useFetchUsersQuery } from '../store';
// import {useCars} from "../components/context/cars.js";
import CarsContext from '../components/context/cars.js';
import { useContext } from 'react';

function Login({ setCurrentUser }) {

  const {data} = useFetchUsersQuery();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { navigation, loginApp } = useContext(CarsContext);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleLogin = (event) => {
    event.preventDefault();
  
    if (!data || data.length === 0) {
      setErrorMessage('No users');
      return; 
    }
  
    const foundUser = data.find(
      (user) =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.password === password
    );
  
    if (foundUser) {
      loginApp();
      setCurrentUser(foundUser);
      navigation('/list');
      setErrorMessage('');
      console.log("USER EXISTS LOG IN SUCCESSFUL");
    } else {
      setErrorMessage('Invalid username or password');
      console.log("NO USER!!!");
    }
  };
  
  const handleSignupClick = () => {
    navigation('/');
  }

  return (
    <div className="hero is-fullheight">
      <div className="hero-body is-justify-content-center is-align-items-center">
        <div className="columns is-flex is-flex-direction-column box">
          <div className="column">
            <label htmlFor="name">Name</label>
            <input
              className="input is-success"
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter Name"
            />
          </div>
          <div className="column">
            <label htmlFor="password">Password</label>
            <input
              className="input is-success"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
          </div>
          <div className="column">
            <button className="button is-success is-fullwidth" type="button" 
            onClick={handleLogin}
            >
              Login
            </button>
            {errorMessage && <p className="has-text-danger">{errorMessage}</p>}
          </div>
          <div className="has-text-centered has-text-centered is-flex is-justify-content-center is-align-items-center">
            <p> Don't have an account? </p>
            <button className="button is-ghost" style={{color:"#48c78e"}} 
            onClick={handleSignupClick}
            >Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
