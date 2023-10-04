import { useFetchCarsQuery } from '../store';
// import {useCars} from "./context/cars.js";
import CarsContext from './context/cars';
import { useContext } from 'react';

function CarValue({searchTerm}) {
  const {currentUser} = useContext(CarsContext)
  const { data } = useFetchCarsQuery(currentUser);

  let filteredCars = [];
  
  if (data !== undefined) {
    filteredCars = data.filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  const totalCost = filteredCars.reduce((acc, item) => acc + parseFloat(item.cost), 0);

  return (
    <div className="title is-3 has-text-weight-semibold has-text-right has-text-success"  style={{padding: "1rem"}}>
      Total Cost: ${totalCost}
    </div>
  );
}

export default CarValue;

