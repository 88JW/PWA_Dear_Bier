import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Dexie from 'dexie';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EdytujWpis from './EdytujWpis';
import ShareIcon from '@mui/icons-material/Share'; 
import { useSearchParams } from 'react-router-dom';

function SzczegolyWpisu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wpis, setWpis] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [fileToShare, setFileToShare] = useState(null);
  const fileInputRef = useRef(null);

  const open = Boolean(anchorEl);

  const db = new Dexie('OcenyPiwaDB');
  db.version(1).stores({
    wpisy:
      '++id, nazwa, browar, styl, dataDegustacji, intensywnoscAromatu, jakoscAromatu, nutyAromatyczne, barwa, klarownosc, piana, intensywnoscSmaku, rownowaga, goryczka, slodycz, kwasowosc, nutySmakowe, pijalnosc, zlozonosc, ogolneWrazenie, uwagi, miniatura, ocena',
  });

  const [searchParams] = useSearchParams();
  const monospaceUid = searchParams.get('monospaceUid');

  useEffect(() => {
    const fetchWpis = async () => {
      const wpis = await db.wpisy.get(parseInt(id, 10));
      setWpis(wpis);
      if (wpis && wpis.miniatura) {
        const response = await fetch(wpis.miniatura);
        const blob = await response.blob();
        const file = new File([blob], 'obraz.jpg', { type: blob.type });
        setFileToShare(file);
      }
    };

    fetchWpis();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      await db.wpisy.delete(id);
      navigate('/OcenPiwo');
    } catch (error) {
      console.error('Błąd podczas usuwania wpisu:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleZapisz = () => {
    setIsEditing(false);
  };

  const handleCopyText = () => {
    if (wpis) {
      const textToCopy = `
        Nazwa: ${wpis.nazwa}
        Browar: ${wpis.browar}
        Styl: ${wpis.styl}
        Data degustacji: ${wpis.dataDegustacji}
        Ogólna ocena: ${wpis.ocena}/5
        Jakość aromatu: ${wpis.jakoscAromatu}/5
        Nuty aromatyczne: ${wpis.nutyAromatyczne.map(nuta => nuta.label).join(', ')}
        Barwa: ${wpis.barwa}
        Klarowność: ${wpis.klarownosc}/5
        Piana: ${wpis.piana}/5
        Intensywność smaku: ${wpis.intensywnoscSmaku}/5
        Równowaga: ${wpis.rownowaga}/5
        Goryczka: ${wpis.goryczka}/10
        Słodycz: ${wpis.slodycz}/10
        Kwasowość: ${wpis.kwasowosc}/10
        Nuty smakowe: ${wpis.nutySmakowe}
        Pijalność: ${wpis.pijalnosc}/5
        Złożoność: ${wpis.zlozonosc}/5
        Ogólne wrażenie: ${wpis.ogolneWrazenie}/5
        Uwagi: ${wpis.uwagi}
      `;
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          setSnackbarOpen(true);
        })
        .catch((err) => {
          console.error('Błąd podczas kopiowania tekstu:', err);
        });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileToShare(selectedFile);
  };
  const handleShare = async () => {
    if (navigator.canShare && fileToShare && wpis) {
      const textToShare = `
      Piwo: ${wpis.nazwa}
      Browar: ${wpis.browar}
      Ocena: ${wpis.ocena}/5
      
      Szczegóły:
        Styl: ${wpis.styl}
        Data degustacji: ${wpis.dataDegustacji}
        Jakość aromatu: ${wpis.jakoscAromatu}/5
        Nuty aromatyczne: ${wpis.nutyAromatyczne.map(nuta => nuta.label).join(', ')}
        Barwa: ${wpis.barwa}
        Klarowność: ${wpis.klarownosc}/5
        Piana: ${wpis.piana}/5
        Intensywność smaku: ${wpis.intensywnoscSmaku}/5
        Równowaga: ${wpis.rownowaga}/5
        Goryczka: ${wpis.goryczka}/10
        Słodycz: ${wpis.slodycz}/10
        Kwasowość: ${wpis.kwasowosc}/10
        Nuty smakowe: ${wpis.nutySmakowe}
        Pijalność: ${wpis.pijalnosc}/5
        Złożoność: ${wpis.zlozonosc}/5
        Ogólne wrażenie: ${wpis.ogolneWrazenie}/5
        Uwagi: ${wpis.uwagi}
      `;
      const shareData = {
        title: `Ocena Piwa - ${wpis.nazwa}`,
        text: textToShare,
        files: [fileToShare],
      };

      if (navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          console.error('Błąd podczas udostępniania:', err);
        }
      } else {
        console.error('Nie można udostępnić danych.');
      }
    } else {
      console.log('Web Share API is not supported on your browser or file is not selected');
    }
  };

  if (!wpis) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      {isEditing ? (
        <EdytujWpis wpis={wpis} onZapisz={handleZapisz} />
      ) : (
        <div>
          <Card>
            <CardContent>
              <CardMedia
                component="img"
                height="350"
                image={wpis.miniatura}
                alt={wpis.nazwa}
                sx={{
                  objectPosition: 'center',
                }}
              />
              <Typography gutterBottom variant="h5" component="div">
                {wpis.nazwa}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                Ogólna ocena{' '}
                <Rating name="read-only" value={wpis.ocena} readOnly />
                {wpis.ocena}/5
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
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                Jakość aromatu:{' '}
                <Rating value={wpis.jakoscAromatu} readOnly />
                {wpis.jakoscAromatu}/5
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                Nuty aromatyczne:{' '}
                {wpis.nutyAromatyczne.map((nuta) => nuta.label).join(', ')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Barwa: {wpis.barwa}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                Klarowność: <Rating value={wpis.klarownosc} readOnly />
                {wpis.klarownosc}/5
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                Piana: <Rating value={wpis.piana} readOnly />
                {wpis.piana}/5
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                Intensywność smaku: <Rating value={wpis.intensywnoscSmaku} readOnly />
                {wpis.intensywnoscSmaku}/5
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                Równowaga: <Rating value={wpis.rownowaga} readOnly />
                {wpis.rownowaga}/5
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
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                Pijalność: <Rating value={wpis.pijalnosc} readOnly />
                {wpis.pijalnosc}/5
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                Złożoność: <Rating value={wpis.zlozonosc} readOnly />
                {wpis.zlozonosc}/5
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                Ogólne wrażenie:{' '}
                <Rating value={wpis.ogolneWrazenie} readOnly />
                {wpis.ogolneWrazenie}/5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Uwagi: {wpis.uwagi}
              </Typography>
            </CardContent>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems:'center' }}>
              <Typography variant="body2" color="text.secondary">
                 Udostępnij
              </Typography>
                 <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                   onChange={handleImageChange}
                />
            <IconButton aria-label="share" onClick={handleShare}>
                 <ShareIcon/>
            </IconButton>
            <IconButton aria-label="copy" onClick={handleCopyText}>
             <ContentCopyIcon/>
            </IconButton>
              <IconButton aria-label="settings" onClick={handleClick}>
                <SettingsIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem
                  onClick={() => {
                    handleDelete(wpis.id);
                    handleClose();
                  }}
                >
                  Usuń
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleEditClick();
                    handleClose();
                  }}
                >
                  Edytuj
                </MenuItem>
              </Menu>
            </div>
          </Card>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
          >
            Wstecz
          </Button>
        </div>
      )}
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
         Tekst został skopiowany do schowka!
        </Alert>
    </Snackbar>
    </div>
  );
}

export default SzczegolyWpisu;



{/* <Card sx={{ maxWidth: 345, marginBottom: 1, marginRight:1, marginTop: 1}}>
                {wpis.miniaturaUrl && (
                  <CardMedia
                  component="img"
                  height="200"
                  image={wpis.miniatura}
                  alt={wpis.nazwa}
                  /> */}