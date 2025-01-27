import { Button }
 from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Wpisy from './Wpisy';
import { useState } from 'react'; // Dodajemy import useState

function OcenPiwo() {
  const navigate = useNavigate();
  const [displayMode, setDisplayMode] = useState('card'); // Domyślny tryb to 'card'

  const handleOpenForm = () => {
    navigate('/nowy-wpis');
  };

  const handleDisplayModeChange = (mode) => {
    setDisplayMode(mode);
  };

  return (
    <div className="app-container">
      <h2>Twoje Wspomnienia:</h2>

      {/* Przełącznik trybu */}
      <div>
        <Button
          variant={displayMode === 'card' ? 'contained' : 'outlined'}
          onClick={() => handleDisplayModeChange('card')}
          sx={{ mr: 2 }} // Dodajemy trochę marginesu z prawej strony
        >
          Karty
        </Button>
        <Button
          variant={displayMode === 'list' ? 'contained' : 'outlined'}
          onClick={() => handleDisplayModeChange('list')}
        >
          Lista
        </Button>
      </div>

      {/* Wyświetlanie wpisów */}
      <Wpisy displayMode={displayMode} />

      {/* Przycisk do formularza */}
      <Button variant="contained" color="primary" onClick={handleOpenForm} sx={{ mt: 2 }}> {/* dodajemy margines top*/}
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