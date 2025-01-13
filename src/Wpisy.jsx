import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


function Wpisy() {
  const [wpisy, setWpisy] = useState(JSON.parse(localStorage.getItem('wpisy')) || []);
  const navigate = useNavigate();
  const handleDelete = (index) => {
    const updatedWpisy = [...wpisy];
    updatedWpisy.splice(index, 1);
    setWpisy(updatedWpisy);
    localStorage.setItem('wpisy', JSON.stringify(updatedWpisy));
  };
  const handleClick = (id) => {
    navigate(`/wpis/${id}`); 
  };

  return (
    <div>
      {wpisy.map((wpis, index) => (
         <Card 
         key={index} 
         sx={{ maxWidth: 345, marginBottom: 2 }}
         onClick={() => handleClick(wpis.id || index)} 
       >
          <CardMedia
            component="img"
            height="140"
            image={wpis.miniatura}
            alt={wpis.nazwa}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {wpis.nazwa}
            </Typography>
            {/* ... inne informacje o wpisie */}

            {/* Przycisk "Usuń" */}
            <IconButton aria-label="delete" onClick={() => handleDelete(index)}>
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Wpisy;
