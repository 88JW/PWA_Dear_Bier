import { useNavigate, Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Grid from '@mui/material/Grid';

function Dzienniki() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="app-container">
      <h2>Dzienniki:</h2>
       <Grid container rowSpacing={1} justifyContent="space-around">
        <Grid>
          <Link to="/dziennik" onClick={() => navigate("/dziennik")}>
            <div className="tile">Dziennik Warzenia</div>
          </Link>
        </Grid>
        <Grid >
          <Link to="/kalendarz" onClick={() => navigate("/kalendarz")}>
            <div className="tile">Kalendarz</div>
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

export default Dzienniki;
