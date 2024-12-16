import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';

function Kalendarz() {
  const navigate = useNavigate();
  const [selectedDateTime, setSelectedDateTime] = useState(dayjs());
  const [nazwa, setNazwa] = useState('');

  // Wczytaj wydarzenia z localStorage podczas pierwszego renderowania
  const [wydarzenia, setWydarzenia] = useState(() => {
    const storedWydarzenia = localStorage.getItem('wydarzenia');
    return storedWydarzenia ? JSON.parse(storedWydarzenia) : [];
  });

  const handleNazwaChange = (event) => {
    setNazwa(event.target.value);
  };

  const handleDateTimeChange = (newValue) => {
    setSelectedDateTime(newValue);
  };

  const dodajWydarzenie = () => {
    const dataRozpoczecia = selectedDateTime;
    const dataZakonczenia = dataRozpoczecia.add(5, 'day');

    const noweWydarzenie = {
      data: dataRozpoczecia.format('YYYY-MM-DD'),
      czas: dataRozpoczecia.format('HH:mm'),
      nazwa: nazwa,
      dataZakonczenia: dataZakonczenia.format('YYYY-MM-DD'),
    };

    setWydarzenia([...wydarzenia, noweWydarzenie]);
    setNazwa('');

    // Zapisz zaktualizowane wydarzenia w localStorage
    localStorage.setItem('wydarzenia', JSON.stringify([...wydarzenia, noweWydarzenie]));
  };

  const usunWydarzenie = (index) => {
    const updatedWydarzenia = [...wydarzenia];
    updatedWydarzenia.splice(index, 1);
    setWydarzenia(updatedWydarzenia);
    localStorage.setItem('wydarzenia', JSON.stringify(updatedWydarzenia));
  };

  return (
    <div className="app-container">
      <h1>Kalendarz Oczekiwania</h1>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDateTimePicker
          label="Data i czas wydarzenia"
          value={selectedDateTime}
          onChange={handleDateTimeChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <TextField
        label="Nazwa wydarzenia"
        value={nazwa}
        onChange={handleNazwaChange}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" onClick={dodajWydarzenie}>
        Dodaj wydarzenie
      </Button>
      <h2>Wydarzenia:</h2>
      {wydarzenia.map((wydarzenie, index) => (
        <Card key={index} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">{wydarzenie.nazwa}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Dzień: {wydarzenie.data}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Godzina: {wydarzenie.czas}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Data zakończenia: {wydarzenie.dataZakonczenia}
                </Typography>
              </Grid>
            </Grid>

            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => usunWydarzenie(index)}
              sx={{ marginTop: 1 }}
            >
              Usuń
            </Button>
          </CardContent>
        </Card>
      ))}

      <Button
        variant="outlined"
        startIcon={<ArrowBackIosNewIcon />}
        onClick={() => navigate('/')}
      >
        Wstecz
      </Button>
    </div>
  );
}

export default Kalendarz;