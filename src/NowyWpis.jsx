import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Rating,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import Dexie from 'dexie';
import imageCompression from 'browser-image-compression';

const db = new Dexie('OcenyPiwaDB');
db.version(1).stores({
  wpisy: '++id, nazwa, browar, styl, dataDegustacji, intensywnoscAromatu, jakoscAromatu, nutyAromatyczne, barwa, klarownosc, piana, intensywnoscSmaku, rownowaga, goryczka, slodycz, kwasowosc, nutySmakowe, pijalnosc, zlozonosc, ogolneWrazenie, uwagi, miniatura, ocena',
});

export { db };

function NowyWpis() {

  const [compressedBlob, setCompressedBlob] = useState(null);

  const navigate = useNavigate();
  const [nazwa, setNazwa] = useState('');
  const [browar, setBrowar] = useState('');
  const [styl, setStyl] = useState('');
  const [dataDegustacji, setDataDegustacji] = useState('');
  const [intensywnoscAromatu, setIntensywnoscAromatu] = useState(0);
  const [jakoscAromatu, setJakoscAromatu] = useState(0);
  const [nutyAromatyczne, setNutyAromatyczne] = useState([]);
  const [barwa, setBarwa] = useState('');
  const [klarownosc, setKlarownosc] = useState(0);
  const [piana, setPiana] = useState(0);
  const [intensywnoscSmaku, setIntensywnoscSmaku] = useState(0);
  const [rownowaga, setRownowaga] = useState(0);
  const [goryczka, setGoryczka] = useState(0);
  const [slodycz, setSlodycz] = useState(0);
  const [kwasowosc, setKwasowosc] = useState(0);
  const [nutySmakowe, setNutySmakowe] = useState([]);
  const [pijalnosc, setPijalnosc] = useState(0);
  const [zlozonosc, setZlozonosc] = useState(0);
  const [ogolneWrazenie, setOgolneWrazenie] = useState(0);
  const [uwagi, setUwagi] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocena, setOcena] = useState(0);



