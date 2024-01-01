import React, { useEffect } from "react";
import { UserAuth } from "../../context/authProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("SignIn to become a seller", {
        id: "sell",
      });
      navigate("/signIn");
      return;
    }
  }, [user, navigate]);

  return user ? <>{children}</> : null;
}
