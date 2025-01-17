import React, { useState, useEffect } from 'react';
import { useParams, useNavigate,useSearchParams } from 'react-router-dom';
import Dexie from 'dexie';
import {Card,CardContent, CardMedia,Typography,Rating,Button,IconButton,Menu,MenuItem,} from '@mui/material';
import {SettingsIcon,ArrowBackIcon} from '@mui/icons-material/Settings';
import EdytujWpis from './EdytujWpis';


function SzczegolyWpisu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wpis, setWpis] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const db = new Dexie('OcenyPiwaDB');
  db.version(1).stores({
    wpisy: '++id, nazwa, browar, styl, dataDegustacji, intensywnoscAromatu, jakoscAromatu, nutyAromatyczne, barwa, klarownosc, piana, intensywnoscSmaku, rownowaga, goryczka, slodycz, kwasowosc, nutySmakowe, pijalnosc, zlozonosc, ogolneWrazenie, uwagi, miniatura, ocena',
  });

  const [searchParams] = useSearchParams();
  const monospaceUid = searchParams.get('monospaceUid');
  useEffect(() => {
    const fetchWpis = async () => {
      const wpis = await db.wpisy.get(parseInt(id, 10));
      setWpis(wpis);
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

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleZapisz = () => {
    setIsEditing(false);
    // You might want to refresh the data here or navigate back to the details view
    // For example, you could call fetchWpis() again to update the data
    // or navigate to `/wpis/${id}` to force a re-render of the component
  };
  if (!wpis) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      {isEditing ? (
        <EdytujWpis wpis={wpis} onZapisz={handleZapisz} />
      ) : (
        <div >
          <Card>
            <CardContent>
              <CardMedia
                component="img"
                height="350"
                image={wpis.miniatura}
                alt={wpis.nazwa}
                sx={{
                  objectPosition: 'center'
                }}/>
              <Typography gutterBottom variant="h5" component="div">
                {wpis.nazwa}
              </Typography>
              <Typography variant="body1" color="text.secondary" style={{ display: 'flex', alignItems: 'center' }}>
                Ogólna ocena <Rating name="read-only" value={wpis.ocena} readOnly />
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
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton aria-label="settings" onClick={handleClick}>
                <SettingsIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}>
                <MenuItem onClick={() => { handleDelete(wpis.id); handleClose(); }}>Usuń</MenuItem>
                <MenuItem onClick={() => { handleEditClick(); handleClose(); }}>Edytuj</MenuItem>
              </Menu>
            </div>
          </Card>
          <Button variant="contained" color="primary" startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
            Wstecz
          </Button>
        </div>
      )}
    </div>
  );
}

export default SzczegolyWpisu;