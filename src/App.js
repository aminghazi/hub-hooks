import React, { useState, useEffect } from "react";
import "./App.css";
import Character from "./components/Character";

function App() {
  const [title, setTitle] = useState("Player HUD");
  const [personList, setPersonList] = useState([]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const res = await fetch("http://localhost:5000/charArray");
        const data = await res.json();
        setPersonList(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPersons();
  }, []);

  return (
    <div className="App">
      <header>
        <label htmlFor="titleChange">Change page title</label>
        <input type="text" id="titleChange" onChange={(e) => setTitle(e.target.value)} />
      </header>
      <div className="App-header">
        {personList.map((person) => (
          <Character {...person} key={person.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
