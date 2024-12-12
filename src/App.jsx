import './App.css';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react'; 
import Kalkulator from './Kalkulator';
import Przepisy from './Przepisy';
import Dziennik from './Dziennik';
import Temperatury from './Temperatury';
import NowaWarka from './NowaWarka';
import SzczegolyWarki from './SzczegolyWarki';


function Home() {
  const navigate = useNavigate();
  const [wersjaAplikacji, setWersjaAplikacji] = useState('v1.0.0')
  
  return (
    
     <div className="app-container">
    <div className="app-header"> {/* Dodaj diva z nazwą aplikacji */}
        <h1>Dear Bier App</h1> 
      </div>
    <div className="tile-container">
      <Link to="/dziennik" onClick={() => navigate('/dziennik')}>
        <div className="tile">Dziennik warzenia</div>
      </Link><Link to="/kalkulator" onClick={() => navigate('/kalkulator')}>
        <div className="tile">Kalkulator refermentacji</div>
      </Link>
      <Link to="/przepisy" onClick={() => navigate('/przepisy')}>
        <div className="tile">Przepisy</div>
      </Link>
      
      <Link to="/temperatury" onClick={() => navigate('/dziennik')}>
        <div className="tile">Kalkulator Temperatur</div>
      </Link>
      
    </div>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
