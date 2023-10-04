import { useState } from 'react';
import { useDeleteCarMutation, useEditCarMutation, useFetchCarsQuery } from '../store';
// import {useCars} from "./context/cars.js";
import CarsContext from './context/cars';
import { useContext } from 'react';

function CarList({searchTerm}) {

  const { name, currentUser } = useContext(CarsContext);
 
  const [deleteCar] = useDeleteCarMutation();
  const [editCar] = useEditCarMutation();
  const {data} = useFetchCarsQuery(currentUser)

  const [editingCarId, setEditingCarId] = useState(null);
  const [editedCarName, setEditedCarName] = useState('');
  const [editedCarCost, setEditedCarCost] = useState('');

  const handleCarDelete = (car) => {
    deleteCar(car);
  };

  const handleCarEdit = (car) => {
    setEditingCarId(car.id);
    setEditedCarName(car.name);
    setEditedCarCost(car.cost);
  };
  

  let filteredCars;

  if (data === undefined) {
    filteredCars = [];
  } else {
    filteredCars = data.filter((car) => {
      const carName = car.name || ''; 
      const searchTermLower = searchTerm ? searchTerm.toLowerCase() : '';
  
      return carName.toLowerCase().includes(searchTermLower);
    });
  }  

  const handleSaveCar = (car) => {
    const editedInfo = {
      user: currentUser,
      car:{
        id: car.id,
        name: editedCarName,
        cost: editedCarCost
      }
    }
    editCar(editedInfo);
    setEditingCarId(null);
  };

  return (
    <div className="car-list">

      {filteredCars.map((car) => {
        const isEditing = editingCarId === car.id;
        const bold = name && car.name.toLowerCase().includes(name.toLowerCase());

        return (
          <div key={car.id} className="panel">
            {isEditing ? (
              <div className='box is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center'>
                <div className='is-flex is-uppercase' style={{ marginBottom: "0.5rem" }}>
                  <div className="field" style={{ margin: "0", padding: "0 1rem" }}>
                    <label className="label is-size-5 has-text-weight-normal">Car Make</label>
                    <div className="control">
                      <input
                        className="input"
                        value={editedCarName}
                        onChange={(e) => setEditedCarName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="field" style={{ margin: "0", padding: "0 1rem" }}>
                    <label className="label is-size-5 has-text-weight-normal">Car Cost</label>
                    <div className="control">
                      <input
                        value={editedCarCost}
                        onChange={(e) => setEditedCarCost(parseInt(e.target.value) || 0)}
                        className="input"
                        type="number"
                      />
                    </div>
                  </div>
                </div>

                <div className="buttons" style={{ paddingTop: "1.5rem", gap: '0.5rem' }}>
                  <button className="button is-success" 
                  onClick={() => handleSaveCar(car)}
                  >
                    Save
                  </button>
                  <button className="button is-danger" onClick={() => setEditingCarId(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className={`${bold && 'has-background-link-light	'} box is-flex is-align-items-center is-justify-content-space-between`}>
                <p className="is-size-4">{car.name} - ${car.cost}</p>
                <div className="buttons" style={{ gap: '0.5rem' }}>
                  <button className="button is-danger" onClick={() => handleCarDelete(car)}>
                    Delete
                  </button>
                  <button className="button is-primary" onClick={() => handleCarEdit(car)}>
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      })} 

      <hr />
    </div>
  );
}

export default CarList;
