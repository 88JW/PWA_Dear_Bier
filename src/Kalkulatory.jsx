import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Grid } from "@mui/material";

import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

function Kalkulatory() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/kalkulator" onClick={() => navigate("/kalkulator")}>
            <div className="tile">
              <WaterDropIcon /> {/* Ikona butelki */}
              kalkulator
            </div>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/temperatury" onClick={() => navigate("/temperatury")}>
            <div className="tile">
              <ThermostatIcon /> {/* Ikona termometru */}
              temperatury
            </div>
          </Link>
        </Grid>
      </Grid>
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
