import { useNavigate } from 'react-router-dom';

function Kalkulator() {
  const navigate = useNavigate();

  return (
    <div>
      <p>Kalkulator</p>
      <button onClick={() => navigate('/')}>Wstecz</button>
    </div>
  );
}

export default Kalkulator;