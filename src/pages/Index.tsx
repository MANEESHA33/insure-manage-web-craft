
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// We'll redirect from the Index page to the Dashboard
const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/");
  }, [navigate]);
  
  return null;
};

export default Index;
