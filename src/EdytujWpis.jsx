import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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

function EdytujWpis({ wpis, onZapisz }) { 
    const { id } = useParams(); 
    const [compressedBlob, setCompressedBlob] = useState(null);

    const navigate = useNavigate();
    const [nazwa, setNazwa] = useState(wpis.nazwa)
    const [browar, setBrowar] = useState(wpis.browar);
    const [styl, setStyl] = useState(wpis.styl);
    const [dataDegustacji, setDataDegustacji] = useState(wpis.dataDegustacji);
    const [intensywnoscAromatu, setIntensywnoscAromatu] = useState(wpis.intensywnoscAromatu);
    const [jakoscAromatu, setJakoscAromatu] = useState(wpis.jakoscAromatu);
    const [nutyAromatyczne, setNutyAromatyczne] = useState(wpis.nutyAromatyczne);
    const [barwa, setBarwa] = useState(wpis.barwa);
    const [klarownosc, setKlarownosc] = useState(wpis.klarownosc);
    const [piana, setPiana] = useState(wpis.piana);
    const [intensywnoscSmaku, setIntensywnoscSmaku] = useState(wpis.intensywnoscSmaku);
    const [rownowaga, setRownowaga] = useState(wpis.rownowaga);
    const [goryczka, setGoryczka] = useState(wpis.goryczka);
    const [slodycz, setSlodycz] = useState(wpis.slodycz);
    const [kwasowosc, setKwasowosc] = useState(wpis.kwasowosc);
    const [nutySmakowe, setNutySmakowe] = useState(wpis.nutySmakowe);
    const [pijalnosc, setPijalnosc] = useState(wpis.pijalnosc);
    const [zlozonosc, setZlozonosc] = useState(wpis.zlozonosc,);
    const [ogolneWrazenie, setOgolneWrazenie] = useState(wpis.ogolneWrazenie);
    const [uwagi, setUwagi] = useState(wpis.uwagi);
    const [miniatura, setMiniatura] = useState(wpis.miniatura); 
    // const [selectedFile, setSelectedFile] = useState(wpis.selectedFile);
    const [selectedFile, setSelectedFile] = useState(null);
    const [ocena, setOcena] = useState(wpis.ocena);


    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
          try {
            const compressedFile = await imageCompression(file, {
              maxSizeMB: 5, // Maksymalny rozmiar pliku w MB (możesz dostosować)
              maxWidthOrHeight: 1920, // Maksymalna szerokość lub wysokość obrazu (możesz dostosować)
              useWebWorker: true, // Użyj Web Workera do kompresji w tle
            });
            setSelectedFile(compressedFile); // Ustaw skompresowany plik w stanie
      
            const reader = new FileReader();
            reader.onloadend = () => {
              setMiniatura(reader.result);
            };
            reader.readAsDataURL(compressedFile); // Odczytaj skompresowany plik
          } catch (error) {
            console.error('Błąd podczas kompresji obrazka:', error);
          }
        }
      };
      const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
            await db.wpisy.update(parseInt(id), {
            ...(nazwa !== wpis.nazwa && { nazwa }),
            ...(browar !== wpis.browar && { browar }),
            ...(styl !== wpis.styl && { styl }),
            ...(dataDegustacji !== wpis.dataDegustacji && { dataDegustacji }),
            ...(intensywnoscAromatu !== wpis.intensywnoscAromatu && { intensywnoscAromatu }),
            ...(jakoscAromatu !== wpis.jakoscAromatu && { jakoscAromatu }),
            ...(nutyAromatyczne !== wpis.nutyAromatyczne && { nutyAromatyczne }),
            ...(barwa !== wpis.barwa && { barwa }),
            ...(klarownosc !== wpis.klarownosc && { klarownosc }),
            ...(piana !== wpis.piana && { piana }),
            ...(intensywnoscSmaku !== wpis.intensywnoscSmaku && { intensywnoscSmaku }),
            ...(rownowaga !== wpis.rownowaga && { rownowaga }),
            ...(goryczka !== wpis.goryczka && { goryczka }),
            ...(slodycz !== wpis.slodycz && { slodycz }),
            ...(kwasowosc !== wpis.kwasowosc && { kwasowosc }),
            ...(nutySmakowe !== wpis.nutySmakowe && { nutySmakowe }),
            ...(pijalnosc !== wpis.pijalnosc && { pijalnosc }),
            ...(zlozonosc !== wpis.zlozonosc && { zlozonosc }),
            ...(ogolneWrazenie !== wpis.ogolneWrazenie && { ogolneWrazenie }),
            ...(uwagi !== wpis.uwagi && { uwagi }),
            ...(miniatura !== wpis.miniatura && { miniatura }), // Upewnij się, że miniatura jest obsługiwana poprawnie
            ...(ocena !== wpis.ocena && { ocena }),
          });
          navigate('/ocenPiwo'); 
        } catch (error) {
          console.error('Błąd podczas aktualizacji wpisu:', error);
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
        <input type="file" onChange={handleFileChange} />
       
        <Typography component="legend">Ocena</Typography>
        <Rating name="ocena" value={ocena} onChange={(event, newValue) => { setOcena(newValue); }} />
      <Button type="submit" variant="contained">Zapisz</Button>
    </form>
  );
}

export default EdytujWpis;