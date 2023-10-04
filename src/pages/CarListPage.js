import { useState } from "react";
import CarForm from "../components/CarForm";
import CarSearch from "../components/CarSearch";
import CarList from "../components/CarList";
import CarValue from "../components/CarValue";

function CarListPage(){

    const [searchTerm, setSearchTerm] = useState("");

    return(
        <div>
            <CarForm />
            <CarSearch setSearchTerm={setSearchTerm} />
            <CarList searchTerm={searchTerm} />
            <CarValue searchTerm={searchTerm} />
        </div>
    )
}

export default CarListPage;