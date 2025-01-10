import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginRight: theme.spacing(1),
}));

const IBUCalculator = () => {
  const [chmiele, setChmiele] = useState([
    { id: uuidv4(), masa: "", alfaKwasy: "", czasGotowania: "" },
  ]);
  const [litryPiwa, setLitryPiwa] = useState("");
  const [wynikIBU, setWynikIBU] = useState(null);
  const [originalGravity, setOriginalGravity] = useState("");
  const [originalGravityBlg, setOriginalGravityBlg] = useState("");
  const navigate = useNavigate();

  const dodajChmiel = () => {
    setChmiele([
      ...chmiele,
      { id: uuidv4(), masa: "", alfaKwasy: "", czasGotowania: "" },
    ]);
  };

  const usunChmiel = (id) => {
    setChmiele(chmiele.filter((chmiel) => chmiel.id !== id));
  };

  const handleChmielChange = (id, event) => {
    const { name, value } = event.target;
    setChmiele(
      chmiele.map((chmiel) =>
        chmiel.id === id ? { ...chmiel, [name]: value } : chmiel
      )
    );
  };

  const calculateSGFromBlg = (blg) => {
    if (blg === "") return "";
    const blgValue = parseFloat(blg);
    if (isNaN(blgValue)) return "";
    return (1 + blgValue / 259).toFixed(3);
  };

  const calculateBlgFromSG = (sg) => {
    if (sg === "") return "";
    const sgValue = parseFloat(sg);
    if (isNaN(sgValue)) return "";
    return (-1 * 259 + 259 * sgValue).toFixed(1);
  };

  const handleOriginalGravityChange = (event) => {
    const { value } = event.target;
    setOriginalGravity(value);
    setOriginalGravityBlg(calculateBlgFromSG(value));
  };

  const handleOriginalGravityBlgChange = (event) => {
    const { value } = event.target;
    setOriginalGravityBlg(value);
    setOriginalGravity(calculateSGFromBlg(value));
  };

  const obliczIBU = () => {
    const litry = parseFloat(litryPiwa);
    const og = parseFloat(originalGravity);
    if (isNaN(litry) || litry <= 0) {
      alert("Podaj poprawną liczbę litrów piwa.");
      return;
    }

    if (isNaN(og) || og <= 0) {
      alert("Podaj poprawną gęstość brzeczki.");
      return;
    }

    let totalIbu = 0;
    chmiele.forEach((chmiel) => {
      const masa = parseFloat(chmiel.masa);
      const alfa = parseFloat(chmiel.alfaKwasy);
      const czasGotowania = parseFloat(chmiel.czasGotowania);

      console.log("Masa chmielu:", masa);
      console.log("Alfa kwasy:", alfa);
      console.log("Czas gotowania:", czasGotowania);

      // Obliczanie wykorzystania chmielu (U) wg wzoru Tinsetha
      const wykorzystanie =
        1.65 *
        Math.pow(0.000125, og - 1) *
        ((1 - Math.exp(-0.04 * czasGotowania)) / 4.15);

      console.log("Wykorzystanie:", wykorzystanie);
      if (masa && alfa && wykorzystanie > 0) {
        const ibuChmielu = (masa * alfa * wykorzystanie * 1000) / litry;
        totalIbu += ibuChmielu;
      }
    });
    setWynikIBU(totalIbu.toFixed(2));
  };

  return (
    <div className="app-container">
      <h1>Kalkulator IBU</h1>
      <StyledTextField
        label="Litry piwa"
        type="number"
        value={litryPiwa}
        onChange={(e) => setLitryPiwa(e.target.value)}
        fullWidth
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "16px",
        }}
      >
        <StyledTextField
          label="Gęstość początkowa brzeczki (SG)"
          type="number"
          value={originalGravity}
          onChange={handleOriginalGravityChange}
        />
        <StyledTextField
          label="Gęstość początkowa brzeczki (Blg)"
          type="number"
          value={originalGravityBlg}
          onChange={handleOriginalGravityBlgChange}
        />
      </div>
      {chmiele.map((chmiel, index) => (
        <div
          key={chmiel.id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: "10px",
          }}
        >
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            Chmiel {index + 1}
          </Typography>
          <StyledTextField
            label="Masa (g)"
            type="number"
            name="masa"
            value={chmiel.masa}
            onChange={(event) => handleChmielChange(chmiel.id, event)}
          />
          <StyledTextField
            label="Alfa kwasy (%)"
            type="number"
            name="alfaKwasy"
            value={chmiel.alfaKwasy}
            onChange={(event) => handleChmielChange(chmiel.id, event)}
          />
          <StyledTextField
            label="Czas gotowania (min)"
            type="number"
            name="czasGotowania"
            value={chmiel.czasGotowania}
            onChange={(event) => handleChmielChange(chmiel.id, event)}
          />
          <StyledButton
            variant="outlined"
            color="secondary"
            onClick={() => usunChmiel(chmiel.id)}
          >
            -
          </StyledButton>
        </div>
      ))}
      <StyledButton variant="contained" color="primary" onClick={dodajChmiel}>
        Dodaj chmiel
      </StyledButton>
      <StyledButton variant="contained" color="primary" onClick={obliczIBU}>
        Oblicz IBU
      </StyledButton>
      {wynikIBU !== null && (
        <Typography variant="h5" style={{ marginTop: "20px" }}>
          Wynik IBU: {wynikIBU}
        </Typography>
      )}
      <StyledButton
        variant="outlined"
        startIcon={<ArrowBackIosNewIcon />}
        onClick={() => navigate("/kalkulatory")}
      >
        Wstecz
      </StyledButton>
    </div>
  );
};

export default IBUCalculator;
