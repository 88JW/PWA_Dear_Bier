// Kalkulator.jsx
import { useNavigate } from 'react-router-dom';

function Przepisy() {
  const navigate = useNavigate();

  return (
    <div>
      <p>Przepisy</p>
      <button onClick={() => navigate('/')}>Wstecz</button>
    </div>
  );
}

export default Przepisy;