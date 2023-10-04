import { Fragment } from "react";
import { useFetchCarsQuery } from "../store";
// import {useCars} from "./context/cars.js";
import CarsContext from './context/cars';
import { useContext } from 'react';

function TableCars({config, keyFn }) {
  const {currentUser} = useContext(CarsContext)
  const {data} = useFetchCarsQuery(currentUser);

  const renderedHeader = config.map((column) => {
      if(column.header) {
          return <Fragment key={column.label}>{column.header()}</Fragment>;
      }

      return <th key={column.label}>{column.label}</th>;
  });

  const renderedRow = data ? data.map((rowData) => {
    const renderedCells = config.map((column) => {
      return (
        <td className="p-3" key={column.label}>
          {column.render(rowData)}
        </td>
      );
    });

    return (
      <tr className="border-b" key={keyFn(rowData)}>
        {renderedCells}
      </tr>
    );
  })
: null; 


  return(
      <table className="table is-fullwidth">
          <thead>
              <tr className="border-b-2">
                  {renderedHeader}
              </tr>
          </thead>

          <tbody>
              {renderedRow}
          </tbody>
          
      </table>
  );
}

export default TableCars;


