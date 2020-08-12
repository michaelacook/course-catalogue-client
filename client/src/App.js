import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const courses = fetch('http://localhost:5000/api/courses')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  return (
    <h1>Hello, World!</h1>
  );
}

export default App;
