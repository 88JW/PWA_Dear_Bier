import React from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

function SzczegolyReceptury() {
  const { id } = useParams();
  const navigate = useNavigate();
  const localData = localStorage.getItem("receptury");
  const receptury = localData ? JSON.parse(localData) : [];
  const receptura = receptury.find(
    (receptura) => receptura.id === parseInt(id)
  );

  if (!receptura) {
    return (
      <div className="app-container">
        <h2>Nie znaleziono receptury</h2>
        <Button variant="outlined" onClick={() => navigate("/receptury")}>
          Wróć do receptur
        </Button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="app-container">
      <h2>Szczegóły receptury</h2>
      <Typography variant="h5">Nazwa: {receptura.nazwa}</Typography>
      <Typography variant="h6">Rodzaj: {receptura.rodzaj}</Typography>
      {receptura.rodzaj === "Zacierana" && (
        <div>
          <Typography variant="h6">Słody do zacierania:</Typography>
          <ul>
            {receptura.slodyZacierane.map((slod, index) => (
              <li key={index}>
                {slod.nazwa} - {slod.waga} g
              </li>
            ))}
          </ul>
        </div>
      )}
      {receptura.rodzaj === "Ekstraktowa" && (
        <div>
          <Typography variant="h6">Słody i ekstrakty:</Typography>
          <ul>
            {receptura.slodyEkstraktowe.map((slod, index) => (
              <li key={index}>
                {slod.nazwa} - {slod.waga} g
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <Typography variant="h6">Chmiele:</Typography>
        <ul>
          {receptura.chmiele.map((chmiel, index) => (
            <li key={index}>
              {chmiel.nazwa} - {chmiel.waga} g - {chmiel.czas} min
            </li>
          ))}
        </ul>
      </div>
      <Typography variant="h6">Drożdże: {receptura.drozdze}</Typography>
      <Typography variant="h6">
        Przewidywana ilość litrów: {receptura.litry}
      </Typography>
      <Typography variant="h6">Ekstrakt: {receptura.ekstrakt}</Typography>
      <Typography variant="h6">Alkohol: {receptura.alkohol}</Typography>
      <Typography variant="h6">Barwa: {receptura.barwa}</Typography>
      <Typography variant="h6">Goryczka: {receptura.goryczka}</Typography>
      <Typography variant="h6">
        Czas dojrzewania: {receptura.dojrzewanie}
      </Typography>
      <Typography variant="h6">Procedura: {receptura.procedura}</Typography>
      <Button variant="outlined" onClick={handlePrint} sx={{ marginTop: 2 }}>
        Drukuj
      </Button>
      <Button
        variant="outlined"
        onClick={() => navigate("/receptury")}
        sx={{ marginLeft: 2, marginTop: 2 }}
      >
        Wróć do receptur
      </Button>
    </div>
  );
}

export default SzczegolyReceptury;
