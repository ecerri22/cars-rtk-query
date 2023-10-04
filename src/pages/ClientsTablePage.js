import { useContext, useState } from 'react';
import TableClients from '../components/Table-clients';
import ModalClients from '../components/Modal-clients';
import ClientForm from '../components/ClientForm';
import ClientSearch from '../components/ClientSearch';
import { useDeleteClientMutation, useEditClientMutation } from '../store';
// import {useCars} from "../components/context/cars.js";
import CarsContext from '../components/context/cars.js';

function CarTablePage(){
    const {currentUser} = useContext(CarsContext);

    const [editingClient, setEditingClient] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [deleteClient, results] = useDeleteClientMutation(currentUser)
    const [editClient] = useEditClientMutation()

    const handleClientDelete = (car) => {
        deleteClient(car);
    };

    const handleClientEdit = (client) => {
        setEditingClient(client);
        setIsModalOpen(true); 
    };

    const handleSaveCient = (editedClient) => {
        const editedInfo = {
            user: currentUser,
            client:{
              id: editedClient.id,
              name: editedClient.name,
              phone: editedClient.phone,
              address: editedClient.address, 
            }
          }
        editClient(editedInfo);
        setIsModalOpen(false); 
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); 
    };

    const config = [
        {
            label: 'ID',
            render: (client) => client.id,
        },
        {
            label: 'Client Name',
            render: (client) => client.name,
        },
        {
            label: 'Client Address',
            render: (client) => client.address,
        },
        {
            label: 'Client Phone',
            render: (client) => client.phone,
        },
        {
            label: 'Edit',
            render: (client) => (
                <button className="button is-primary" onClick={() => handleClientEdit(client)}>
                Edit
                </button>
            ),
        },
        {
            label: 'Delete',
            render: (client) => (
                <button className="button is-danger" onClick={() => handleClientDelete(client)}>
                Delete
                </button>
            ),
        },
    ];

    const keyFn = (car) => car.id;

    return (
        <div>
            <ClientForm currentUser={currentUser}/>
            <ClientSearch 
            setSearchTerm={setSearchTerm}
            />

            <TableClients 
            config={config} keyFn={keyFn} searchTerm={searchTerm} currentUser={currentUser}
            />

            {editingClient && (
                <ModalClients isOpen={isModalOpen} client={editingClient} onSave={handleSaveCient} onCancel={handleCloseModal} />
            )}
        </div>
    );
};

export default CarTablePage;