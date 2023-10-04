import { useState } from 'react';
import { useAddUserMutation } from '../store';
// import {useCars} from "../components/context/cars.js";
import CarsContext from '../components/context/cars.js';
import { useContext } from 'react';

function Signup() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [addUser] = useAddUserMutation()
  const { navigation} = useContext(CarsContext);


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.length < 6) {
      return;
    } else if (!email) {
      return;
    }

    const newUser= {
      name, 
      surname, 
      email, 
      password
    }
    
    addUser(newUser);
    setName("");
    setSurname("");
    setEmail("");
    setPassword("");
    // loginApp();
    // navigation('/list');

    navigation('/log-in')
  };

  const handleLoginClick = () => {
    navigation('/log-in');
  }

  return (
    <div className="hero is-fullheight">
      <div className="hero-body is-justify-content-center is-align-items-center">
        <div className="columns is-flex is-flex-direction-column box">
          <div className="column">
            <label >Name</label>
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
            <label >Surname</label>
            <input
              className="input is-success"
              type="text"
              id="surname"
              value={surname}
              onChange={handleSurnameChange}
              placeholder="Enter Surname"
            />
          </div>
          <div className="column">
            <label>Email</label>
            <input
              className="input is-success"
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email address"
            />
            <p className='has-text-danger'>
              {!email && "Email field is required!"}
              </p>
          </div>
          <div className="column">
            <label>Password</label>
            <input
              className="input is-success"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
            <p className='has-text-danger'>
              {password.length < 6 ? "Password must be longer than 6 characters!" : ""}
              </p>
          </div>
          <div className="column">
            <button className="button is-success is-fullwidth" type="submit" 
            onClick={handleSubmit}
            >
              Create an account
            </button>
          </div>
          <div className="has-text-centered is-flex is-justify-content-center is-align-items-center">
            <p> Already have an account? </p>
            <button className="button is-ghost" style={{color:"#48c78e"}} 
            onClick={handleLoginClick}
            >Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
