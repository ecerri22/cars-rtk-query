import { Fragment } from "react";
import { useFetchClientsQuery } from "../store";
// import {useCars} from "./context/cars.js";
import CarsContext from './context/cars';
import { useContext } from 'react';

function TableClients({ config, keyFn, searchTerm }) {
  const {currentUser} = useContext(CarsContext);
    const { data } = useFetchClientsQuery(currentUser);
  
    if (!data) {
      return <div>Loading...</div>; 
    }
  
    const renderedHeader = config.map((column) => {
      if (column.header) {
        return <Fragment key={column.label}>{column.header()}</Fragment>;
      }
  
      return <th key={column.label}>{column.label}</th>;
    });
  
    const filteredClients = data.filter((client) => {
      const dataClients = client.name.toLowerCase().includes(searchTerm.toLowerCase());
      return dataClients;
    });
  
    const renderedRow = filteredClients.map((rowData) => {
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
    });
  
    return (
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
  
  export default TableClients;
  