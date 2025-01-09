import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function Receptury() {
  const navigate = useNavigate();
  const [receptury, setReceptury] = useState(() => {
    const localData = localStorage.getItem("receptury");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("receptury", JSON.stringify(receptury));
  }, [receptury]);

  const handleUsunRecepture = (id) => {
    const zaktualizowaneReceptury = receptury.filter(
      (receptura) => receptura.id !== id
    );
    setReceptury(zaktualizowaneReceptury);
  };

  return (
    <div className="app-container">
      <h2>Receptury Piwa</h2>
      <div>
        <h3>Polecane receptury:</h3>
        <ul></ul>
      </div>
      <div>
        <h3>Twoje receptury:</h3>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/dodaj-recepture"
        >
          Dodaj nową recepturę
        </Button>
        <ul>
          {receptury.map((receptura) => (
            <Card key={receptura.id} sx={{ marginBottom: 2 }}>
              <CardContent className="card-content">
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography variant="h6">
                      <Link to={`/receptura/${receptura.id}`}>
                        {receptura.nazwa}
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      aria-label="Usuń"
                      onClick={() => handleUsunRecepture(receptura.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </ul>
      </div>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIosNewIcon />}
        onClick={() => navigate("/")}
      >
        Wstecz
      </Button>
    </div>
  );
}

export default Receptury;
