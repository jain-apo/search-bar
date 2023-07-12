import React from 'react';
import './style.css'

const Table = ({ results }) => {
  //Data Cleaning
  const regexPatternStart = /\(\'/;
  const regexPatterEnd = /\'\,\)/;

  const applyRegexStart = (text) => {
    const match = text.match(regexPatternStart);
    if (match) {
      let matchedText = text.replace(regexPatternStart,''); 
      matchedText = matchedText.replace(regexPatterEnd, '')
      return matchedText;
    }
    return text;
  };

  const applyRegexEnd = (phase) => {
    const match = phase.match(regexPatternStart);
    if (match) {
      let matchedText = phase.replace(regexPatternStart,''); 
      matchedText = matchedText.replace(regexPatterEnd, '')
      return matchedText;
    }
    return phase;
  };
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Text</th>
          <th>Date</th>
          <th>Phase</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result) => (
          <tr key={result.id}>
            <td>{result.id}</td>
            <td>{applyRegexStart(result.text)}</td>
            <td>{result.date}</td>
            <td>{applyRegexEnd(result.phase)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;