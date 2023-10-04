// import {useCars} from "./context/cars.js";
import CarsContext from './context/cars';
import { useContext } from 'react';

function Route({path, children}) {
  const {currentPath} = useContext(CarsContext);

  if(currentPath === path) {
    return children;
  }

  return null;
}

export default Route;