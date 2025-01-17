import { useNavigate, Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Grid from '@mui/material/Grid';
import AssignmentIcon from '@mui/icons-material/Assignment'; 
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import Brewery from './assets/brewery.png';
import Butelkowanie from './assets/butelkowanie.png';


function Dzienniki() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="app-container">
      <h2>Dzienniki:</h2>
      <Grid container rowSpacing={1} justifyContent="space-around">
        <Grid>
          <Link to="/dziennik" onClick={() => navigate("/dziennik")}>
          <div className="tile">
           <AssignmentIcon /> Dziennik Warzenia 
         </div>
          </Link>
        </Grid>
        <Grid >
          <Link to="/kalendarz" onClick={() => navigate("/kalendarz")}>
            <div className="tile">
              <CalendarTodayIcon /> Kalendarz
            </div>
          </Link>
        </Grid>
        <Grid >
        <Link to="/AsystentWarzenia" onClick={() => navigate("/AsystentWarzenia")}>
          <div className="tile">
              <img src={Brewery} alt="Hop Icon" style={{ width: '40%', height: '40%' }}/>Asysten Warzenia</div>
          </Link>
         
        </Grid>
        <Grid >
        <Link to="/AsystentButelkowania" onClick={() => navigate("/AsystentButelkowania")}>
          <div className="tile">
              <img src={Butelkowanie} alt="Hop Icon" style={{ width: '40%', height: '40%' }}/>Asysten Butelkowanie</div>
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
