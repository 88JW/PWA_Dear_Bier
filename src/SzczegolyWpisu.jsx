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
        height="350"
        image={wpis.miniatura}
        alt={wpis.nazwa}
        sx={{ 
          objectPosition: 'center'
        }} 
      />
      <CardContent>
      <Typography variant="body1" color="text.secondary" style={{ display: 'flex', alignItems: 'center' }}>
    Ogólna ocena <Rating name="read-only" value={wpis.ocena} readOnly />
  </Typography>
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
  


  <Typography variant="body2" color="text.secondary" style={{ display: 'flex', alignItems: 'center' }}>
    Jakość aromatu: <Rating value={wpis.jakoscAromatu} readOnly />
  </Typography>
  <Typography variant="body2" color="text.secondary" style={{ display: 'flex', alignItems: 'center' }}>
    Nuty aromatyczne: {wpis.nutyAromatyczne.map(nuta => nuta.label).join(', ')}
  </Typography>
  <Typography variant="body2" color="text.secondary">
    Barwa: {wpis.barwa}
  </Typography>
  <Typography variant="body2" color="text.secondary" style={{ display: 'flex', alignItems: 'center' }}>
    Klarowność: <Rating value={wpis.klarownosc} readOnly />
  </Typography>
  <Typography variant="body2" color="text.secondary" style={{ display: 'flex', alignItems: 'center' }}>
    Piana: <Rating value={wpis.piana} readOnly />
  </Typography>
  <Typography variant="body2" color="text.secondary" style={{ display: 'flex', alignItems: 'center' }}>
    Intensywność smaku: <Rating value={wpis.intensywnoscSmaku} readOnly />
  </Typography>
  <Typography variant="body2" color="text.secondary" style={{ display: 'flex', alignItems: 'center' }}>
    Równowaga: <Rating value={wpis.rownowaga} readOnly />
  </Typography>
  <Typography variant="body2" color="text.secondary">
    Goryczka: {wpis.goryczka} / 10
  </Typography>
  <Typography variant="body2" color="text.secondary">
    Słodycz: {wpis.slodycz} / 10
  </Typography>
  <Typography variant="body2" color="text.secondary">
    Kwasowość: {wpis.kwasowosc} / 10
  </Typography>
  <Typography variant="body2" color="text.secondary">
    Nuty smakowe: {wpis.nutySmakowe}
  </Typography>
  <Typography variant="body2" color="text.secondary" style={{ display: 'flex', alignItems: 'center' }}>
    Pijalność: <Rating value={wpis.pijalnosc} readOnly />
  </Typography>
  <Typography variant="body2" color="text.secondary" style={{ display: 'flex', alignItems: 'center' }}>
    Złożoność: <Rating value={wpis.zlozonosc} readOnly />
  </Typography>
  <Typography variant="body2" color="text.secondary" style={{ display: 'flex', alignItems: 'center' }}>
    Ogólne wrażenie: <Rating value={wpis.ogolneWrazenie} readOnly />
  </Typography>
  <Typography variant="body2" color="text.secondary">
    Uwagi: {wpis.uwagi}
  </Typography>
</CardContent>
    </Card>
    <Button variant="contained" color="primary" startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
  Wstecz
</Button>
    </div>
  );
}

export default SzczegolyWpisu;