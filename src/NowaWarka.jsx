
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SaveIcon from '@mui/icons-material/Save';
import { TextField,} from '@mui/material';

function NowaWarka() {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [warki, setWarki] = useState([]);

  useEffect(() => {
    const warkiData = localStorage.getItem('warki');
    if (warkiData) {
      setWarki(JSON.parse(warkiData));
    }
    const warkiFromLocalStorage = localStorage.getItem('warki');
  if (warkiFromLocalStorage) {
    setWarki(JSON.parse(warkiFromLocalStorage));
  }

  // Wyczyść dane formularza z localStorage
  localStorage.removeItem('formularzNowaWarka'); 
    

    // Pobierz dane formularza z localStorage
    const formularzData = localStorage.getItem('formularzNowaWarka');
    if (formularzData) {
      const data = JSON.parse(formularzData);
      setValue('nazwa', data.nazwa);
      setValue('data', data.data);
      // ... ustaw wartości pozostałych pól ...
    }
  }, [setValue]);

  const onSubmit = (data) => {
    const newId = Date.now();
    setId(newId);
    localStorage.setItem(`warka-${newId}-notatka`, data.notatki);
    localStorage.setItem(`warka-${newId}`, JSON.stringify(data));

    const noweWarki = [...warki, { id: newId, ...data }];
    setWarki(noweWarki);
    localStorage.setItem('warki', JSON.stringify(noweWarki));

    localStorage.setItem('formularzNowaWarka', JSON.stringify(data));

    reset(); // Wyczyść formularz
    navigate('/dziennik'); // Przekieruj do strony dziennika
  };

  return (
    <div className="app-container">
      <h1>Nowa warka</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Nazwa warki */}
        <TextField
          label="Nazwa warki"
          {...register("nazwa", { required: true })}
          fullWidth
          margin="normal"
          error={!!errors.nazwa}
          helperText={errors.nazwa ? 'To pole jest wymagane' : ''}
          defaultValue=""
        />

        {/* Dzień nastawienia */}
        <TextField
  label="Dzień nastawienia"
  type="date"
  {...register("data", { required: true })}
  fullWidth
  margin="normal"
  InputLabelProps={{ shrink: true }}
  error={!!errors.data}
  helperText={errors.data ? 'To pole jest wymagane' : ''}
  defaultValue={new Date().toLocaleDateString('en-CA')} // Dodajemy aktualny dzień
/>

        {/* Rodzaj kitu, drożdże, chmiel, rodzaj cukru */}
        {[
          { name: "rodzajKitu", label: "Rodzaj kitu" },
          { name: "drozdze", label: "Drożdże" },
          { name: "chmiel", label: "Chmiel" },
          { name: "rodzajCukru", label: "Rodzaj cukru" },
        ].map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            {...register(field.name, { required: true })}
            fullWidth
            margin="normal"
            error={!!errors[field.name]}
            helperText={errors[field.name] ? 'To pole jest wymagane' : ''}
          />
        ))}
        <TextField
  label="Notatki"
  {...register("notatki")} 
  fullWidth
  margin="normal"
  multiline 
  rows={4}
/>

        {/* Przyciski */}
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          type="submit"
          sx={{ mr: 2 }}
        >
          Zapisz i dodaj pomiary
        </Button>
        <p></p>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={() => navigate(-1)}
          sx={{ mr: 2 }}
        >
          Wstecz
        </Button>
      </form>
    </div>
  );
}

export default NowaWarka;
