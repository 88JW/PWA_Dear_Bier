import { useParams } from 'react-router-dom'; 
import { useEffect, useState } from 'react';

function SzczegolyWpisu() {
  const { id } = useParams(); 
  const [wpis, setWpis] = useState(null);

  useEffect(() => {
    const wpisy = JSON.parse(localStorage.getItem('wpisy')) || [];
    const wybranyWpis = wpisy.find((wpis) => wpis.id === parseInt(id)); 
    setWpis(wybranyWpis);
  }, [id]); 

  if (!wpis) {
    return <div>Wczytywanie...</div>;
  }

  return (
    <div>
      <h1>{wpis.nazwa}</h1>
      <img src={wpis.miniatura} alt={wpis.nazwa} />
      {/* Wyświetl inne szczegóły wpisu */}
      <p>Ocena: {wpis.ocena}</p> 
      {/* ... */}
    </div>
  );
}

export default SzczegolyWpisu;