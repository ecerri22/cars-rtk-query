import { useState } from 'react';
import { useAddCarMutation } from '../store';
// import {useCars} from "./context/cars.js";
import CarsContext from './context/cars';
import { useContext } from 'react';

function CarForm() {
  const { name, setName, currentUser } = useContext(CarsContext);

  const [ addCar ] = useAddCarMutation();
  const [cost, setCost] = useState(0);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCostChange = (event) => {
    const costValue = parseInt(event.target.value) || 0;
    setCost(costValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const options = {
      user: currentUser,
      car: {
        name,
        cost,
      },
    };
    addCar(options);
    setName('');
    setCost(0);
  };


  return (
    <div className="panel is-uppercase" style={{ marginTop: "2rem", padding: "1rem" }}>
      <h1 className="title is-3 has-text-weight-semibold" style={{ padding: "1rem" }}>
        Add a Car
      </h1>
      <form
        className="columns is-align-items-end"
        style={{ padding: "1rem" }}
        onSubmit={handleSubmit}
      >
        <div className="field" style={{ margin: "0", padding: "0 1rem" }}>
          <label className="label is-size-5 has-text-weight-medium">Car Make</label>
          <div className="control">
            <input className="input" 
            onChange={handleNameChange} 
            value={name} 
            />
          </div>
        </div>

        <div className="field" style={{ margin: "0", padding: "0 1rem" }}>
          <label className="label is-size-5 has-text-weight-medium">Car Cost</label>
          <div className="control">
            <input className="input" 
            onChange={handleCostChange} 
            value={cost || ""} 
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
