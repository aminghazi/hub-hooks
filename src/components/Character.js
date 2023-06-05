import React, { useState, useEffect } from "react";
import "./Character.css";

const Character = ({ id, name, race, status, comment }) => {
  
  const [characterData, setCharacterData] = useState({
    id,
    name,
    race,
    status,
    health: 150,
    stamina: 50,
    gold: 75,
    location: "vancoucer",
    comment,
  });

  const updateCharacter = async () => {
    try {
      const response = await fetch(`http://localhost:5000/charArray/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(characterData),
      });

      if (response.ok) {
        console.log("successfull!");
      } else {
        console.error("Failed!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (field, value) => {
    setCharacterData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    updateCharacter();
  }, [characterData])

  const { name: characterName, health, stamina, gold, location, comment: characterComment } = characterData;

  return (
    <div>
      <h5>{characterName}'s Bio:</h5>
      <div className="App-content">
        <div>
          <span>Race:</span>
          <b> {race} </b>
        </div>
        <div>
          <span>Status:</span>
          <b>
            Health at {health} Stamina at {stamina}
          </b>
        </div>
        <div>
          <span>Gold:</span>
          <b> {gold} </b>
        </div>
        <div className={characterComment ? "visible" : "hidden"}>
          <span>Comment:</span>
          {comment ? (
            <b> {comment} </b>
          ) : (
            <input type="text" id="nameComment" 
                onChange={(e) => {
                  handleChange("comment", e.target.value)
                  
                }}/>
          )}
        </div>
        <div>
          <span>Location:</span>
          <b> {location} </b>
        </div>
        <div>
          <label htmlFor="nameChange">Change Player's Name:</label>
          <input type="text" id="nameChange"
            onChange={(e) => {
              handleChange("name", e.target.value);
            }}/>
        </div>
        <div>
          <label htmlFor="locationChange">Change location:</label>
          <input type="text" id="locationChange"
            onChange={(e) => {
              handleChange("location", e.target.value);
            }}/>
        </div>
        <div className="btn-list">
          <button
            onClick={() => {
              handleChange("health", health + 10);
              handleChange("gold", gold - 2);
            }}
          >
            Add 10 Health (costs 2 Gold)
          </button>
          <button
            onClick={() => {
              handleChange("stamina", stamina + 5);
              handleChange("gold", gold - 1);
            }}
          >
            Add 5 Stamina (costs 1 Gold)
          </button>
          <button
            onClick={() => {
              handleChange("stamina", stamina - 5);
              handleChange("health", health - 10);
              handleChange("gold", gold + 3);
            }}
          >
            Add 3 Gold (costs 10 Health and 5 Stamina)
          </button>
          <button
            onClick={() => {
              handleChange("gold", gold - 3);
            }}
          >
            Change Location (costs 3 Gold)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Character;
