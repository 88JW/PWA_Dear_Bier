import './App.css';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Kalkulator from './Kalkulator';
import Przepisy from './Przepisy';
import Dziennik from './Dziennik';
import Temperatury from './Temperatury';
import NowaWarka from './NowaWarka';
import SzczegolyWarki from './SzczegolyWarki';


function Home() {
  const navigate = useNavigate();

  return (
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
        <Route path="/dziennik/warka/:id" element={<SzczegolyWarki />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
