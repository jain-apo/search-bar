import React, { useState } from 'react';
import '../Components/style.css';
import Table from '../Components/Table';
import Spinner from 'react-bootstrap/Spinner';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  // const handleSearch = () => {
  //   setLoading(true);
  //   setResults([]);
  
  //   const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
  //   const apiUrl = `https://testtechnext1-pearl118.b4a.run/search/api/query/?query=${searchTerm}`;
  //   const url = corsAnywhereUrl + apiUrl;
    
  //   console.log(url);
    
  //   const xhr = new XMLHttpRequest();
    
  //   xhr.open('GET', url, true);
  //   xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
  //   xhr.setRequestHeader('Content-Type', 'application/json');
  //   xhr.setRequestHeader('origin', 'https://fleek.ipfs.io'); // Add the origin header
    
  //   xhr.onreadystatechange = function () {
  //     if (xhr.readyState === XMLHttpRequest.DONE) {
  //       if (xhr.status === 200) {
  //         try {
  //           console.log(xhr.responseText);
  //           const response = JSON.parse(xhr.responseText);
  //           setResults(response);
  //         } catch (error) {
  //           console.log('Error parsing response:', error);
  //         }
  //       } else {
  //         console.log('Request failed with status:', xhr.status);
  //       }
    
  //       setLoading(false);
  //       if (xhr.responseText.includes('No Access-Control-Allow-Origin')) {
  //         alert('CORS error: No Access-Control-Allow-Origin header');
  //       } else if (JSON.parse(xhr.responseText).length === 0) {
  //         alert('No Records Found');
  //       }
  //     }
  //   };
    
  //   xhr.send();
    
  // };
  
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