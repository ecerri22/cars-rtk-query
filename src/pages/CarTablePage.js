import { useState } from 'react';
import Table from '../components/Table-cars';
import ModalCars from '../components/Modal-cars';
import { useDeleteCarMutation, useEditCarMutation } from '../store';
// import {useCars} from "../components/context/cars.js";
import CarsContext from '../components/context/cars.js';
import { useContext } from 'react';

const CarTablePage = () => {
   const {currentUser} = useContext(CarsContext);

    const [deleteCar] = useDeleteCarMutation(currentUser)
    const [editCar] = useEditCarMutation()
    const [editingCar, setEditingCar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCarDelete = (car) => {
        deleteCar(car);
    };

    const handleCarEdit = (car) => {
        setEditingCar(car);
        setIsModalOpen(true); 
    };

    const handleSaveCar = (editedCar) => {
        const editedInfo = {
            user: currentUser,
            car:{
              id: editedCar.id,
              name: editedCar.name,
              cost: editedCar.cost
            }
          }
        editCar(editedInfo);
        setIsModalOpen(false); 
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); 
    };

    const config = [
        {
            label: 'ID',
            render: (car) => car.id,
        },
        {
            label: 'Car Make',
            render: (car) => car.name,
        },
        {
            label: 'Car Cost',
            render: (car) => car.cost,
        },
        {
            label: 'Edit',
            render: (car) => (
                <button className="button is-primary" onClick={() => handleCarEdit(car)}>
                Edit
                </button>
            ),
        },
        {
            label: 'Delete',
            render: (car) => (
                <button className="button is-danger" onClick={() => handleCarDelete(car)}>
                Delete
                </button>
            ),
        },
    ];

    const keyFn = (car) => car.id;

    return (
        <div>
            <Table 
            config={config} keyFn={keyFn}
            currentUser={currentUser} 
            />

            {editingCar && (
                <ModalCars isOpen={isModalOpen} car={editingCar} onSave={handleSaveCar} onCancel={handleCloseModal} />
            )}
        </div>
    );
};

export default CarTablePage;