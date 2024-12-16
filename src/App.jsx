import './App.css';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react'; 
import { Grid } from '@mui/material'; // Import Grid

import Kalkulator from './Kalkulator';
import Przepisy from './Przepisy';
import Dziennik from './Dziennik';
import Temperatury from './Temperatury';
import NowaWarka from './NowaWarka';
import SzczegolyWarki from './SzczegolyWarki';
import ArchiwumWarki from './ArchiwumWarki';
import GotoweTemperatury from './GotoweTemperatury';
import Kalendarz from './Kalendarz';





function Home() {
  const navigate = useNavigate();
  const [wersjaAplikacji, setWersjaAplikacji] = useState('v1.2.0')
  
  return (
    
    <div className="app-container">
    <div className="app-header">
      <h1>Dear Bier app</h1>
    </div>

    <Grid container spacing={2}> {/* Dodaj Grid container */}
      <Grid item xs={6}> {/* Każdy kafelek zajmuje połowę szerokości (xs={6}) */}
        <Link to="/dziennik" onClick={() => navigate('/dziennik')}>
          <div className="tile">Dziennik warzenia</div>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link to="/kalkulator" onClick={() => navigate('/kalkulator')}>
          <div className="tile">Kalkulator refermentacji</div>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link to="/temperatury" onClick={() => navigate('/temperatury')}>
          <div className="tile">Kalkulator Temperatur</div>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link to="/kalendarz" onClick={() => navigate('/kalendarz')}>
          <div className="tile">Kalendarz</div>
        </Link>
      </Grid>
      {/* Dodaj tutaj kolejne kafelki w podobny sposób */}
    </Grid> {/* Zamknij Grid container */}

    <div className="app-footer">
      <p>Wersja: {wersjaAplikacji}</p>
    </div>
  </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kalkulator" element={<Kalkulator />} />
        <Route path="/przepisy" element={<Przepisy />} />
        <Route path="/dziennik" element={<Dziennik />} />
        <Route path="/temperatury" element={<Temperatury />} />
        <Route path="/dziennik/nowa-warka" element={<NowaWarka />} />
        <Route path="/dziennik/:id" element={<SzczegolyWarki />} />
        <Route path="/archiwum/:id" element={<ArchiwumWarki />} /> 
        <Route path="/GotoweTemperatury" element={<GotoweTemperatury />} /> 
        <Route path="/kalendarz" element={<Kalendarz />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
