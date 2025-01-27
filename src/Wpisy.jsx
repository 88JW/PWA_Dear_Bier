
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Rating, List, ListItem, ListItemText, Box } from '@mui/material'; // Importujemy Box
import Dexie from 'dexie';

const db = new Dexie('OcenyPiwaDB');
db.version(1).stores({
  wpisy: '++id, nazwa, browar, styl, dataDegustacji, intensywnoscAromatu, jakoscAromatu, nutyAromatyczne, barwa, klarownosc, piana, intensywnoscSmaku, rownowaga, goryczka, slodycz, kwasowosc, nutySmakowe, pijalnosc, zlozonosc, ogolneWrazenie, uwagi, miniatura, ocena',
});

function Wpisy({ displayMode }) {
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

        setWpisy(updatedWpisy);
      } catch (error) {
        console.error('Błąd podczas pobierania wpisów:', error);
      }
    };

    db.wpisy.hook('creating', fetchWpisy);
    db.wpisy.hook('deleting', fetchWpisy);
    db.wpisy.hook('updating', fetchWpisy);

    fetchWpisy();
  }, []);

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
              <Card sx={{ maxWidth: 345, marginBottom: 1, marginRight:1, marginTop: 1}}>
                {wpis.miniaturaUrl && (
                  <CardMedia
                  component="img"
                  height="200"
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
               <Box sx={{ display: 'flex', alignItems: 'center', width: '100%'}}>
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
