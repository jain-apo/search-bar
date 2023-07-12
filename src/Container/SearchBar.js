import React, { useState } from 'react';
import '../Components/style.css';
import Table from '../Components/Table';
import Spinner from 'react-bootstrap/Spinner';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setResults([]);
  
    const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://testtechnext1-pearl118.b4a.run/search/api/query/?query=${searchTerm}`;
    const url = corsAnywhereUrl + apiUrl;
  
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setResults(data);
        if (data.length === 0) {
          alert('No Records Found');
    }
      } else {
        console.log('Request failed with status:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  
    setLoading(false);
    
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