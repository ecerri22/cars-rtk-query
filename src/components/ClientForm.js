import { useState } from 'react';
import { useAddClientMutation } from '../store';
// import {useCars} from "./context/cars.js";
import CarsContext from './context/cars';
import { useContext } from 'react';

function CarForm() {
  const [addClient] = useAddClientMutation()

  const {currentUser} = useContext(CarsContext);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const option = {
      user: currentUser,
      client: {
        name,
        phone,
        address
      }
    }
    addClient(option);
    setName('');
    setAddress('');
    setPhone('');
  };


  return (
    <div className="panel is-uppercase" style={{ marginTop: "2rem", padding: "1rem" }}>
      <h1 className="title is-3 has-text-weight-semibold" style={{ padding: "1rem" }}>
        Add a Client
      </h1>
      <form
        className="columns is-align-items-end"
        style={{ padding: "1rem" }}
        onSubmit={handleSubmit}
      >
        <div className="field" style={{ margin: "0", padding: "0 1rem" }}>
          <label className="label is-size-5 has-text-weight-medium">Client Name</label>
          <div className="control">
            <input className="input" 
            onChange={handleNameChange} 
            value={name} 
            />
          </div>
        </div>

        <div className="field" style={{ margin: "0", padding: "0 1rem" }}>
          <label className="label is-size-5 has-text-weight-medium">Client Address</label>
          <div className="control">
            <input className="input" 
            onChange={handleAddressChange} value={address}
             />
          </div>
        </div>

        <div className="field" style={{ margin: "0", padding: "0 1rem" }}>
          <label className="label is-size-5 has-text-weight-medium">Client Phone</label>
          <div className="control">
            <input className="input"
             onChange={handlePhoneChange} value={phone} 
             />
          </div>
        </div>

        <div style={{ padding: "0 1rem" }}>
          <button className="button is-success">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CarForm;
