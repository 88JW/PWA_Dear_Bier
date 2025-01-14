import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
    </div>
  );
}

export default OcenPiwo;