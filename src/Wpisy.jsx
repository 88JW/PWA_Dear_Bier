import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Rating, List, ListItem, ListItemText, Box } from '@mui/material'; // Importujemy Box
import Dexie from 'dexie';

const db = new Dexie('OcenyPiwaDB');
db.version(1).stores({
  wpisy: '++id, nazwa, browar, styl, dataDegustacji, intensywnoscAromatu, jakoscAromatu, nutyAromatyczne, barwa, klarownosc, piana, intensywnoscSmaku, rownowaga, goryczka, slodycz, kwasowosc, nutySmakowe, pijalnosc, zlozonosc, ogolneWrazenie, uwagi, miniatura, ocena',
});

function Wpisy({ displayMode, sortMode }) {
  const [wpisy, setWpisy] = useState([]);

  useEffect(() => {
    const fetchWpisy = async () => {
      try {
        const data = await db.wpisy.toArray();
        const updatedWpisy = await Promise.all(data.map(async (wpis) => {
          const updatedWpis = { ...wpis };
          if (wpis.miniatura) {
            const reader = new FileReader();
            reader.readAsDataURL(new Blob([wpis.miniatura]));

            await new Promise((resolve) => {
              reader.onload = () => {
                updatedWpis.miniaturaUrl = reader.result;
                resolve();
              };
            });
          }
          return updatedWpis;
        }));

        // Sortowanie
        updatedWpisy.sort((a, b) => {
          const [field, order] = sortMode.split('-');
          if (field === 'ocena' || field === 'dataDegustacji') {
            if (order === 'asc') {
              return a[field] - b[field]; // Rosnąco
            } else {
              return b[field] - a[field]; // Malejąco
            }
          } else if (field === 'styl') {
            return order === 'asc'
              ? a.styl.localeCompare(b.styl) // Rosnąco
              : b.styl.localeCompare(a.styl) // Malejąco
          }
          return 0;
        });

        setWpisy(updatedWpisy);
      } catch (error) {
        console.error('Błąd podczas pobierania wpisów:', error);
      }
    };

    db.wpisy.hook('creating', fetchWpisy);
    db.wpisy.hook('deleting', fetchWpisy);
    db.wpisy.hook('updating', fetchWpisy);

    fetchWpisy();
  }, [sortMode]);

  const handleDelete = async (id) => {
    try {
      await db.wpisy.delete(id);
      setWpisy(wpisy.filter(wpis => wpis.id !== id));
    } catch (error) {
      console.error('Błąd podczas usuwania wpisu:', error);
    }
  };

  return (
    <div>
      {displayMode === 'card' ? (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {wpisy.map((wpis) => (
            <Link key={wpis.id} to={`/wpis/${wpis.id}`} style={{ textDecoration: 'none' }}>
              <Card sx={{
                width: 180, // Stała szerokość karty
                height: 310, // Stała wysokość karty
                marginBottom: 1,
                marginRight: 1, marginTop: 1,
                display: 'flex',
                flexDirection: 'column',
              }}>
                {wpis.miniaturaUrl && (
                  <CardMedia
                    sx={{
                      width: '100%', // Szerokość obrazka równa szerokości kontenera
                      paddingTop: '100%', // Wysokość obrazka jest równa szerokości (tworzy kwadrat)
                      position: 'relative',
                    }}
                    image={wpis.miniatura}
                    alt={wpis.nazwa}
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h7" component="div">
                    {wpis.nazwa}
                  </Typography>
                  <Typography gutterBottom variant="h7" component="div">
                    {wpis.dataDegustacji}
                  </Typography>
                  <Rating value={wpis.ocena} readOnly />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <List>
          {wpisy.map((wpis) => (
            <Link key={wpis.id} to={`/wpis/${wpis.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <ListItemText primary={wpis.nazwa} secondary={`${wpis.dataDegustacji}, ${wpis.styl}`} />
                  </Box>
                  <Box>
                    <Rating value={wpis.ocena} readOnly />
                  </Box>
                </Box>
              </ListItem>
            </Link>
          ))}
        </List>
      )}
    </div>
  );
}

export default Wpisy;