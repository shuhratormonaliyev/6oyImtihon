import React, { useState, useEffect } from "react";
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Save = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [people, setPeople] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState({});

  useEffect(() => {
    const savedPeople = JSON.parse(localStorage.getItem('people')) || [];
    setPeople(savedPeople);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && surname && age) {
      const newPerson = { name, surname, age };
      const updatedPeople = [...people, newPerson];
      setPeople(updatedPeople);
      localStorage.setItem('people', JSON.stringify(updatedPeople));
      setName("");
      setSurname("");
      setAge("");
    }
  };

  const handleDelete = (index, field) => {
    const updatedPeople = people.map((person, i) => {
      if (i === index) {
        const { [field]: _, ...rest } = person;
        return rest;
      }
      return person;
    }).filter(person => Object.keys(person).length > 0); 
    setPeople(updatedPeople);
    localStorage.setItem('people', JSON.stringify(updatedPeople));
  };

  const handleMouseEnter = (index, field) => {
    setHoveredIndex({ index, field });
  };

  const handleMouseLeave = () => {
    setHoveredIndex({});
  };

  return (
    <div className="save-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ism"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Familiya"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="number"
          placeholder="Yosh"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
       
      </form>

      <table>
        <thead>
          <tr>
            <th>Ism</th>
            <th>Familiya</th>
            <th>Yosh</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={index}>
              <td
                onMouseEnter={() => handleMouseEnter(index, 'name')}
                onMouseLeave={handleMouseLeave}
              >
                {person.name}
                {hoveredIndex.index === index && hoveredIndex.field === 'name' && (
                  <button className="delete-btn" onClick={() => handleDelete(index, 'name')}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </td>
              <td
                onMouseEnter={() => handleMouseEnter(index, 'surname')}
                onMouseLeave={handleMouseLeave}
              >
                {person.surname}
                {hoveredIndex.index === index && hoveredIndex.field === 'surname' && (
                  <button className="delete-btn" onClick={() => handleDelete(index, 'surname')}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </td>
              <td
                onMouseEnter={() => handleMouseEnter(index, 'age')}
                onMouseLeave={handleMouseLeave}
              >
                {person.age}
                {hoveredIndex.index === index && hoveredIndex.field === 'age' && (
                  <button className="delete-btn" onClick={() => handleDelete(index, 'age')}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Save;