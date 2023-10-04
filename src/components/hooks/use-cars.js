import { useContext } from "react";
import CarsContext from "../context/cars";

function useCars() {
  return useContext(CarsContext);
}


export default useCars;