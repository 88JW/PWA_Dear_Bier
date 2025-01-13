import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { Grid } from "@mui/material";



import AssignmentIcon from "@mui/icons-material/Assignment";
import CalculateIcon from "@mui/icons-material/Calculate";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StarRateIcon from "@mui/icons-material/StarRate";

// import stron całej aplikacji
import Kalkulator from "./Kalkulator";
import Dziennik from "./Dziennik";
import Temperatury from "./Temperatury";
import NowaWarka from "./NowaWarka";
import SzczegolyWarki from "./SzczegolyWarki";
import ArchiwumWarki from "./ArchiwumWarki";
import GotoweTemperatury from "./GotoweTemperatury";
import Kalendarz from "./Kalendarz";
import Kalkulatory from "./Kalkulatory";
import Receptury from "./Receptury";
import DodajRecepture from "./DodajRecepture";
import SzczegolyReceptury from "./SzczegolyReceptury";
import IBUCalculator from "./IBUCalculator";
import BLGCalculator from "./BLGCalculator";
import Dzienniki from "./Dzienniki";
import OcenPiwo from "./OcenPiwo";
import NowyWpis from "./NowyWpis";
import SzczegolyWpisu from "./SzczegolyWpisu";
import Ideas from "./Ideas";

function Home() {
  const navigate = useNavigate();
  const [wersjaAplikacji, setWersjaAplikacji] = useState("v1.7.1");

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Dear Bier app</h1>
      </div>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/dzienniki" onClick={() => navigate("/dzienniki")}>
            <div className="tile">
              <AssignmentIcon /> 
              Dzienniki
            </div>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/ocenPiwo" onClick={() => navigate("/ocenPiwo")}>
            <div className="tile">
              <StarRateIcon /> 
              Oceń Piwo
            </div>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/kalkulatory" onClick={() => navigate("/kalkulatory")}>
            <div className="tile">
              <CalculateIcon />
              Kalkulatory
            </div>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/receptury" onClick={() => navigate("/receptury")}>
            <div className="tile">
              <MenuBookIcon />
              Receptury
            </div>
          </Link>
        </Grid>
      </Grid>

      <div className="app-footer">
        <p>Wersja: {wersjaAplikacji}</p>
        <Link to="/ideas" onClick={() => navigate("/ideas")}>
          <p>Pomysły</p>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* przepierowania do konkretnych stron całej aplikacji */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kalkulatory" element={<Kalkulatory />} />
        <Route path="/receptury" element={<Receptury />} />
        <Route path="/kalkulator" element={<Kalkulator />} />
        <Route path="/dziennik" element={<Dziennik />} />
        <Route path="/temperatury" element={<Temperatury />} />
        <Route path="/dziennik/nowa-warka" element={<NowaWarka />} />
        <Route path="/dziennik/:id" element={<SzczegolyWarki />} />
        <Route path="/archiwum/:id" element={<ArchiwumWarki />} />
        <Route path="/GotoweTemperatury" element={<GotoweTemperatury />} />
        <Route path="/kalendarz" element={<Kalendarz />} />
        <Route path="/dodaj-recepture" element={<DodajRecepture />} />
        <Route path="/receptura/:id" element={<SzczegolyReceptury />} />
        <Route path="/ibuClculator" element={<IBUCalculator />} />
        <Route path="/blgClculator" element={<BLGCalculator />} />
        <Route path="/dzienniki" element={<Dzienniki />} />
        <Route path="/ocenPiwo" element={<OcenPiwo />} />
        <Route path="/nowy-wpis" element={<NowyWpis />} />
        <Route path="/wpis/:id" element={<SzczegolyWpisu />} /> 

 
        <Route path="/ideas" element={<Ideas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
