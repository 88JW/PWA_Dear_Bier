import { useNavigate, Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Grid } from "@mui/material";

function Dzienniki() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="app-container">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/dziennik" onClick={() => navigate("/dziennik")}>
            <div className="tile">Dziennik Warzenia</div>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
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
