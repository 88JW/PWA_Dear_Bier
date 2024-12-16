import React from 'react';
import './App.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function ArchiwumWarki() {
    const location = useLocation();
    const navigate = useNavigate();
    const { warka, pomiary } = location.state ? location.state : { warka: null, pomiary: [] };
    const handlePrint = () => {
        window.print();
    };

    return (

        <div className="warka-data-container">
            <style>
                {`
          table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 20px;
          }

          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          .warka-data-container {
            background-color: white;
            border: 1px solid #ccc;
            padding: 20px;
            margin-bottom: 20px;
          }
          
        `}
        </style>                 
            <h3>   Archiwum Warki: </h3>
    
            <table>
                <tbody>
                    <tr>
                        <td>Nazwa warki:</td>
                        <td>{warka ? warka.nazwa : 'Brak danych'}</td>
                    </tr>
                    <tr>
                        <td>Data nastawienia:</td>
                        <td>{warka ? warka.data : 'Brak danych'}</td>
                    </tr>
                    <tr>
                        <td>Rodzaj kitu:</td>
                        <td>{warka ? warka.rodzajKitu : 'Brak danych'}</td>
                    </tr>
                    <tr>
                        <td>Drożdże:</td>
                        <td>{warka ? warka.drozdze : 'Brak danych'}</td>
                    </tr>
                    <tr>
                        <td>Chmiel:</td>
                        <td>{warka ? warka.chmiel : 'Brak danych'}</td>
                    </tr>
                    <tr>
                        <td>Rodzaj cukru:</td>
                        <td>{warka ? warka.rodzajCukru : 'Brak danych'}</td>
                    </tr>
                    <tr>
                        <td>Notatki:</td>
                        <td>{warka ? warka.notatki : 'Brak danych'}</td>
                    </tr>
                </tbody>
            </table>
            <h3>Pomiary</h3>
            {pomiary.length > 0 ? ( // Sprawdź, czy są pomiary
                <table>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Godzina</th>
                            <th>Blg</th>
                            <th>Temperatura</th>
                            <th>Piana</th>
                            <th>CO2</th>
                            <th>Notatki</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pomiary.map((pomiar, index) => (
                            <tr key={index}>
                                <td>{pomiar.data}</td>
                                <td>{pomiar.godzina}</td>
                                <td>{pomiar.blg}</td>
                                <td>{pomiar.temperatura}</td>
                                <td>{pomiar.piana}</td>
                                <td>{pomiar.co2}</td>
                                <td>{pomiar.notatki}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Brak pomiarów dla tej warki.</p>
            )}

            <div className="button-container">
                <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint} sx={{ mr: 2 }}>
                    Drukuj
                </Button>
                <Button variant="outlined" startIcon={<ArrowBackIosNewIcon />} onClick={() => navigate('/')} sx={{ mr: 2 }}>
                    Wstecz
                </Button>

            </div>

        </div>

    );
}

export default ArchiwumWarki;