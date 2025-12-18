import { useNavigate, useLocation } from "react-router-dom";

const LoginPrompt = ({ pageName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="forms">
      <h1>Please Login to Access {pageName}</h1>
      <button onClick={() => navigate('/login', { state: { from: location.pathname } })}>Go to Login</button>
    </div>
  );
};

export default LoginPrompt;