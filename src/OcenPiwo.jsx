import { Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material'; // Importujemy Box
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Wpisy from './Wpisy';
import { useState } from 'react';

function OcenPiwo() {
  const navigate = useNavigate();
  const [displayMode, setDisplayMode] = useState('card');
  const [sortMode, setSortMode] = useState('dataDegustacji-desc');

  const handleOpenForm = () => {
    navigate('/nowy-wpis');
  };

  const handleDisplayModeChange = (event) => {
    setDisplayMode(event.target.value);
  };

  const handleSortModeChange = (event) => {
    setSortMode(event.target.value);
  };

  return (
    <div className="app-container">
      <h2>Twoje Wspomnienia:</h2>

      {/* Kontener dla przełącznika trybu i sortowania */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}> {/* Dodajemy kontener Box */}
        {/* Przełącznik trybu */}
        <FormControl sx={{ minWidth: 120, marginLeft: 0 }}> {/* Dodajemy marginLeft */}
          <InputLabel id="display-mode-select-label">Widok</InputLabel>
          <Select
            labelId="display-mode-select-label"
            id="display-mode-select"
            value={displayMode}
            label="Widok"
            onChange={handleDisplayModeChange}
          >
            <MenuItem value="card">Karty</MenuItem>
            <MenuItem value="list">Lista</MenuItem>
          </Select>
        </FormControl>

        {/* Wybór sortowania */}
        <FormControl sx={{  minWidth: 120, marginLeft: 2 }}> {/* Dodajemy marginLeft */}
          <InputLabel id="sort-select-label">Sortuj</InputLabel>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={sortMode}
            label="Sortuj"
            onChange={handleSortModeChange}
          >
            <MenuItem value="dataDegustacji-desc">Data (najnowsze)</MenuItem>
            <MenuItem value="dataDegustacji-asc">Data (najstarsze)</MenuItem>
            <MenuItem value="styl-asc">Styl (A-Z)</MenuItem>
            <MenuItem value="styl-desc">Styl (Z-A)</MenuItem>
            <MenuItem value="ocena-desc">Ocena (najwyższa)</MenuItem>
            <MenuItem value="ocena-asc">Ocena (najniższa)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Wyświetlanie wpisów */}
      <Wpisy displayMode={displayMode} sortMode={sortMode} />

      {/* Przycisk do formularza */}
      <Button variant="contained" color="primary" onClick={handleOpenForm} sx={{ mt: 2 }}>
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