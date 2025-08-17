
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('current_user');
    const prototypeMode = localStorage.getItem('prototype_mode') === 'true';
    
    if (currentUser || prototypeMode) {
      navigate("/dashboard");
    } else {
      navigate("/auth/login");
    }
  }, [navigate]);
  
  return null;
};

export default Index;
