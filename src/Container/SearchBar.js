import React, { useState } from 'react';
import '../Components/style.css';
import Table from '../Components/Table';
import Spinner from 'react-bootstrap/Spinner';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setResults([]);
    const xhr = new XMLHttpRequest();
    const url = `https://testtechnext1-pearl118.b4a.run/search/api/query/?query=${searchTerm}`;

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {

      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          setResults(JSON.parse(xhr.responseText));
        } else {
          console.log("Error");
        }
        setLoading(false);
        if(JSON.parse(xhr.responseText).length==0)
          alert("No Records Found")
      }
    };
    
    xhr.send();

  };


  return (
    <div className="my-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      {loading && <div><Spinner className="spinner-container" animation="border" variant="primary" /></div>}
      {results.length > 0 && <Table className="table-css" results={results} />}
    </div>
  );
};

export default SearchBar;