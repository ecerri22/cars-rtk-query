import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function ModalCars({ isOpen, car, onSave, onCancel }) {
  
  const [editedCar, setEditedCar] = useState(car);

  useEffect(() => {
    setEditedCar(car);
  }, [isOpen, car]);

  const handleSaveCar = () => {
    onSave(editedCar);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setEditedCar((prevCar) => ({
      ...prevCar,
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
          <p className="modal-card-title">Edit Car Data</p>
          <button className="delete" aria-label="close" 
          onClick={handleCancel}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Car Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                value={editedCar.name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Car Cost</label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="cost"
                value={editedCar.cost}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-primary" 
          onClick={handleSaveCar}
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
  )
}

export default ModalCars;
