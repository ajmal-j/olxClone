import React, { useEffect } from "react";
import { UserAuth } from "../../context/authProvider";
import { useNavigate } from "react-router-dom";

export default function ProtectedUser({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.uid) {
      navigate("/");
      return;
    }
  }, [user, navigate]);

  return !user ? <>{children}</> : null;
}
