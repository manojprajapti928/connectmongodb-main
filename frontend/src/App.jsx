import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  let [data, setData] = useState([]);

  // Fetching data from the backend when the component mounts
  useEffect(() => {
    console.log('Fetching data...');
    
    async function fetchData() {
      try {
        let res = await axios.get(`http://localhost:5400/api/data`);
        setData(res.data); // Set the received data to the state
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    
    fetchData();
  }, []);

  return (
    <div>
      <center>
        <h1>Submit User Data</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          let Name = e.target[0].value;
          let Age = e.target[1].value;

          async function sendData() {
            try {
              let res = await axios.post(`http://localhost:5400/api/sendData`, { Name, Age });
              console.log(res.data);

              // After submitting data, fetch the updated data from the backend
              let updatedRes = await axios.get(`http://localhost:5400/api/data`);
              setData(updatedRes.data); // Update the state with the latest data
            } catch (error) {
              console.error("Error sending data:", error);
            }
          }

          sendData();
        }}>
          <input type="text" name="Name" placeholder="Enter Name" required />
          <input type="number" name="Age" placeholder="Enter Age" required />
          <button type="submit">Submit</button>
        </form>

        <h2>Received Data from MongoDB:</h2>
        <ul>
          {data.map((user, index) => (
            <li key={index}>
              <strong>Name:</strong> {user.name}, <strong>Age:</strong> {user.age}
            </li>
          ))}
        </ul>
      </center>
    </div>
  );
}
