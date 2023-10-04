import classNames from "classnames";
// import {useCars} from "./context/cars.js";
import CarsContext from './context/cars';
import { useContext } from 'react';

function Link({to, children, className, activeClassName}) {
  
  const { navigation, currentPath } = useContext(CarsContext);

  const classes = classNames(
    className,
    to === currentPath && activeClassName,
  );

  const handleClick = (event) => {
    if(event.metaKey || event.ctrlKey) return;
    event.preventDefault();
    navigation(to);
  }


  return <a 
  className={classes} onClick={handleClick} href={to}
  >
     {children}
  </a>

}

export default Link;