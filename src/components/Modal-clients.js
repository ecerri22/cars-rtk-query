import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function ModalClients({ isOpen, client, onSave, onCancel }) {
  
  const [editedClient, setEditedClient] = useState({ ...client });

  useEffect(() => {
    setEditedClient({ ...client });
  }, [isOpen, client]);

  const handleSaveClient = () => {
    onSave(editedClient);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditedClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };


  return ReactDOM.createPortal(
    <div 
    className={`modal ${isOpen ? 'is-active' : ''}`}
    >
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Client Data</p>
          <button className="delete" aria-label="close" 
          onClick={handleCancel}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Client Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                value={editedClient.name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Client Address</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="address"
                value={editedClient.address}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Client Phone</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="phone"
                value={editedClient.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-primary" 
          onClick={handleSaveClient}
          >
            Save
          </button>
          <button className="button" 
          onClick={handleCancel}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>, 
        document.querySelector(".modal-container")

  );
}

export default ModalClients;
