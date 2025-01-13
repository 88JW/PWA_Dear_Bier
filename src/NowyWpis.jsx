import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Rating, Typography } from '@mui/material';

function NowyWpis() {
  const navigate = useNavigate();
  const [nazwa, setNazwa] = useState('');
  const [miniatura, setMiniatura] = useState('');
  const [ocena, setOcena] = useState(0); 
  // Dodaj tutaj pola dla innych informacji, jeśli potrzebujesz

  const handleSubmit = (event) => {
    event.preventDefault();

    const nowyWpis = { nazwa, miniatura, ocena };
    // Dodaj tutaj inne informacje do obiektu nowyWpis

    const wpisy = JSON.parse(localStorage.getItem('wpisy')) || [];
    wpisy.push(nowyWpis);
    localStorage.setItem('wpisy', JSON.stringify(wpisy));

    navigate('/ocenPiwo');
  };

  return (
    <div>
      <h1>Dodaj nową ocenę</h1>
      <form onSubmit={handleSubmit}>
        <TextField label="Nazwa piwa" value={nazwa} onChange={(e) => setNazwa(e.target.value)} fullWidth margin="normal" />
        <TextField label="URL miniatury" value={miniatura} onChange={(e) => setMiniatura(e.target.value)} fullWidth margin="normal" />

        {/* Ocena */}
        <Typography component="legend">Ocena</Typography>
        <Rating name="ocena" value={ocena} onChange={(event, newValue) => { setOcena(newValue); }} />

        {/* Dodaj tutaj pola dla innych informacji, jeśli potrzebujesz */}

        <Button type="submit" variant="contained" color="primary">
          Dodaj ocenę
        </Button>
      </form>
    </div>
  );
}

export default NowyWpis;