import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add'; 

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
      <h2>Dziennik warzenia</h2>
      <h3>Warki:</h3>
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
      <Link to="/dziennik/nowa-warka"> {/* Link do /dziennik/nowa-warka */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ mr: 2 }}
        >
          Stwórz nową warkę
        </Button>
      </Link>

      {/* Przycisk "Wstecz" */}
      <Button
        variant="outlined"
        startIcon={<ArrowBackIosNewIcon />}
        onClick={() => navigate('/')}
        sx={{ mr: 2 }}
      >
        Wstecz
      </Button>
      </div>
    </div>
  );
}

export default Dziennik;