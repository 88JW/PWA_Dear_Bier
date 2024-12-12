import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Kalkulator() {
  const navigate = useNavigate();
  const [litryPiwa, setLitryPiwa] = useState('');
  const [gazowanie, setGazowanie] = useState('standardowo');
  const [wynikCukru, setWynikCukru] = useState(null);
  const [wynikButelek, setWynikButelek] = useState(null);

  const oblicz = () => {
    const litry = parseFloat(litryPiwa);
    if (isNaN(litry) || litry <= 0) {
      alert('Podaj poprawną liczbę litrów piwa.');
      return;
    }

    let gramyCukruNaButelke;
    switch (gazowanie) {
      case 'mało':
        gramyCukruNaButelke = 3;
        break;
      case 'dużo':
        gramyCukruNaButelke = 5;
        break;
      default:
        gramyCukruNaButelke = 4;
    }

    const iloscButelek = litry * 2; 
    const calkowitaIloscCukru = iloscButelek * gramyCukruNaButelke;

    setWynikCukru(calkowitaIloscCukru);
    setWynikButelek(iloscButelek);
  };

  return (
    <div>
      <p>Kalkulator Refermentacji</p>

      <div>
        <label htmlFor="litryPiwa">Litry piwa:</label>
        <input
          type="number"
          id="litryPiwa"
          value={litryPiwa}
          onChange={(e) => setLitryPiwa(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="gazowanie">Gazowanie:</label>
        <select id="gazowanie" value={gazowanie} onChange={(e) => setGazowanie(e.target.value)}>
          <option value="mało">Mało</option>
          <option value="standardowo">Standardowo</option>
          <option value="dużo">Dużo</option>
        </select>
      </div>

      <button onClick={oblicz}>Oblicz</button>

      {wynikCukru !== null && (
        <div>
          <p>Dodaj {wynikCukru}g cukru rozpuszczonego w letniej wodzie.</p>
          <p>Będziesz potrzebował {wynikButelek} butelek.</p>
        </div>
      )}

      <button onClick={() => navigate('/')}>Wstecz</button>
    </div>
  );
}

export default Kalkulator;