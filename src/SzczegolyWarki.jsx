// SzczegolyWarki.jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function SzczegolyWarki() {
  const { id } = useParams();
  const warkaData = localStorage.getItem(`warka-${id}`);
  const warka = warkaData ? JSON.parse(warkaData) : null;
  const [pomiary, setPomiary] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [defaultDate, setDefaultDate] = useState(new Date().toISOString().slice(0, 10)); // Stan dla daty
  const [defaultTime, setDefaultTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })); // Stan dla godziny

  useEffect(() => {
    // Ustawienie domyślnych wartości dla daty i godziny
    setDefaultDate(new Date().toISOString().slice(0, 10));
    setDefaultTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, []); // useEffect uruchomi się tylko raz po zamontowaniu komponentu


  useEffect(() => {
    if (warka && warka.pomiary && warka.pomiary.length > 0 && pomiary.length === 0) {
      setPomiary([...warka.pomiary]);
    }
  }, [warka, pomiary]);

  const onSubmit = (data) => {
    const nowyPomiar = { ...data };
    setPomiary([...pomiary, nowyPomiar]);

    // Aktualizacja danych w localStorage
    const zaktualizowanaWarka = { ...warka, pomiary: [...pomiary, nowyPomiar] };
    localStorage.setItem(`warka-${id}`, JSON.stringify(zaktualizowanaWarka));

    reset(); // Reset formularza po dodaniu pomiaru
  };

  const usunWarke = () => {
    if (window.confirm('Czy na pewno chcesz usunąć tę warkę?')) {
      // Pobierz listę warek z localStorage
      const warkiData = localStorage.getItem('warki');
      let warki = warkiData ? JSON.parse(warkiData) : [];

      // Usuń warkę z listy
      warki = warki.filter((warka) => warka.id !== parseInt(id));

      // Zaktualizuj localStorage
      localStorage.setItem('warki', JSON.stringify(warki));
      localStorage.removeItem(`warka-${id}`);

      // Przekieruj do strony dziennika
      navigate('/dziennik');
    }
  };

  const usunPomiar = (index) => {
    const nowePomiary = [...pomiary];
    nowePomiary.splice(index, 1);
    setPomiary(nowePomiary);

    // Aktualizacja danych w localStorage
    const zaktualizowanaWarka = { ...warka, pomiary: nowePomiary };
    localStorage.setItem(`warka-${id}`, JSON.stringify(zaktualizowanaWarka));
  };

  if (!warka) {
    return <div>Warka nie znaleziona.</div>;
  }

  return (
    <div>
      <h1>Szczegóły warki: {warka.nazwa}</h1>
      <p>Dzień nastawienia: {warka.data}</p>
      {/* ... wyświetlanie pozostałych danych warki ... */}

      <h2>Pomiary:</h2>
      <ul>
        {pomiary.map((pomiar, index) => (
          <li key={index}>
            Data: {pomiar.data}, Godzina: {pomiar.godzina}, Blg: {pomiar.blg}, Temperatura: {pomiar.temperatura}
            {/* ... pozostałe dane pomiaru ... */}
            <button onClick={() => usunPomiar(index)}>X</button> {/* Dodany przycisk "X" */}
          </li>
        ))}
      </ul>

      <h3>Dodaj pomiar:</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="data">Data:</label>
          <input type="date" id="data" {...register("data", { required: true })} defaultValue={defaultDate} />
          {/* Dodano defaultValue={defaultDate} */}
        </div>
        <div>
          <label htmlFor="godzina">Godzina:</label>
          <input type="time" id="godzina" {...register("godzina", { required: true })} defaultValue={defaultTime} />
          {/* Dodano defaultValue={defaultTime} */}
        </div>
        <div>
          <label htmlFor="blg">Blg:</label>
          <input type="number" id="blg" {...register("blg")} />
          {/* Blg jest teraz opcjonalne (usunięto { required: true }) */}
        </div>
        <div>
          <label htmlFor="temperatura">Temperatura:</label>
          <input type="number" id="temperatura" {...register("temperatura")} />
          {/* Temperatura jest teraz opcjonalna */}
        </div>
        <div>
          <label htmlFor="piana">Piana:</label>
          <input type="checkbox" id="piana" {...register("piana")} />
          {/* Piana jest teraz opcjonalna */}
        </div>
        <div>
          <label htmlFor="co2">CO<sup>2</sup>:</label>
          <input type="checkbox" id="co2" {...register("co2")} />
          {/* CO2 jest teraz opcjonalne */}
        </div>
        <div>
          <label htmlFor="notes">Notatki:</label>
          <textarea id="notes" {...register("notes")} />
          {/* Notatki są teraz opcjonalne */}
        </div>

        {/* ... (reszta formularza) ... */}
        <button type="submit">Dodaj pomiar</button>
      </form>
      <button onClick={usunWarke}>Usuń warkę</button> {/* Dodany przycisk "Usuń warkę" */}
      <button onClick={() => navigate('/')}>Wstecz</button>
    </div>
  );
}

export default SzczegolyWarki;
