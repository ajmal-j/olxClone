import React, { useEffect } from "react";
import { UserAuth } from "../../context/authProvider";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signIn");
      return;
    }
  }, [user, navigate]);

  return user ? <>{children}</> : null;
}
