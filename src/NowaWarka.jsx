
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function NowaWarka() {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [warki, setWarki] = useState([]);

  useEffect(() => {
    const warkiData = localStorage.getItem('warki');
    if (warkiData) {
      setWarki(JSON.parse(warkiData));
    }

    // Pobierz dane formularza z localStorage
    const formularzData = localStorage.getItem('formularzNowaWarka');
    if (formularzData) {
      const data = JSON.parse(formularzData);
      setValue('nazwa', data.nazwa);
      setValue('data', data.data);
      // ... ustaw wartości pozostałych pól ...
    }
  }, [setValue]);

  const onSubmit = (data) => {
    const newId = Date.now();
    setId(newId);

    localStorage.setItem(`warka-${newId}`, JSON.stringify(data));

    const noweWarki = [...warki, { id: newId, ...data }];
    setWarki(noweWarki);
    localStorage.setItem('warki', JSON.stringify(noweWarki));

    localStorage.setItem('formularzNowaWarka', JSON.stringify(data));

    reset(); // Wyczyść formularz
    navigate('/dziennik'); // Przekieruj do strony dziennika
  };

  return (
    <div>
      <h1>Nowa warka</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="nazwa">Nazwa warki:</label>
          <input type="text" id="nazwa" {...register("nazwa", { required: true })} />
          {errors.nazwa && <span>To pole jest wymagane</span>}
        </div>
        <div>
          <label htmlFor="data">Dzień nastawienia:</label>
          <input type="date" id="data" {...register("data", { required: true })} />
          {errors.data && <span>To pole jest wymagane</span>}
        </div>
        {/* ... pozostałe pola formularza ... */}
        <button type="submit">Zapisz i dodaj pomiary</button>
      </form>
    </div>
  );
}

export default NowaWarka;
