import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function IBUCalculator() {
  const navigate = useNavigate();
  const [chmiele, setChmiele] = useState([
    { masa: "", alfaKwasy: "", czasGotowania: "" },
  ]);
  const [objetoscBrzeczki, setObjetoscBrzeczki] = useState("");
  const [ibu, setIbu] = useState(0);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedChmiele = [...chmiele];
    updatedChmiele[index][name] = value;
    setChmiele(updatedChmiele);
  };

  const handleAddChmiel = () => {
    setChmiele([...chmiele, { masa: "", alfaKwasy: "", czasGotowania: "" }]);
  };

  const handleRemoveChmiel = (index) => {
    if (chmiele.length > 1) {
      const updatedChmiele = [...chmiele];
      updatedChmiele.splice(index, 1);
      setChmiele(updatedChmiele);
    }
  };

  const calculateIbu = () => {
    const objetosc = parseFloat(objetoscBrzeczki);
    if (isNaN(objetosc) || objetosc <= 0) {
      setIbu("Wprowadź poprawną objętość brzeczki.");
      return;
    }
    let totalIbu = 0;
    console.log("Początkowa wartość totalIbu:", totalIbu);
    console.log("Objętość brzeczki:", objetosc);
    const gestoscBrzeczki = 1.05; // Domyślna gęstość brzeczki
    const bignessFactor = 1.65 * Math.pow(0.000125, gestoscBrzeczki - 1);

    for (const chmiel of chmiele) {
      console.log("--- Nowy chmiel ---");
      const masa = parseFloat(chmiel.masa);
      const alfa = parseFloat(chmiel.alfaKwasy);
      const czasGotowania = chmiel.czasGotowania;

      console.log("Masa chmielu:", masa);
      console.log("Alfa kwasy:", alfa);
      console.log("Czas gotowania:", czasGotowania);
      let wykorzystanie = 0;

      switch (czasGotowania) {
        case "90":
          wykorzystanie = 0.3;
          break;
        case "60":
          wykorzystanie = 0.27;
          break;
        case "45":
          wykorzystanie = 0.24;
          break;
        case "30":
          wykorzystanie = 0.22;
          break;
        case "20":
          wykorzystanie = 0.15;
          break;
        case "15":
          wykorzystanie = 0.12;
          break;
        case "10":
          wykorzystanie = 0.09;
          break;
        case "5":
          wykorzystanie = 0.07;
          break;
        case "0":
          wykorzystanie = 0.05;
          break;
        default:
          wykorzystanie = 0;
      }
      console.log("Wykorzystanie:", wykorzystanie);
      if (masa && alfa && wykorzystanie > 0) {
        const ibuChmielu =
          ((masa * alfa * wykorzystanie * bignessFactor) / objetosc) * 10;
        console.log("IBU dla chmielu:", ibuChmielu);
        totalIbu += ibuChmielu;
        console.log("Total IBU po dodaniu chmielu:", totalIbu);
      } else {
        console.log("Niepoprawne dane chmielu, pomijam.");
      }
    }
    console.log("Łączne IBU przed ustawieniem stanu:", totalIbu);
    if (totalIbu > 0) {
      setIbu(totalIbu.toFixed(1));
    } else {
      setIbu("Wprowadź dane chmielu");
    }
  };

  return (
    <div className="app-container">
      <h1>Kalkulator IBU</h1>
      {chmiele.map((chmiel, index) => (
        <div key={index}>
          <h3>Chmiel {index + 1}</h3>
          <TextField
            label="Masa chmielu (g)"
            type="number"
            name="masa"
            value={chmiel.masa}
            onChange={(event) => handleInputChange(index, event)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Zawartość alfa-kwasów (%)"
            type="number"
            name="alfaKwasy"
            value={chmiel.alfaKwasy}
            onChange={(event) => handleInputChange(index, event)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id={`czas-gotowania-label-${index}`}>
              Czas gotowania (min)
            </InputLabel>
            <Select
              labelId={`czas-gotowania-label-${index}`}
              id={`czas-gotowania-${index}`}
              name="czasGotowania"
              value={chmiel.czasGotowania}
              label="Czas gotowania (min)"
              onChange={(event) => handleInputChange(index, event)}
            >
              <MenuItem value="90">90</MenuItem>
              <MenuItem value="60">60</MenuItem>
              <MenuItem value="45">45</MenuItem>
              <MenuItem value="30">30</MenuItem>
              <MenuItem value="20">20</MenuItem>
              <MenuItem value="15">15</MenuItem>
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="0">0</MenuItem>
            </Select>
          </FormControl>
          <IconButton
            aria-label="delete"
            onClick={() => handleRemoveChmiel(index)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
      <Button variant="outlined" color="primary" onClick={handleAddChmiel}>
        Dodaj chmiel
      </Button>
      <TextField
        label="Objętość brzeczki (l)"
        type="number"
        value={objetoscBrzeczki}
        onChange={(e) => setObjetoscBrzeczki(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      <Button variant="contained" color="primary" onClick={calculateIbu}>
        Oblicz IBU
      </Button>
      <p> IBU: {ibu} </p>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIosNewIcon />}
        onClick={() => navigate("/kalkulatory")}
      >
        Wstecz
      </Button>
    </div>
  );
}

export default IBUCalculator;
