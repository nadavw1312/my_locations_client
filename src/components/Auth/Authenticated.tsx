import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Authenticated = ({ children }: { children?: React.ReactNode }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login", { replace: true, state: { from: location } });
    } else {
      setIsVerified(true);
    }
  }, [auth.isAuthenticated, location, navigate]);

  if (!isVerified) {
    return null;
  }
  return <>{children}</>;
};
