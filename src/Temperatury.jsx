import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Temperatury() {
  const navigate = useNavigate();
  const [docelowaTemperatura, setDocelowaTemperatura] = useState(26);
  const [tolerancja, setTolerancja] = useState(3);
  const [temperaturaZimnejWody] = useState(10); // Stała temperatura zimnej wody
  const [temperaturaGorącejWody, setTemperaturaGorącejWody] = useState(80);
  const [masaSloduIChmelu, setMasaSloduIChmelu] = useState(1.7);
  const [iloscPiwa, setIloscPiwa] = useState(23);
  const [wynik, setWynik] = useState(null);

  const obliczTemperatureWarki = (
    objetoscWodyWFermentatorze,
    temperaturaWodyWFermentatorze,
    objetoscWodyWKotle,
    temperaturaWodyWKotle,
    masaSloduIChmelu
  ) => {
    const masaWodyWFermentatorze = objetoscWodyWFermentatorze;
    const masaWodyWKotle = objetoscWodyWKotle;

    const temperaturaKoncowa =
      (masaWodyWFermentatorze * temperaturaWodyWFermentatorze +
        masaWodyWKotle * temperaturaWodyWKotle +
        masaSloduIChmelu * temperaturaWodyWKotle) /
      (masaWodyWFermentatorze + masaWodyWKotle + masaSloduIChmelu);

    return temperaturaKoncowa;
  };

  const obliczProporcjeWody = () => {
    let objetoscZimnejWody = 10; // Początkowa wartość dla zimnej wody

    while (true) {
      const objetoscGorącejWody =
        (docelowaTemperatura * (iloscPiwa + masaSloduIChmelu) -
          temperaturaZimnejWody * objetoscZimnejWody) /
        (temperaturaGorącejWody - docelowaTemperatura);

      // Zabezpieczenie przed ujemnymi wartościami
      if (objetoscGorącejWody < 0) {
        objetoscGorącejWody = 0;
      }

      // Sprawdzenie, czy suma objętości wody nie przekracza ilości piwa
      if (objetoscZimnejWody + objetoscGorącejWody > iloscPiwa) {
        objetoscZimnejWody = iloscPiwa - objetoscGorącejWody;
      }

      const temperaturaKoncowa = obliczTemperatureWarki(
        objetoscZimnejWody,
        temperaturaZimnejWody,
        objetoscGorącejWody,
        temperaturaGorącejWody,
        masaSloduIChmelu
      );

      if (
        temperaturaKoncowa >= docelowaTemperatura - tolerancja &&
        temperaturaKoncowa <= docelowaTemperatura + tolerancja
      ) {
        setWynik({ objetoscZimnejWody, objetoscGorącejWody });
        break;
      } else if (temperaturaKoncowa < docelowaTemperatura - tolerancja) {
        objetoscZimnejWody -= 0.1; // Zmniejsz objętość zimnej wody
        if (objetoscZimnejWody < 0) {
          setWynik(null);
          break;
        }
      } else {
        objetoscZimnejWody += 0.1; // Zwiększ objętość zimnej wody
      }
    }
  };

  return (
    <div>
      <h1>Temperatury</h1>
      <div>
        <label htmlFor="iloscPiwa">Ilość piwa (litry):</label>
        <input
          type="number"
          id="iloscPiwa"
          value={iloscPiwa}
          onChange={(e) => setIloscPiwa(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="docelowaTemperatura">Docelowa temperatura (°C):</label>
        <input
          type="number"
          id="docelowaTemperatura"
          value={docelowaTemperatura}
          onChange={(e) => setDocelowaTemperatura(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="tolerancja">Tolerancja (°C):</label>
        <input
          type="number"
          id="tolerancja"
          value={tolerancja}
          onChange={(e) => setTolerancja(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="temperaturaGorącejWody">
          Temperatura gorącej wody (°C):
        </label>
        <input
          type="number"
          id="temperaturaGorącejWody"
          value={temperaturaGorącejWody}
          onChange={(e) => setTemperaturaGorącejWody(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="masaSloduIChmelu">Masa słodu i chmielu (kg):</label>
        <input
          type="number"
          id="masaSloduIChmelu"
          value={masaSloduIChmelu}
          onChange={(e) => setMasaSloduIChmelu(parseFloat(e.target.value))}
        />
      </div>
      <button onClick={obliczProporcjeWody}>Oblicz proporcje</button>

      {wynik && (
        <div>
          <p>
            Objętość zimnej wody (10°C): {wynik.objetoscZimnejWody.toFixed(1)} litra
          </p>
          <p>
            Objętość gorącej wody: {wynik.objetoscGorącejWody.toFixed(1)} litra
          </p>
        </div>
      )}

      <button onClick={() => navigate('/')}>Wstecz</button>
    </div>
  );
}

export default Temperatury;