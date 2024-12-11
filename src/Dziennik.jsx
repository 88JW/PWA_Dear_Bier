import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Dziennik() {
  const [warki, setWarki] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const warkiData = localStorage.getItem('warki');
    if (warkiData) {
      setWarki(JSON.parse(warkiData));
    }
  }, []);
  return (
    <div>
      <h1>Dziennik warzenia</h1>
      <h2>Warki:</h2>
      <ul>
      {warki.map((warka) => (
        <li key={warka.id}>
          <Link to={`/dziennik/warka/${warka.id}`}>{warka.nazwa}</Link> 
        </li>
      ))}
    </ul>
      <Link to="/dziennik/nowa-warka">
        <button>Stwórz nową warkę</button>
      </Link>
 
      <button onClick={() => navigate('/')}>Wstecz</button>
    </div>
  );
}

export default Dziennik;