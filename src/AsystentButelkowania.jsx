import React, {  useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, FormControlLabel, Typography, Box, Paper, Collapse, IconButton } from '@mui/material';

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function AsystentButelkowania() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState([
    {
      id: 1,
      title: 'Przygotowanie sprzętu',
      description: 'Przygotuj: czyste butelki, kapsle, kapslownicę, rurkę do przelewania, miarkę do cukru, garnek, środek do dezynfekcji. Upewnij się, że wszystko jest w zasięgu ręki.',
      isCompleted: false,
      isOpen: true,
    },
    {
      id: 2,
      title: 'Dezynfekcja sprzętu',
      description: 'Wszystkie elementy mające kontakt z piwem (butelki, kapsle, rurka, kapslownica) zdezynfekuj. Zanurz je w roztworze dezynfekującym i postępuj zgodnie z instrukcją producenta.',
      isCompleted: false,
      isOpen: false,
    },
    {
      id: 3,
      title: 'Przygotowanie roztworu cukru',
      description: 'W garnku zagotuj ok. 0,5 litra wody i rozpuść w niej cukier (zwykle 5-8 g/l piwa). Dokładna ilość zależy od przepisu i stylu piwa. Mieszaj, aż cukier całkowicie się rozpuści.',
      isCompleted: false,
      isOpen: false,
    },
    {
      id: 4,
      title: 'Przelewanie piwa do butelek',
      description: 'Przelej piwo z fermentora do czystego, zdezynfekowanego naczynia (np. drugiego fermentora), dodając wcześniej przygotowany roztwór cukru. Delikatnie wymieszaj. Użyj zdezynfekowanej rurki, by przelać piwo do butelek. Pozostaw 2-3 cm wolnej przestrzeni od góry.',
      isCompleted: false,
      isOpen: false,
    },
    {
      id: 5,
      title: 'Kapslowanie butelek',
      description: 'Nałóż na każdą butelkę zdezynfekowany kapsel. Użyj kapslownicy, aby szczelnie zamknąć butelki. Sprawdź, czy kapsle są dobrze zaciśnięte.',
      isCompleted: false,
      isOpen: false,
    },
    {
      id: 6,
      title: 'Mycie i dezynfekcja',
      description: 'Po butelkowaniu umyj i zdezynfekuj cały sprzęt, który miał kontakt z piwem, aby był gotowy do następnego użycia.',
      isCompleted: false,
      isOpen: false,
    },
    {
      id: 7,
      title: 'Refermentacja w butelkach',
      description: 'Przenieś zakapslowane butelki w ciepłe miejsce (20-25°C) na 1-2 tygodnie. W tym czasie drożdże przerobią dodany cukier na dwutlenek węgla, nasycając piwo.',
      isCompleted: false,
      isOpen: false,
    },
    {
      id: 8,
      title: 'Leżakowanie',
      description: 'Po refermentacji przenieś butelki w chłodne i ciemne miejsce (10-15°C) na minimum 2-4 tygodnie. Dłuższe leżakowanie pozytywnie wpływa na klarowność i smak piwa.',
      isCompleted: false,
      isOpen: false,
    },
    {
      id: 9,
      title: 'Degustacja',
      description: 'Schłodź piwo w lodówce na kilka godzin. Otwórz butelkę i przelej piwo do szkła, ostrożnie, by ewentualny osad drożdży nie znalazł się w szklance. Ciesz się swoim piwem!',
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
    <div>
      <h2>Asystent Butelkowania </h2>
    <Box sx={{ p: 2, maxWidth: 600, margin: 'auto' }}>
      
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
    </div>
  );
}

export default AsystentButelkowania;
