import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Wpisy from './Wpisy';

function OcenPiwo() {
  const navigate = useNavigate();

  const handleOpenForm = () => {
    navigate('/nowy-wpis'); 
  };

  return (
    <div className="app-container">
      <h2>Twoje Wspomnienia:</h2>

      {/* Wyświetlanie wpisów */}
      <Wpisy />

      {/* Przycisk do formularza */}
      <Button variant="contained" color="primary" onClick={handleOpenForm}>
        Dodaj nową ocenę
      </Button>
      <br></br>
      <br></br>
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

export default OcenPiwo;