const handleImageChange = async (event) => {

  const file = event.target.files[0];

  // Define the options variable here
  const options = {
    maxSizeMB: 10, // Maksymalny rozmiar pliku w MB
    maxWidthOrHeight: 1920, // Maksymalna szerokość lub wysokość obrazu
    useWebWorker: true // Użyj Web Workera do kompresji
  };

  try {
    const compressedFile = await imageCompression(file, options);

    // Zapisz skompresowany obraz w IndexedDB
    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);
    reader.onloadend = () => {
      // Ustaw selectedFile na dane base64 obrazu:
      setSelectedFile(reader.result);

      // Ustaw compressedBlob na skompresowany Blob:
      setCompressedBlob(compressedFile); // <--- Dodaj tę linię
    };

  } catch (error) {
    // ... (obsługa błędów) ...
  }
};
const handleSubmit = async (event) => {
  event.preventDefault();
  console.log('handleSubmit called');
  console.log(selectedFile); // Log selectedFile (base64 string)

  try {
    const nowyWpis = {
      nazwa,
      browar,
      styl,
      dataDegustacji,
      intensywnoscAromatu,
      jakoscAromatu,
      nutyAromatyczne,
      barwa,
      klarownosc,
      piana,
      rownowaga,
      goryczka,
      slodycz,
      kwasowosc,
      nutySmakowe,
      pijalnosc,
      zlozonosc,
      ogolneWrazenie,
      uwagi,
      ocena,
      miniatura: selectedFile, // Store base64 in nowyWpis
    };

    if (compressedBlob instanceof Blob) {
      const reader = new FileReader();

      reader.onloadend = async (e) => {
        try {
          // You might not need to do anything here since you already have base64 in selectedFile
        } catch (error) {
          console.error('Wystąpił błąd podczas dodawania wpisu:', error);
        }
      };

      // This line is now redundant as you already have base64 in selectedFile
      // reader.readAsDataURL(compressedBlob); 
    } else {
      console.error('Compressed blob is not a Blob.');

      // Continue saving the entry without the image (miniatura is already null in this case)
      try {
        console.log('Przed dodaniem wpisu do IndexedDB:', nowyWpis);
        await db.wpisy.add(nowyWpis);
        console.log('Wpis dodany do IndexedDB');
        await navigate('/ocenPiwo');
      } catch (error) {
        console.error('Wystąpił błąd podczas dodawania wpisu:', error);
      }
    }

    console.log('Przed dodaniem wpisu do IndexedDB:', nowyWpis);
    await db.wpisy.add(nowyWpis);
    console.log('Wpis dodany do IndexedDB');
    await navigate('/ocenPiwo'); 
  } catch (error) {
    console.error('Wystąpił błąd podczas dodawania wpisu:', error);
  }
};

  







  const handleCheckboxChange = (event) => {
    const { target } = event;
    const { name, checked } = target;

    if (checked) {
      setNutyAromatyczne([...nutyAromatyczne, name]);
    } else {
      setNutyAromatyczne(nutyAromatyczne.filter((item) => item !== name));
    }
  };

  return (
    <div className="app-container">
      <h1>Dodaj nową ocenę</h1>
      <form onSubmit={handleSubmit}>
        <TextField label="Nazwa piwa" value={nazwa} onChange={(e) => setNazwa(e.target.value)} fullWidth margin="normal" />
        <TextField label="Browar" value={browar} onChange={(e) => setBrowar(e.target.value)} fullWidth margin="normal" />
        <TextField label="Styl" value={styl} onChange={(e) => setStyl(e.target.value)} fullWidth margin="normal" />
        <TextField type="date" label="Data degustacji" value={dataDegustacji} onChange={(e) => setDataDegustacji(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />

        <h2>Aromat</h2>
        <Typography component="legend">Intensywność aromatu</Typography>
        <Rating name="intensywnosc-aromatu" value={intensywnoscAromatu} onChange={(event, newValue) => setIntensywnoscAromatu(newValue)} />
        <Typography component="legend">Jakość aromatu</Typography>
        <Rating name="jakosc-aromatu" value={jakoscAromatu} onChange={(event, newValue) => setJakoscAromatu(newValue)} />

        <Typography component="legend">Nuty aromatyczne (zaznacz wszystkie pasujące)</Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox name="owocowe" checked={nutyAromatyczne.includes('owocowe')} onChange={handleCheckboxChange} />} label="Owocowe" />
          <FormControlLabel control={<Checkbox name="kwiatowe" checked={nutyAromatyczne.includes('kwiatowe')} onChange={handleCheckboxChange} />} label="Kwiatowe" />
          <FormControlLabel control={<Checkbox name="chmielowe" checked={nutyAromatyczne.includes('chmielowe')} onChange={handleCheckboxChange} />} label="Chmielowe" />
          <FormControlLabel control={<Checkbox name="slodowe" checked={nutyAromatyczne.includes('slodowe')} onChange={handleCheckboxChange} />} label="Słodowe" />
          {/* Dodaj więcej nut aromatycznych */}
        </FormGroup>

        <h2>Wygląd</h2>
        <TextField label="Barwa" value={barwa} onChange={(e) => setBarwa(e.target.value)} fullWidth margin="normal" />
        <Typography component="legend">Klarowność</Typography>
        <Rating name="klarownosc" value={klarownosc} onChange={(event, newValue) => setKlarownosc(newValue)} />
        <Typography component="legend">Piana</Typography>
        <Rating name="piana" value={piana} onChange={(event, newValue) => setPiana(newValue)} />

        <h2>Smak</h2>
        <Typography component="legend">Intensywność smaku</Typography>
        <Rating name="intensywnosc-smaku" value={intensywnoscSmaku} onChange={(event, newValue) => setIntensywnoscSmaku(newValue)} />
        <Typography component="legend">Równowaga</Typography>
        <Rating name="rownowaga" value={rownowaga} onChange={(event, newValue) => setRownowaga(newValue)} />
        <Typography component="legend">Goryczka</Typography>
        <Slider value={goryczka} onChange={(event, newValue) => setGoryczka(newValue)} min={0} max={10} step={1} valueLabelDisplay="auto" />
        <Typography component="legend">Słodycz</Typography>
        <Slider value={slodycz} onChange={(event, newValue) => setSlodycz(newValue)} min={0} max={10} step={1} valueLabelDisplay="auto" />
        <Typography component="legend">Kwasowość</Typography>
        <Slider value={kwasowosc} onChange={(event, newValue) => setKwasowosc(newValue)} min={0} max={10} step={1} valueLabelDisplay="auto" />
        <TextField label="Nuty smakowe" value={nutySmakowe} onChange={(e) => setNutySmakowe(e.target.value)} fullWidth margin="normal" multiline rows={3} />

        <h2>Ogólne wrażenie</h2>
        <Typography component="legend">Pijalność</Typography>
        <Rating name="pijalnosc" value={pijalnosc} onChange={(event, newValue) => setPijalnosc(newValue)} />
        <Typography component="legend">Złożoność</Typography>
        <Rating name="zlozonosc" value={zlozonosc} onChange={(event, newValue) => setZlozonosc(newValue)} />
        <Typography component="legend">Ogólne wrażenie</Typography>
        <Rating name="ogolne-wrazenie" value={ogolneWrazenie} onChange={(event, newValue) => setOgolneWrazenie(newValue)} />
        <TextField label="Uwagi" value={uwagi} onChange={(e) => setUwagi(e.target.value)} fullWidth margin="normal" multiline rows={3} />

        {/* Pole wyboru pliku i ocena */}
        <input
  type="file"
  accept="image/*"
  onChange={handleImageChange} // Zastąp handleFileChange funkcją handleImageChange
/>
        <Typography component="legend">Ocena</Typography>
        <Rating name="ocena" value={ocena} onChange={(event, newValue) => { setOcena(newValue); }} />

        <Button type="submit" variant="contained" color="primary">
  Dodaj ocenę
</Button>
      </form>
    </div>
  );
}

export default NowyWpis;