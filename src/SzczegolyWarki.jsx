// SzczegolyWarki.jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControlLabel, Checkbox } from '@mui/material';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


// import * as Imports from './imports';


function SzczegolyWarki() {
  const { id } = useParams();
  const warkaData = localStorage.getItem(`warka-${id}`);
  const warka = warkaData ? JSON.parse(warkaData) : null;
  const [pomiary, setPomiary] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [defaultDate, setDefaultDate] = useState(new Date().toISOString().slice(0, 10)); // Stan dla daty
  const [defaultTime, setDefaultTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })); // Stan dla godziny
  const notatka = localStorage.getItem(`warka-${id}-notatka`);
  useEffect(() => {
    // Ustawienie domyślnych wartości dla daty i godziny
    setDefaultDate(new Date().toISOString().slice(0, 10));
    setDefaultTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, []); // useEffect uruchomi się tylko raz po zamontowaniu komponentu


  useEffect(() => {
    if (warka && warka.pomiary && warka.pomiary.length > 0 && pomiary.length === 0) {
      setPomiary([...warka.pomiary]);
    }
  }, [warka, pomiary]);

  const onSubmit = (data) => {
    const nowyPomiar = {
      ...data,
      data: dayjs(data.data).format('YYYY-MM-DD'), // Formatowanie daty
      godzina: dayjs(data.data).format('HH:mm'), // Formatowanie godziny
    };;
    setPomiary([...pomiary, nowyPomiar]);

    // Aktualizacja danych w localStorage
    const zaktualizowanaWarka = { ...warka, pomiary: [...pomiary, nowyPomiar] };
    localStorage.setItem(`warka-${id}`, JSON.stringify(zaktualizowanaWarka));

    reset(); // Reset formularza po dodaniu pomiaru
  };

  const handleUsun = () => {
    if (window.confirm('Czy na pewno chcesz usunąć tę warkę?')) {
      // Pobierz listę warek z localStorage
      const warkiData = localStorage.getItem('warki');
      let warki = warkiData ? JSON.parse(warkiData) : [];

      // Usuń warkę z listy
      warki = warki.filter((warka) => warka.id !== parseInt(id));

      // Zaktualizuj localStorage
      localStorage.setItem('warki', JSON.stringify(warki));
      localStorage.removeItem(`warka-${id}`);

      // Przekieruj do strony dziennika
      navigate('/dziennik');
    }
    handleClose();
  };

  const [defaultDateTime, setDefaultDateTime] = useState(new Date());

  useEffect(() => {
    setDefaultDateTime(new Date());
  }, []);

  const usunPomiar = (index) => {
    const nowePomiary = [...pomiary];
    nowePomiary.splice(index, 1);
    setPomiary(nowePomiary);

    // Aktualizacja danych w localStorage
    const zaktualizowanaWarka = { ...warka, pomiary: nowePomiary };
    localStorage.setItem(`warka-${id}`, JSON.stringify(zaktualizowanaWarka));
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  }; const handleClose = () => {
    setAnchorEl(null);

  }; const handleArchiwizuj = () => {
    navigate(`/archiwum/${id}`, { state: { warka, pomiary } });
    handleClose();
  };

  if (!warka) {
    return <div>Warka nie znaleziona.</div>;
  }


  return (
    <div className="app-container">
      <div style={{ display: 'flex', alignItems: 'center' }}> 
      
      <h1>Szczegóły Warki:</h1>
      
        <div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            {/* Zamiast MoreVertIcon użyj SettingsIcon */}
            <SettingsIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{

              style: {
                maxHeight: 48 * 4.5,
                width: '20ch',
              },
            }}
          >
            <MenuItem onClick={handleArchiwizuj}>
              Archiwizuj warkę
            </MenuItem>
            <MenuItem onClick={handleUsun}>
              Usuń warkę
            </MenuItem>
          </Menu>
        </div>
      
      </div>
      <Typography variant="body2" color="text.secondary">
        Nazwa: {warka.nazwa}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Dzień nastawienia: {warka.data}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Rodzaj kitu: {warka.rodzajKitu}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Drożdże: {warka.drozdze}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Chmiel: {warka.chmiel}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Rodzaj cukru: {warka.rodzajCukru}
      </Typography>
      {notatka && ( // Wyświetlamy notatkę, jeśli istnieje
        <Typography variant="body2" color="text.secondary">
          Notatka: {notatka}
        </Typography>
      )}
      <h3>Dodaj pomiar:</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Data i godzina */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateTimePicker
            // ... props dla wersji desktopowej ...
            sx={{ marginBottom: 2 }}
            defaultValue={dayjs(new Date())}
            ampm={false}
            disabled={false}
            renderInput={(params) => <TextField {...params} />} // Renderuje TextField dla wersji desktopowej
          />

        </LocalizationProvider>

        {/* Blg */}
        <TextField
          label="Blg"
          type="text"
          {...register("blg")}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        {/* Temperatura */}
        <TextField
          label="Temperatura"
          type="text"
          {...register("temperatura")}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        {/* Piana */}
        <FormControlLabel
          control={<Checkbox {...register("piana")} />}
          label="Piana"
        />

        {/* CO2 */}
        <FormControlLabel
          control={<Checkbox {...register("co2")} />}
          label="CO2"
        />

        {/* Notatki */}
        <TextField
          label="Notatki"
          multiline
          rows={4}
          {...register("notes")}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        {/* Przycisk */}
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Dodaj pomiar
        </Button>
      </form>
      <h2>Pomiary:</h2>
      <ul>
        {pomiary.map((pomiar, index) => (
          <Card key={index} sx={{ marginBottom: 2 }}>
            <CardContent className="card-content">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Data: {pomiar.data}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Godzina: {pomiar.godzina}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Blg: {pomiar.blg}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Temperatura: {pomiar.temperatura}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Piana: {pomiar.piana ? 'Tak' : 'Nie'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    CO2: {pomiar.co2 ? 'Tak' : 'Nie'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Notatki: {pomiar.notes}
                  </Typography>
                </Grid>
              </Grid>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => usunPomiar(index)}
                sx={{ marginTop: 1 }}
              >
                Usuń
              </Button>
            </CardContent>
          </Card>
        ))}
      </ul>


      <p></p>
      <div className="button-container">
        <div sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary" startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
  Wstecz
</Button>
        </div></div>
    </div>
  );
}

export default SzczegolyWarki;
