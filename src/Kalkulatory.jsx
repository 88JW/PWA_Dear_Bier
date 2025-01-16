import { useNavigate, Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Grid from '@mui/material/Grid';
import ThermostatIcon from "@mui/icons-material/Thermostat";

import HopIcon from './assets/hop.png';
import CO2Icon from './assets/CO2.png';
import Cukier from './assets/cukier.png';

function Kalkulatory() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="app-container">
      <h2>Kalkulatory:</h2>
      <Grid container rowSpacing={1} justifyContent="space-around">
        <Grid >
          <Link to="/kalkulator" onClick={() => navigate("/kalkulator")}>
          <div className="tile">
              <img src={CO2Icon} alt="CO2 Icon" style={{ width: '40%', height: '40%' }} /> Kalkulator Nagazowania 
            </div>
           
          </Link>
        </Grid>
        <Grid >
          <Link to="/temperatury" onClick={() => navigate("/temperatury")}>
            <div className="tile">
              <ThermostatIcon />
              Temperatury Warzenia
            </div>
          </Link>
        </Grid>
        <Grid >
          <Link to="/ibuClculator" onClick={() => navigate("/ibuClculator")}>
          <div className="tile">
              <img src={HopIcon} alt="Hop Icon" style={{ width: '40%', height: '40%' }}/> Kalkulator IBU 
            </div>
          </Link>
        </Grid>
        <Grid >
          <Link to="/blgClculator" onClick={() => navigate("/blgClculator")}>
          <div className="tile">
              <img src={Cukier} alt="Hop Icon" style={{ width: '40%', height: '40%' }}/>BLG</div>
          </Link>
        </Grid>
      </Grid>
      {location.pathname === "/ibuClculator" && <IBUCalculator />}{" "}
      {/* Wyświetl kalkulator IBU */}
      <p></p>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIosNewIcon />}
        onClick={() => navigate("/")}
      >
        Wstecz
      </Button>
    </div>
  );
}

export default Kalkulatory;
