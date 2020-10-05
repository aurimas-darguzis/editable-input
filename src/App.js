import React from "react";
import logo from "./assets/logo.svg";
import "./App.css";
import EditableInput from "./EditableInput";

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <EditableInput />
      </header>
    </div>
  );
}

export default App;
