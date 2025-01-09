import { useNavigate, Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Grid } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

function Kalkulatory() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="app-container">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/kalkulator" onClick={() => navigate("/kalkulator")}>
            <div className="tile">
              <WaterDropIcon />
              kalkulator
            </div>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/temperatury" onClick={() => navigate("/temperatury")}>
            <div className="tile">
              <ThermostatIcon />
              temperatury
            </div>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/ibuClculator" onClick={() => navigate("/ibuClculator")}>
            <div className="tile">IBU</div>
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
