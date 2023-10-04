import { useState } from 'react';

function CarSearch({setSearchTerm}) {

  const [searchTerm, setSearchTermLocal] = useState('');

  const handleSearchTermChange = (event) => {
    setSearchTermLocal(event.target.value);
    setSearchTerm(event.target.value);
  };

  return (
    <div className="is-uppercase" style={{ marginTop: "2rem", padding: "1rem" }}>
      <div className="columns is-justify-content-space-between">
        <h3 className="title is-3 has-text-weight-semibold" style={{ padding: "1rem" }}>My Cars</h3>
        <div style={{ padding: "1rem" }}>
          <label className="label is-size-5 has-text-weight-medium">Car make</label>
          <input className="input"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
      </div>
    </div>
  );
}

export default CarSearch;
