
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


function GotoweTemperatury() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <p>Gotowe Temperatury</p>
      <div className="button-container"> 
     
      <Button
        variant="outlined"
        startIcon={<ArrowBackIosNewIcon />}
        onClick={() => navigate(-2)}
        sx={{ mr: 2 }}
      >
        Wstecz
      </Button>
      </div>
    </div>
  );
}

export default GotoweTemperatury;