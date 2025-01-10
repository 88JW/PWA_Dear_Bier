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
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CalculateIcon from "@mui/icons-material/Calculate";
import MenuBookIcon from "@mui/icons-material/MenuBook";

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
import Ideas from "./Ideas";

function Home() {
  const navigate = useNavigate();
  const [wersjaAplikacji, setWersjaAplikacji] = useState("v1.5.0");

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Dear Bier app</h1>
      </div>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/dziennik" onClick={() => navigate("/dziennik")}>
            <div className="tile">
              <AssignmentIcon /> {/* Ikona notatnika */}
              Dziennik warzenia
            </div>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/kalendarz" onClick={() => navigate("/kalendarz")}>
            <div className="tile">
              <CalendarTodayIcon /> {/* Ikona kalendarza */}
              Kalendarz
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
        <Route path="/ideas" element={<Ideas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
