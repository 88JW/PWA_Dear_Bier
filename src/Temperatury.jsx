// Kalkulator.jsx
import { useNavigate } from 'react-router-dom';

function Temperatury() {
  const navigate = useNavigate();

  return (
    <div>
      <p>Temperatury</p>
      <button onClick={() => navigate('/')}>Wstecz</button>
    </div>
  );
}

export default Temperatury;