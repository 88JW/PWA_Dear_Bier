import React, {  useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, FormControlLabel, Typography, Box, Paper, Collapse, IconButton } from '@mui/material';

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function AsystentWarzenia() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState([
    {
      id: 1,
      title: 'Przygotowanie sprzętu',
      description: 'Upewnij się, że masz: garnek, fermentor, rurkę fermentacyjną, kapsle, kapslownicę, miarkę, termometr, środek do dezynfekcji.',
      isCompleted: false,
      isOpen: true, // Pierwszy krok domyślnie otwarty
    },
    {
      id: 2,
      title: 'Dezynfekcja',
      description: 'Wszystkie elementy, które będą miały kontakt z piwem, muszą być zdezynfekowane. Zanurz sprzęt w roztworze dezynfekującym i pozostaw na czas określony przez producenta.',
      isCompleted: false,
      isOpen: false,
    },
    {
      id: 3,
      title: 'Przygotowanie brzeczki',
      description: 'Wlej wodę do garnka, dodaj odpowiednią ilość ekstraktu słodowego (wg przepisu). Gotuj przez 60 minut, dodając chmiel w odpowiednich momentach.',
      isCompleted: false,
      isOpen: false,
    },
    {
      id: 4,
      title: 'Schładzanie brzeczki',
      description: 'Po gotowaniu, jak najszybciej schłodź brzeczkę do temperatury odpowiedniej dla drożdży (ok. 20-22°C).',
      isCompleted: false,
      isOpen: false,
    },
    {
      id: 5,
      title: 'Zadawanie drożdży',
      description: 'Przelej schłodzoną brzeczkę do fermentora. Dodaj drożdże piwowarskie i dokładnie wymieszaj.',
      isCompleted: false,
      isOpen: false,
    },
    {
      id: 6,
      title: 'Fermentacja',
      description: 'Zamknij fermentor i umieść rurkę fermentacyjną. Pozostaw fermentor w ciemnym miejscu w temperaturze pokojowej na ok. 1-2 tygodnie.',
      isCompleted: false,
      isOpen: false,
    },
    {
      id: 7,
      title: 'Butelkowanie',
      description: 'Po zakończeniu fermentacji, przelej piwo do butelek, dodaj cukier do refermentacji i zamknij kapslami.',
      isCompleted: false,
      isOpen: false,
    },
    {
      id: 8,
      title: 'Leżakowanie',
      description: 'Pozostaw piwo w butelkach w chłodnym i ciemnym miejscu na 2-4 tygodnie.',
      isCompleted: false,
      isOpen: false,
    },
    {
      id: 9,
      title: 'Degustacja',
      description: 'Schłodź piwo i ciesz się własnoręcznie uwarzonym trunkiem!',
      isCompleted: false,
      isOpen: false,
    },
  ]);

  const handleCompleteStep = (stepId) => {
    const updatedSteps = steps.map((step, index) => {
      if (step.id === stepId) {
        // Zmiana statusu "isCompleted" dla klikniętego kroku
        const updatedStep = { ...step, isCompleted: !step.isCompleted };

        // Zwinięcie aktualnego kroku po zaznaczeniu jako "wykonany"
        if (!step.isCompleted) {
            //Dodatkowa weryfikacja, czy krok jest otwarty.
          if(updatedStep.isOpen === true){
          updatedStep.isOpen = false;
          }
        }

        // Otwarcie następnego kroku, jeśli aktualny jest zaznaczany jako "wykonany"
        if (!step.isCompleted && index + 1 < steps.length) {
          //Dodatkowa weryfikacja, czy krok jest otwarty.
          if(steps[index+1].isOpen === false){
          steps[index + 1].isOpen = true;}
        }

        return updatedStep;
      }
      return step;
    });
    setSteps(updatedSteps);
  };

  const handleToggleStep = (stepId) => {
    const updatedSteps = steps.map((step) => {
      if (step.id === stepId) {
        return { ...step, isOpen: !step.isOpen };
      }
      return step;
    });
    setSteps(updatedSteps);
  };

    const handlePreviousStep = () => {
    // brak akcji po wciśnięciu wstecz, opcja do rozbudowania
  }

  return (
    <Box sx={{ p: 2, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Asystent Warzenia
      </Typography>
      {steps.map((step, index) => (
        <Paper
          key={step.id}
          sx={{
            p: 2,
            mb: 2,
            backgroundColor: step.isCompleted ? 'success.light' : 'grey.100',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Krok {step.id}: {step.title}
            <IconButton
              aria-label="expand"
              size="small"
              onClick={() => handleToggleStep(step.id)}
            >
              {step.isOpen ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Typography>
          <Collapse in={step.isOpen}>
            <Typography variant="body1" paragraph>
              {step.description}
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={step.isCompleted}
                  onChange={() => handleCompleteStep(step.id)}
                  color="primary"
                />
              }
              label="Wykonane"
            />
          </Collapse>
        </Paper>
      ))}
      <Box sx={{ mt: 2 }}>
        {<Button variant="outlined" startIcon={<ArrowBackIosNewIcon />}
        onClick={() => navigate("/")} sx={{ mr: 2 }}>
          Wstecz
        </Button>}       
      </Box>
    </Box>
  );
}

export default AsystentWarzenia;
