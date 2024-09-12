// client/src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
    const [medications, setMedications] = useState([]);

    return (
        <div className="App">
            <header className="header">
                <h1>Medication Tracker</h1>
                <p className="typing-text">Never miss a dose!</p>
            </header>

            <div className="search-container">
                <input type="text" className="search-bar" placeholder="Search medications..." />
                <button className="search-button">Search</button>
            </div>

            <div className="wrapper">
                {/* Example Medication Box */}
                <div className="box">
                    <img src="medication_image.jpg" alt="Medication Image" />
                    <h3>Medication Name</h3>
                    <p>Dosage: 500mg</p>
                    <p>Frequency: Once daily</p>
                    <div className="edit-delete-controls">
                        <button className="edit-button">Edit</button>
                        <button className="delete-button">Delete</button>
                    </div>
                </div>
            </div>

            <div id="modal" className="modal">
                <div className="modal-content">
                    <span className="close">&times;</span>
                    <h2>Add/Edit Medication</h2>
                    <form id="medication-form">
                        <label htmlFor="medication-name">Medication Name:</label>
                        <input type="text" id="medication-name" name="medication-name" required />
                        <br /><br />
                        <label htmlFor="dosage">Dosage:</label>
                        <input type="text" id="dosage" name="dosage" required />
                        <br /><br />
                        <label htmlFor="frequency">Frequency:</label>
                        <input type="text" id="frequency" name="frequency" required />
                        <br /><br />
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>

            <nav className="navbar">
                <a href="#">Home</a>
                <a href="#">Medications</a>
                <a href="#">Reports</a>
                <a href="#">Settings</a>
            </nav>
        </div>
    );
}

export default App;
