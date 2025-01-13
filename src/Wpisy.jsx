import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Dexie from 'dexie';

// Utwórz instancję Dexie i zdefiniuj schemat bazy danych (jeśli nie jest zdefiniowany w innym miejscu)
const db = new Dexie('OcenyPiwaDB');
db.version(1).stores({
  wpisy: '++id, nazwa, browar, styl, dataDegustacji, intensywnoscAromatu, jakoscAromatu, nutyAromatyczne, barwa, klarownosc, piana, intensywnoscSmaku, rownowaga, goryczka, slodycz, kwasowosc, nutySmakowe, pijalnosc, zlozonosc, ogolneWrazenie, uwagi, miniatura, ocena',
});

function Wpisy() {
  const [wpisy, setWpisy] = useState([]);

  useEffect(() => {
    const fetchWpisy = async () => {
      try {
        const data = await db.wpisy.toArray();
        setWpisy(data);
      } catch (error) {
        console.error('Błąd podczas pobierania wpisów:', error);
      }
    };

    // Nasłuchiwanie zmian w IndexedDB
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
      {wpisy.map((wpis) => (
        <Link key={wpis.id} to={`/wpis/${wpis.id}`}> {/* Link otacza Card */}
          <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
            <CardMedia
              component="img"
              height="140"
              image={wpis.miniatura}
              alt={wpis.nazwa}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {wpis.nazwa}
              </Typography>
              {/* ... (inne informacje o wpisie, np. ocena) */}

              <IconButton aria-label="delete" onClick={() => handleDelete(wpis.id)}>
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default Wpisy;