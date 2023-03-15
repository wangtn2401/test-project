import React, { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState({
    json_result_seatgeek: [],
    json_result_stubhub: [],
    json_result_ticketmaster: [],
  });

  const handleSearch = async (event) => {
    event.preventDefault();

    const response = await axios.get(
      `http://localhost:5000/search?query=${searchTerm}`
    );

    setResults(response.data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <h2>SeatGeek Results</h2>
          <Grid container spacing={2} className="seatGeek-card">
            {results.json_result_seatgeek.map((result, index) => (
              <Grid item xs={4} key={index}>
                <div className="result-card">
                  <p><b>{result.name}</b></p>
                  <p><span className="result-title">Date: </span>{result.date}</p>
                  <p><span className="result-title">Venue: </span>{result.venue}</p>
                  <p><span className="result-title">Price: </span>${result.minPrice} - ${result.maxPrice}</p>
                  <a href={result.url}>Buy Tickets</a>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} >
          <h2>StubHub Results</h2>
          <Grid container spacing={2} className="stubHub-card">
            {results.json_result_stubhub.map((result, index) => (
              <Grid item xs={4} key={index}>
                <div className="result-card">
                  <p><b>{result.name}</b></p>
                  <p><span className="result-title">Date: </span>{result.date}</p>
                  <p><span className="result-title">Venue: </span>{result.venue}</p>
                  <p><span className="result-title">Price: </span>${result.minPrice} - ${result.maxPrice}</p>
                  <a href={result.url}>Buy Tickets</a>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <h2>Ticketmaster Results</h2>
          <Grid container spacing={2} className="ticketMaster-card">
            {results.json_result_ticketmaster.map((result, index) => (
              <Grid item xs={4} key={index}>
                <div className="result-card">
                  <p><b>{result.name}</b></p>
                  <p><span className="result-title">Date: </span>{result.date}</p>
                  <p><span className="result-title">Venue: </span>{result.venue}</p>
                  <p><span className="result-title">Price: </span>${result.minPrice} - ${result.maxPrice}</p>
                  <a href={result.url}>Buy Tickets</a>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
