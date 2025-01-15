import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './NowyWpis'; // Importuj instancję db
import { Card, CardContent, CardMedia, Typography, Rating } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
function SzczegolyWpisu() {
  const { id } = useParams();
  const [wpis, setWpis] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchWpis = async () => {
      try {
        const data = await db.wpisy.get(parseInt(id)); // Pobierz wpis na podstawie ID
        setWpis(data);
      } catch (error) {
        console.error('Błąd podczas pobierania wpisu:', error);
        // Obsługa błędów, np. wyświetlenie alertu dla użytkownika
      }
    };

    fetchWpis();
  }, [id]);

  if (!wpis) {
    return <div>Loading...</div>; // Wyświetl komunikat ładowania, jeśli wpis nie został jeszcze pobrany
  }

  return (
    <div className="app-container">
    <Card sx={{ maxWidth: 600, margin: 'auto' }}>
      <CardMedia
        component="img"
        height="300"
        image={wpis.miniatura}
        alt={wpis.nazwa}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {wpis.nazwa}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Browar: {wpis.browar}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Styl: {wpis.styl}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Data degustacji: {wpis.dataDegustacji}
        </Typography>
        <Rating value={wpis.ocena} readOnly />
        
        {/* ... */}
      </CardContent>
    </Card>
    <Button variant="contained" color="primary" startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
  Wstecz
</Button>
    </div>
  );
}

export default SzczegolyWpisu;