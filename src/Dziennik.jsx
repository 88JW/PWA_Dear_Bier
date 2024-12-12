import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

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
    <div className="app-container">
      <h1>Dziennik warzenia</h1>
      <h2>Warki:</h2>
      <ul>
        {warki.map((warka) => (
          <Card key={warka.id} sx={{ marginBottom: 2 }}> {/* Dodaj margines dolny */}
            <CardContent>
              <Link to={`/dziennik/${warka.id}`}> {/* Link do szczegółów warki */}
                <Typography variant="h6">{warka.nazwa}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Dzień nastawienia: {warka.data}
                </Typography>
              </Link>
            </CardContent>
          </Card>
        ))}
      </ul>
      <div className="button-container"> {/* Dodaj klasę tutaj */}
        <Link to="/dziennik/nowa-warka">
          <button>Stwórz nową warkę</button>
        </Link>
        <button onClick={() => navigate('/')}>Wstecz</button>
      </div>
    </div>
  );
}

export default Dziennik;